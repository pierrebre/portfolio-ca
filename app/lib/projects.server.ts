/**
 * Projets et études de cas : un fichier MDX par projet dans content/projects/.
 * Le frontmatter alimente la carte de /projects ; un corps non vide ajoute une
 * étude de cas détaillée sur /projects/<slug>.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { compileMdx, SLUG_PATTERN } from "./mdx.server";
import type { FaqItem } from "./content.server";

const CONTENT_DIR = join(process.cwd(), "content", "projects");

export interface ProjectMetric {
  label: string;
  before: string;
  after: string;
}

export interface LinkItem {
  to: string;
  title: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  duration: string;
  year: number;
  featured: boolean;
  /** Lien vers l'étude de cas, seulement si le fichier a un corps. */
  href?: string;
  /** Dernière modification de l'étude de cas (updatedDate, sinon date). */
  lastmod?: string;
}

/** Champs propres à la page d'étude de cas. */
export interface CaseStudy extends ProjectMeta {
  headline: string;
  metaTitle: string;
  metaDescription: string;
  subtitle?: string;
  outcome?: string;
  date: string;
  updatedDate?: string;
  highlights: { value: string; label: string }[];
  midCta?: { title: string; text: string };
  faq: FaqItem[];
  services: LinkItem[];
  related: LinkItem[];
  cta: { title: string; text: string };
  html: string;
}

const list = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

function toProjectMeta(slug: string, data: Record<string, unknown>, body: string): ProjectMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    client: String(data.client ?? ""),
    category: String(data.category ?? ""),
    tags: list<string>(data.tags),
    description: String(data.description ?? ""),
    challenge: String(data.challenge ?? ""),
    solution: String(data.solution ?? ""),
    metrics: list<ProjectMetric>(data.metrics),
    duration: String(data.duration ?? ""),
    year: Number(data.year ?? 0),
    featured: data.featured === true,
    href: body.trim() ? `/projects/${slug}` : undefined,
    lastmod: data.updatedDate || data.date ? String(data.updatedDate ?? data.date) : undefined,
  };
}

async function readProject(slug: string) {
  const raw = await readFile(join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { data, content, meta: toProjectMeta(slug, data, content) };
}

/** Tous les projets, du plus récent au plus ancien. */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  try {
    const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".mdx"));
    const projects = await Promise.all(
      files.map(async (f) => (await readProject(f.replace(/\.mdx$/, ""))).meta)
    );
    return projects.sort((a, b) => b.year - a.year || a.slug.localeCompare(b.slug));
  } catch (err) {
    console.error("[projects.server] Lecture des projets impossible :", err);
    return [];
  }
}

/** Étude de cas détaillée, ou null si le projet n'existe pas ou n'en a pas. */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  let project;
  try {
    project = await readProject(slug);
  } catch {
    return null; // Fichier absent : simple 404
  }
  const { data, content, meta } = project;
  if (!meta.href) return null;

  return {
    ...meta,
    headline: String(data.headline ?? meta.title),
    metaTitle: String(data.metaTitle ?? meta.title),
    metaDescription: String(data.metaDescription ?? meta.description),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    outcome: data.outcome ? String(data.outcome) : undefined,
    date: String(data.date),
    updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
    highlights: list(data.highlights),
    midCta: data.midCta as CaseStudy["midCta"],
    faq: list<FaqItem>(data.faq),
    services: list<LinkItem>(data.services),
    related: list<LinkItem>(data.related),
    cta: (data.cta as CaseStudy["cta"]) ?? {
      title: "Un projet similaire ?",
      text: "Parlons de ton site : un premier échange gratuit suffit pour voir où sont les gains.",
    },
    html: await compileMdx(content),
  };
}
