# Full SEO Audit Report — pierrebarbe.ca

**Date:** 2026-03-13
**Framework:** React Router v7 + SSR | Deployed on Vercel
**URL:** https://pierrebarbe.ca
**Niche:** Développeur web freelance, Montréal, PME québécoises

---

## SEO Health Score: 73 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 25% | 72 | 18.0 |
| Content Quality | 25% | 74 | 18.5 |
| On-Page SEO | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 65 | 6.5 |
| Performance (Core Web Vitals) | 10% | 75 | 7.5 |
| Images | 5% | 70 | 3.5 |
| AI Search Readiness | 5% | 72 | 3.6 |
| **Total** | **100%** | | **73.2** |

---

## Executive Summary

### Business Type Detected
Freelance web developer portfolio targeting Quebec SMBs. Local SEO + content marketing strategy. French Canadian market.

### Top 5 Critical Issues
1. **FAQPage schema never generates rich results** — since Aug 2023, Google restricts FAQPage rich results to government/healthcare. All 10 blog posts emit dead-weight FAQPage JSON-LD (~1–2KB each) with zero upside.
2. **DaisyUI `themes: all` CSS bloat** — shipping all DaisyUI themes inflates the render-blocking CSS bundle significantly. Only `light` and `dark` are used.
3. **Hero image (`me.avif`) not preloaded** — the LCP element on the homepage is not preloaded in `root.tsx`, delaying discovery and paint.
4. **`Organization.logo` uses OG banner image (1200×630)** — Google requires a square or near-square logo for Knowledge Panel and Article publisher logo. The current landscape banner will be rejected.
5. **No testimonials anywhere on the site** — zero verifiable client references despite strong case study data. The single largest E-E-A-T gap.

### Top 5 Quick Wins
1. Add `<link rel="preload" as="image" type="image/avif" href="/images/me.avif">` in `root.tsx` — 5 min, LCP impact.
2. Change DaisyUI config to `themes: [light, dark]` — 1 line change, major CSS size reduction.
3. Remove `FAQPage` JSON-LD from `blog.$slug.tsx` — eliminates dead schema weight from all 10 posts.
4. Fix 3 BreadcrumbList last items that incorrectly include `item` property — 10 min, rich result eligibility fix.
5. Change `og:type: "article"` to `"website"` on service pages — 5 min, fixes incorrect OG signal.

---

## 1. Technical SEO

### 1.1 Crawlability & Indexability

**PASS — SSR rendering** — React Router v7 with `ssr: true` delivers full HTML to crawlers on every request. No client-side rendering gaps.

**PASS — robots.txt** — Clean configuration at `/public/robots.txt`. All bots allowed. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) explicitly allowed. Sitemap reference present. `/fonts/` and `/favicon/` correctly disallowed.

**PASS — Sitemap** — Dynamic sitemap at `/sitemap.xml` generated via SSR loader. Includes all static pages + all blog posts with `lastmod` from frontmatter dates. Correct XML with `changefreq` and `priority`. Cache-Control: 1 hour.

**PASS — Canonicals** — Per-route canonical tags implemented via `meta()` functions on all major pages.

**PASS — RSS Feed** — Feed route exists at `routes/blog/feed[.]xml.tsx` and is referenced in `root.tsx`.

**ISSUE (Medium) — Sitemap/noindex consistency on legal pages** — `/politique-confidentialite` and `/mentions-legales` are not in the sitemap. Verify that these pages actually have `noindex` set (via `generateSEOMeta({ noindex: true })`). If noindexed: correct. If not noindexed: they should be added to the sitemap.

**ISSUE (Low) — Hardcoded `lastmod` for static pages** — Static `lastmod` dates in `sitemap[.]xml.tsx` will drift as content is updated. Derive from a build constant.

**ISSUE (Low) — No trailing slash policy** — No `"trailingSlash"` directive in `vercel.json`. Vercel may serve duplicate content at both `/about` and `/about/`. Add `"trailingSlash": false`.

### 1.2 Security Headers

