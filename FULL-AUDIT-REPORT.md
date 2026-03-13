# Full SEO Audit Report — pierrebarbe.ca
**Date:** 2026-03-13
**Auditor:** Claude Code SEO Audit
**Business Type:** Freelance web developer — local service, B2B/B2C, Montreal/Quebec
**Stack:** React Router v7 SSR · Vercel · TypeScript · Tailwind CSS v4 · DaisyUI v5

---

## Executive Summary

### Overall SEO Health Score: **80 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 25% | 85/100 | 21.3 |
| Content Quality / E-E-A-T | 25% | 78/100 | 19.5 |
| On-Page SEO | 20% | 80/100 | 16.0 |
| Schema / Structured Data | 10% | 72/100 | 7.2 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| Images | 5% | 82/100 | 4.1 |
| AI Search Readiness | 5% | 75/100 | 3.75 |
| **Total** | **100%** | | **80.4** |

### Top 5 Critical Issues
1. `/projects` page is `noindex` — valuable social proof content excluded from Google index
2. `FAQPage` schema missing from FAQ section on homepage — missed rich result (expandable Q&A in SERPs)
3. Blog `faq:` frontmatter (present in `chatbot-ia-site-web-pme.mdx`) not rendered as `FAQPage` schema
4. Duplicate `WebSite` + `Person` schemas between `root.tsx` and `home.tsx` — conflicting @graph signals
5. Homepage H1 (`"Ton site devrait travailler pour toi — pas contre toi."`) contains zero primary keywords

### Top 5 Quick Wins
1. Add `FAQPage` JSON-LD to `faq.tsx` component — 1 hour, high SERP impact
2. Change `/projects` from `noindex` to `index, follow` (or remove from sitemap)
3. Remove duplicate `WebSite`/`Person` from `root.tsx` global schema (keep only in `home.tsx` @graph)
4. Add post-specific OG images to blog MDX frontmatter
5. Create `public/llms.txt` for AI crawler guidance (15 min, improves AI citation readiness)

---

## 1. Technical SEO — 85/100

### 1.1 Crawlability ✅

**robots.txt** (`/public/robots.txt`) — Correct
- `/fonts/` and `/favicon/` excluded (not indexable content) ✅
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) explicitly allowed ✅
- Sitemap URL declared ✅

**Issue (Medium):** Verify no Vercel debug routes (`/_routes.json`, `/__STATIC_CONTENT_MANIFEST`) are crawlable — add to Disallow if exposed.

### 1.2 Indexability

| Page | Canonical | robots meta | Status |
|---|---|---|---|
| / | ✅ | `index, follow` | OK |
| /about | ✅ | `index, follow` | OK |
| /services | ✅ | `index, follow` | OK |
| /services/* (6 pages) | ✅ | `index, follow` | OK |
| /blog | ✅ | `index, follow` | OK |
| /blog/:slug (10 posts) | ✅ | `index, follow` | OK |
| /contact | ✅ | `index, follow` | OK |
| **/projects** | ✅ | **`noindex, follow`** | ⚠️ CRITICAL |
| /legal-notice | Not in sitemap | (presumed noindex) | Correct |
| /privacy-policy | Not in sitemap | (presumed noindex) | Correct |

**CRITICAL — `/projects` is `noindex`** (`app/routes/projects.tsx:27`)
This page has before/after performance metrics (+70 pts Lighthouse, +162% mobile conversion) and is listed in the sitemap at priority 0.8. Google sees conflicting signals: sitemap says "important page" + HTTP says "don't index". Either index it or remove from sitemap.

### 1.3 Security Headers

| Header | Status |
|---|---|
| `Strict-Transport-Security` | ✅ `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | ✅ `nosniff` |
| `Content-Security-Policy` | ✅ with `frame-ancestors 'none'` |
| `Referrer-Policy` | ✅ `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ✅ `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options` | Not set (mitigated by CSP `frame-ancestors`) |

**Medium:** CSP uses `'unsafe-inline'` for `script-src` and `style-src`. The anti-FOUC script requires it for scripts; Tailwind requires it for styles. Future improvement: nonce-based CSP.

### 1.4 Core Web Vitals Signals

