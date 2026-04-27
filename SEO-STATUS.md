# SEO — État courant et actions

**Dernier audit complet :** 2026-04-21 (score 73/100, brut local dans `audit-2026-04-21/`, gitignoré)
**Dernière mise à jour de ce doc :** 2026-04-27

---

## Fait depuis l'audit

### Commit `00eda01` — schema graph, sitemap, cannibalisation (2026-04-26)
- **Tier 1 #3** Redirects 308 sur variantes uppercase (`/SERVICES`, `/About`, `/Blog`, `/Contact`) — vérifié en prod
- **Tier 1 #5** Cannibalisation `/blog/audit-performance-site-web` vs `/services/audits-techniques-core-web-vitals` — CTA commercial du blog remplacé par section informationnelle "Pour aller plus loin"
- **Tier 2 #8** `updatedDate` ajouté en frontmatter sur 5 posts révisés (chatbot-ia, audit-performance, optimisation-vitesse-wordpress, automatiser-business-n8n-pme, developpeur-web-freelance-montreal)
- **Tier 2 #12** Schema graph nettoyé :
  - `FAQPage` `@id` partagé via `app/components/faq.tsx`, référencé depuis `WebPage.mainEntity` sur la home
  - `LocalBusiness.name` standardisé à "Pierre Barbé" (home + contact)
  - Geo coords passées de 4 → 5 décimales
  - `areaServed` aligné (Montréal, Laval, Longueuil)
  - `WebSite.potentialAction` (SearchAction) ajouté à la home
  - `Person.worksFor` ajouté
  - Projets : upgrade `WebPage` → `Article`
  - `Offer` ajouté sur 3 pages services (maintenance, automatisation, audit)
  - Auteurs/publishers blog : passage à `@id` refs (plus d'inline duplication)
- **Tier 2 #13** Sitemap : `/projects` ajouté, `priority` et `changefreq` retirés, `lastmod` dynamique
- **Tier 3 #27** Blog index H1 enrichi
- **Tier 3 #28** Bio auteur déjà présente dans le template

### Commit `ada1439` — quick wins contenu (2026-04-27)
- Table snippet "vue d'ensemble" en haut de `cout-site-web-quebec-prix.mdx`
- Table comparative tarifaire en haut de `n8n-vs-zapier-vs-make-pme-2026.mdx`
- Date "Mis à jour le …" rendue visible dans `blog.$slug.tsx` quand `updatedDate ≠ date`
- Taux horaire corrigé partout : **à partir de 75 $/h** (était écrit 95-110)

### Avant l'audit (rappel)
- IndexNow + GitHub Action post-deploy (`74975b1`)
- Pages légales (Loi 25) (`e329fe8`)
- Sitemap nettoyé des pages noindex (`7649e67`)
- /about + /services + FAQ partagé (`23d63c6`)

---

## Urgent (à faire cette semaine)

### Manuel — bloquants
- [ ] **GSC service account** — donner accès Full à `seo-763@silken-realm-487320-p1.iam.gserviceaccount.com` (Settings → Users and permissions). Sans ça, tout audit futur est aveugle.
- [ ] **Google Business Profile** — créer en mode SAB (Service Area Business), catégorie *Web designer*, zone Grand Montréal. Lien vers `https://pierrebarbe.ca/` pour l'instant.
- [ ] **Soumettre le sitemap dans GSC** + demander réindexation des 4 pages modifiées (services + projets)
- [ ] **Rich Results Test** sur home, /contact, /services/*, /blog/*, /projects/* pour valider les changements schema

### Code — Tier 1 restant
- [ ] **Tier 1 #4** Landing transactionnelle `/developpeur-web-montreal` (4-6 h) — séparée de l'article blog. Schema `LocalBusiness` + `Service` avec `@id` propre. Highest commercial-value local query.
- [ ] **Tier 1 #6** Section témoignages sur home ou /projects (3-5 quotes réels), puis `AggregateRating` une fois 5+ reviews Google collectées

### Code — Tier 2 quick wins (≤ 30 min chacun)
- [ ] **#7** Ajouter `<link rel="alternate" hrefLang="fr-CA">` + `x-default` dans `app/root.tsx`
- [ ] **#10** Créer `app/routes/feed[.]xml.tsx` (RSS) sur le modèle de `sitemap[.]xml.tsx`
- [ ] **#11** Réduire les font preloads de 4 à 1 dans `app/root.tsx:37-40`
- [ ] **#17** Ajouter `ga4_property_id` dans `~/.config/claude-seo/google-api.json` + accès Viewer au service account

---

## Important (ce mois)

### Contenu
- [ ] **#14** Pillar page WordPress (3 500+ mots) — promouvoir `wordpress-pme-quebec-2026` ou créer `/guide-wordpress-pme-quebec`
- [ ] **#15** Cluster Loi 25 : 2-3 spokes (checklist, politique de confidentialité, Loi 25 vs RGPD)
- [ ] **#16** AI citation readiness sur 5 top posts (TL;DR opening, stats datées avec sources, entity callouts)
- [ ] **#9** Per-post OG images (3-5 cards manuelles ou générateur build-time)

### Technique
- [ ] **#18** Re-export `pb-og-image.jpg` à qualité 45-55 (~120 KB)
- [ ] **#19** Re-encoder hero `me.avif` qualité 62, max 1600px (~100 KB)
- [ ] **#20** `prefers-reduced-motion` dans `app/app.css`
- [ ] **#21** Image sitemap pour projets + posts blog
- [ ] **#22** `Cross-Origin-Opener-Policy: same-origin` dans `vercel.json`
- [ ] **#23** Soumettre HSTS preload sur https://hstspreload.org
- [ ] **#26** Vérifier que la branch trigger d'IndexNow est bien `master` (prod), pas `develop`

### Autorité
- [ ] **#24** Profil Clutch.co (gratuit), 2-3 reviews clients passés
- [ ] **#25** Pitch article guest sur Infopresse (Loi 25 pour PME)

---

## Backlog

- Content-hash sur `/images/*` pour `max-age=31536000, immutable` (au prochain refactor assets)
- Niche directories : Québec Numérique, Techno Montréal, La Vitrine
- Podcast circuit (1 / trimestre)
- n8n community template (backlink contextuel)
- Cluster expansion : Automation & AI, Local SEO / Pricing
- Moz API + Bing Webmaster Tools (quand referring domains apparaissent)
- Google Alerts sur "Pierre Barbé"

---

## Référence

Audit brut Apr 21-23 (gitignoré, conservé en local) : `audit-2026-04-21/`
- `FULL-AUDIT-REPORT.md` — rapport complet avec scores
- `ACTION-PLAN.md` — plan détaillé tiers 1-4 (source de ce doc)
- `cluster.md`, `geo.md`, `local.md`, `schema.md`, `sxo.md`, `technical.md`, `content.md` — analyses par axe