**PASS** — HSTS (2yr, includeSubDomains, preload), X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP frame-ancestors.

**ISSUE (High) — CSP `'unsafe-inline'` on `script-src`** — The inline anti-FOUC script and JSON-LD `dangerouslySetInnerHTML` blocks require `'unsafe-inline'`, nullifying XSS protection. Correct path: SHA-256 hashes for static inline scripts + server-generated nonce for dynamic JSON-LD. This is an infrastructure change.

**ISSUE (Medium) — Missing `X-Frame-Options: DENY`** — `frame-ancestors 'none'` works in modern browsers but older browsers (IE11) only respect `X-Frame-Options`. Add as defense-in-depth. One line in `vercel.json`.

**ISSUE (Medium) — No Cache-Control for Vite JS/CSS bundles** — Vite outputs content-hashed filenames to `/assets/` but no matching cache rule exists. Add:
```json
{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
```

### 1.3 URL Structure

Clean slug-based URLs. No query parameters in indexed URLs. Logical structure: `/services/[slug]`, `/blog/[slug]`.

**ISSUE (Low) — NEQ placeholder live in production** — `legal-notice.tsx` contains `Numéro d'entreprise (NEQ) : [à compléter si applicable]` visible on the production page. Fill in or remove.

### 1.4 Hreflang / Internationalization

Site is French-only (fr-CA). No hreflang needed. `lang="fr-CA"` correctly set on `<html>`.

---

## 2. Content Quality & E-E-A-T

**Overall Content Score: 74 / 100**

### 2.1 E-E-A-T Assessment

| Dimension | Score | Key Notes |
|---|---|---|
| Experience | 7.5/10 | Concrete before/after metrics, real anecdotes, 3 case studies. Zero testimonials. |
| Expertise | 8.0/10 | High technical accuracy. No visible certifications mentioned. |
| Authoritativeness | 5.5/10 | Cites authoritative sources. No external mentions of Pierre Barbé. |
| Trustworthiness | 7.0/10 | Legal pages present, HTTPS, no phone number. Voice inconsistency (tu vs vous). |

**Biggest E-E-A-T gap:** Authoritativeness (5.5/10). The site cannot self-certify authority — it must be earned externally. No "as seen in", no guest bylines, no verifiable reviews.

**Second biggest gap:** Zero testimonials. A single testimonial with first name + role + company type would meaningfully improve Experience signals.

### 2.2 Blog Content Depth — All Pass

All 10 articles exceed the 1,500-word minimum (range: ~1,600–2,400 words).

**Three articles could deepen coverage:**
- `automatiser-business-n8n-pme.mdx` — missing error handling, monitoring, debugging
- `chatbot-ia-site-web-pme.mdx` — no RAG implementation patterns or specific tool stacks
- `core-web-vitals-guide-pme.mdx` — could add INP debugging tools section

### 2.3 Thin / Hidden Content

**ISSUE (Medium) — Projects page hides content** — `data/projects.ts` contains `challenge` and `solution` fields per project, but `projects.tsx` only renders `project.description`. ~600–800 words of already-written content is invisible to users and crawlers. Render these fields.

**No individual case study pages** — No `/projects/[slug]` routes exist. Detailed case study pages would be strong E-E-A-T assets.

### 2.4 Internal Linking

**Strength:** Dense cross-linking within the WordPress performance cluster. All articles link to thematically related posts.

**ISSUE (High) — No blog → /services or /projects links** — All 10 blog posts end with a CTA pointing only to `/contact`. No article links to service pages or the projects page, breaking the user journey from content to commercial pages and failing to pass PageRank to money pages.

**ISSUE (Medium) — `developpeur-web-freelance-montreal.mdx` (highest commercial-intent article) doesn't link to /projects.**

**ISSUE (Low) — No blog post links to /about** — The credibility page is isolated from the content cluster.

### 2.5 Meta Descriptions & Title Tags

Generally strong. 12/13 titles under 60 characters. Most meta descriptions 140–160 characters.

