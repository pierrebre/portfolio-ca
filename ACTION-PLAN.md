# SEO Action Plan — pierrebarbe.ca
**Generated:** 2026-03-13
**Overall Score:** 80/100

---

## CRITICAL — Fix immediately

### C1. Add `FAQPage` schema to homepage FAQ
**File:** `app/components/faq.tsx`
**Impact:** Rich result in Google SERPs — expandable Q&A below your listing, +CTR
**Effort:** 1–2 hours

Import the questions data and inject a `FAQPage` JSON-LD block:
```tsx
import JsonLd from "~/components/json-ld";
import { questions } from "data/questions";

// Inside Faq() component, before the return:
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
};

// Add <JsonLd data={faqSchema} /> before the <section>
```

---

### C2. Fix `/projects` noindex vs sitemap conflict
**File:** `app/routes/projects.tsx:27` and `app/routes/sitemap[.]xml.tsx:9`
**Impact:** Either index a high-value social proof page OR stop confusing Googlebot
**Effort:** 30 min

**Option A (Recommended):** Index the page — it has real before/after metrics and can rank:
```tsx
// projects.tsx line 27 — change:
{ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
```

**Option B:** If page isn't ready, remove from sitemap:
```tsx
// sitemap[.]xml.tsx — remove the /projects entry from STATIC_URLS
```

---

### C3. Resolve duplicate schema between `root.tsx` and `home.tsx`
**File:** `app/root.tsx:64–96`
**Impact:** Eliminates conflicting @graph signals on homepage
**Effort:** 30 min

Remove the `WebSite` and `Person` entries from `root.tsx` global schema (lines 64–96). The comprehensive `@graph` in `home.tsx` already covers these with richer data. On all other pages, the root schema was providing a minimal global signal — but it conflicts on the homepage.

```tsx
// root.tsx — remove the entire <script type="application/ld+json"> block
// that defines WebSite + Person (lines 63–96)
// The home.tsx @graph already defines these with @id references
```

---

## HIGH — Fix within 1 week

### H1. Add FAQPage schema to blog posts with FAQ frontmatter
**File:** `app/routes/blog/blog.$slug.tsx`
**Impact:** Rich results on blog post SERPs
**Effort:** 2 hours

Update `blog.$slug.tsx` to include FAQ schema when `post.faq` is present in frontmatter. Requires:
1. Updating `app/lib/content.server.ts` to expose the `faq` frontmatter field in the returned post object
2. Adding conditional FAQPage schema in `blog.$slug.tsx` blogPostingSchema `@graph`

---

### H2. Add primary keyword to homepage H1
**File:** `app/components/hero.tsx:24`
**Impact:** Stronger H1 keyword signal for "développeur web freelance Montréal"
**Effort:** 15 min

Current: `"Ton site devrait travailler pour toi — pas contre toi."`

Consider a hybrid that keeps the brand voice but adds context:
```tsx
<h1>
  Développeur web freelance à Montréal
  <span className="text-primary block">— qui fait travailler ton site pour toi.</span>
</h1>
```
Or use an invisible/sr-only H1 supplement, or restructure the heading to include geo-keyword while keeping the tagline.

---

### H3. Fix DaisyUI `themes: all` → `themes: [light, dark]`
**File:** `app/app.css:2–4`
**Impact:** ~70% CSS bundle size reduction — improves LCP, especially on mobile
**Effort:** 5 min

```css
/* Change from: */
@plugin "daisyui" {
  themes: all;
}

/* To: */
@plugin "daisyui" {
  themes: ["light", "dark"];
}
```

---

### H4. Fix BreadcrumbList last item `item` property
**Files:** `about.tsx:171`, `contact.tsx:27–28`, `projects.tsx:83–85`, `blog.$slug.tsx:115`
**Impact:** Clean rich result validation in Google Rich Results Test
**Effort:** 30 min

Remove `item` property from the last `ListItem` in each manually-defined BreadcrumbList. Use the existing `generateBreadcrumbSchema()` utility from `app/utils/seo.ts` which already handles this correctly.

