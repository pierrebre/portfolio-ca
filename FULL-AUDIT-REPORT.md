# Full SEO Audit Report — pierrebarbe.ca

**Date:** 2026-04-06
**Business type:** Freelance Web Developer (Local Service / SAB)
**Location:** Montreal, Quebec, Canada
**Stack:** React Router v7 + SSR / Vercel / Tailwind CSS v4 + DaisyUI v5
**Pages audited:** 26 (homepage, about, contact, 6 services, 13 blog posts, 1 project, 2 legal)

---

## Executive Summary

### Overall SEO Health Score: 74 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78/100 | 17.2 |
| Content Quality | 23% | 76/100 | 17.5 |
| On-Page SEO | 20% | 82/100 | 16.4 |
| Schema / Structured Data | 10% | 72/100 | 7.2 |
| Performance (CWV) | 10% | 70/100 | 7.0 |
| AI Search Readiness | 10% | 71/100 | 7.1 |
| Images | 5% | 45/100 | 2.3 |
| **Total** | **100%** | | **74.7** |

### Top 5 Critical Issues

1. **Duplicate BreadcrumbList JSON-LD on all inner pages** — breadcrumbs.tsx emits a standalone block conflicting with route-level `@graph` (Schema)
2. **Inconsistent og:image format (AVIF vs JPEG)** — blog posts use AVIF unsupported by LinkedIn/Slack scrapers (Indexability)
3. **Hero image preloaded on every page** — wastes bandwidth on pages that don't use it (Performance)
4. **No blog post images** — zero inline visuals in any of the 13 articles (Images/Content)
5. **OAI-SearchBot not declared in robots.txt** — ChatGPT live web search may not index the site (GEO)

### Top 5 Quick Wins

1. Add `OAI-SearchBot` to robots.txt (2 minutes)
2. Remove duplicate JSON-LD `<script>` from breadcrumbs.tsx (5 minutes)
3. Standardize all og:image to JPEG format (15 minutes)
4. Add `/politique-confidentialite` and `/mentions-legales` to sitemap (5 minutes)
5. Move hero image preload from root.tsx to home.tsx + about.tsx only (15 minutes)

---

## 1. Technical SEO — 78/100 (Weight: 22%)

### 1.1 Crawlability — 18/20

**Pass:**
- robots.txt correctly formed with AI crawler stanzas (GPTBot, ClaudeBot, PerplexityBot)
- Sitemap at /sitemap.xml with 26 URLs, all with `<lastmod>` dates
- RSS feed at /blog/feed.xml returns 200 with all 13 blog posts
- llms.txt present and functional
- Strong internal linking: navbar, footer, breadcrumbs on all inner pages
- Legal pages (`noindex, follow`) correctly excluded from sitemap

**Issues:**
- **Medium:** Static `<lastmod>` dates on service pages (all hardcoded `2026-02-20`) — stale dates erode crawl budget trust
- **Low:** `<changefreq>yearly` on `/contact` with `<priority>0.8` — misaligned signals

### 1.2 Indexability — 16/20

**Pass:**
- Self-referencing canonical tags on every page
- `meta robots: index, follow, max-image-preview:large, max-snippet:-1` on all indexable pages
- Legal pages use `noindex, follow` — correct
- www → non-www 301 redirect working
- Trailing slash → no-slash 308 redirect working
- HTTP → HTTPS 308 redirect working

**Issues:**
- **High:** og:image inconsistency — homepage/services use `pb-og-image.jpg`, blog posts use `pb-og-image.avif`. AVIF not supported by LinkedIn, Slack, older WhatsApp
- **Medium:** Duplicate BreadcrumbList JSON-LD per page (2-3 blocks on some pages)

### 1.3 Security — 14/15

All critical headers present:
- HSTS: `max-age=63072000; includeSubDomains; preload`
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- CSP: Functional (self + unsafe-inline for scripts/styles)
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

**Issue:**
- **Low:** CSP uses `unsafe-inline` for script-src and style-src — standard React SSR trade-off, not critical

### 1.4 URL Structure — 9/10