**Three descriptions lack geo signals:**
- `audit-performance-site-web.mdx`
- `maintenance-site-web-pme-guide.mdx`
- `core-web-vitals-guide-pme.mdx`

**One title opportunity:** `automatiser-business-n8n-pme.mdx` starts with brand name "n8n" — consider "Automatisation PME avec n8n : 5 workflows concrets".

### 2.6 Content Gaps

**High priority (commercial intent):**
1. "SEO local Montréal PME" — no article covers Google Business Profile, local schema, NAP consistency
2. "Éco-conception web Québec" — listed as core value on /about but no published article
3. "Refonte site web Québec" — high-intent query, underserved

**Medium priority:**
4. "Hébergement web Canada/Québec comparatif" — multiple articles recommend Canadian hosting but no comparison piece
5. "WordPress vs Wix vs Squarespace pour PME québécoise" — high-volume platform comparison
6. "Google Search Console pour débutants" — entry-level article, positions Pierre as first contact

### 2.7 Duplicate Content

**Low risk.** One issue: "freelance vs agence" comparison table appears in nearly identical form in both `developpeur-web-freelance-montreal.mdx` and `cout-site-web-quebec-prix.mdx`. Abbreviate the comparison in the pricing article with a reference link to avoid keyword cannibalization.

---

## 3. On-Page SEO

### 3.1 Heading Structure

Strong hierarchical structure across all pages. H1 present on all major pages.

**ISSUE (Medium) — /projects H1 not keyword-rich** — "Études de cas" is descriptive but misses keyword opportunity. Consider "Études de cas — Performance Web & Automatisation à Montréal".

### 3.2 Open Graph & Social

**ISSUE (Medium) — AVIF OG image breaks social crawlers** — `pb-og-image.avif` is used as `og:image` on all pages. LinkedIn, WhatsApp, and some Slack versions cannot decode AVIF — previews will show broken or absent images. Create `pb-og-image.jpg` (or `.webp`) for the `og:image` meta tag.

**ISSUE (Low) — `contact.tsx` missing `twitter:card`** — The contact page doesn't emit `twitter:card` in its `meta()` function. Use `generateSEOMeta()` consistently.

**ISSUE (Low) — `og:type: "article"` on 2 service pages** — `optimisation-web-performance.tsx` and `creation-maintenance-sites.tsx` incorrectly use `type: "article"`. Change to `"website"`.

---

## 4. Schema / Structured Data

**Schema Score: 65 / 100**

### 4.1 Schema Inventory

| Page | Schema Types |
|---|---|
| Homepage | Person, LocalBusiness+ProfessionalService, Organization, WebSite, WebPage+HomePage, 4× Service |
| Blog posts | BlogPosting + BreadcrumbList + FAQPage (conditional — remove) |
| Blog index | Blog + BreadcrumbList |
| Service pages | Service + WebPage + BreadcrumbList |
| Services index | CollectionPage + ItemList + BreadcrumbList |
| About | WebPage+AboutPage + ProfilePage + BreadcrumbList |
| Contact | WebPage+ContactPage + BreadcrumbList |

`JsonLd` component implementation: correct SSR-compatible `dangerouslySetInnerHTML` with `</` escape. No bugs.

### 4.2 Critical Schema Issues

**C-1 — FAQPage schema never generates rich results** (`blog.$slug.tsx` lines 68–78)
Since August 2023, Google restricts FAQPage rich results to government/healthcare authority sites. For this site, FAQPage JSON-LD adds ~1–2KB per blog post response with zero rich result upside. **Remove** the `faqSchema` block and second `<JsonLd>` render in `blog.$slug.tsx`. The FAQ content in the MDX body remains valuable.

**C-2 — Organization.logo uses OG banner (1200×630)** (`home.tsx` lines 165–169)
Google requires square/near-square images for Organization logos in Knowledge Panels and Article publisher displays. Create a dedicated square logo (min 112×112px, ideal 512×512px) and update the `logo` field with correct `width` and `height`.

