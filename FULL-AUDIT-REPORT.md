# Full SEO Audit Report — pierrebarbe.ca

**Date:** 2026-03-13
**Stack:** React Router v7 + SSR | Tailwind CSS v4 + DaisyUI v5 | Vercel | TypeScript
**Business type:** Freelance web developer (Quebec/Montreal) — local service, French Canadian market

---

## Overall SEO Health Score: 72 / 100

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 78 | Solid SSR foundation, several fixable header/meta issues |
| Content Quality | 25% | 74 | Blog excellent, service pages thin, Projects page critical |
| On-Page SEO | 20% | 62 | Systematic title/meta overLength, H1 misalignment |
| Schema / Structured Data | 10% | 72 | Comprehensive but @id conflicts and missing required fields |
| Performance (CWV) | 10% | 70 | Missing fetchpriority, ThemeToggle CLS, no MDX caching |
| Images | 5% | 65 | No srcSet, AVIF-only OG, wrong height tag on projects |
| AI Search Readiness | 5% | 80 | Blog strong (avg 85.5/100), service pages weak (55/100) |
| **TOTAL** | **100%** | **72** | |

---

## Top 5 Critical Issues

1. **Projects page is a near-empty placeholder** — indexed with rich meta claiming "+70 pts Lighthouse, +162% conversion" but renders only "études de cas arrivent bientôt." (E-E-A-T score: 43/100)
2. **ThemeToggle causes CLS on every dark-mode page load** — hydration mismatch triggers icon swap after mount
3. **Hero image missing `fetchPriority="high"` and `<link rel="preload">`** — LCP is not browser-prioritized
4. **8 of 11 title tags exceed 60 chars; all service page meta descriptions exceed 160 chars** — systematic truncation in SERPs
5. **Duplicate Person `@id` (`#person`) between `root.tsx` and `home.tsx`** — schema graph conflict on the homepage

## Top 5 Quick Wins

1. Add `fetchPriority="high"` to hero `<img>` — 1 attribute, immediate LCP gain
2. Fix `article:published_time` to include timezone: `${post.date}T00:00:00-05:00`
3. Fix `og:image:height` on `projects.tsx` from `"333"` to `"630"`
4. Remove `X-Frame-Options: SAMEORIGIN` from `vercel.json` (conflicts with `frame-ancestors 'none'` in CSP)
5. Change `og:type: "article"` to `"website"` on all 6 service pages

---

## Technical SEO

### Critical

**CRIT-1: CSP `frame-ancestors 'none'` conflicts with `X-Frame-Options: SAMEORIGIN`**
- File: `vercel.json` lines 11-13 and 20
- Both headers are set simultaneously. Browsers prefer `frame-ancestors`; the SAMEORIGIN header is ignored but adds confusion and may interfere with certain tools.
- Fix: Remove `{ "key": "X-Frame-Options", "value": "SAMEORIGIN" }` from vercel.json

**CRIT-2: `article:published_time` is date-only (no timezone)**
- File: `app/routes/blog/blog.$slug.tsx` line 44
- `post.date` is `"2026-02-19"` — not a valid ISO 8601 datetime for OG protocol. May suppress article rich results.
- Fix: `{ property: "article:published_time", content: \`${post.date}T00:00:00-05:00\` }`

**CRIT-3: `not-found.tsx` returns HTTP 200 for all unmatched URLs (soft-404)**
- File: `app/routes/not-found.tsx`
- The catch-all `*` route renders a 404 page but returns a 200 status code. Googlebot will not treat it as a genuine 404 and may index soft-404 pages.
- Fix: Add `export function loader() { throw new Response(null, { status: 404 }); }`

### High Priority

**HIGH-1: No hreflang self-reference for fr-CA**
- File: `app/root.tsx`
- Site is entirely fr-CA but declares bilingual capability in JSON-LD (`availableLanguage: ["fr-CA", "en"]`). A self-referencing hreflang is recommended.
- Fix: Add to `<head>`: `<link rel="alternate" hrefLang="fr-CA" href="https://pierrebarbe.ca/" />` and `<link rel="alternate" hrefLang="x-default" href="https://pierrebarbe.ca/" />`