- Clean, lowercase, hyphenated, semantically meaningful URLs
- Consistent patterns across all route types
- Single-hop redirects (no chains)

**Issue:**
- **Low:** `/projects` uses English while all other routes are French (`/projets` would be more consistent)

### 1.5 Mobile — 9/10

- Viewport meta tag present on all pages
- Responsive navbar with hamburger at mobile breakpoints
- Touch targets meet 44x44px minimum
- Web app manifest linked

**Issue:**
- **Low:** `aria-expanded` on mobile nav is static in SSR HTML until hydration

### 1.6 JavaScript Rendering — 5/5

- Full SSR confirmed (`ssr: true`, `isSpaMode: false`)
- Complete HTML content delivered without JavaScript execution
- Route modules loaded via `<link rel="modulepreload">`
- Streaming hydration pattern active

### 1.7 IndexNow — 0/5

- No IndexNow key file found
- No IndexNow declaration in robots.txt
- Missing opportunity for instant Bing/Yandex indexing on publish

---

## 2. Content Quality — 76/100 (Weight: 23%)

### 2.1 E-E-A-T Assessment

| Signal | Score | Notes |
|---|---|---|
| Experience | 7/10 | 50+ projects, 3+ years, +38 Lighthouse points claimed — but lacks client names/case studies |
| Expertise | 8/10 | Comprehensive tech stack documented, deep subject matter in blog posts |
| Authoritativeness | 5/10 | No testimonials, no third-party mentions, no awards, no GBP |
| Trustworthiness | 8/10 | Transparent pricing, clear contact info, legal pages, NAP consistency |

### 2.2 Content Depth by Page Type

**Homepage (~2,000 words):** Substantial. Hero + problem statement + services + results + differentiators + process + 8-question FAQ. Well-structured for conversion.

**About page (~1,200 words):** Solid experience timeline, quantified metrics, clear tech stack. Gap: zero client testimonials or third-party validation.

**Blog posts (avg ~2,100 words):** High quality. Specific CAD pricing, Quebec-specific context (Loi 25, local programs), practical advice. Strong FAQ sections with schema markup. Internal linking averages 14 links per article.

**Service pages (~600-700 words):** Adequate for conversion pages. Clear pricing, strong CTAs, good USPs ("3x plus rapide", "pas de contrat annuel"). Could benefit from more technical depth.

**Project case study:** Only 1 project page exists (/projects/piscines-jolicoeur). Thin portfolio section for a 50+ project claim.

### 2.3 Content Issues

- **High:** Blog posts cite statistics (Salesforce, Google, Deloitte) without inline source attribution or hyperlinks — reduces credibility for AI citation
- **Medium:** Only 1 project case study vs. 50+ projects claimed — significant credibility gap
- **Medium:** No images in any blog post — hurts engagement and multimodal signals
- **Low:** About page relies on self-attestation with no social proof

### 2.4 Internal Linking & Topical Clusters

Strong internal linking structure with 4 identifiable clusters:
1. **Web Performance:** CWV guide ↔ audit performance ↔ WordPress speed ↔ slow site costs
2. **WordPress:** WordPress 2026 ↔ security guide ↔ maintenance guide ↔ speed optimization
3. **Automation:** n8n PME guide ↔ n8n vs Zapier vs Make
4. **Business:** Site costs Quebec ↔ developer selection ↔ Loi 25 compliance

Gap: No explicit "pillar page" structure — blog posts link to each other but lack a central hub page per cluster.

---

## 3. On-Page SEO — 82/100 (Weight: 20%)

### 3.1 Title Tags

All pages have unique, keyword-rich title tags with location targeting where appropriate:
- Homepage: "Developpeur web freelance Montreal — Pierre Barbe" (52 chars)
- Blog posts: Descriptive with year markers (e.g., "...en 2026")
- Service pages: Service name + location + brand

**Issue:** None critical. Title tags are well-optimized.

### 3.2 Meta Descriptions

All pages have unique meta descriptions under 160 characters with clear value propositions and CTAs ("Audit gratuit de 30 min").

### 3.3 Heading Structure

- Single H1 per page on all pages checked
- Logical H2/H3 hierarchy on blog posts and service pages
- Several H2s phrased as questions (good for featured snippets)