**C-3 — Person.image inconsistency**
`Person` node in `home.tsx` (line 90): `/images/pierre-barbe.jpg`. `BlogPosting.author.image` in `blog.$slug.tsx` (line 103): `/images/me.avif`. Pick one canonical author image for consistent entity resolution across all schema.

**C-4 — wordCount is inaccurate** (`blog.$slug.tsx` line 119)
`wordCount: post.readingTime * 200` always produces a multiple of 200, off by up to 199 words. In `content.server.ts`, the actual word count is computed as an intermediate step before `Math.ceil()`. Return it directly as a `wordCount` field from `getAllPosts()`/`getPost()` and use it in the schema.

### 4.3 Schema Warnings

**W-1/W-4/W-5 — BreadcrumbList last item has `item` property** — Should be omitted per Google's rich results documentation. Affects: `blog.$slug.tsx` (position 3), `about.tsx` (position 2), `contact.tsx` (position 2). The `generateBreadcrumbSchema()` utility in `seo.ts` already handles this correctly — use it for these pages too.

**W-6 — `dateModified` always equals `datePublished`** — Add optional `updatedDate` to MDX frontmatter, use as `dateModified` when present.

**W-7 — `og:type: "article"` on service pages** — Change to `"website"` in `optimisation-web-performance.tsx` and `creation-maintenance-sites.tsx`.

**W-9 — Two separate JSON-LD `<script>` blocks on blog posts** — The `blogPostingSchema` and `faqSchema` render as two separate `<script type="application/ld+json">` tags. Moot once `faqSchema` is removed (C-1).

### 4.4 Rich Results Eligibility

| Page | Schema | Rich Result | Eligible |
|---|---|---|---|
| Homepage | LocalBusiness | Business Profile card | Yes |
| Homepage | WebSite | Sitelinks Searchbox | No — missing SearchAction |
| Blog posts | BlogPosting | Top Stories / Article | Yes |
| Blog posts | FAQPage | FAQ accordion | **No** — restricted since Aug 2023 |
| Service pages | BreadcrumbList | Breadcrumbs in SERP | Yes (fix last-item issue) |
| Service pages | Offer | Price display | Partial |

### 4.5 Schema Opportunities

**High impact:**
- Add `SearchAction` to `WebSite` node → enables Sitelinks Searchbox for branded queries
- Add `AggregateRating` to `LocalBusiness` when real reviews exist → star ratings in local search
- Add `Offer` nodes for 3 maintenance pricing tiers on `creation-maintenance-sites`

**Medium impact:**
- Add `url` to the 4 Service nodes on homepage (point to canonical `/services/...` pages)
- Unify `Person.image` across all schema to a single canonical author photo

---

## 5. Performance (Core Web Vitals)

### 5.1 LCP — Risk: LOW (one fix needed)

LCP element: `<img src="/images/me.avif">` in `hero.tsx`. Correctly `loading="eager"` and `fetchPriority="high"`. AVIF format. Explicit dimensions.

**ISSUE (High) — Hero image not preloaded.** Despite being the LCP element, `me.avif` has no `<link rel="preload">` in `root.tsx`. The two existing preloads cover only Urbanist fonts. Adding a preload for the hero image allows the browser to discover it during HTML parse rather than after CSS download.

### 5.2 CLS — Risk: MEDIUM

**Source 1 — Image dimension inconsistency.** `hero.tsx` declares 1152×1152, `about.tsx` declares 800×800, but schema reports 2662×3201 (portrait). Incorrect aspect-ratio reservation causes CLS when the image loads. Verify actual file dimensions and set consistent `width`/`height` on both components.

**Source 2 — Italic fonts not preloaded.** Italic font files will FOUT on blog pages with `<em>` or blockquote content.

### 5.3 INP — Risk: LOW

No third-party scripts. No analytics. SSR. MDX compilation server-side only. Excellent baseline.

### 5.4 CSS Bundle — Risk: HIGH

**ISSUE (High) — DaisyUI `themes: all` in `app.css`.** All DaisyUI themes generate a large render-blocking CSS bundle. Only `light` and `dark` are used. Change to `themes: [light, dark]` — single line, eliminates ~80–90% of DaisyUI's CSS output.

