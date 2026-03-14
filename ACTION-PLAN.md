# SEO Action Plan — pierrebarbe.ca

**Generated:** 2026-03-13
**Overall Score:** 73/100
**Target Score:** 85/100

---

## Priority Definitions

- **Critical** — Blocks rich results, causes ranking penalties, or wastes significant crawl budget. Fix immediately.
- **High** — Significantly impacts Core Web Vitals, E-E-A-T, or schema eligibility. Fix within 1 week.
- **Medium** — Optimization opportunities with measurable impact. Fix within 1 month.
- **Low** — Nice-to-have improvements. Backlog.

---

## Critical (Fix Immediately)

### C-1 — Remove FAQPage JSON-LD from all blog posts
**File:** `app/routes/blog/blog.$slug.tsx` (lines 68–78, 135–136)
**Impact:** Eliminates dead-weight JSON-LD (~1–2KB per blog post) that has zero chance of generating rich results since Google restricted FAQPage to gov/healthcare in August 2023.
**Fix:** Delete the `faqSchema` variable block (lines 68–78) and the second `<JsonLd>` render (line 136). The FAQ content in the MDX body remains visible to users and is still read by AI crawlers.
**Effort:** 5 min

### C-2 — Fix DaisyUI CSS bundle (themes: all → themes: [light, dark])
**File:** `app/app.css`
**Impact:** Eliminates ~80–90% of DaisyUI's CSS output, significantly reducing the render-blocking CSS bundle. Direct LCP improvement for all pages.
**Fix:** Change the DaisyUI plugin config from `themes: all` (or equivalent) to an explicit list: `themes: [light, dark]`
**Effort:** 2 min

### C-3 — Replace Organization.logo with a square image
**File:** `app/routes/home.tsx` (lines 165–169)
**Impact:** The current logo is the OG image banner (1200×630). Google rejects non-square logos for Knowledge Panels and Article publisher logo display. A correct logo is required for brand identity in search results.
**Fix:** Create a square version of the logo (min 112×112px, ideal 512×512px PNG or WebP) at `/public/images/pierre-barbe-logo.png`. Update the `logo.url`, `logo.width`, and `logo.height` fields in the Organization schema.
**Effort:** 30 min (image creation + code update)

---

## High Priority (Fix This Week)

### H-1 — Add hero image preload to root.tsx (LCP)
**File:** `app/root.tsx` (after the two font preloads, ~line 37)
**Impact:** The `me.avif` image is the LCP element on the homepage but is not preloaded. Adding a preload allows the browser to fetch it during HTML parse rather than after CSS download, directly reducing LCP time.
**Fix:**
```tsx
<link rel="preload" as="image" type="image/avif" href="/images/me.avif" />
```
**Effort:** 5 min

### H-2 — Add Cache-Control for Vite JS/CSS assets
**File:** `vercel.json`
**Impact:** Vite outputs content-hashed filenames to `/assets/` but no cache rule exists for returning visitors. Adding 1-year immutable cache enables fast repeat loads — directly improves LCP and INP for returning visitors.
**Fix:** Add to `vercel.json` headers array:
```json
{
  "source": "/assets/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
}
```
**Effort:** 5 min

### H-3 — Fix BreadcrumbList last item (3 locations)
**Files:**
- `app/routes/blog/blog.$slug.tsx` line 127 — remove `item: url` from position 3
- `app/routes/about.tsx` (last ListItem) — remove `item` from position 2
- `app/routes/contact.tsx` (last ListItem) — remove `item` from position 2

**Impact:** Google's rich results documentation requires omitting the `item` property on the last BreadcrumbList element (the current page). This fix makes breadcrumbs on all affected pages eligible for SERP display.
**Note:** The `generateBreadcrumbSchema()` utility in `seo.ts` already handles this correctly. Refactor to use it.
**Effort:** 10 min

### H-4 — Fix og:type on 2 service pages
**Files:** `app/routes/services/optimisation-web-performance.tsx` line 14, `app/routes/services/creation-maintenance-sites.tsx` line 14
**Impact:** Both pages pass `type: "article"` to `generateSEOMeta()`. Service pages are not articles. This sends incorrect OG signals to social platforms and potentially to search engines.
**Fix:** Remove the `type: "article"` argument (default is `"website"`).
**Effort:** 5 min

