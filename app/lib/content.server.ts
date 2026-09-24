/**
 * content.server.ts
 * Utilitaires pour lire et compiler les articles MDX depuis content/blog/.
 * Ce fichier ne s'exécute JAMAIS côté client (suffixe .server.ts).
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const CONTENT_DIR = join(process.cwd(), "content", "blog");

// Un slug est un nom de fichier : minuscules, chiffres et tirets. Tout le
// reste (« ../ », « %2f »…) est refusé avant de toucher au disque.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  category: string;
  readingTime: number;
  wordCount: number;
  excerpt: string;
  image?: string;
  faq?: FaqItem[];
}

export interface PostContent extends PostMeta {
  html: string;
}

function toPostMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string
): PostMeta {
  const wordCount = content.trim().split(/\s+/).length;

  return {
    slug,
    title: String(data.title ?? "Sans titre"),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().split("T")[0]),
    updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
    category: String(data.category ?? "Général"),
    readingTime: Math.ceil(wordCount / 200), // ~200 mots/minute
    wordCount,
    excerpt: String(data.excerpt ?? ""),
    image: data.image ? String(data.image) : undefined,
    faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
  };
}

/** Un article daté dans le futur est programmé : ni listé, ni servi. */
function isPublished(post: PostMeta): boolean {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return new Date(post.date) <= endOfToday;
}

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const textOf = (node: HastNode): string =>
  node.value ?? node.children?.map(textOf).join("") ?? "";

const isElement = (node: HastNode, tagName: string) =>
  node.type === "element" && node.tagName === tagName;

/**
 * Plugin rehype : accessibilité du HTML des articles.
 * - Tableau : enveloppé dans une zone défilante focalisable (sur mobile, le
 *   défilement horizontal doit être possible au clavier), nommée d'après le
 *   titre de section qui la précède pour distinguer les tableaux entre eux.
 * - Liste de tâches (remark-gfm) : la case et son texte dans un <label>,
 *   sinon la case n'a pas de nom accessible.
 */
function rehypeAccessibleContent() {
  let lastHeading = "";
  let tableCount = 0;

  const transform = (node: HastNode): HastNode => {
    node.children = node.children?.map(transform);

    if (["h2", "h3", "h4"].some((tag) => isElement(node, tag))) {
      lastHeading = textOf(node).trim();
    }

    if (isElement(node, "table")) {
      tableCount += 1;
      return {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-scroll"],
          tabIndex: 0,
          role: "region",
          ariaLabel: lastHeading
            ? `Tableau ${tableCount} : ${lastHeading}`
            : `Tableau ${tableCount}`,
        },
        children: [node],
      };
    }

    const classes = node.properties?.className;
    if (
      isElement(node, "li") &&
      Array.isArray(classes) &&
      classes.includes("task-list-item")
    ) {
      node.children = [
        { type: "element", tagName: "label", properties: {}, children: node.children },
      ];
    }

    return node;
  };

  return (tree: HastNode) => {
    lastHeading = "";
    tableCount = 0;
    transform(tree);
  };
}

// Module-level cache: slug → { mtime, post }
const postCache = new Map<string, { mtime: number; post: PostContent }>();
let allPostsCache: { mtime: number; posts: PostMeta[] } | null = null;

/**
 * Retourne la liste des articles publiés, triés par date décroissante.
 * Utilise uniquement le frontmatter (rapide, pas de compilation MDX).
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await readdir(CONTENT_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    // Cache invalidation: check newest mtime among all files
    const mtimes = await Promise.all(
      mdxFiles.map((f) => stat(join(CONTENT_DIR, f)).then((s) => s.mtimeMs))
    );
    const newestMtime = Math.max(...mtimes);

    if (!allPostsCache || allPostsCache.mtime < newestMtime) {
      const posts = await Promise.all(
        mdxFiles.map(async (filename) => {
          const raw = await readFile(join(CONTENT_DIR, filename), "utf-8");
          const { data, content } = matter(raw);
          return toPostMeta(filename.replace(/\.mdx$/, ""), data, content);
        })
      );
      posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      allPostsCache = { mtime: newestMtime, posts };
    }

    return allPostsCache.posts.filter(isPublished);
  } catch (err) {
    // Blog vide plutôt que page en erreur, mais pas en silence.
    console.error("[content.server] Lecture des articles impossible :", err);
    return [];
  }
}

/**
 * Charge un article publié par son slug, compile le MDX et retourne le HTML
 * statique (SSR). Retourne null si l'article n'existe pas ou est programmé.
 */
export async function getPost(slug: string): Promise<PostContent | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  const filePath = join(CONTENT_DIR, `${slug}.mdx`);

  let mtime: number;
  try {
    mtime = (await stat(filePath)).mtimeMs;
  } catch {
    return null; // Fichier absent : simple 404
  }

  const cached = postCache.get(slug);
  let post = cached && cached.mtime >= mtime ? cached.post : undefined;

  if (!post) {
    try {
      const raw = await readFile(filePath, "utf-8");
      const { data, content } = matter(raw);

      const evaluateOptions: EvaluateOptions = {
        jsx,
        jsxs,
        Fragment,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeAccessibleContent],
      };
      const { default: Content } = await evaluate(content, evaluateOptions);

      // Rendu côté serveur → HTML statique (blog content = no interactivity needed)
      const html = renderToStaticMarkup(
        createElement(Content as React.ComponentType)
      );

      post = { ...toPostMeta(slug, data, content), html };
      postCache.set(slug, { mtime, post });
    } catch (err) {
      console.error(`[content.server] Erreur pour le slug "${slug}":`, err);
      return null;
    }
  }

  return isPublished(post) ? post : null;
}

/**
 * Retourne les articles précédent et suivant (pour la navigation).
 */
export async function getAdjacentPosts(
  currentSlug: string
): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.slug === currentSlug);

  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}
