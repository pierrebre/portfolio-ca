import { getAllPosts } from "~/lib/content.server";
import type { Route } from "./+types/sitemap[.]xml";

const BASE_URL = "https://pierrebarbe.ca";

const STATIC_URLS = [
  { loc: "/", priority: "1.0", changefreq: "monthly", lastmod: "2026-03-04" },
  { loc: "/about", priority: "0.8", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/projects", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-04" },
  { loc: "/projects/piscines-jolicoeur", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-04" },
  { loc: "/services", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/optimisation-web-performance", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/creation-maintenance-sites", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/automatisation-workflows", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/audits-techniques-core-web-vitals", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/gestion-serveur-deploiement", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  { loc: "/services/integration-outils-ia", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-20" },
  // Blog index lastmod is dynamically set from newest post in loader
  { loc: "/blog", priority: "0.8", changefreq: "weekly", lastmod: "" },
  { loc: "/contact", priority: "0.8", changefreq: "yearly", lastmod: "2026-02-20" },
  { loc: "/politique-confidentialite", priority: "0.3", changefreq: "yearly", lastmod: "2026-02-20" },
  { loc: "/mentions-legales", priority: "0.3", changefreq: "yearly", lastmod: "2026-02-20" },
];

export async function loader(_: Route.LoaderArgs) {
  const posts = await getAllPosts();
  const newestPostDate = posts[0]?.date ?? "2026-03-04";

  const staticEntries = STATIC_URLS.map(
    ({ loc, priority, changefreq, lastmod }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${loc === "/blog" ? newestPostDate : lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("");

  const blogEntries = posts.map(
    (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join("");

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