**LCP — Likely Good (< 2.5s):**
- Hero image AVIF format ✅
- `fetchPriority="high"` and `loading="eager"` on hero ✅
- Explicit `width={1152}` `height={1152}` prevents CLS ✅
- SSR renders full HTML before JS hydration ✅
- 2 normal-weight Urbanist fonts preloaded ✅

**CLS — Potential Issues:**
- `animate-on-scroll { opacity: 0 }` (app.css:37-39) — if above-fold elements use this class, they start invisible and animate in, causing layout shift for slower connections
- Italic Urbanist fonts (`L0x4DF02...woff2`) are NOT preloaded — only normal-style variants are in `<link rel="preload">`. Italic text above fold triggers FOUT.

**INP — Likely Good:**
- No heavy third-party scripts
- `DaisyUI { themes: all }` generates CSS for 35+ themes — most unused. **High priority optimization.**

### 1.5 URL Structure ✅

Clean, semantic, kebab-case French URLs. Consistent hierarchy. No query parameters on indexable pages.

### 1.6 JavaScript Rendering ✅

React Router v7 `ssr: true` — full server-side rendering. All SEO-critical content in initial HTML.

---

## 2. Content Quality / E-E-A-T — 78/100

### 2.1 E-E-A-T Assessment

**Experience (7/10):**
- Specific performance claims: 50+ projects, 3+ years, +38 Lighthouse points ✅
- Before/after metrics on `/projects` page — but page is noindex ⚠️
- No links to live client sites or verifiable external references

**Expertise (8/10):**
- Full technical stack listed on `/about` ✅
- Blog articles demonstrate hands-on expertise (tool comparisons, code examples, real costs) ✅
- Covers niche Quebec-specific topics (Loi 25, local market) ✅
- No formal certifications listed (Google PageSpeed Insights, AWS, etc.)

**Authoritativeness (6/10):**
- `sameAs`: LinkedIn, GitHub, Twitter ✅
- No external publications, media mentions, or guest posts visible
- No backlink diversity signals

**Trustworthiness (8/10):**
- Phone + email publicly displayed ✅
- Physical location (Montreal, QC) in schema ✅
- Business hours in `LocalBusiness` schema ✅
- Privacy policy + legal notice exist ✅
- No client testimonials with names/companies (only anonymous results)

### 2.2 Blog Content Quality

All 10 articles are Quebec/francophone SMB-targeted — correct audience focus. The reviewed `chatbot-ia-site-web-pme.mdx` is ~2000 words with:
- Comparison table ✅
- Real cost data ✅
- External authority citations (Salesforce, Forrester, LivePerson) ✅
- 5 structured FAQ entries in frontmatter ✅
- Strong internal linking to other articles ✅

**Issues across all blog posts:**
- `dateModified` = `datePublished` in `BlogPosting` schema — no freshness tracking
- Generic OG image for all posts — no social differentiation
- FAQ frontmatter in MDX not exposed as `FAQPage` JSON-LD
- `wordCount` = `readingTime * 200` — imprecise approximation

### 2.3 Thin Content ✅

No thin content detected. All pages have substantial, original content appropriate to their purpose.

### 2.4 AI Citation Readiness — 75/100

**Positive:**
- AI crawlers explicitly allowed in robots.txt ✅
- Clear author attribution ✅
- Quotable stats with source links ✅
- Structured headings enable passage extraction ✅

**Missing:**
- No `/llms.txt` — emerging standard that helps AI assistants understand site purpose/scope
- FAQ not in JSON-LD — AI extractors may miss Q&A content
- No `speakable` schema

---

## 3. On-Page SEO — 80/100

### 3.1 Title Tags

| Page | Title | Chars | Grade |
|---|---|---|---|
| / | "Développeur web freelance Montréal — Pierre Barbé" | 50 | ✅ |
| /about | "À propos — Pierre Barbé, développeur web freelance Montréal" | 61 | ✅ |
| /contact | "Contact et devis de site web à Montréal" | 41 | ✅ |
| /projects | "Projets — Études de cas web performance & automatisation \| Pierre Barbé" | 73 | ⚠️ Too long |
| /blog/:slug | "[title] \| Pierre Barbé" | varies | OK |

### 3.2 H1 Issues (High Priority)