### H-5 — Add internal links from blog posts to /services and /projects
**Files:** All 10 MDX blog posts + relevant service pages
**Impact:** All blog CTAs currently point only to `/contact`. No article links to service pages or the projects page. Adding contextual links to relevant service pages and `/projects` completes the user conversion funnel and passes PageRank to commercial pages.
**Fix:** In each blog article, add a contextual link to the most relevant service page (e.g., performance articles → `/services/optimisation-web-performance`) and a mention of `/projects` in the conclusion.
**Effort:** 30–60 min (update 10 MDX files)

### H-6 — Replace AVIF OG image with JPEG/WebP for social sharing
**All pages via `app/utils/seo.ts` and `app/routes/home.tsx`**
**Impact:** `pb-og-image.avif` fails to render previews on LinkedIn, WhatsApp, and some Slack versions. Any content promotion campaign will show broken image previews.
**Fix:** Create `pb-og-image.jpg` (or `.webp`) and update all `og:image` references. AVIF can remain for on-page images.
**Effort:** 30 min

### H-7 — Render challenge/solution fields on the projects page
**File:** `app/routes/projects.tsx`
**Impact:** `data/projects.ts` contains `challenge` and `solution` text fields per project that are not rendered. Showing them adds ~600–800 words of unique, specific content to the page at zero writing cost, improving crawl value and E-E-A-T signals.
**Fix:** Add `project.challenge` and `project.solution` to the card JSX.
**Effort:** 20 min

---

## Medium Priority (Fix This Month)

### M-1 — Fix wordCount calculation in blog schema
**File:** `app/routes/blog/blog.$slug.tsx` line 119, `app/lib/content.server.ts`
**Impact:** `wordCount: post.readingTime * 200` always produces a multiple of 200, off by up to 199 words. Google may use wordCount as a content quality signal.
**Fix:** In `content.server.ts`, compute `wordCount` directly before the `Math.ceil()` division. Return it as a separate field. Use `post.wordCount` in the schema instead of `readingTime * 200`.
**Effort:** 20 min

### M-2 — Fix me.avif dimensions inconsistency (CLS)
**Files:** `app/components/hero.tsx` (1152×1152), `app/routes/about.tsx` (800×800)
**Impact:** The actual file dimensions reported in schema are 2662×3201 (portrait). Both components declare square dimensions, causing potential CLS when the portrait image loads and the browser adjusts the reserved space.
**Fix:** Check actual pixel dimensions of `me.avif`. Set consistent `width`/`height` matching the true aspect ratio on both components. Update BlogPosting schema's author image dimensions accordingly.
**Effort:** 15 min

### M-3 — Fix Person.image inconsistency across schema
**Files:** `app/routes/home.tsx` line 90 vs `app/routes/blog/blog.$slug.tsx` line 103
**Impact:** `Person` node uses `/images/pierre-barbe.jpg`; `BlogPosting.author.image` uses `/images/me.avif`. Google's entity resolution benefits from a single canonical author image.
**Fix:** Pick one canonical photo. The `/about` page already uses `me.avif` — use it everywhere.
**Effort:** 10 min

### M-4 — Add fetchPriority="high" to about page hero image
**File:** `app/routes/about.tsx` (hero img element)
**Impact:** The `me.avif` on `/about` is the LCP element on that page and is currently missing `fetchPriority="high"`.
**Fix:** Add `fetchPriority="high"` to the `<img>` element.
**Effort:** 5 min

### M-5 — Add X-Frame-Options: DENY header
**File:** `vercel.json`
**Impact:** Defense-in-depth for browsers that don't support CSP `frame-ancestors` (IE11, legacy Edge).
**Fix:** Add `{ "key": "X-Frame-Options", "value": "DENY" }` to the global headers array.
**Effort:** 5 min