**Issue:**
- **Low:** Homepage H1 is a category label ("Developpeur web freelance a Montreal") rather than a named-entity claim. Consider "Pierre Barbe — Developpeur web freelance a Montreal" for entity disambiguation.

### 3.4 Open Graph & Twitter Cards

Complete implementation on all pages:
- og:title, og:description, og:url, og:image (with dimensions), og:type, og:locale
- twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image

**Issue:**
- **High:** og:image format inconsistency (AVIF vs JPEG) as noted above

### 3.5 Canonical URLs

Self-referencing canonicals on every indexable page using absolute URLs. No issues found.

---

## 4. Schema / Structured Data — 72/100 (Weight: 10%)

### 4.1 Implemented Types

| Type | Pages | Status |
|---|---|---|
| Person | Homepage | Pass — complete with sameAs, knowsAbout, address |
| LocalBusiness + ProfessionalService | Homepage | Pass — address, geo, areaServed, openingHours |
| Organization | Homepage | Pass — logo, contactPoint |
| WebSite | Homepage | Pass — inLanguage, publisher |
| WebPage / HomePage | Homepage | Pass |
| Service (x4) | Homepage | Pass — provider, serviceType, areaServed |
| FAQPage | Homepage + blog posts | Pass — well-structured Q&A |
| BlogPosting | All blog posts | Pass — headline, dates, author, publisher, wordCount |
| BreadcrumbList | All inner pages | Fail — duplicated |
| ProfilePage | About | Pass |
| ContactPage | Contact | Pass |
| CollectionPage | Projects index | Pass |

### 4.2 Issues

- **High:** Duplicate BreadcrumbList on every inner page — `breadcrumbs.tsx` emits standalone JSON-LD while route `@graph` already includes it. Fix: remove lines 14-35 from `app/components/breadcrumbs.tsx`
- **Medium:** `Person.knowsAbout` lists "Next.js" but the site uses React Router v7 — update to reflect actual stack
- **Medium:** BlogPosting missing `keywords` property — should source from MDX frontmatter
- **Medium:** Project pages use generic `WebPage` — should use `CreativeWork` as mainEntity
- **Low:** FAQPage blocks are disconnected from the page graph (no `@id` or `isPartOf`)
- **Low:** BlogPosting missing direct `url` property
- **Low:** All blog posts share the same generic `image` (pb-og-image) — no article-specific images

### 4.3 Missing Opportunities

- `SearchAction` on WebSite (Sitelinks Searchbox) — only if blog search is implemented
- `Offer` with pricing on service pages (maintenance "a partir de 150$/mois")
- `dateModified` on project WebPage nodes

---

## 5. Performance (CWV) — 70/100 (Weight: 10%)

*Note: PageSpeed Insights API was rate-limited during this audit. Scores are lab estimates based on source code analysis.*

### 5.1 LCP — Estimated: Good (< 2.5s)

**Positive:**
- Hero image optimized: me-800.avif = 10 KiB (down from 220 KiB)
- Preloaded with correct `as="image"` and `type="image/avif"`
- SSR delivers complete HTML — no JS blocking before first paint
- Font preloading (4 Urbanist WOFF2 files)

**Issue:**
- **High:** Hero image `<link rel="preload">` is in root.tsx, loading on ALL pages (even /contact, /blog posts) — wasted bandwidth + Lighthouse "preloaded but not used" warning

### 5.2 INP — Estimated: Good (< 200ms)

- SSR + hydration pattern minimizes input delay
- DaisyUI CSS-driven interactions avoid JS overhead
- No heavy third-party scripts detected
- Route-level code splitting via modulepreload

### 5.3 CLS — Estimated: Needs Improvement

**Risks:**
- **Medium:** No `size-adjust` / `ascent-override` / `descent-override` on Urbanist @font-face — FOUT can cause layout shift
- **Low:** Sticky navbar height could shift during font swap
- **Low:** `animate-on-scroll` on project cards may use layout-affecting properties

### 5.4 TTFB — Estimated: Moderate

- All pages return `x-vercel-cache: MISS` — every request hits serverless function
- No edge caching configured for static-content routes

