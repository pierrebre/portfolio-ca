# SEO — État courant et actions

**Dernier audit complet :** 2026-04-21 (score 73/100, brut local dans `audit-2026-04-21/`, gitignoré)
L'historique de ce qui a été fait est dans `git log` ; ce fichier ne liste que les actions ouvertes.
**Dernière mise à jour de ce doc :** 2026-09-24

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
- [ ] **#17** Ajouter `ga4_property_id` dans `~/.config/claude-seo/google-api.json` + accès Viewer au service account

---

## Important (ce mois)

### Contenu
- [ ] **#14** Pillar page WordPress (3 500+ mots) — promouvoir `wordpress-pme-quebec-2026` ou créer `/guide-wordpress-pme-quebec`
- [ ] **#15** Cluster Loi 25 : 2-3 spokes (checklist, politique de confidentialité, Loi 25 vs RGPD)
- [ ] **#16** AI citation readiness sur 5 top posts (TL;DR opening, stats datées avec sources, entity callouts)
- [ ] **#9** Per-post OG images (3-5 cards manuelles ou générateur build-time)

### Technique
- [ ] **#21** Image sitemap pour projets + posts blog
- [ ] **#23** Soumettre HSTS preload sur https://hstspreload.org

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