Example fix for `about.tsx`:
```ts
// Remove line 171: item: "https://pierrebarbe.ca/about",
// The last ListItem should only have position and name
```

Or refactor to use `generateBreadcrumbSchema()` consistently:
```ts
import { generateBreadcrumbSchema } from "~/utils/seo";
// then use generateBreadcrumbSchema([
//   { name: "Accueil", url: "https://pierrebarbe.ca/" },
//   { name: "À propos", url: "https://pierrebarbe.ca/about" }
// ])
```

---

### H5. Preload italic Urbanist fonts
**File:** `app/root.tsx:37–38`
**Impact:** Eliminates FOUT (flash of unstyled text) for italic text
**Effort:** 10 min

Add preloads for italic variants:
```tsx
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/L0x4DF02iFML4hGCyMqgXSFsjkK3.woff2"
  crossOrigin="anonymous" />
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/L0x4DF02iFML4hGCyMqgXS9sjg.woff2"
  crossOrigin="anonymous" />
```

---

### H6. Fix og:image:height on `/projects`
**File:** `app/routes/projects.tsx:38`
**Impact:** Correct social preview aspect ratio
**Effort:** 2 min

```tsx
// Change:
{ property: "og:image:height", content: "333" },
// To:
{ property: "og:image:height", content: "630" },
```

---

### H7. Add blog-to-service internal links
**Files:** Content blog MDX files
**Impact:** Passes link equity to key service pages, improves topical relevance
**Effort:** 1 hour

| Blog Article | Add Link To |
|---|---|
| `core-web-vitals-guide-pme.mdx` | `/services/audits-techniques-core-web-vitals` |
| `automatiser-business-n8n-pme.mdx` | `/services/automatisation-workflows` |
| `optimisation-vitesse-wordpress.mdx` | `/services/optimisation-web-performance` |
| `securite-wordpress-guide-pme.mdx` | `/services/creation-maintenance-sites` |
| `chatbot-ia-site-web-pme.mdx` | `/services/integration-outils-ia` |

---

## MEDIUM — Fix within 1 month

### M1. Create `public/llms.txt`
**Impact:** Helps AI crawlers (ChatGPT, Perplexity, Claude) understand site structure — GEO visibility
**Effort:** 30 min

```markdown
# Pierre Barbé — Développeur web freelance Montréal
# https://pierrebarbe.ca

## About
Pierre Barbé is a freelance web developer based in Montreal, Quebec, Canada.
Specializing in web performance, React, WordPress, automation (n8n), and AI integration for Quebec SMBs.

## Services
- Web performance optimization and Core Web Vitals audits
- Website creation and maintenance (React Router, WordPress)
- Workflow automation (n8n, Make)
- AI chatbot and tool integration
- Server management and deployment

## Content
Blog covering: web performance, WordPress optimization, automation, AI for SMBs, Quebec digital compliance (Loi 25)

## Contact
contact@pierrebarbe.ca
+1 (438) 448-8408
Montreal, Quebec, Canada
```

---

### M2. Dynamic blog lastmod in sitemap
**File:** `app/routes/sitemap[.]xml.tsx:17`
**Impact:** Accurate freshness signals for blog index page
**Effort:** 30 min

```tsx
// Replace hardcoded date:
{ loc: "/blog", priority: "0.8", changefreq: "weekly", lastmod: "2026-03-04" },

// With dynamic latest post date:
const latestPost = posts.sort((a, b) => b.date.localeCompare(a.date))[0];
// then use latestPost?.date ?? "2026-03-04" in the /blog entry
```

---

### M3. Add post-specific OG images to blog articles
**Impact:** Higher social sharing CTR, stronger brand on each share
**Effort:** 2–4 hours (design + implementation)

Add `image:` field to each MDX frontmatter:
```yaml
---
title: "Chatbot IA pour PME : guide complet 2026"
image: "https://pierrebarbe.ca/images/blog/chatbot-ia-pme.avif"
---
```

`blog.$slug.tsx` already handles `post.image` with fallback to the generic image — just add images.

---