### M-6 — Add dateModified field to blog articles
**Files:** `app/routes/blog/blog.$slug.tsx` line 95, `app/lib/content.server.ts`, all 10 MDX files
**Impact:** `dateModified` is currently always equal to `datePublished`. Google uses `dateModified` for recrawl prioritization of updated content.
**Fix:** Add optional `updatedDate` field to MDX frontmatter schema. Use it as `dateModified` when present, falling back to `post.date`.
**Effort:** 30 min (schema + all MDX files where applicable)

### M-7 — Add unicode-range to @font-face declarations + preload italic fonts
**File:** `app/app.css`
**Impact:** Without `unicode-range`, both latin-ext and latin font files download on every page even when only one is needed. Italic files (used in blog prose) are not preloaded, causing FOUT.
**Fix:** Add `unicode-range` descriptor to each `@font-face` rule. Add preload hints for the two italic font files (conditionally, or globally since blog pages will need them).
**Effort:** 30 min

### M-8 — Add server-side caching to content.server.ts
**File:** `app/lib/content.server.ts`
**Impact:** MDX is re-compiled and all files are re-read on every request. With 10+ articles this is fast but will become a TTFB issue as content grows.
**Fix:** Add a module-level `Map<string, PostContent>` cache keyed by slug, with mtime-based invalidation. Add a separate cache for `getAllPosts()` using a timestamp check.
**Effort:** 45 min

### M-9 — Add trailing slash policy
**File:** `vercel.json`
**Impact:** Without policy, Vercel may serve duplicate content at both `/about` and `/about/`.
**Fix:** Add `"trailingSlash": false` to `vercel.json`.
**Effort:** 2 min

### M-10 — Add geo signals to 3 meta descriptions
**Files:** `content/blog/audit-performance-site-web.mdx`, `content/blog/maintenance-site-web-pme-guide.mdx`, `content/blog/core-web-vitals-guide-pme.mdx`
**Impact:** These three descriptions contain no Quebec or Montreal reference. Adding "pour PME québécoises" or similar improves local relevance for geographic search queries.
**Effort:** 10 min

### M-11 — Update llms.txt to match current blog
**File:** `public/llms.txt`
**Impact:** `llms.txt` references `eco-conception-web` (not in current blog) and may be missing some live articles. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) use this file.
**Fix:** Sync with the actual 10 live articles. Remove dead entries.
**Effort:** 10 min

### M-12 — Add SearchAction to WebSite schema
**File:** `app/routes/home.tsx` (WebSite node, ~line 189)
**Impact:** Enables the Sitelinks Searchbox for branded queries in Google Search. Currently the WebSite node has no `potentialAction`.
**Fix:**
```json
{
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://pierrebarbe.ca/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```
Note: Requires the blog to support `?q=` query filtering (currently uses `useState` only).
**Effort:** 30 min (schema + blog filter enhancement)

---

## Low Priority (Backlog)

### L-1 — Add `url` to Service nodes on homepage
**File:** `app/routes/home.tsx` (4 Service nodes, ~lines 225–290)
**Fix:** Add `"url": "https://pierrebarbe.ca/services/[slug]"` to each Service node so Google can connect homepage service summaries to full service pages.
**Effort:** 10 min

### L-2 — Fix NEQ placeholder in legal notice
**File:** `app/routes/legal-notice.tsx`
**Fix:** Fill in or remove `Numéro d'entreprise (NEQ) : [à compléter si applicable]`.
**Effort:** 5 min

### L-3 — Add twitter:card to contact page
**File:** `app/routes/contact.tsx`
**Fix:** Use `generateSEOMeta()` in the contact page `meta()` function to guarantee `twitter:card` consistency.
**Effort:** 15 min

### L-4 — Remove dead code: `generateServiceSchema()`
**File:** `app/utils/seo.ts` (lines 75–109)
**Impact:** This function produces bare `Service` without `@graph` or `@context` — incomplete output if ever called. No current callers. Remove to prevent future misuse.
**Effort:** 5 min

### L-5 — Fix hardcoded sitemap lastmod for static pages
**File:** `app/routes/sitemap[.]xml.tsx`
**Fix:** Derive `lastmod` from a build-time constant or environment variable updated in CI/CD.
**Effort:** 30 min

