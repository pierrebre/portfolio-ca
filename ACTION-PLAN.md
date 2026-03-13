# SEO Action Plan — pierrebarbe.ca

**Generated:** 2026-03-13
**Overall Score:** 72/100

---

## Critical — Fix Immediately

### C1. Projects page: add `noindex` or populate with real content
**File:** `app/routes/projects.tsx`
**Why:** Page is indexed with meta claiming "+70 pts Lighthouse, +162% conversion" but renders only a placeholder. Direct E-E-A-T failure.
**Fix:** Add `noindex` to meta immediately, then populate with real case studies.
```tsx
// In meta() of projects.tsx — add:
{ name: "robots", content: "noindex, follow" },
```

### C2. ThemeToggle: fix hydration CLS for dark-mode users
**File:** `app/components/theme-toggle.tsx`
**Why:** Every dark-mode user experiences a layout shift (icon swap) on every page load.
**Fix:**
```tsx
const [theme, setTheme] = useState<string>(() => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") ?? "light";
});
// Remove the useEffect that was syncing localStorage — the anti-FOUC script already handles it
```

### C3. Hero image: add `fetchPriority="high"` + preload
**Files:** `app/components/hero.tsx`, `app/root.tsx`
**Why:** LCP candidate has no priority signal to the browser.
**Fix hero.tsx:**
```tsx
<img ... loading="eager" fetchPriority="high" />
```
**Fix root.tsx (inside `<head>`):**
```tsx
<link rel="preload" as="image" href="/images/me.avif" type="image/avif" fetchPriority="high" />
```

### C4. Resolve CSP / X-Frame-Options conflict
**File:** `vercel.json`
**Why:** `frame-ancestors 'none'` (CSP) and `X-Frame-Options: SAMEORIGIN` contradict each other.
**Fix:** Remove this line from vercel.json:
```json
{ "key": "X-Frame-Options", "value": "SAMEORIGIN" }
```

### C5. Fix `not-found.tsx` to return HTTP 404 status
**File:** `app/routes/not-found.tsx`
**Why:** All unmatched URLs return HTTP 200 — Google indexes soft-404 pages.
**Fix:** Add a loader:
```tsx
export function loader() {
  throw new Response(null, { status: 404 });
}
```

---

## High Priority — Fix This Week

### H1. Fix `article:published_time` timezone
**File:** `app/routes/blog/blog.$slug.tsx` line 44
```tsx
// Before:
{ property: "article:published_time", content: post.date },
// After:
{ property: "article:published_time", content: `${post.date}T00:00:00-05:00` },
// Also add:
{ property: "article:modified_time", content: `${post.date}T00:00:00-05:00` },
```

### H2. Fix `og:image:height` on projects page
**File:** `app/routes/projects.tsx` line 38
```tsx
// Before:
{ property: "og:image:height", content: "333" },
// After:
{ property: "og:image:height", content: "630" },
```

### H3. Change `og:type` from `"article"` to `"website"` on service pages
**Files:** All 6 service route files
Remove `type: "article"` from the `generateSEOMeta()` call (default is already `"website"`).

### H4. Add `og:image:type` to blog slug and about pages
**Files:** `app/routes/blog/blog.$slug.tsx`, `app/routes/about.tsx`
```tsx
{ property: "og:image:type", content: "image/avif" },
```