### M4. Track dateModified separately from datePublished
**File:** `app/routes/blog/blog.$slug.tsx:83` + MDX frontmatter
**Impact:** Freshness signals for updated articles
**Effort:** 2 hours

Add `lastUpdated:` field to MDX frontmatter and use it in `BlogPosting.dateModified`:
```yaml
date: "2026-02-05"
lastUpdated: "2026-03-10"
```

---

### M5. Add `<title>` keyword improvement for `/projects`
**File:** `app/routes/projects.tsx:21`
**Impact:** Under 60 chars, better SERP display
**Effort:** 2 min

```tsx
// Change from (73 chars):
{ title: "Projets — Études de cas web performance & automatisation | Pierre Barbé" },
// To (~55 chars):
{ title: "Études de cas — Performance & automatisation | Pierre Barbé" },
```

---

### M6. Add `AggregateRating` or `Review` schema to homepage
**File:** `app/routes/home.tsx` — results/testimonials section
**Impact:** Star ratings in SERPs if review data is added
**Effort:** 2 hours (requires adding reviewers with names to results component)

---

### M7. Add image sitemap entries
**File:** `app/routes/sitemap[.]xml.tsx`
**Impact:** Google Image Search indexing of portfolio/profile images
**Effort:** 1 hour

Add `<image:image>` entries to the homepage and about page sitemap entries:
```xml
<url>
  <loc>https://pierrebarbe.ca/</loc>
  <image:image>
    <image:loc>https://pierrebarbe.ca/images/me.avif</image:loc>
    <image:title>Pierre Barbé, développeur web freelance à Montréal</image:title>
  </image:image>
</url>
```
Requires adding `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` to `<urlset>`.

---

## LOW — Backlog

### L1. Add `speakable` schema to blog articles
Add `speakable: { cssSelector: ["h1", ".article-intro"] }` to BlogPosting schema for voice/AI search.

### L2. Add `srcset` to hero image for mobile optimization
Serve smaller versions of `me.avif` on mobile (e.g., 640px wide) using `<img srcset="...">`.

### L3. Add formal certifications to About page
Google PageSpeed Insights partner badge, or similar third-party credentials — improves E-E-A-T Authoritativeness signal.

### L4. Add testimonials with names to homepage
Real client testimonials (with permission) with a `Review` schema significantly improve E-E-A-T. Even 2–3 named testimonials help.

### L5. Explore hreflang for en-CA variant
The `LocalBusiness` schema declares `availableLanguage: ["fr-CA", "en"]` but no English pages exist. If you serve English clients, a `/en/` section with hreflang would expand reach.

### L6. Add `keywords` meta only where relevant
Currently only `/projects` has `keywords` meta — it's ignored by Google but may help other engines. Either remove it (Google ignores it) or omit entirely for consistency.

---

## Summary Table

| Priority | ID | Task | Effort | Impact |
|---|---|---|---|---|
| Critical | C1 | FAQPage schema on homepage FAQ | 2h | High |
| Critical | C2 | Fix /projects noindex vs sitemap | 30m | High |
| Critical | C3 | Remove duplicate schema from root.tsx | 30m | Medium |
| High | H1 | FAQPage schema for blog posts | 2h | High |
| High | H2 | Add keyword to homepage H1 | 15m | High |
| High | H3 | DaisyUI themes: all → [light, dark] | 5m | High (perf) |
| High | H4 | Fix BreadcrumbList last item | 30m | Medium |
| High | H5 | Preload italic fonts | 10m | Medium |
| High | H6 | Fix og:image:height on /projects | 2m | Low |
| High | H7 | Blog-to-service internal links | 1h | High |
| Medium | M1 | Create /llms.txt | 30m | Medium (GEO) |
| Medium | M2 | Dynamic blog lastmod | 30m | Low |
| Medium | M3 | Post-specific OG images | 4h | Medium |
| Medium | M4 | Track dateModified in MDX | 2h | Low |
| Medium | M5 | Shorten /projects title | 2m | Low |
| Medium | M6 | AggregateRating schema | 2h | Medium |
| Medium | M7 | Image sitemap entries | 1h | Low |
| Low | L1–L6 | Various improvements | varies | Low |
