# SEO Action Plan — pierrebarbe.ca

**Generated:** 2026-04-06
**Current Score:** 74/100
**Target Score:** 85+ / 100

---

## Phase 1 — Quick Wins (This Week) — Est. +6 points

| # | Action | File | Effort | Category |
|---|---|---|---|---|
| 1 | Add `OAI-SearchBot` Allow block to robots.txt | `public/robots.txt` | 2 min | GEO |
| 2 | Remove duplicate BreadcrumbList `<script>` from breadcrumbs component | `app/components/breadcrumbs.tsx` | 5 min | Schema |
| 3 | Standardize all og:image to `pb-og-image.jpg` (not AVIF) | `app/routes/blog/blog.$slug.tsx` + all routes | 15 min | On-Page |
| 4 | Move hero `<link rel="preload">` from root layout to home + about routes | `app/root.tsx` → `app/routes/home.tsx`, `about.tsx` | 15 min | CWV |
| 5 | Add `/politique-confidentialite` + `/mentions-legales` to sitemap | `app/routes/sitemap[.]xml.tsx` | 5 min | Sitemap |
| 6 | Fix blog index lastmod to derive from newest post | `app/routes/sitemap[.]xml.tsx` | 10 min | Sitemap |
| 7 | Update `Person.knowsAbout`: "Next.js" → "React Router v7" | `app/routes/home.tsx` | 2 min | Schema |

**Total effort: ~1 hour**

---

## Phase 2 — Content & Images (Weeks 2-3) — Est. +5 points

| # | Action | Effort | Category |
|---|---|---|---|
| 8 | Add inline source attribution to all blog post statistics | 2-3 hrs | Content/GEO |
| 9 | Create 1-2 images/charts per blog post (SVG bar charts, comparison tables, screenshots) | 4-6 hrs | Images |
| 10 | Generate article-specific OG images for each blog post | 2-3 hrs | Images |
| 11 | Add 2-3 more project case studies with real client details | 4-8 hrs | Content/E-E-A-T |
| 12 | Add client testimonials to About page or homepage | 1-2 hrs | E-E-A-T |

---

## Phase 3 — Technical Polish (Week 4) — Est. +3 points

| # | Action | Effort | Category |
|---|---|---|---|
| 13 | Add font metric overrides to @font-face (size-adjust, ascent-override) | 1 hr | CWV/CLS |
| 14 | Add edge caching: `s-maxage=60, stale-while-revalidate=300` for static routes | 30 min | CWV/TTFB |
| 15 | Implement IndexNow (key file + API submission on deploy) | 1 hr | Technical |
| 16 | Upgrade llms.txt to full spec (license, description, contact, full titles) | 30 min | GEO |
| 17 | Add `keywords` property to BlogPosting schema from frontmatter | 30 min | Schema |
| 18 | Remove deprecated `<priority>` and `<changefreq>` from sitemap | 10 min | Sitemap |

---

## Phase 4 — Authority Building (Ongoing) — Est. +4 points

| # | Action | Effort | Category |
|---|---|---|---|
| 19 | Create and verify Google Business Profile | 1 hr + verification | Local/GEO |
| 20 | Add GBP URL to sameAs in Person + LocalBusiness schema | 5 min | Schema |
| 21 | Establish Reddit presence (r/Quebec, r/webdev — answer Loi 25/CWV questions) | Ongoing | GEO |
| 22 | Upgrade RSS feed to full-content (`<content:encoded>`) | 45 min | GEO |
| 23 | Add `CreativeWork` schema to project case study pages | 30 min | Schema |

---

## Projected Score After All Phases: ~88/100

| Category | Current | After Phase 1-4 |
|---|---|---|
| Technical SEO | 78 | 88 |
| Content Quality | 76 | 85 |
| On-Page SEO | 82 | 88 |
| Schema | 72 | 88 |
| Performance | 70 | 82 |
| AI Search Readiness | 71 | 84 |
| Images | 45 | 75 |
