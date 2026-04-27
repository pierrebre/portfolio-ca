import { getAllPosts } from "~/lib/content.server";
import type { Route } from "./+types/sitemap[.]xml";

const BASE_URL = "https://pierrebarbe.ca";

// Pages statiques. Google ignore priority + changefreq — on les retire.
// lastmod est mis à jour manuellement quand le contenu change réellement.
const STATIC_URLS: { loc: string; lastmod: string }[] = [
  { loc: "/", lastmod: "2026-04-27" },
  { loc: "/about", lastmod: "2026-02-20" },
  { loc: "/projects", lastmod: "2026-04-04" },
  { loc: "/projects/piscines-jolicoeur", lastmod: "2026-04-04" },
  { loc: "/services", lastmod: "2026-04-21" },
  { loc: "/services/optimisation-web-performance", lastmod: "2026-04-21" },
  { loc: "/services/creation-maintenance-sites", lastmod: "2026-04-21" },
  { loc: "/services/automatisation-workflows", lastmod: "2026-04-21" },
  { loc: "/services/audits-techniques-core-web-vitals", lastmod: "2026-04-27" },
  { loc: "/services/gestion-serveur-deploiement", lastmod: "2026-04-21" },
  { loc: "/services/integration-outils-ia", lastmod: "2026-04-21" },
  // Blog index lastmod is dynamically set from newest post in loader
  { loc: "/blog", lastmod: "" },
  { loc: "/contact", lastmod: "2026-02-20" },
];

export async function loader(_: Route.LoaderArgs) {
  const posts = await getAllPosts();
  const newestPostDate = posts[0]?.updatedDate ?? posts[0]?.date ?? "2026-04-27";

  const staticEntries = STATIC_URLS.map(
    ({ loc, lastmod }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${loc === "/blog" ? newestPostDate : lastmod}</lastmod>
  </url>`
  ).join("");

  const blogEntries = posts
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedDate ?? post.date}</lastmod>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${blogEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
