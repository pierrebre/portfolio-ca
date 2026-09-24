import { getAllPosts } from "~/lib/content.server";
import { getAllProjects } from "~/lib/projects.server";
import lastmodData from "data/lastmod.json";
import type { Route } from "./+types/sitemap[.]xml";

const BASE_URL = "https://pierrebarbe.ca";
const pages: Record<string, { lastmod?: string }> = lastmodData;

// Google ignore priority et changefreq : seul lastmod est donné.
// - Pages fixes : data/lastmod.json, tenu à jour par « pnpm lastmod » (la CI
//   vérifie qu'il l'est).
// - Articles et études de cas : updatedDate (ou date) du frontmatter.
// - /blog : date du dernier article publié ou mis à jour.
export async function loader(_: Route.LoaderArgs) {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);

  const newestPost = posts
    .map((p) => p.updatedDate ?? p.date)
    .sort()
    .at(-1);

  const entries: { loc: string; lastmod: string }[] = [
    ...Object.entries(pages).map(([loc, { lastmod }]) => ({ loc, lastmod: lastmod ?? "" })),
    { loc: "/blog", lastmod: newestPost ?? "" },
    ...projects.flatMap((p) => (p.href ? [{ loc: p.href, lastmod: p.lastmod ?? "" }] : [])),
    ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.updatedDate ?? p.date })),
  ];

  const urls = entries
    .map(
      ({ loc, lastmod }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