### H5. Remove Person schema from `root.tsx`, keep only WebSite
**File:** `app/root.tsx`
**Why:** Duplicate `@id` (#person) conflict with home.tsx on the homepage.
**Fix:** Root schema should only contain `WebSite`. Remove the `Person` node from the global JSON-LD block.

### H6. Fix Organization logo to use square image
**File:** `app/routes/home.tsx`
**Why:** Current logo is a 1200×630 banner — fails Google's logo validation.
**Fix:** Create a 512×512px square PNG (`/images/pb-logo-square.png`) and update:
```json
"logo": { "@type": "ImageObject", "url": "https://pierrebarbe.ca/images/pb-logo-square.png", "width": 512, "height": 512 }
```

### H7. Fix `geo` coordinates to be numeric in LocalBusiness schema
**File:** `app/routes/home.tsx`
```json
// Before:
"latitude": "45.5017", "longitude": "-73.5673"
// After:
"latitude": 45.5017, "longitude": -73.5673
```

### H8. Fix sitemap: `/blog` dynamic lastmod + remove priority/changefreq
**File:** `app/routes/sitemap[.]xml.tsx`
Full rewrite removing `priority`/`changefreq` (Google ignores both), adding legal pages, making `/blog` lastmod dynamic:
```tsx
const blogLastmod = posts[0]?.date ?? "2026-03-04";
```
Add:
```tsx
{ loc: "/politique-confidentialite", lastmod: "2026-02-20" },
{ loc: "/mentions-legales", lastmod: "2026-02-20" },
```

### H9. Fix future-dated articles (3 articles)
**Files:** `content/blog/securite-wordpress-guide-pme.mdx`, `content/blog/maintenance-site-web-pme-guide.mdx`, `content/blog/cout-site-web-quebec-prix.mdx`
Either update dates to today (2026-03-13) or ensure `getAllPosts()` filters articles where `date > today`.

### H10. Add `X-Robots-Tag` header for legal pages
**File:** `vercel.json`
```json
{
  "source": "/(politique-confidentialite|mentions-legales)",
  "headers": [{ "key": "X-Robots-Tag", "value": "noindex, follow" }]
}
```

### H11. Cache MDX compilation in `content.server.ts`
**File:** `app/lib/content.server.ts`
**Why:** Each blog request triggers CPU-bound MDX compilation (50-200ms). Serverless containers are reused, so an in-process cache is effective.
```ts
const postCache = new Map<string, { mtime: number; content: PostContent }>();
// Check mtime before re-compiling
```

### H12. Add CDN cache for blog and service HTML responses
**File:** `vercel.json`
```json
{
  "source": "/blog/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, s-maxage=3600, stale-while-revalidate=86400" }]
},
{
  "source": "/services/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, s-maxage=3600, stale-while-revalidate=86400" }]
}
```

---

## Medium Priority — Fix This Month

### M1. Shorten all title tags to under 60 characters
**File:** `app/utils/seo.ts` + all service route files
Current pattern adds `| Montréal | Pierre Barbé` (22 chars) to every service page. Fix pattern:
- Drop `| Pierre Barbé` (Google appends brand automatically)
- Merge Montréal into the keyword phrase
- Example: `"Optimisation performance web à Montréal"` (40 chars) ✅

Add length validation in `generateSEOMeta()`:
```ts
if (title.length > 60) console.warn(`[SEO] Title too long (${title.length} chars): ${title}`);
```

### M2. Shorten all meta descriptions to 150-160 characters
**File:** `app/utils/seo.ts`
Same utility — add a character limit check. All service page descriptions currently exceed 160 chars by 10-78 characters.

### M3. Align H1 with primary keyword on home, about, contact
**Files:** `app/components/hero.tsx`, `app/routes/about.tsx`, `app/routes/contact.tsx`
- Homepage: Add a visually de-emphasized subtitle `<p>Développeur web freelance à Montréal</p>` below the H1 tagline
- About H1: Change to "Pierre Barbé — Développeur web freelance à Montréal"
- Contact H1: Change to "Parlons de ton projet web à Montréal" (or similar)

### M4. Add `offers.validFrom` static date to service page schema
**File:** `app/utils/seo.ts`
```ts
// Before:
validFrom: new Date().toISOString().split('T')[0]
// After:
validFrom: "2025-01-01"
```

### M5. Add `description` to BlogPosting stubs in `blog._index.tsx`
**File:** `app/routes/blog/blog._index.tsx`
```tsx
blogPost: posts.map((p) => ({
  ...
  description: p.excerpt,  // ADD THIS
  ...
}))
```

### M6. Add `url` to Service nodes in `home.tsx`
**File:** `app/routes/home.tsx`
Each Service node in the home page JSON-LD should have a `url` pointing to its canonical service page.

### M7. Fix `about.tsx` BreadcrumbList — remove `item` from last element
**File:** `app/routes/about.tsx`
The last BreadcrumbList item should not include an `item` property (inconsistent with `generateBreadcrumbSchema` utility).

### M8. Generate OG image as JPEG/WebP for social crawler compatibility
**File:** `public/images/pb-og-image.avif`
Generate `pb-og-image.jpg` and use it as primary `og:image` across all routes. Update all `const image = "..."` references.

### M9. Add responsive image variants for hero and about images
**Files:** `app/components/hero.tsx`, `app/routes/about.tsx`
Generate `me-480.avif` and `me-768.avif` variants via Sharp at build time, then:
```tsx
srcSet="/images/me-480.avif 480w, /images/me-768.avif 768w, /images/me.avif 1152w"
sizes="(max-width: 768px) 100vw, 50vw"
```

### M10. Add form accessibility: `aria-invalid`, `aria-describedby`, `role="alert"`
**File:** `app/components/contact-form.tsx`
Each form input needs:
- `id="fieldName"` on input
- `htmlFor="fieldName"` on label
- `aria-invalid={!!errors.field}` on input
- `aria-describedby="fieldName-error"` on input
- `role="alert"` and `id="fieldName-error"` on error message span

### M11. Remove semantically ineffective `aria-label` from blog content div
**File:** `app/routes/blog/blog.$slug.tsx` line 200
A `div` without `role` ignores `aria-label`. Remove the attribute — the parent `<article>` already provides the landmark.

### M12. Restrict DaisyUI to `themes: light, dark`
**File:** `app/app.css` line 3
```css
@plugin "daisyui" {
  themes: light, dark;
}
```
Removes ~15–25KB from CSS bundle.

### M13. Add Vite `manualChunks` for better cache granularity
**File:** `vite.config.ts`
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        "vendor-react": ["react", "react-dom", "react-router"],
        "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
        "vendor-ui": ["lucide-react"],
      },
    },
  },
},
```

### M14. Increase image cache TTL to 30 days
**File:** `vercel.json`
```json
{ "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=604800" }
```

### M15. Add Twitter Card tags to contact page
**File:** `app/routes/contact.tsx`
```tsx
{ name: "twitter:title", content: "Contact et devis de site web à Montréal" },
{ name: "twitter:description", content: "Réserve ta consultation gratuite. Réponse en moins de 24 h." },
{ name: "twitter:image", content: "https://pierrebarbe.ca/images/pb-og-image.jpg" },
{ name: "twitter:image:alt", content: "Pierre Barbé — Développeur web freelance Montréal" },
```

### M16. Fix `site.webmanifest` — add `"purpose": "any"` variants
**File:** `public/favicon/site.webmanifest`
```json
"icons": [
  { "src": "/web-app-manifest-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
  { "src": "/web-app-manifest-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
  { "src": "/web-app-manifest-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
  { "src": "/web-app-manifest-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
]
```

### M17. Complete NEQ placeholder in `legal-notice.tsx`
**File:** `app/routes/legal-notice.tsx` line 68
Replace `[à compléter si applicable]` with the actual NEQ or remove the line.

---

## Low Priority — Backlog

### L1. Add `profile:first_name`, `profile:last_name`, `profile:username` to about page OG meta
**File:** `app/routes/about.tsx`

### L2. Add hreflang self-reference
**File:** `app/root.tsx` (inside `<head>`)
```tsx
<link rel="alternate" hrefLang="fr-CA" href="https://pierrebarbe.ca/" />
<link rel="alternate" hrefLang="x-default" href="https://pierrebarbe.ca/" />
```

### L3. Add blog-to-service internal links in 4 MDX articles
- `core-web-vitals-guide-pme.mdx` → link to `/services/audits-techniques-core-web-vitals`
- `automatiser-business-n8n-pme.mdx` → link to `/services/automatisation-workflows`
- `securite-wordpress-guide-pme.mdx` → link to `/services/creation-maintenance-sites`
- `optimisation-vitesse-wordpress.mdx` → link to `/services/optimisation-web-performance`

### L4. Add service-to-blog links on each service page (3-4 links total)
- `optimisation-web-performance.tsx` → link to `audit-performance-site-web.mdx`, `core-web-vitals-guide-pme.mdx`
- `creation-maintenance-sites.tsx` → link to `optimisation-vitesse-wordpress.mdx`, `maintenance-site-web-pme-guide.mdx`
- `integration-outils-ia.tsx` → link to `chatbot-ia-site-web-pme.mdx`

### L5. Enrich `llms.txt` with descriptions for `/contact`, `/projects`, `/about`
**File:** `public/llms.txt`

### L6. Add `<meta name="author" content="Pierre Barbé">` to blog posts
**File:** `app/routes/blog/blog.$slug.tsx`

### L7. Link `BreadcrumbList` from `CollectionPage` in `projects.tsx`
**File:** `app/routes/projects.tsx`
```tsx
"breadcrumb": { "@id": "https://pierrebre.ca/projects#breadcrumb" }
```

### L8. Add `dateModified` to `ProfilePage` in `about.tsx`
**File:** `app/routes/about.tsx`

### L9. Add FAQ content blocks to service pages (for AI Overview eligibility)
Add 3-4 Q&A pairs per service page as visible content (not FAQPage schema).

### L10. Register and link Google Business Profile
Once GBP is claimed, add its URL to the `sameAs` array in `home.tsx` LocalBusiness/Organization schema.

### L11. Add `Permissions-Policy` newer directives
**File:** `vercel.json`
```
payment=(), usb=()
```

### L12. Add `<link rel="preload">` for hero image only on homepage
Move hero image preload from `root.tsx` (all pages) to `home.tsx` links export — avoids preloading an unused resource on non-home pages.

---

## Prioritized Quick Win Summary

| # | Action | File | Impact | Effort |
|---|---|---|---|---|
| 1 | `fetchPriority="high"` on hero img | `hero.tsx` | LCP -200-400ms | 1 attr |
| 2 | `<link rel="preload">` for hero image | `root.tsx` | LCP -300-600ms | 3 lines |
| 3 | Fix ThemeToggle hydration CLS | `theme-toggle.tsx` | CLS eliminated | 5 lines |
| 4 | Fix `og:image:height` `"333"` → `"630"` | `projects.tsx:38` | Social preview | 1 char |
| 5 | Remove `X-Frame-Options` header | `vercel.json` | Security fix | 1 line |
| 6 | Fix `article:published_time` timezone | `blog.$slug.tsx:44` | Rich results | 1 line |
| 7 | Remove `og:type: "article"` from services | 6 service files | Social preview | 6 files |
| 8 | Add `noindex` to Projects page | `projects.tsx` | Trust | 1 line |
| 9 | Fix `offers.validFrom` static date | `seo.ts` | Schema validity | 1 line |
| 10 | Fix `geo` to numeric values | `home.tsx` | Schema validity | 2 values |
