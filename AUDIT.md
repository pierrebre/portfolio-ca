# AUDIT.md — pierrebarbe.ca
> Généré le 2026-02-20 · Branche `develop`

---

## 1.1 Architecture & Structure

### Arborescence complète
```
portfolio-ca/
├── app/
│   ├── app.css                          # Tailwind v4 + DaisyUI + fonts Urbanist
│   ├── root.tsx                         # Layout racine, ErrorBoundary
│   ├── routes.ts                        # Config routage React Router v7
│   ├── components/
│   │   ├── audit-form.tsx               # Formulaire demande d'audit
│   │   ├── audit-modal.tsx              # Modale audit (dialog HTML)
│   │   ├── breadcrumbs.tsx              # Fil d'Ariane + JSON-LD BreadcrumbList
│   │   ├── contact-card.tsx             # Carte CTA contact globale
│   │   ├── contact-form.tsx             # Formulaire de contact
│   │   ├── faq-item.tsx                 # Item FAQ (collapse DaisyUI)
│   │   ├── faq.tsx                      # Section FAQ
│   │   ├── footer.tsx                   # Pied de page
│   │   ├── hero.tsx                     # Section héros (page d'accueil)
│   │   ├── json-ld.tsx                  # Composant JSON-LD ⚠️ SSR non fonctionnel
│   │   ├── navbar.tsx                   # Barre de navigation
│   │   ├── process.tsx                  # Section processus
│   │   ├── service-card.tsx             # Carte de service
│   │   ├── service-dropdown.tsx         # Dropdown services (desktop)
│   │   ├── services.tsx                 # Grille de services
│   │   ├── theme-toggle.tsx             # Bascule dark/light
│   │   └── toast.tsx                    # Composant toast
│   ├── context/
│   │   └── toast-context.tsx            # Contexte global toast
│   ├── routes/
│   │   ├── home.tsx                     # Page d'accueil ⚠️ code mort
│   │   ├── contact.tsx                  # Page contact
│   │   ├── legal-notice.tsx             # Mentions légales
│   │   ├── not-found.tsx                # 404
│   │   ├── privacy-policy.tsx           # Politique de confidentialité
│   │   └── services/
│   │       ├── services._layout.tsx     # Layout services
│   │       ├── services._index.tsx      # Index /services
│   │       ├── optimisation-web-performance.tsx
│   │       ├── creation-maintenance-sites.tsx
│   │       ├── automatisation-workflows.tsx
│   │       ├── audits-techniques-core-web-vitals.tsx
│   │       ├── gestion-serveur-deploiement.tsx
│   │       └── integration-outils-ia.tsx
│   └── utils/
│       ├── seo.ts                       # Utilitaires SEO (meta + JSON-LD)
│       └── service-links.ts             # Mapping services → URLs
├── data/
│   ├── process-steps.ts
│   ├── questions.ts
│   └── services.ts
├── public/
│   ├── favicon/
│   ├── fonts/
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml                      # Statique ⚠️ non dynamique
├── Dockerfile
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

### Fichiers absents (mentionnés dans le projet)
| Fichier | Statut | Impact |
|---------|--------|--------|
| `app/routes/about.tsx` | ❌ Absent | Page About inaccessible |
| `app/routes/blog/blog._layout.tsx` | ❌ Absent | Blog non implémenté |
| `app/routes/blog/blog._index.tsx` | ❌ Absent | Blog non implémenté |
| `app/routes/blog/blog.$slug.tsx` | ❌ Absent | Blog non implémenté |
| `app/lib/content.server.ts` | ❌ Absent | Utilitaire MDX non implémenté |
| `app/routes/projects.tsx` | ❌ Absent | Page projets absente |
| `vercel.json` | ❌ Absent | Pas de headers sécurité / cache |
| `.env.example` | ❌ Absent | Pas de documentation des variables |
| `CHANGELOG.md` | ❌ Absent | Pas d'historique des changements |

### Cohérence du routing
- `routes.ts` ne déclare pas de routes blog, about, ou projects → **liens navbar commentés cohérents**
- Le lien `/contact` dans navbar/footer pointe vers une route existante ✅
- `/services` et ses sous-routes sont correctement configurées ✅
- `ErrorBoundary` global dans `root.tsx` ✅
- Pas d'`ErrorBoundary` par route pour les pages de service ⚠️

---

## 1.2 Qualité du code TypeScript

### `any` explicites
| Fichier | Ligne | Problème |
|---------|-------|---------|
| `app/components/contact-form.tsx` | ~52 | `catch (err: any)` → doit être `unknown` |
| `app/components/audit-form.tsx` | ~75 | `catch (err: any)` → doit être `unknown` |
| `app/components/json-ld.tsx` | ~4 | `Record<string, any>` → doit être `Record<string, unknown>` |

### Imports inutilisés
| Fichier | Import | Raison |
|---------|--------|--------|
| `app/components/why-me.tsx` | `import React from "react"` | JSX transform actif |
| `app/components/process.tsx` | `import React from "react"` | JSX transform actif |
| `app/routes/legal-notice.tsx` | `import React from "react"` | JSX transform actif |
| `app/routes/contact.tsx` | `{ MapPin }` de lucide-react | MapPin non utilisé dans le JSX |
| `app/components/contact-form.tsx` | `isSubmitSuccessful` | Destructuré mais jamais utilisé |
| `app/components/audit-form.tsx` | `isSubmitSuccessful` | Destructuré mais jamais utilisé |

### Import de types incorrects
| Fichier | Import actuel | Import correct |
|---------|---------------|----------------|
| `app/routes/contact.tsx` | `./+types/home` | `./+types/contact` |
| `app/routes/legal-notice.tsx` | `./+types/home` | `./+types/legal-notice` |
| `app/routes/privacy-policy.tsx` | `./+types/home` | `./+types/privacy-policy` |

### Code mort
| Fichier | Lignes | Problème |
|---------|--------|---------|
| `app/routes/home.tsx` | ~65-80 | `globalToast`, `closeGlobalToast`, `showGlobalToast` définis mais jamais utilisés dans le JSX |

### Anti-patterns TypeScript
| Fichier | Ligne | Problème |
|---------|-------|---------|
| `app/components/service-card.tsx` | ~8 | `key: string` destructure `key` prop (inaccessible en React) vers variable `string` (nom de type) — jamais utilisée |
| `app/components/hero.tsx` | ~62 | `as HTMLDialogElement` assertion non sécurisée |
| `app/components/process.tsx` | ~35 | `as HTMLDialogElement` assertion non sécurisée |
| `app/components/audit-form.tsx` | ~107 | `as HTMLDialogElement` assertion non sécurisée |
| `app/components/audit-modal.tsx` | ~21 | `as HTMLDialogElement` assertion non sécurisée |

---

## 1.3 Bugs & Problèmes fonctionnels

### 🔴 Critiques
| # | Fichier | Ligne | Problème | Fix |
|---|---------|-------|---------|-----|
| 1 | `app/routes/home.tsx` | 65-80 | Code mort : `globalToast`, `closeGlobalToast`, `showGlobalToast` jamais utilisés dans le JSX | Supprimer état + fonctions + `useState` import |
| 2 | `app/components/json-ld.tsx` | 7-27 | `JsonLd` injecte le JSON-LD via `useEffect` → client-only → absent du HTML initial → **SEO critique** | Utiliser `dangerouslySetInnerHTML` dans un `<script>` JSX rendu côté serveur |
| 3 | `app/components/contact-card.tsx` | 35-47 | `<button>` imbriqué dans `<a>` → HTML invalide (spec HTML5) | Remplacer par `<a className="btn ...">` sans `<button>` enfant |
| 4 | `app/root.tsx` | 57-61 | Pas de `<main>` autour de `{children}` → contenu principal non délimité sémantiquement | Wraper `{children}` dans `<main id="main-content">` |
| 5 | `app/components/theme-toggle.tsx` | 3-6 | Hydration mismatch potentiel : `localStorage` appelé dans l'initializer `useState` → risque de divergence SSR/client | Inline script dans `<head>` + `suppressHydrationWarning` sur `<html>` |

### 🟠 Importants
| # | Fichier | Ligne | Problème | Fix |
|---|---------|-------|---------|-----|
| 6 | `app/components/hero.tsx` | ~62 | `document.getElementById("audit_modal") as HTMLDialogElement` → assertion non sécurisée | `instanceof HTMLDialogElement` check |
| 7 | `app/components/process.tsx` | ~35 | Idem `as HTMLDialogElement` | `instanceof HTMLDialogElement` check |
| 8 | `app/components/audit-form.tsx` | ~107 | Idem `as HTMLDialogElement` | Utiliser `instanceof` ou ref passée en prop |
| 9 | `app/components/audit-modal.tsx` | ~21 | Idem `as HTMLDialogElement` | Utiliser `useRef<HTMLDialogElement>` interne |
| 10 | `app/components/contact-card.tsx` | ~37 | `rel="noopener"` sans `noreferrer` sur lien externe Calendly | Ajouter `noreferrer` |
| 11 | `app/routes/legal-notice.tsx` | ~51 | `rel="noopener"` sans `noreferrer` sur lien Vercel | Ajouter `noreferrer` |
| 12 | `app/routes/contact.tsx` | - | `breadcrumbs.tsx` injecte aussi un BreadcrumbList JSON-LD et `contact.tsx` en inclut un dans meta() → **duplication** | Supprimer le BreadcrumbList du meta() de contact.tsx (laissé à breadcrumbs.tsx) |

### 🟡 Mineurs
| # | Fichier | Problème |
|---|---------|---------|
| 13 | `app/components/navbar.tsx` | `/projects` commenté dans navbar (cohérent avec l'absence du fichier) |
| 14 | `app/routes/contact.tsx` | Import de `MapPin` non utilisé |
| 15 | `app/components/contact-form.tsx` | `isSubmitSuccessful` destructuré mais non utilisé |
| 16 | `app/components/audit-form.tsx` | `isSubmitSuccessful` destructuré mais non utilisé |
| 17 | `app/components/faq-item.tsx` | `name="my-accordion-2"` codé en dur → si plusieurs FAQ sur la page, conflits radio |
| 18 | `data/questions.ts` | Réponses se terminent toutes par "Contactez‑moi pour un devis gratuit." → répétitif |

---

## 1.4 Performance

### Bundle & Code splitting
- `react-router.config.ts` : SSR activé (`ssr: true`) ✅
- Pas de `React.lazy` / `Suspense` pour les routes (React Router v7 gère le code splitting automatiquement via ses routes) ✅
- `vite.config.ts` minimal, pas de `rollup-plugin-visualizer` → impossible d'analyser le bundle ⚠️
- Dépendances lourdes notables : `lucide-react` (tree-shakeable ✅), DaisyUI v5 (CSS uniquement ✅)

### Images
- Hero image : `h-[580px]` fixe → **non responsive sur mobile** ⚠️ (doit être `h-auto` ou utiliser aspect-ratio)
- Hero image : `loading="eager"` ✅ (correct pour LCP above-the-fold)
- Pas de `loading="lazy"` vérifié sur toutes les images → à confirmer

### Fonts
- Urbanist chargée via `@font-face` dans `app.css` ✅
- `font-display: swap` configuré ✅
- Pas de `<link rel="preload">` pour les fonts → sous-optimal pour LCP ⚠️
- 4 fichiers `.woff2` (normal + italic, subset + complet) → subset à vérifier

### SSR / Performance critique
- **`JsonLd` injecte via `useEffect`** → JSON-LD absent du HTML initial → impact SEO ET performance perçue ❌
- Pas de headers de cache Vercel (`vercel.json` absent) ⚠️

---

## 1.5 SEO & Référencement

### Meta tags par route
| Route | title | description | canonical | OG | Twitter |
|-------|-------|-------------|-----------|-----|---------|
| `/` | ✅ | ✅ | ✅ `tagName: "link"` | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ `tagName: "link"` | ✅ | ❌ |
| `/services` | À vérifier | À vérifier | À vérifier | À vérifier | À vérifier |
| `/services/*` | ✅ (via seo.ts) | ✅ | ✅ | ✅ | À vérifier |
| `/politique-confidentialite` | ✅ | ✅ | ✅ | ✅ partiel | ❌ |
| `/mentions-legales` | ✅ | ✅ | ✅ | ✅ partiel | ❌ |
| `/404` | ✅ | ❌ | ❌ | ❌ | ❌ |

### JSON-LD
| Page | Schemas | SSR ? |
|------|---------|-------|
| `/` | Person, LocalBusiness, Organization, WebSite, WebPage, 4× Service | ❌ via useEffect (client-only) |
| `/contact` | WebPage/ContactPage, BreadcrumbList | ✅ via meta() + breadcrumbs.tsx (dupliqué) |
| `/services/*` | ServicePage, BreadcrumbList | ✅ via seo.ts |
| Autres | Aucun | — |

### Sitemap
- `public/sitemap.xml` statique avec `lastmod: 2025-10-15` ⚠️
- Inclut toutes les routes de service ✅
- Pas de robots meta `noindex` sur la page 404 ⚠️
- `robots.txt` correct ✅

### Problèmes SEO identifiés
| Sévérité | Problème |
|----------|---------|
| 🔴 | JSON-LD home.tsx (page la plus importante) non présent dans le HTML initial |
| 🟠 | Sitemap statique, non mis à jour automatiquement |
| 🟠 | Pas de hreflang (site potentiellement bilingue FR/EN) |
| 🟡 | Tags Twitter/OG manquants sur pages légales et 404 |
| 🟡 | `og:image:height` contact.tsx (`630`) ≠ home.tsx (`333`) → dimensions incohérentes |

---

## 1.6 Accessibilité (WCAG 2.1 AA)

### Problèmes identifiés
| Sévérité | Fichier | Problème |
|----------|---------|---------|
| 🔴 | `app/root.tsx` | Pas de skip-to-content link |
| 🔴 | `app/root.tsx` | Pas de `<main>` pour délimiter le contenu principal |
| 🟠 | `app/components/contact-card.tsx` | `<button>` dans `<a>` → non navigable au clavier correctement |
| 🟠 | `app/components/theme-toggle.tsx` | `aria-label="Theme Toggle"` en anglais sur un site FR-CA |
| 🟠 | `app/components/audit-modal.tsx` | Modale sans `aria-labelledby` ni `aria-describedby` |
| 🟡 | `app/components/navbar.tsx` | `aria-expanded="false"` codé en dur → ne se met pas à jour au clic |
| 🟡 | `app/components/faq-item.tsx` | `collapse` DaisyUI avec `input[type=radio]` → navigation clavier non standard |
| 🟡 | `app/routes/contact.tsx` | "interéssé" → faute de frappe (devrait être "intéressé") |

### Points positifs accessibilité ✅
- `aria-hidden="true"` sur les icônes décoratives (navbar, service-card)
- `aria-label` sur le bouton mobile hamburger
- `aria-expanded` + `aria-haspopup` sur le ServiceDropdown
- `aria-current="page"` sur le breadcrumb actif
- `alt` descriptif sur l'image hero
- `role="menu"` + `role="menuitem"` dans le dropdown

---

## 1.7 Sécurité

| Sévérité | Problème | Fix |
|----------|---------|-----|
| 🟠 | `VITE_API_URL` exposé côté client (préfixe VITE_) — intentionnel si API publique, sinon déplacer dans les actions serveur | Documenter l'intention ou migrer vers `loader`/`action` React Router |
| 🟠 | Pas de headers sécurité (CSP, X-Frame-Options, X-Content-Type-Options) | Créer `vercel.json` avec headers |
| 🟠 | `catch (err: any)` dans 2 formulaires → potentiel leak d'info si `err.message` contient des données sensibles | Typer `unknown`, filtrer `err.message` |
| 🟡 | `rel="noopener"` sans `noreferrer` sur 2 liens externes | Ajouter `noreferrer` |
| 🟡 | Pas de `.env.example` → variables non documentées | Créer `.env.example` |
| 🟡 | Rate limiting absent côté front (bouton submit réactivable immédiatement) | Désactiver X secondes après envoi |

---

## 1.8 UX/UI & Design System

| Sévérité | Problème |
|----------|---------|
| 🟠 | Toast sans auto-dismiss → reste visible indéfiniment sans interaction |
| 🟠 | Image héros `h-[580px]` fixe → crop brutal sur mobile et tablette |
| 🟡 | Theme toggle : flash potentiel (FOUC) lors du passage SSR→client |
| 🟡 | Pas de skeleton/loading states pour les pages avec data |
| 🟡 | Bouton "Réservez votre audit" dupliqué (Hero + Process) → cohérence OK mais wording identique |
| 🟡 | "Réservez votre audit gratuit dès maintenant" — trop long pour un bouton (best practice : ≤ 5 mots) |

---

## Synthèse des priorités

### 🔴 Critique (à corriger immédiatement)
1. `json-ld.tsx` — Réécrire pour compatibilité SSR (`dangerouslySetInnerHTML`)
2. `home.tsx` — Supprimer code mort (état `globalToast`)
3. `contact-card.tsx` — Corriger HTML invalide (`<button>` dans `<a>`)
4. `root.tsx` — Ajouter `<main id="main-content">` + skip-to-content
5. `theme-toggle.tsx` — Corriger hydration mismatch SSR

### 🟠 Important (à corriger en priorité 2)
6. Tous les `catch (err: any)` → `unknown`
7. Toutes les assertions `as HTMLDialogElement` → `instanceof`
8. Imports `React` inutiles dans 3 fichiers
9. Créer `vercel.json` (headers sécurité + cache)
10. Import `MapPin` inutilisé dans `contact.tsx`
11. Aria-label ThemeToggle en français

### 🟡 Mineur (à corriger ensuite)
12. `isSubmitSuccessful` destructuré mais non utilisé (2 fichiers)
13. Import de type `Route` depuis mauvais fichier (3 fichiers)
14. `rel="noopener"` sans `noreferrer` (2 fichiers)
15. Déstructuration `key: string` dans `service-card.tsx`
16. Auto-dismiss sur les toasts
17. Créer `.env.example`
18. Image héros responsive

---

## Phase 3 — Fonctionnalités à implémenter
- [ ] Blog MDX (`lib/content.server.ts` + 3 routes blog)
- [ ] Page About (`app/routes/about.tsx`)
- [ ] Page Projets (`app/routes/projects.tsx` + `data/projects.ts`)
- [ ] Sitemap dynamique (route `sitemap[.]xml.tsx`)
- [ ] RSS Feed (`feed[.]xml.tsx`)
- [ ] Animations d'entrée (Intersection Observer)
- [ ] Formulaires : honeypot anti-spam, composant `FormField` partagé

## Phase 4 — Optimisations
- [ ] Tests (Vitest + React Testing Library + Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] `rollup-plugin-visualizer` dans `vite.config.ts`
- [ ] Preload fonts Urbanist
- [ ] `noUnusedLocals: true` dans `tsconfig.json`
- [ ] README.md complet