**Recommendation:** Add `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` for homepage, blog, services, about routes

### 5.5 Resource Optimization

- CSS: 3.8 KB (app.css) — excellent
- Images: All in AVIF format, hero at 10 KiB — excellent
- Fonts: 4 WOFF2 files preloaded — good
- JS: Route-split ES modules — good
- No third-party scripts detected

---

## 6. AI Search Readiness — 71/100 (Weight: 10%)

### 6.1 AI Crawler Access — 83/100

| Crawler | Status |
|---|---|
| GPTBot | Allowed |
| ClaudeBot | Allowed |
| PerplexityBot | Allowed |
| OAI-SearchBot | **Not declared** |
| Googlebot | Allowed (wildcard) |

**Issue:** OAI-SearchBot (ChatGPT live web search) is missing — distinct from GPTBot (training).

### 6.2 llms.txt — Present but Minimal

- File exists and lists all pages
- Missing: RSL 1.0 license declaration, Description block, Contact field, full canonical titles

### 6.3 Passage-Level Citability — 68/100

**Strengths:**
- Articles open with direct answers in first 40-60 words
- FAQ sections with schema markup (highest GEO signal)
- ~2,100 word average — AI citation sweet spot

**Gaps:**
- Statistics lack inline source attribution (footnote-style instead of "According to...")
- No definition blocks or answer boxes
- Paragraphs average 60-100 words (optimal is 134-167 for verbatim citation)

### 6.4 Platform-Specific Readiness

| Platform | Score | Bottleneck |
|---|---|---|
| Google AI Overviews | 74/100 | No GBP / Knowledge Panel |
| ChatGPT Web Search | 62/100 | OAI-SearchBot not declared |
| Perplexity | 76/100 | Limited external citations |
| Bing Copilot | 70/100 | No IndexNow, no GBP |

### 6.5 Missing Signals

- No Google Business Profile
- No YouTube channel (strongest correlation with AI citations)
- No Reddit presence
- No external backlinks observable
- RSS feed contains only snippets, not full content

---

## 7. Images — 45/100 (Weight: 5%)

### 7.1 Image Inventory

| Image | Size | Format | Alt Text | Used On |
|---|---|---|---|---|
| me-800.avif | 10 KiB | AVIF | Yes (descriptive) | Homepage, About |
| me.avif | 220 KiB | AVIF | — | JSON-LD only |
| pb-og-image.jpg | 314 KiB | JPEG | — | OG image (some pages) |
| pb-og-image.avif | 64 KiB | AVIF | — | OG image (other pages) |
| pierre-barbe-logo.png | 70 KiB | PNG | — | JSON-LD only |

### 7.2 Issues

- **High:** Zero images in any of 13 blog posts — major content quality gap for articles covering visual topics (CWV, performance, WordPress)
- **High:** OG image format inconsistency (AVIF vs JPEG across pages)
- **Medium:** `pb-og-image.jpg` at 314 KiB could be optimized (compress to ~100 KiB)
- **Medium:** `pierre-barbe-logo.png` at 70 KiB — convert to SVG or WebP
- **Medium:** All blog posts share the same generic OG image — no article-specific images for Google Discover eligibility
- **Low:** `me.avif` (220 KiB) is unused in HTML — only in JSON-LD `Person.image`. The optimized `me-800.avif` (10 KiB) is used in HTML.

---

## 8. Sitemap — 75/100

### 8.1 Findings

- Valid XML format with correct namespace
- 26 URLs with lastmod dates
- Referenced in robots.txt
- RSS feed consistent with sitemap blog URLs
- Within size limits (26 URLs << 50,000 max)

### 8.2 Issues

- **Medium:** Missing pages: `/politique-confidentialite` and `/mentions-legales` not in sitemap
- **Low:** Blog index lastmod hardcoded to `2026-03-04` — should derive from newest post date (`2026-03-28`)
- **Low:** Deprecated `<priority>` and `<changefreq>` tags present — ignored by Google
- **Info:** 3 blog posts share `2026-03-26` date — acceptable if genuinely published same day

---

## Prioritized Action Plan

