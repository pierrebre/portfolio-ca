import { getAllPosts } from "~/lib/content.server";
import type { Route } from "./+types/feed[.]xml";

const BASE_URL = "https://pierrebarbe.ca";
const FEED_URL = `${BASE_URL}/blog/feed.xml`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function loader(_: Route.LoaderArgs) {
  const posts = await getAllPosts();

  const items = posts
    .slice(0, 20) // 20 derniers articles max
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>Pierre Barbé</dc:creator>
    </item>`;
    })
    .join("");

  const lastBuildDate = posts.length > 0
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Pierre Barbé</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles sur la web-performance, l'automatisation et l'éco-conception pour PME québécoises.</description>
    <language>fr-CA</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/images/pb-og-image.jpg</url>
      <title>Blog — Pierre Barbé</title>
      <link>${BASE_URL}/blog</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
