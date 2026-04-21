# Audit SEO complet — pierrebarbe.ca

**Date :** 2026-04-06
**Pages analysées :** 27 (sitemap) — 15 pages crawlées en profondeur
**Type d'entreprise détecté :** Service professionnel local (développeur web freelance, Montréal)

---

## Score global : 83/100

| Catégorie | Poids | Score | Pondéré |
|-----------|-------|-------|---------|
| Technical SEO | 22% | 90/100 | 19.8 |
| Content Quality | 23% | 80/100 | 18.4 |
| On-Page SEO | 20% | 82/100 | 16.4 |
| Schema / Structured Data | 10% | 88/100 | 8.8 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| AI Search Readiness | 10% | 78/100 | 7.8 |
| Images | 5% | 55/100 | 2.75 |
| **Total** | **100%** | | **82.5** |

---

## Executive Summary

### Top 5 issues critiques
1. **Aucune image unique par article de blog** — Les 13 articles partagent tous le même OG image générique (`pb-og-image.jpg`). Impact majeur sur le CTR social et les rich results.
2. **Images alt text quasi-absent dans le contenu MDX** — Seules 2 fichiers TSX utilisent des attributs `alt`. Les articles de blog en MDX n'ont aucune image avec alt text.
3. ~~`llms.txt` absent~~ — **Présent et bien structuré** (services, 13 articles, contact). Manque un `llms-full.txt` avec le contenu étendu.
4. **2 H1 sur la page d'accueil** — Le WebFetch détecte "Développeur web freelance à Montréal" ET "Je fais travailler ton site pour toi" comme H1 (le second est un span stylé, mais interprété comme H1 par certains crawlers).
5. **OG image JPG de 314 Ko** — L'image OG principale est en JPG alors qu'un AVIF de 64 Ko existe déjà. Pas de fallback WebP.

### Top 5 quick wins
1. Ajouter `llms-full.txt` avec contenu étendu (30 min, impact AI visibility)
2. Convertir/servir l'OG image en WebP avec fallback (15 min, -250 Ko par partage social)
3. Ajouter des images hero uniques par article blog avec alt text descriptif
4. Ajouter `og:type: "article"` manquant sur certaines pages services (déjà présent sur blog posts)
5. Créer des images spécifiques par projet dans `/projects/`

---

## 1. Technical SEO — 90/100

### Crawlability
- **robots.txt** : Correctement configuré. Autorise tous les crawlers, bloque `/fonts/` et `/favicon/`. Autorise explicitement GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot. Référence le sitemap.
- **Sitemap XML** : 27 URLs, bien structuré avec lastmod, changefreq et priority. Toutes les pages principales incluses.
- **RSS feed** : Présent à `/blog/feed.xml`, 13 articles listés avec dates et descriptions.

### Indexability
- **Canonicals** : Présents sur toutes les pages via `generateSEOMeta()` ou meta manuelles. Aucun conflit détecté.
- **Robots meta** : `index, follow, max-image-preview:large, max-snippet:-1` sur toutes les pages publiques. Legal pages non marquées noindex (à considérer).
- **404 handling** : Route catch-all `*` vers `not-found.tsx` — bon.

### Security Headers (Excellent)
| Header | Valeur | Statut |
|--------|--------|--------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | OK |
| Content-Security-Policy | default-src 'self'; script-src 'self' 'unsafe-inline'... | OK |
| X-Content-Type-Options | nosniff | OK |
| X-Frame-Options | DENY | OK |
| Referrer-Policy | strict-origin-when-cross-origin | OK |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | OK |

### HTTPS
- Servi via Vercel avec HTTP/2 et HSTS preload. Excellent.

### Cache Headers
- `/assets/` et `/fonts/` : `max-age=31536000, immutable` — optimal
- `/images/` : `max-age=86400, stale-while-revalidate=604800` — bon
- Pages HTML : `public, max-age=0, must-revalidate` — correct pour SSR

### Issues
- **Pages légales non noindex** : `/mentions-legales` et `/politique-confidentialite` sont indexables. Elles n'apportent aucune valeur SEO et diluent le crawl budget.
- **`unsafe-inline` dans CSP** : Nécessaire pour le script anti-FOUC thème, mais c'est un compromis de sécurité acceptable.

---

## 2. Content Quality — 80/100

### E-E-A-T Assessment

**Experience** : Bonne. Mentions de clients réels (Piscines Jolicoeur), chiffres concrets (résultats mesurables), bio d'auteur sur chaque article de blog avec lien vers `/about`.

**Expertise** : Bonne. Stack technique détaillée dans `/about`, articles techniques approfondis (Core Web Vitals, Loi 25, WordPress security), FAQ structurées.

**Authoritativeness** : Moyenne. Un seul auteur, pas de citations externes, pas de témoignages clients visibles, pas de badges/certifications affichés.

**Trust** : Bonne. Mentions légales complètes, politique de confidentialité, HTTPS, CSP strict, prix transparents.