### Critical — Fix Immediately (0 items)

No critical indexing blocks or penalties detected.

### High — Fix Within 1 Week (5 items)

| # | Issue | Category | Effort | Impact |
|---|---|---|---|---|
| 1 | Remove duplicate BreadcrumbList from `breadcrumbs.tsx` | Schema | 5 min | Fixes ambiguous structured data on all inner pages |
| 2 | Standardize og:image to JPEG on all pages | On-Page | 15 min | Fixes broken social previews on LinkedIn/Slack |
| 3 | Move hero image preload from root.tsx to home.tsx/about.tsx | Performance | 15 min | Eliminates wasted preload on 20+ pages |
| 4 | Add OAI-SearchBot to robots.txt | GEO | 2 min | Unblocks ChatGPT live web search indexing |
| 5 | Add inline source attribution to blog statistics | Content | 2 hrs | Significantly improves AI citability and E-E-A-T |

### Medium — Fix Within 1 Month (10 items)

| # | Issue | Category | Effort | Impact |
|---|---|---|---|---|
| 6 | Add images/charts to blog posts | Images/Content | 4-6 hrs | Major content quality and engagement boost |
| 7 | Add article-specific OG images | Images | 2-3 hrs | Google Discover eligibility, unique social previews |
| 8 | Add font metric overrides (`size-adjust`, `ascent-override`) | Performance | 1 hr | Reduces CLS from font swap |
| 9 | Add edge caching headers for static routes | Performance | 30 min | Improves TTFB via Vercel edge cache |
| 10 | Add missing pages to sitemap + dynamic blog index lastmod | Sitemap | 15 min | Complete sitemap coverage |
| 11 | Update `Person.knowsAbout` (Next.js → React Router v7) | Schema | 5 min | Accurate entity signals |
| 12 | Add `keywords` property to BlogPosting schema | Schema | 30 min | Richer structured data signals |
| 13 | Implement IndexNow for Bing/Yandex | Technical | 1 hr | Faster indexing on publish |
| 14 | Upgrade llms.txt to full specification | GEO | 30 min | Better AI content mapping |
| 15 | Add more project case studies (currently 1 vs 50+ claimed) | Content | 4-8 hrs | Closes credibility gap |

### Low — Backlog (8 items)

| # | Issue | Category | Effort |
|---|---|---|---|
| 16 | Remove deprecated `<priority>` / `<changefreq>` from sitemap | Sitemap | 10 min |
| 17 | Add `CreativeWork` schema to project pages | Schema | 30 min |
| 18 | Connect FAQPage blocks to page graph (`@id`, `isPartOf`) | Schema | 15 min |
| 19 | Consider renaming `/projects` → `/projets` for FR consistency | URL | 30 min |
| 20 | Add RSS autodiscovery tag + upgrade feed to full-content | GEO | 45 min |
| 21 | Create Google Business Profile + add to sameAs | GEO/Local | 1 hr |
| 22 | Compress `pb-og-image.jpg` (314 KiB → ~100 KiB) | Images | 10 min |
| 23 | Add `hreflang="fr-CA"` with self-referential x-default | Technical | 15 min |

---

## Key File References

| File | Relevance |
|---|---|
| `app/root.tsx` | Hero image preload (move out), RSS autodiscovery |
| `app/components/breadcrumbs.tsx` | Duplicate BreadcrumbList JSON-LD (remove lines 14-35) |
| `app/routes/home.tsx` | Person.knowsAbout update, og:image standardization |
| `app/routes/blog/blog.$slug.tsx` | BlogPosting keywords, og:image format, inline citations |
| `app/routes/sitemap[.]xml.tsx` | Missing legal pages, dynamic blog lastmod, remove deprecated tags |
| `app/app.css` | Font metric overrides for CLS |
| `public/robots.txt` | Add OAI-SearchBot |
| `public/llms.txt` | Upgrade to full specification |
| `vercel.json` | Edge caching headers for static routes |

---

*Audit performed by 7 specialized subagents: Technical SEO, Content Quality, Schema, Performance, AI Search Readiness (GEO), Sitemap, and On-Page SEO analysis.*
