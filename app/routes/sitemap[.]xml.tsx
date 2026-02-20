import { getAllPosts } from "~/lib/content.server";
import type { Route } from "./+types/sitemap[.]xml";

const BASE_URL = "https://pierrebarbe.ca";
const TODAY = new Date().toISOString().split("T")[0];

const STATIC_URLS = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/projects", priority: "0.8", changefreq: "monthly" },
  { loc: "/services", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/optimisation-web-performance", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/creation-maintenance-sites", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/automatisation-workflows", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/audits-techniques-core-web-vitals", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/gestion-serveur-deploiement", priority: "0.9", changefreq: "monthly" },
  { loc: "/services/integration-outils-ia", priority: "0.9", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/contact", priority: "0.8", changefreq: "yearly" },
  { loc: "/politique-confidentialite", priority: "0.3", changefreq: "yearly" },
  { loc: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
];

export async function loader(_: Route.LoaderArgs) {
  const posts = await getAllPosts();

  const staticEntries = STATIC_URLS.map(
    ({ loc, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
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