### L-6 — Add `ProfilePage.dateModified` to about page
**File:** `app/routes/about.tsx`
**Fix:** Add `dateModified` reflecting the last content update.
**Effort:** 5 min

### L-7 — CSP nonce implementation (long-term)
**Files:** `vercel.json`, `app/root.tsx`, server entry
**Impact:** Replace `'unsafe-inline'` in `script-src` with per-request nonces for JSON-LD blocks and SHA-256 hash for the anti-FOUC script.
**Effort:** 3–4 hours (infrastructure change)

---

## Content Strategy (Ongoing)

### Content-1 — Add testimonials
**Impact:** Highest E-E-A-T gap on the site. Even one testimonial with first name + role + company type would significantly improve Experience signals.
**Where:** Homepage (after Results section), /about, or individual service pages.

### Content-2 — Create individual case study pages (/projects/[slug])
**Impact:** Current projects page is card-only. Full case study pages (600–1,000 words each) would be strong E-E-A-T assets and target long-tail queries like "optimisation WooCommerce Montréal".
**Effort:** 3–5 hours per case study

### Content-3 — Write "Éco-conception web Québec" article
**Impact:** Listed as a core value on /about but no published article exists. A strong topical gap in the current content strategy.

### Content-4 — Write "SEO local Montréal PME" article
**Impact:** No article covers Google Business Profile, local schema, or NAP consistency. High commercial intent for a local web developer.

### Content-5 — Write "Hébergement web Canada comparatif" article
**Impact:** Multiple existing articles recommend Canadian hosting without providing a comparison. This article would link naturally to 5+ existing articles and capture research-phase traffic.

### Content-6 — Add "key takeaways" sections to blog articles
**Impact:** 3–5 bullet summaries at the end of each article increase AI overview citability and reduce bounce for scanners.

### Content-7 — Resolve voice inconsistency (tu vs vous)
**Impact:** Homepage/FAQ use "tu/ton"; blog uses "vous/votre". Pick one for consistency. For Quebec SMBs, either can work — commit to one.

### Content-8 — Add phone number to /about and /contact
**Impact:** Quebec SMB clients value local, reachable vendors. A Montreal area code phone number is a meaningful trust signal.

---

## Quick Reference: Effort vs. Impact Matrix

| Task | Effort | Impact | Priority |
|---|---|---|---|
| C-2 DaisyUI themes fix | 2 min | High | Critical |
| H-1 Hero image preload | 5 min | High | High |
| H-2 Assets cache rule | 5 min | High | High |
| C-1 Remove FAQPage schema | 5 min | Medium | Critical |
| H-4 og:type fix (service pages) | 5 min | Medium | High |
| M-4 fetchPriority on /about | 5 min | Medium | Medium |
| M-5 X-Frame-Options header | 5 min | Low | Medium |
| M-9 Trailing slash policy | 2 min | Medium | Medium |
| L-2 NEQ placeholder | 5 min | Low | Low |
| H-3 BreadcrumbList last item (×3) | 10 min | High | High |
| M-3 Person.image unify | 10 min | Medium | Medium |
| M-10 Geo in 3 meta descriptions | 10 min | Medium | Medium |
| M-11 Update llms.txt | 10 min | Medium | Medium |
| L-1 Add url to Service nodes | 10 min | Low | Low |
| H-7 Render challenge/solution | 20 min | High | High |
| M-1 Fix wordCount | 20 min | Medium | Medium |
| M-2 Fix image dimensions | 15 min | Medium | Medium |
| H-5 Blog → /services links | 60 min | High | High |
| H-6 OG image JPEG/WebP | 30 min | High | High |
| C-3 Square logo | 30 min | High | Critical |
| M-6 dateModified field | 30 min | Medium | Medium |
| M-7 unicode-range + font preload | 30 min | Medium | Medium |
| M-12 SearchAction schema | 30 min | Medium | Medium |
| M-8 Server-side content cache | 45 min | Medium | Medium |
| Content-1 Testimonials | 2–4 hrs | Very High | Ongoing |
| Content-2 Case study pages | 3–5 hrs/ea | High | Ongoing |
| L-7 CSP nonce | 3–4 hrs | High | Low |