### Content Depth
- **13 articles de blog** : Bonne couverture thématique (performance, automatisation, WordPress, conformité, coûts).
- **Word count moyen** : ~2 100 mots — bon pour le SEO.
- **Maillage interne blog** : Excellent — chaque article fait des liens vers 4-6 autres articles pertinents.

### Issues
- **Contenu générique sur la page services** : Peu de texte descriptif, principalement des cards de navigation.
- **Page projects** : Seulement 1 étude de cas complète (Piscines Jolicoeur), les autres sont des résumés courts.
- **Pas de témoignages/reviews** : Aucun social proof client visible.

---

## 3. On-Page SEO — 82/100

### Title Tags
| Page | Title | Longueur | Verdict |
|------|-------|----------|---------|
| Home | Développeur web freelance Montréal — Pierre Barbé | 50 car. | OK |
| Services | Services de Développement Web & Performance \| Pierre Barbé Montréal | 68 car. | OK |
| Blog | Blog — Web performance, automatisation & éco-conception \| Pierre Barbé | 71 car. | Limite |
| About | À propos — Pierre Barbé, développeur web freelance Montréal | 60 car. | OK |
| Contact | Contact et devis de site web à Montréal | 40 car. | Manque branding |

### Meta Descriptions
Toutes les pages principales ont des meta descriptions de 120-160 caractères. Bonnes, avec mots-clés locaux (Montréal, PME québécoises, freelance).

### Heading Structure
- **Home** : 1 H1 dans le code source (hero.tsx), mais le subtitle "Je fais travailler ton site pour toi" est mal interprété par certains extracteurs. Code source = OK.
- **Services** : 1 H1 — OK
- **Blog posts** : Chacun a 1 H1 unique, bonne hiérarchie H2/H3.
- **About** : 1 H1 — OK

### Internal Linking
- Navigation principale : Services, Projets, Blog, À propos, Contact — cohérent.
- Footer : Liens légaux + réseaux sociaux.
- Blog : Maillage inter-articles excellent (4-6 liens par article).
- **Manque** : Pas de liens contextuels depuis les pages services vers les articles de blog pertinents (sauf `/services/creation-maintenance-sites` qui lie 2 articles).

### Issues
- **Contact title trop court** : "Contact et devis de site web à Montréal" — devrait inclure la marque.
- **Blog title à la limite** : 71 caractères — risque de troncature dans les SERP.
- **Pages services individuelles** : Le maillage vers les articles de blog pourrait être plus dense.
- **Fil d'Ariane** : Présent dans le markup JSON-LD et visuellement — bon.

---

## 4. Schema / Structured Data — 88/100

### Implementation actuelle (Excellent)

| Page | Schema Types | Statut |
|------|-------------|--------|
| Home | Person, LocalBusiness, ProfessionalService, Organization, WebSite, WebPage, FAQPage, Service (x4) | Complet |
| Services index | CollectionPage, ItemList, WebPage, BreadcrumbList | OK |
| Service pages | Service, WebPage, BreadcrumbList (via @graph) | OK |
| Blog index | Blog, BlogPosting (x13), BreadcrumbList | OK |
| Blog posts | BlogPosting, BreadcrumbList, FAQPage (quand FAQ présente) | OK |
| About | ProfilePage, Person, AboutPage, BreadcrumbList | OK |
| Contact | WebPage, ContactPage, BreadcrumbList | OK |
| Projects | CollectionPage, BreadcrumbList | OK |

### Points forts
- Utilisation de `@graph` avec `@id` pour relier les entités — best practice.
- Person entity complète (email, téléphone, compétences, profils sociaux).
- FAQPage schema sur la home + articles de blog — rich results potentiels.
- BreadcrumbList sur toutes les pages.

### Issues
- **Pas de Review/Rating schema** : Aucun avis client structuré.
- **Pas de HowTo schema** : Les articles process/guide (Core Web Vitals, WordPress security) pourraient bénéficier de HowTo markup.
- **Pas de VideoObject** : Si des vidéos sont ajoutées dans le futur.
- **Logo dans Organization** : Pointe vers `pierre-barbe-logo.png` (70 Ko PNG) — WebP serait préférable.

---

## 5. Performance (CWV) — 85/100

*Note : PageSpeed Insights API n'a pas répondu. Évaluation basée sur l'analyse du code source.*

### Points forts
- **SSR complet** (React Router v7 SSR mode) — contenu rendu côté serveur, bon FCP.
- **Font preloading** : 4 fichiers Urbanist woff2 préchargés dans `<head>`.
- **Hero image preload** : `me-800.avif` préchargé via `links()` export — bon LCP.
- **Images optimisées** : Format AVIF utilisé pour le portrait (me-800.avif = 11 Ko, me.avif = 220 Ko) avec `srcSet` et `sizes`.
- **fetchPriority="high"** sur l'image hero — excellent.
- **Script anti-FOUC** : Inline et minimal — pas de blocking.
- **Cache immutable** sur assets et fonts.