| Page | H1 | Keyword Present? |
|---|---|---|
| / | "Ton site devrait travailler pour toi — pas contre toi." | ❌ No |
| /about | "Bonjour, je suis / Pierre Barbé" | ❌ No |
| /contact | "Parlons de ton projet" | ❌ No |
| /services | (check service page) | Check |
| /blog/:slug | `{post.title}` from frontmatter | ✅ Yes |

The homepage, about, and contact H1s are entirely conversational. Primary keyword "développeur web freelance Montréal" appears only in the title tag and meta description — not in the H1. Google's documentation confirms H1 is a strong on-page signal.

### 3.3 Internal Linking

**Strengths:** Blog articles cross-link heavily ✅, breadcrumbs on all pages ✅

**Issue (Medium):** Blog articles do not link to relevant service pages:
- `/blog/core-web-vitals-guide-pme` should link → `/services/audits-techniques-core-web-vitals`
- `/blog/automatiser-business-n8n-pme` should link → `/services/automatisation-workflows`
- `/blog/optimisation-vitesse-wordpress` should link → `/services/optimisation-web-performance`

---

## 4. Schema / Structured Data — 72/100

### 4.1 Implementation Map

| Page | Schemas | Rich Result Eligible |
|---|---|---|
| / | Person, LocalBusiness, ProfessionalService, Organization, WebSite, WebPage, 4× Service | ✅ Business info |
| /about | AboutPage, WebPage, ProfilePage, BreadcrumbList | ✅ Breadcrumbs |
| /services | ItemList, WebPage, BreadcrumbList | ✅ Breadcrumbs |
| /services/* | Service, WebPage, BreadcrumbList | ✅ Breadcrumbs |
| /blog/:slug | BlogPosting, BreadcrumbList | ✅ Article + Breadcrumbs |
| /contact | ContactPage, WebPage, BreadcrumbList | ✅ Breadcrumbs |
| **Homepage FAQ** | ❌ **No FAQPage** | **Missed** |

### 4.2 Validation Issues

**Critical:**
- **Duplicate `@graph` in `root.tsx` + `home.tsx`:** Both define `WebSite` (`#website`) and `Person` (`#person`). On the homepage, two separate `application/ld+json` scripts exist with overlapping @ids. Google processes both but may produce warnings or inconsistencies. Fix: remove the global schema from `root.tsx` (keep only in `home.tsx`) or ensure they never overlap.

**High:**
- **Missing `FAQPage` schema on homepage FAQ** — `faq.tsx` renders questions from `data/questions` as DaisyUI accordions without any JSON-LD. This is one of the most impactful rich result types for a service business.
- **Blog FAQ frontmatter unused** — `chatbot-ia-site-web-pme.mdx` frontmatter has 5 FAQ entries that are parsed but not rendered as `FAQPage` JSON-LD in `blog.$slug.tsx`.

**Medium:**
- **BreadcrumbList last item includes `item` property** in manually-defined schemas:
  - `about.tsx:171` — last item `{ name: "À propos", item: "https://pierrebarbe.ca/about" }`
  - `contact.tsx:28` — last item has `item`
  - `projects.tsx:84` — last item has `item`
  - `blog.$slug.tsx:115` — last item has `item: url`
  - Note: `generateBreadcrumbSchema()` utility correctly omits this — use it consistently
- **Service schemas on homepage lack `@id`** — can't be referenced within the @graph
- **`BlogPosting.wordCount`** = `post.readingTime * 200` is approximate

**Low:**
- `og:image:height` on `/projects` is `"333"` — should be `"630"` like all other pages
- No `Review`/`AggregateRating` despite results section on homepage

### 4.3 Missing Opportunities

| Schema | Location | Impact |
|---|---|---|
| `FAQPage` | `faq.tsx` | High — Q&A expansion in SERPs |
| `FAQPage` | Blog posts with FAQ frontmatter | High |
| Blog-to-service linking via `serviceOutput` | Service schemas | Medium |
| `HowTo` | Tutorial-style blog articles | Medium |
| `AggregateRating` | Homepage results section | Medium |
| `speakable` | Blog article H1/description | Low |

---

## 5. Performance — 85/100

### 5.1 Image Optimization

- AVIF format throughout ✅
- Hero `fetchPriority="high"` ✅, `loading="eager"` ✅
- Explicit dimensions on all main images ✅
- Hero image 1152×1152 served but displayed at max ~580px — oversized for mobile

### 5.2 Font Loading

- `font-display: swap` on all `@font-face` declarations ✅
- 2 normal-style fonts preloaded ✅
- **Issue:** Italic font variants NOT preloaded (italic woff2 files missing from `<link rel="preload">` in `root.tsx`)

### 5.3 CSS Bundle

- **High priority:** `@plugin "daisyui" { themes: all; }` loads all 35+ DaisyUI themes. Only light and dark are used. Change to `themes: [light, dark]` to reduce CSS by ~70%.

### 5.4 CLS Risk: animate-on-scroll

`app/app.css:37-39`: `.animate-on-scroll { opacity: 0; }` — elements start invisible. If any section in the hero/above-fold area uses this class, slow JS execution = invisible content + layout shift on reveal.

### 5.5 Caching ✅

All asset types have appropriate cache headers. Sitemap at 1hr, fonts at 1yr immutable.

---

## 6. Images — 82/100

### 6.1 Alt Text Audit

| Image | Alt Text | Grade |
|---|---|---|
| Hero portrait (home) | "Portrait de Pierre Barbé, développeur web freelance basé à Montréal spécialisé en performance web et automatisation." | ✅ Excellent |
| Profile photo (about) | "Pierre Barbé, développeur web freelance à Montréal" | ✅ Good |
| All Lucide icons | `aria-hidden="true"` | ✅ Correct |
| Blog fallback OG | Generic image for all posts | ⚠️ No differentiation |

### 6.2 Missing

- **Image sitemap** — `<image:image>` entries would help Google Image Search indexing
- **Post-specific OG images** — all blog articles share the same `pb-og-image.avif` — low CTR on social shares
- **No `srcset`** on hero — single AVIF at 1152px served to mobile devices

---

## 7. Sitemap — 88/100

### 7.1 Coverage

~32 URLs total. All indexable pages included. Legal/privacy correctly excluded.

**Critical discrepancy:** `/projects` is in the sitemap (priority 0.8) but sends `noindex`. Either index the page or remove it from the sitemap.

### 7.2 Quality

| Issue | Severity |
|---|---|
| `/blog` lastmod hardcoded `"2026-03-04"` — should equal latest post date | Medium |
| No `<image:image>` entries | Low |
| `/projects` in sitemap but noindex | Critical (contradicts above) |

---

## 8. AI Search Readiness — 75/100

| Signal | Status |
|---|---|
| GPTBot allowed | ✅ |
| ClaudeBot allowed | ✅ |
| PerplexityBot allowed | ✅ |
| Structured headings for passage extraction | ✅ |
| Author attribution on all content | ✅ |
| External citations with URLs | ✅ |
| `/llms.txt` | ❌ Missing |
| FAQ in JSON-LD | ❌ Missing |
| `speakable` schema | ❌ Missing |

---

## Appendix: File Reference Map

| Finding | File | Line |
|---|---|---|
| /projects noindex | app/routes/projects.tsx | 27 |
| Duplicate WebSite schema | app/root.tsx | 64–96 |
| Missing FAQ schema | app/components/faq.tsx | — |
| FAQ frontmatter unused | content/blog/chatbot-ia-site-web-pme.mdx | 8–17 |
| BreadcrumbList last item bug (about) | app/routes/about.tsx | 171 |
| BreadcrumbList last item bug (contact) | app/routes/contact.tsx | 27–28 |
| BreadcrumbList last item bug (slug) | app/routes/blog/blog.$slug.tsx | 115 |
| BreadcrumbList last item bug (projects) | app/routes/projects.tsx | 83–85 |
| DaisyUI `themes: all` | app/app.css | 2–4 |
| animate-on-scroll opacity:0 | app/app.css | 37–39 |
| Italic fonts not preloaded | app/root.tsx | 37–38 |
| og:image:height 333 on /projects | app/routes/projects.tsx | 38 |
| wordCount approximation | app/routes/blog/blog.$slug.tsx | 107 |
| /projects in sitemap contradicts noindex | app/routes/sitemap[.]xml.tsx | 9 |
| Blog lastmod hardcoded | app/routes/sitemap[.]xml.tsx | 17 |
