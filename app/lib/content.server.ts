/**
 * content.server.ts
 * Utilitaires pour lire et compiler les articles MDX depuis content/blog/.
 * Ce fichier ne s'exécute JAMAIS côté client (suffixe .server.ts).
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const CONTENT_DIR = join(process.cwd(), "content", "blog");

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  excerpt: string;
  image?: string;
  faq?: FaqItem[];
}

export interface PostContent extends PostMeta {
  html: string;
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // ~200 mots/minute
}

function formatDate(dateStr: string): string {
  return dateStr;
}

/**
 * Retourne la liste de tous les articles triés par date décroissante.
 * Utilise uniquement le frontmatter (rapide, pas de compilation MDX).
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await readdir(CONTENT_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (filename): Promise<PostMeta> => {
        const slug = filename.replace(/\.mdx$/, "");
        const raw = await readFile(join(CONTENT_DIR, filename), "utf-8");
        const { data, content } = matter(raw);

        return {
          slug,
          title: String(data.title ?? "Sans titre"),
          description: String(data.description ?? ""),
          date: String(data.date ?? new Date().toISOString().split("T")[0]),
          category: String(data.category ?? "Général"),
          readingTime: estimateReadingTime(content),
          excerpt: String(data.excerpt ?? ""),
          image: data.image ? String(data.image) : undefined,
          faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
        };
      })
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Charge un article par son slug, compile le MDX et retourne le HTML statique.
 * Le HTML est généré côté serveur pour être SSR-compatible.
 */
export async function getPost(slug: string): Promise<PostContent | null> {
  try {
    const raw = await readFile(join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);

    const evaluateOptions: EvaluateOptions = {
      jsx,
      jsxs,
      Fragment,
      remarkPlugins: [remarkGfm],
    };

    const { default: Content } = await evaluate(content, evaluateOptions);

    // Rendu côté serveur → HTML statique (blog content = no interactivity needed)
    const html = renderToStaticMarkup(
      createElement(Content as React.ComponentType)
    );

    return {
      slug,
      title: String(data.title ?? "Sans titre"),
      description: String(data.description ?? ""),
      date: formatDate(String(data.date ?? "")),
      category: String(data.category ?? "Général"),
      readingTime: estimateReadingTime(content),
      excerpt: String(data.excerpt ?? ""),
      image: data.image ? String(data.image) : undefined,
      faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : undefined,
      html,
    };
  } catch (err) {
    console.error(`[content.server] Erreur pour le slug "${slug}":`, err);
    return null;
  }
}

/**
 * Retourne les slugs des articles précédent et suivant (pour la navigation).
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