**HIGH-2: `article:modified_time` OG tag absent from blog posts**
- File: `app/routes/blog/blog.$slug.tsx`
- No `article:modified_time` emitted. Articles updated on 2026-03-04 (batch #2 internal links) have no signal of freshness to social platforms.
- Fix: Add `{ property: "article:modified_time", content: \`${post.date}T00:00:00-05:00\` }`

**HIGH-3: `og:image:type` missing from blog slug and about routes**
- Files: `app/routes/blog/blog.$slug.tsx`, `app/routes/about.tsx`
- All other routes correctly declare `og:image:type: "image/avif"`. These two omit it, potentially causing broken previews on LinkedIn, Slack, WhatsApp.

**HIGH-4: No `X-Robots-Tag` HTTP header for noindex pages**
- File: `vercel.json`
- Legal pages use `<meta name="robots" content="noindex, follow">` but no HTTP-level `X-Robots-Tag`. For SSR pages, HTTP-level signal is more reliable.
- Fix: Add a vercel.json header rule for `/(politique-confidentialite|mentions-legales)` → `X-Robots-Tag: noindex, follow`

**HIGH-5: Sitemap `/blog` lastmod is hardcoded `2026-03-04` (newest post is `2026-03-28`)**
- File: `app/routes/sitemap[.]xml.tsx`
- Fix: Derive `/blog` lastmod dynamically from `posts[0].date` (most recent post)

### Medium Priority

**MED-1: `projects.tsx` `og:image:height` is `"333"` instead of `"630"`**
- File: `app/routes/projects.tsx` line 38
- Causes distorted social preview card for the projects page.

**MED-2: Service pages use `og:type: "article"`**
- Files: all 6 service route files, line 14
- Service pages are not articles. Using `og:type: "article"` causes social crawlers to look for `article:published_time` that doesn't exist.
- Fix: Remove `type: "article"` from `generateSEOMeta()` calls on service pages (default is `"website"`)

**MED-3: `og:type: "profile"` on about page missing profile sub-properties**
- File: `app/routes/about.tsx`
- The profile OG type should include `profile:first_name`, `profile:last_name`, `profile:username`.

**MED-4: Italic font variants declared in CSS but never preloaded**
- File: `app/app.css` lines 53-68 + `app/root.tsx` lines 37-38
- Two italic Urbanist woff2 files are loaded on demand but not preloaded. If italic text appears in blog prose, this causes FOUT for italic content.

**MED-5: RSS feed missing `content:encoded` namespace**
- File: `app/routes/blog/feed[.]xml.tsx`
- Feed only distributes the excerpt via `<description>`. Full article HTML in `content:encoded` improves syndication value.

**MED-6: `wordCount` in BlogPosting is approximated (`readingTime * 200`)**
- File: `app/routes/blog/blog.$slug.tsx` line 106
- Always a multiple of 200, can undercount by up to 199 words. Should be computed directly.

**MED-7: `legal-notice.tsx` contains visible placeholder**
- File: `app/routes/legal-notice.tsx` line 68
- `"Numéro d'entreprise (NEQ) : [à compléter si applicable]"` is visible in the rendered HTML.

**MED-8: `animate-on-scroll` class could affect above-fold content**
- File: `app/app.css` lines 37-39
- Elements start at `opacity: 0` — if applied above the fold, they remain hidden until hydration/IntersectionObserver fires. Verify the class is never applied to above-fold content.

### Low Priority

**LOW-1: `llms.txt` missing context for `/contact`, `/projects`, `/about`**
- File: `public/llms.txt`
- Contact page listed without description. Projects and About pages have minimal entries. AI crawlers need context per URL.

**LOW-2: No `<meta name="author">` on blog posts**
- File: `app/routes/blog/blog.$slug.tsx`
- Classic meta tag still read by some aggregators.

**LOW-3: Blog articles don't link to corresponding service pages**
- MDX blog files
- `core-web-vitals-guide-pme.mdx` → no link to `/services/audits-techniques-core-web-vitals`
- `automatiser-business-n8n-pme.mdx` → no link to `/services/automatisation-workflows`
- `securite-wordpress-guide-pme.mdx` → no link to `/services/creation-maintenance-sites`
- `optimisation-vitesse-wordpress.mdx` → no link to `/services/optimisation-web-performance`

**LOW-4: `Permissions-Policy` header missing newer directives**
- File: `vercel.json`
- Missing `payment=()`, `usb=()` from the existing policy.

**LOW-5: No `Cache-Control` for SSR HTML responses**
- File: `vercel.json`
- Blog and service HTML responses have no explicit cache headers. Vercel defaults to no-cache for SSR.

**LOW-6: `projects.tsx` BreadcrumbList not referenced from CollectionPage**
- File: `app/routes/projects.tsx`
- BreadcrumbList `@id` is defined but not referenced by the CollectionPage node via `breadcrumb: { "@id": "..." }`.

### What is Working Well

- ✅ SSR correctly enabled (`react-router.config.ts` `ssr: true`) — full server rendering
- ✅ `robots.txt` well-formed with explicit AI crawler permissions (GPTBot, ClaudeBot, PerplexityBot)
- ✅ Canonical tags on every indexable route, absolute URLs
- ✅ HSTS `max-age=63072000; includeSubDomains; preload` — maximum recommended
- ✅ `lang="fr-CA"` on `<html>`, matching `og:locale="fr_CA"` and JSON-LD `inLanguage`
- ✅ URL structure: French keyword-rich slugs, clean hierarchy, no trailing slashes
- ✅ Font preloading in `root.tsx` with `font-display: swap` and `crossOrigin="anonymous"`
- ✅ RSS feed declared in `<head>` with correct `atom:link rel="self"` self-reference
- ✅ Sitemap dynamically includes all blog posts via `getAllPosts()`
- ✅ Breadcrumbs in JSON-LD on all major routes

---

## Content Quality & E-E-A-T

### E-E-A-T Scores by Page

| Page | Score | Status |
|---|---|---|
| Blog articles (average) | 85/100 | Excellent |
| Homepage | 86/100 | Excellent |
| About | 79/100 | Good |
| Contact | 75/100 | Good |
| Services index | 76/100 | Good |
| Service pages (average) | 74/100 | Needs improvement |
| Projects page | 43/100 | Critical — placeholder |

### Critical: Projects Page Placeholder

- File: `app/routes/projects.tsx`
- The meta description advertises "+70 pts Lighthouse, +162% conversion mobile" but the page renders only "Les études de cas arrivent bientôt." This is a direct trustworthiness failure.
- Fix: Either populate with real project data, or add `noindex` to page meta immediately.

### Title Tag Issues (8/11 Over 60 Chars)

| Page | Current Length | Issue |
|---|---|---|
| Services index | 68 chars | 8 over |
| optimisation-web-performance | 73 chars | 13 over |
| creation-maintenance-sites | 78 chars | 18 over |
| automatisation-workflows | 72 chars | 12 over |
| audits-techniques | 71 chars | 11 over |
| gestion-serveur | 76 chars | 16 over |
| integration-ia | 70 chars | 10 over |
| Projects | 72 chars | 12 over |

Pattern: service pages append `| Montréal | Pierre Barbé` (22 chars) to every title. Drop the brand suffix (Google appends it) and merge `| Montréal` into the keyword phrase.

### Meta Description Issues (All service pages over 160 chars)

All 6 service pages + Projects page exceed 160 characters. The `generateSEOMeta()` utility applies no length validation. Google will rewrite descriptions, losing the CTA.

### H1 / Title Misalignment

- Homepage H1: "Ton site devrait travailler pour toi" — keyword "développeur web freelance Montréal" absent
- About H1: "Bonjour, je suis Pierre Barbé" — keyword absent
- Contact H1: "Parlons de ton projet" — no location keyword
- Service pages: H1 contains primary keyword correctly (best on site)

### Thin Content Pages

| Page | Est. Words | Minimum | Status |
|---|---|---|---|
| Projects | ~80 | 500 | Critical fail |
| Contact | ~250 | 300 | Fail |
| Services index | ~300 | 800 | Fail |
| gestion-serveur | ~350 | 800 | Fail |
| integration-ia | ~380 | 800 | Fail |
| audits-techniques | ~400 | 800 | Fail |
| automatisation | ~500 | 800 | Fail |
| creation-sites | ~550 | 800 | Fail |
| optimisation-perf | ~600 | 800 | Borderline |

### Future-Dated Articles (3 Articles Indexable Before Publication Date)

- `securite-wordpress-guide-pme.mdx` — dated 2026-03-14 (+1 day)
- `maintenance-site-web-pme-guide.mdx` — dated 2026-03-21 (+8 days)
- `cout-site-web-quebec-prix.mdx` — dated 2026-03-28 (+15 days)

If these articles are currently crawlable, the future `datePublished` in JSON-LD creates a trustworthiness signal inconsistency. Verify that `getAllPosts()` gates future-dated articles or update dates to today.

### Blog Quality — Strengths

All 10 articles demonstrate genuine E-E-A-T:
- First-person client examples ("un contrat de 8 000 $ grâce à la relance à J+7")
- External source citations (Google, Shopify, BDC, Salesforce, Forrester)
- Quebec-specific context: Loi 25, CAI, ESSOR subsidies, Quebec-developed tools
- FAQ blocks in all frontmatter (not rendered as JSON-LD — see Schema section)
- Average AI citation readiness: **85.5/100**

Best article: `audit-performance-site-web.mdx` — real before/after case study (+38 Lighthouse, 6s→2.5s)
Highest citation value: `cout-site-web-quebec-prix.mdx` — price tables, government subsidy details

### Internal Linking Gaps

- Service pages never link to blog articles (high priority)
- `/about` and `/projects` receive no links from service pages or blog articles
- Homepage links to no individual blog posts (only blog index via navbar)

### Local SEO Assessment

**Strengths:** "Montréal" in all title tags, "PME québécoises" recurring phrase, Loi 25 coverage, LocalBusiness schema with GPS coordinates, Quebec-specific subsidy references.

**Missing:** Google Business Profile not referenced anywhere. This is the highest-impact local SEO action not yet implemented.

---

## Schema & Structured Data

### Issues Found

**P1 — Duplicate `Person` `@id` on home page**
- `root.tsx` defines `@id: "https://pierrebarbe.ca/#person"` globally
- `home.tsx` also defines a Person with the same `@id` (richer version)
- On the homepage, two JSON-LD scripts with the same `@id` are injected simultaneously
- Fix: Remove the Person node from `root.tsx`. `root.tsx` should only contain WebSite schema.

**P1 — Organization logo is a banner image (1200×630)**
- File: `app/routes/home.tsx`
- Google requires Organization logo to be square or near-square (min 112×112px)
- A 1200×630 banner will fail Google's Rich Results Test for logo validation
- Fix: Create a square logo PNG/WebP (512×512px recommended), update `logo.url`, `logo.width`, `logo.height`

**P1 — `geo` coordinates are strings, not numbers**
- File: `app/routes/home.tsx`
- `"latitude": "45.5017"` should be `"latitude": 45.5017` (numeric)
- String values fail strict schema validators

**P1 — WebSite schema missing `SearchAction`**
- File: `app/root.tsx`
- No `potentialAction` with `SearchAction` — misses Sitelinks Search Box eligibility
- Note: Only add if the blog search endpoint is functional

**P2 — BlogPosting stubs in `blog._index.tsx` missing `description`**
- File: `app/routes/blog/blog._index.tsx`
- `description` is a required field for BlogPosting rich results
- Fix: Map `p.excerpt` to `description` in the `blogPost` array

**P2 — Service stubs in `home.tsx` missing `url`**
- File: `app/routes/home.tsx`
- Home page Service nodes link only to `/contact` via `serviceUrl` but not to the canonical service page
- Fix: Add `"url": "https://pierrebarbe.ca/services/[slug]"` to each Service node

**P2 — `ProfilePage` in `about.tsx` missing `dateModified`**
- File: `app/routes/about.tsx`

**P3 — `about.tsx` BreadcrumbList last item includes `item` property**
- Should omit `item` on last element per Google's spec (inconsistent with `generateBreadcrumbSchema` utility)

**P3 — `offers.validFrom` in service pages is dynamic (changes daily)**
- File: `app/utils/seo.ts`
- `new Date().toISOString().split('T')[0]` generates a new date every server render
- Fix: Use a static date `"2025-01-01"`

**Note — FAQPage and HowTo schema correctly absent**
- FAQPage restricted to government/health sites since Aug 2023
- HowTo removed from rich results since Sept 2023
- MDX frontmatter FAQ data is correctly used for content only

### Rich Result Eligibility

| Type | Currently Eligible | After Fixes |
|---|---|---|
| Sitelinks Search Box | No | Yes (add SearchAction) |
| Organization Knowledge Panel | Partial (logo dimensions wrong) | Yes |
| LocalBusiness | Yes | Yes |
| BreadcrumbList (all pages) | Yes | Yes |
| BlogPosting (individual) | Yes | Yes |
| Blog (index) | Partial (missing description) | Yes |
| Service | Yes | Yes |
| Person / ProfilePage | Yes | Yes |

---

## Performance & Core Web Vitals

### LCP (Largest Contentful Paint)

**CRITICAL — Hero image missing `fetchPriority="high"`**
- File: `app/components/hero.tsx` line 89
- Fix: Add `fetchPriority="high"` attribute to the `<img>` tag
- Expected impact: -200–400ms LCP

**HIGH — No `<link rel="preload">` for hero image**
- File: `app/root.tsx`
- Fonts are preloaded but the LCP image is not
- Fix: Add `<link rel="preload" as="image" href="/images/me.avif" type="image/avif" fetchPriority="high" />`
- Expected impact: -300–600ms LCP

**HIGH — Hero image is 220KB with no responsive variants**
- File: `public/images/me.avif` + `app/components/hero.tsx`
- A 1152×1152px image is served to 375px-wide phones (4-5× oversized)
- Fix: Generate `me-480.avif`, `me-768.avif` variants and add `srcSet` + `sizes` attributes

**HIGH — Image cache TTL is 1 day (too short)**
- File: `vercel.json`
- `/images/` has `max-age=86400`. Repeat visitors re-validate the hero image daily.
- Fix: `max-age=2592000` (30 days) + `stale-while-revalidate=604800`

### CLS (Cumulative Layout Shift)

**CRITICAL — ThemeToggle causes post-hydration icon swap for dark-mode users**
- File: `app/components/theme-toggle.tsx`
- Component renders `theme="light"` on server, then `useEffect` updates to `"dark"` after mount → visual icon change is recorded as CLS
- Fix: Use a lazy `useState` initializer reading `document.documentElement.getAttribute('data-theme')` (safe because anti-FOUC script runs synchronously before React mounts)

**MEDIUM — Hero image aspect ratio slot may not match rendered height**
- File: `app/components/hero.tsx`
- `width={1152} height={1152}` declares 1:1 ratio but `max-h-[580px] w-full` on a 50% column means reserved space may not match rendered height
- Fix: Add explicit `aspect-[4/5]` wrapper div

### TTFB (Time to First Byte)

**HIGH — MDX compilation not cached in `content.server.ts`**
- File: `app/lib/content.server.ts`
- `evaluate()` from `@mdx-js/mdx` compiles every blog post on every request (50-200ms CPU)
- Fix: Add in-process Map cache keyed by slug + file mtime

**MEDIUM — No CDN cache for `/blog/` and `/services/` HTML responses**
- File: `vercel.json`
- Fix: Add `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` for these paths

### Bundle Optimization

**HIGH — No Vite `manualChunks` configuration**
- File: `vite.config.ts`
- Upgrading any single library busts the entire vendor chunk
- Fix: Split into `vendor-react`, `vendor-forms`, `vendor-ui` chunks

**MEDIUM — DaisyUI `themes: all` compiles 35 themes**
- File: `app/app.css` line 3
- Adds ~15–25KB to CSS bundle with `[data-theme]` selectors that cannot be eliminated
- Fix: `themes: light, dark`

---

## Sitemap

### Issues

| Check | Status |
|---|---|
| All 10 blog posts included | ✅ Pass |
| robots.txt points to sitemap | ✅ Pass |
| `/blog/feed.xml` excluded | ✅ Pass |
| `/politique-confidentialite` included | ❌ Missing |
| `/mentions-legales` included | ❌ Missing |
| `/blog` lastmod accurate | ❌ Hardcoded 2026-03-04 (newest post: 2026-03-28) |
| `priority` and `changefreq` tags | ❌ Present (Google ignores both — pure noise) |
| Image sitemap | ❌ No `image:` field in MDX frontmatter |
| Hreflang entries | ❌ Absent (minor for single-language site) |

### Recommended Sitemap Rewrite

Remove `priority`/`changefreq`, add legal pages, fix `/blog` lastmod to be dynamic:

```tsx
// app/routes/sitemap[.]xml.tsx
const blogLastmod = posts[0]?.date ?? "2026-03-04"; // dynamic from most recent post

const blogIndex = `<url>
  <loc>${BASE_URL}/blog</loc>
  <lastmod>${blogLastmod}</lastmod>
</url>`;
```

---

## Visual & Mobile

### Issues

| Check | Status | Severity |
|---|---|---|
| Viewport meta | ✅ Pass | — |
| Responsive breakpoints (Tailwind sm/md/lg) | ✅ Pass | — |
| Touch targets (DaisyUI btn) | ⚠️ `btn-sm` in mobile menu = ~36px | Low |
| Base font size ≥ 16px | ✅ Pass | — |
| Image srcSet / responsive | ❌ Missing | Medium |
| `fetchPriority="high"` on LCP image | ❌ Missing | High |
| Favicon completeness | ✅ Pass | — |
| Webmanifest icon `purpose: "any"` | ❌ `maskable`-only | Low |
| Above-fold CTA on mobile | ✅ Pass | — |
| OG image JPEG fallback | ❌ AVIF-only | Medium |
| Twitter Cards on contact page | ❌ Missing | Low |
| Dark mode anti-FOUC | ✅ Pass | — |
| Skip-to-content | ✅ Pass | — |
| Form `aria-invalid`, `aria-describedby`, `role="alert"` | ❌ Missing | Medium |
| Blog content `div` `aria-label` | ❌ Semantically ineffective | Low |
| Image dimensions (CLS) | ✅ Pass | — |

### OG Image Platform Compatibility

The OG image (`pb-og-image.avif`) has inconsistent support across crawlers:
- Facebook scraper: may fail to render AVIF
- WhatsApp: partial AVIF support
- LinkedIn: AVIF support since late 2024 but edge cases exist
- Twitter/X: known issues with AVIF OG images

Fix: Generate `pb-og-image.jpg` (or WebP) and use it as the primary `og:image`. Keep AVIF for on-page images.

### Accessibility

**Form accessibility gaps (contact-form.tsx):**
- Inputs have no `id` attribute and labels have no `htmlFor`
- Error messages have no `role="alert"` or `aria-describedby`
- Fix: Add `id`, `aria-invalid`, `aria-describedby` to each input; add `role="alert"` to error messages

**Blog post content `div`:**
- `app/routes/blog/blog.$slug.tsx` line 200: `aria-label` on a `div` without `role` has no semantic effect
- Fix: Remove the `aria-label` (content is inside `<article>` which provides context)

---

## AI Search Readiness

| Asset | Score | Notes |
|---|---|---|
| Blog articles (avg) | 85.5/100 | FAQ blocks, sourced stats, first-person examples |
| Service pages (avg) | 55/100 | No FAQ schema, no sourced statistics |
| Homepage | 62/100 | FAQ component not visible in route source |
| `llms.txt` | 70/100 | Present but incomplete descriptions |
| AI crawler access (robots.txt) | 95/100 | GPTBot, ClaudeBot, PerplexityBot explicitly allowed |

**Key gap:** Service pages have zero FAQ-eligible content and no sourced statistics. Blog FAQ frontmatter data exists for all 10 articles but no `FAQPage` JSON-LD is emitted (correctly — FAQPage is restricted to gov/health sites post-Aug 2023).

**Recommended:** Add question-answer content blocks to service pages for AI Overview eligibility.
