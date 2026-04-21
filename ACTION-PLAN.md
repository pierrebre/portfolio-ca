# Plan d'action SEO — pierrebarbe.ca

**Date :** 2026-04-06 | **Score actuel :** 83/100 | **Cible :** 90/100

---

## CRITIQUE (fix immédiatement)

### 1. Ajouter des images uniques par article de blog
- **Impact :** Content quality +5, Images +15, CTR social
- **Effort :** 2-3 heures (génération IA ou Unsplash/Pexels)
- **Détail :** Chaque article doit avoir une hero image unique avec alt text descriptif en FR-CA. Utiliser des images 1200x630 pour le OG et une version responsive pour le contenu.
- **Fichiers :** `content/blog/*.mdx` (ajouter champ `image` dans frontmatter), `app/routes/blog/blog.$slug.tsx` (déjà supporte `post.image`)

### 2. Créer `llms-full.txt`
- **Impact :** AI Search Readiness +5
- **Effort :** 30 minutes
- **Détail :** `llms.txt` existe déjà (bien structuré). Ajouter `llms-full.txt` avec le contenu complet des pages principales pour ingestion LLM approfondie.
- **Fichiers :** `public/llms-full.txt`

---

## HIGH (fix dans la semaine)

### 3. Ajouter des images dans le contenu MDX des articles
- **Impact :** Content quality +3, Images +10, engagement
- **Effort :** 3-4 heures
- **Détail :** Au minimum 1-2 images/illustrations par article (captures d'écran, diagrammes, tableaux visuels). Ajouter des attributs `alt`, `width`, `height`, `loading="lazy"`.

### 4. Convertir OG image en WebP
- **Impact :** Performance +2, réduction 234 Ko par partage social
- **Effort :** 15 minutes
- **Détail :** Convertir `pb-og-image.jpg` (314 Ko) en WebP (~80 Ko). Les plateformes sociales supportent WebP depuis 2024.
- **Fichier :** `public/images/pb-og-image.webp`, mettre à jour les références dans le code.

### 5. Ajouter témoignages clients avec Review schema
- **Impact :** E-E-A-T +5, Schema +3, trust signals
- **Effort :** 2 heures
- **Détail :** Collecter 3-5 témoignages clients et les afficher sur la home/services avec schema `Review` ou `AggregateRating`.

### 6. Améliorer le maillage services → blog
- **Impact :** On-Page SEO +3, crawl depth
- **Effort :** 1 heure
- **Détail :** Chaque page service devrait lier vers 2-3 articles de blog pertinents (section "Lire aussi"). Seule `/services/creation-maintenance-sites` le fait actuellement.
- **Fichiers :** `app/routes/services/*.tsx`

---

## MEDIUM (fix dans le mois)

### 7. Enrichir la page Contact title tag
- **Impact :** On-Page SEO +1
- **Effort :** 5 minutes
- **Détail :** Changer "Contact et devis de site web à Montréal" → "Contact — Devis site web à Montréal | Pierre Barbé"
- **Fichier :** `app/routes/contact.tsx`

### 8. Ajouter `noindex` aux pages légales
- **Impact :** Technical SEO +1, crawl budget
- **Effort :** 5 minutes
- **Détail :** `/mentions-legales` et `/politique-confidentialite` n'apportent pas de valeur SEO.
- **Fichiers :** `app/routes/legal-notice.tsx`, `app/routes/privacy-policy.tsx`

### 9. Réduire les font preloads de 4 à 2
- **Impact :** Performance +1
- **Effort :** 10 minutes
- **Détail :** Ne précharger que Urbanist Regular et Bold. Les variantes italic/medium peuvent être chargées en différé.
- **Fichier :** `app/root.tsx` (lignes 37-40)

### 10. Ajouter des images OG uniques par page service
- **Impact :** Images +5, CTR social
- **Effort :** 2 heures
- **Détail :** Créer des images OG 1200x630 spécifiques pour chaque service et la page projets.

### 11. Convertir logo PNG en SVG
- **Impact :** Performance +1, Images +2
- **Effort :** 30 minutes
- **Détail :** `pierre-barbe-logo.png` (70 Ko) → SVG pour le schema et le web manifest.

### 12. Ajouter HowTo schema sur les articles guides
- **Impact :** Schema +2, rich results
- **Effort :** 1 heure
- **Détail :** Les articles comme "Sécuriser WordPress", "Audit performance", "Core Web Vitals" sont des guides étape par étape qui bénéficieraient du markup HowTo.

### 13. Enrichir la page Projects avec plus d'études de cas
- **Impact :** Content quality +3, E-E-A-T +2
- **Effort :** 3-4 heures par étude de cas
- **Détail :** Actuellement 1 étude de cas complète + 2 résumés. Viser 3-5 études complètes avec métriques avant/après.

---

## LOW (backlog)

### 14. Ajouter citation capsules dans les articles de blog
- **Impact :** AI Search Readiness +3
- **Effort :** 2-3 heures
- **Détail :** Courts paragraphes auto-contenus avec source, chiffre, et contexte — optimisés pour être cités par les LLM dans les AI Overviews.

### 15. Ajouter `article:tag` meta pour les articles de blog
- **Impact :** On-Page SEO +1
- **Effort :** 15 minutes
- **Détail :** Les tags/catégories existent dans les articles mais ne sont pas exposés dans les meta tags `article:tag`.
- **Fichier :** `app/routes/blog/blog.$slug.tsx`

### 16. Implémenter `loading="lazy"` sur les images hors viewport
- **Impact :** Performance +1
- **Effort :** 30 minutes
- **Détail :** Les composants services, results, projects devraient lazy-loader leurs images (quand des images y seront ajoutées).

### 17. Ajouter une page auteur dédiée `/blog/auteur/pierre-barbe`
- **Impact :** E-E-A-T +2
- **Effort :** 1-2 heures
- **Détail :** Page auteur avec bio complète, liste des articles, liens sociaux — renforce le signal d'expertise pour Google.

---

## Impact projeté

| Action | Score impact estimé |
|--------|-------------------|
| Images blog uniques (#1, #3) | +8 |
| llms-full.txt (#2) | +3 |
| Témoignages + Review schema (#5) | +3 |
| Maillage services→blog (#6) | +2 |
| WebP OG image (#4) | +1 |
| Autres medium/low | +3 |
| **Total projeté** | **~90/100** |

---

## Prochaines étapes recommandées

1. **Semaine 1** : Items #1 (images blog) et #2 (llms.txt) — impact le plus élevé
2. **Semaine 2** : Items #3 (images MDX), #4 (WebP), #5 (témoignages)
3. **Semaine 3** : Items #6-#8 (maillage, contact title, noindex légales)
4. **Mois 2** : Items #9-#17 (optimisations incrémentales)