### 5.5 Font Loading

**Positives:** Self-hosted, `font-display: swap`, 1-year cache, 2 normal-weight files preloaded.

**ISSUE (Medium) — Italic font files not preloaded.** Add preload hints for `L0x4DF02iFML4hGCyMqgXSFsjkK3.woff2` and `L0x4DF02iFML4hGCyMqgXS9sjg.woff2` for blog pages.

**ISSUE (Medium) — No `unicode-range` on `@font-face`.** Two files per weight axis (latin-ext + latin subsets). Without `unicode-range`, both download on every page. Add subset-specific `unicode-range` values to prevent double-download.

### 5.6 Server-Side Performance

**ISSUE (Medium) — No caching for `getAllPosts()` / `getPost()`.** MDX is re-compiled on every request. Add module-level `Map` cache with mtime-based invalidation in `content.server.ts`.

### 5.7 Third-Party Scripts

**None detected.** No analytics, tracking pixels, or external embeds. Excellent for both INP and Loi 25 compliance.

---

## 6. Images

### 6.1 Image Inventory

| File | Format | Component | Dims Declared | fetchPriority | Alt | Issues |
|---|---|---|---|---|---|---|
| `me.avif` | AVIF | `hero.tsx` | 1152×1152 | high | Yes | Dims likely wrong (portrait file) |
| `me.avif` | AVIF | `about.tsx` | 800×800 | missing | Yes | Missing fetchpriority, inconsistent dims |
| `pb-og-image.avif` | AVIF | OG meta only | 1200×630 in meta | n/a | In meta | AVIF breaks LinkedIn/WhatsApp previews |

**No `loading="lazy"` used anywhere** — appropriate since only above-the-fold images exist currently.

**ISSUE (Latent) — MDX blog images** — Inline images in MDX content render as plain `<img>` tags with no `loading="lazy"`, no explicit dimensions, no format optimization. As the blog grows this becomes a CLS and performance risk. Consider post-processing the rendered HTML to add `loading="lazy"` to images not in the first viewport.

---

## 7. AI Search Readiness

**AI Search Score: 72 / 100**

### 7.1 AI Crawler Access — PASS

`robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot. `llms.txt` present at root with structured service + blog URL list.

### 7.2 Citation Readiness Strengths

- Statistics attributed to primary sources with live links
- FAQ sections in all articles (ideal Q&A structure for AI extraction)
- Precise threshold values (LCP ≤ 2.5s, INP ≤ 200ms, fines up to 25M$)
- Consistent numbered/structured lists across articles

### 7.3 Citation Readiness Gaps

**ISSUE (Medium) — `llms.txt` is out of date.** References `eco-conception-web` (not in current blog) and may be missing some of the 10 live articles. Sync with actual published content.

**ISSUE (Medium) — No "key takeaways" summary sections.** Adding 3–5 bullet summaries at the end of articles significantly increases AI overview citability.

**ISSUE (Low) — Anonymous case studies reduce quotability.** "Un client e-commerce québécois" cannot be cited by an AI overview. Where client names cannot be disclosed, add industry + city + year for minimum identifiability.

---

## 8. Page-Level Summary

| Page | Issues | Est. Score |
|---|---|---|
| / (Homepage) | OG AVIF, logo not square, hero not preloaded | 79/100 |
| /blog | Blog→services links missing | 77/100 |
| /blog/[slug] | FAQPage dead schema, wordCount wrong, BreadcrumbList last item | 70/100 |
| /services | Good; blog doesn't link here | 78/100 |
| /services/[slug] | og:type "article" bug (2 pages), BreadcrumbList last item | 74/100 |
| /about | Duplicate schema nodes, missing fetchpriority, logo image | 72/100 |
| /projects | Hidden content (challenge/solution), no individual pages | 65/100 |
| /contact | Missing twitter:card, BreadcrumbList last item | 75/100 |
| Legal pages | Noindex verification needed, NEQ placeholder | 68/100 |