### Issues
- **OG image JPG 314 Ko** : `pb-og-image.jpg` est en JPEG alors qu'un AVIF de 64 Ko existe. Les plateformes sociales ne supportent pas AVIF, mais un WebP (~80 Ko) serait un bon compromis.
- **4 font preloads** : 4 fichiers de police préchargés — ça peut retarder le LCP si la connexion est lente. Considérer réduire à 2 (regular + bold).
- **Pas de `loading="lazy"`** visible sur les images hors viewport (dans les composants services, results, etc.).
- **Blog MDX** : Le contenu est rendu via `dangerouslySetInnerHTML` ce qui est SSR-correct, mais les images dans le MDX ne bénéficient pas d'attributs de lazy loading ou dimensions.

---

## 6. AI Search Readiness — 72/100

### Points forts
- **robots.txt** autorise GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot — excellent.
- **Contenu structuré** : FAQ schema, headings clairs, contenu en français canadien.
- **RSS feed** disponible — certains LLM l'utilisent pour indexer.
- **Author entity** bien définie dans le JSON-LD.

### `llms.txt` — Présent
- Fichier bien structuré : sections About, Services (6 liens), Blog (13 articles), À propos, Contact.
- Servi depuis `public/llms.txt`.

### Issues
- **Pas de `llms-full.txt`** : Version étendue avec le contenu complet des pages principales pour ingestion LLM.
- **Pas de citation capsules** : Les articles de blog n'ont pas de passages explicitement formatés pour être cités par les LLM (passages auto-contenus avec source et chiffre).
- **Contenu uniquement en français** : Limite la citabilité dans les résultats AI anglophones (acceptable pour le marché cible QC).

### Recommandations
1. Créer `/llms-full.txt` avec le contenu complet des pages principales.
2. Ajouter des "citation capsules" dans les articles de blog (courts paragraphes factuels citables).

---

## 7. Images — 55/100

### Inventaire
| Fichier | Format | Taille | Usage |
|---------|--------|--------|-------|
| me-800.avif | AVIF | 11 Ko | Hero portrait (800w) |
| me.avif | AVIF | 220 Ko | Hero portrait (2662w) |
| pb-og-image.avif | AVIF | 64 Ko | Non utilisé (AVIF pas supporté par social) |
| pb-og-image.jpg | JPEG | 314 Ko | OG image partagée par TOUTES les pages |
| pierre-barbe-logo.png | PNG | 70 Ko | Logo schema |

### Issues critiques
- **1 seule OG image pour tout le site** : Les 27 pages partagent `pb-og-image.jpg`. Chaque page devrait avoir une image sociale unique pour améliorer le CTR.
- **Aucune image dans les articles de blog** : Les 13 articles n'ont aucune image illustrative. C'est un signal de contenu "thin" pour Google et réduit l'engagement.
- **Alt text manquant** : Seuls `hero.tsx` et `about.tsx` ont des attributs alt. Le reste du site n'a pas d'images ou pas d'alt text.
- **Pas de format WebP** : L'image OG est en JPG, le logo en PNG. WebP offrirait un bon compromis taille/compatibilité.
- **Logo PNG 70 Ko** : Devrait être converti en SVG ou WebP.

### Points positifs
- Portrait hero utilise AVIF avec srcSet responsive et sizes.
- Image hero préchargée et `fetchPriority="high"`.

---

## Résumé des pages analysées

| Page | Title | Meta Desc | Canonical | OG Tags | H1 | Schema | Score |
|------|-------|-----------|-----------|---------|-----|--------|-------|
| / | OK | OK | OK | Complet | OK | Excellent | 92 |
| /services | OK | OK | OK | Partiel | OK | OK | 82 |
| /services/* (6) | OK | OK | OK | Partiel | OK | OK | 80 |
| /blog | OK | OK | OK | OK | OK | OK | 85 |
| /blog/* (13) | OK | OK | OK | OK | OK | OK+FAQ | 80 |
| /about | OK | OK | OK | OK | OK | OK | 82 |
| /contact | Court | OK | OK | Manquant | OK | OK | 75 |
| /projects | OK | OK | OK | Manquant | OK | Basique | 72 |
| /projects/* | OK | OK | OK | OK | OK | Basique | 70 |

---

## Comparaison avec audit précédent (Phase 1 — 2026-03-04)

| Métrique | Phase 1 | Maintenant | Delta |
|----------|---------|------------|-------|
| Score global | 74/100 | 82/100 | +8 |
| Technical SEO | ~75 | 90 | +15 |
| Schema | ~60 | 88 | +28 |
| On-Page | ~78 | 82 | +4 |
| Content | ~75 | 80 | +5 |
| Images | ~50 | 55 | +5 |
| AI Readiness | N/A | 72 | Nouveau |

Progression notable depuis la Phase 1, surtout en structured data et technical SEO.
