# Conventions du projet

Commandes et structure : voir `README.md`. Vérifier avec `pnpm typecheck && pnpm build` avant de pousser. Si le contenu d'une page fixe change, lancer `pnpm lastmod` et committer `data/lastmod.json`. La CI (`.github/workflows/ci.yml`) refait ces vérifications sur chaque PR, plus `pnpm audit`, `lastmod` et un rendu de toutes les URL du sitemap.

## Contenu

- Site en français (fr-CA). Titres ≤ 60 caractères, meta descriptions ≤ 160.
- Nouvel article : `content/blog/<slug>.mdx`, slug en `[a-z0-9-]`. Un article daté dans le futur est programmé (ni listé ni servi).
- Projet : `content/projects/<slug>.mdx`. Le frontmatter fait la carte de `/projects` ; un corps non vide crée l'étude de cas `/projects/<slug>` (champs dans `app/lib/projects.server.ts`, exemple complet : `piscines-jolicoeur.mdx`).
- Afficher une date d'article avec `formatPostDate` (`app/utils/date.ts`) : un formatage local décale d'un jour et casse l'hydratation.

## Nouvelle page

1. Route dans `app/routes.ts`.
2. `meta()` complet : `og:type`, `og:site_name` et `og:locale` compris (root.tsx ne les définit pas). `generateSEOMeta` (`app/utils/seo.ts`) couvre le cas standard.
3. JSON-LD via `<JsonLd>`. Auteur et éditeur inlinés avec `AUTHOR_SCHEMA` / `PUBLISHER_SCHEMA` : Google ne résout pas un `@id` défini sur une autre page.
4. Ajouter l'URL à `data/lastmod.json` (`"/ma-page": {}`) puis lancer `pnpm lastmod` : le sitemap et IndexNow (`scripts/changed-urls.sh`) en dépendent.

## Offre et prix

- Tous les prix et délais viennent de `data/pricing.ts` (heures × taux horaire de 75 $/h) : jamais de montant en dur dans une page ou une FAQ. Les articles MDX citent quelques chiffres en dur (coût d'un site, maintenance) : les mettre à jour si la grille change.
- Appel à l'action principal : `AuditButton` (libellé et offre dans `FREE_AUDIT`), qui ouvre la fenêtre d'audit rendue une seule fois dans `root.tsx` (côté client uniquement). Fin de page : un seul `CtaSection` (aucun sur les pages légales, la 404 et `/contact`).

## Code

- Liens internes avec `<Link>`, jamais `<a href="/…">` (rechargement complet).
- Classes Tailwind écrites en entier, jamais construites (`alert-${type}` n'est pas généré).
- Texte sur fond `primary` : `text-primary-content` (blanc en clair, sombre en mode sombre : palette réglée dans `app.css` pour le contraste AA).
- Texte secondaire : au moins `text-base-content/70` (en dessous, contraste insuffisant). Rouge/vert en texte : `text-red-700 dark:text-red-400` / `text-green-700 dark:text-green-400` (`error`/`success` de daisyUI sont trop clairs).
- Lien au milieu d'un paragraphe : souligné (la couleur seule ne suffit pas).
- Menus déroulants : bouton avec `aria-expanded`/`aria-controls` et `useDismiss` (Échap, clic extérieur), pas de rôle ARIA `menu`.
- Police : Urbanist est la police par défaut, pas de classe à ajouter.
- Formulaires : `postToApi` (`app/lib/api.ts`), `FormField`, `HoneypotField` et bouton désactivé avant hydratation (`useHydrated`) ; les messages d'erreur montrés au visiteur ne doivent jamais être techniques.
- Le HTML est mis en cache par le CDN (`headers()` dans `root.tsx`) : le rendu serveur ne doit rien contenir de propre à un visiteur.
- Dépendances : `pnpm audit` doit rester vide ; le lockfile doit passer `pnpm install --frozen-lockfile` (c'est ce que fait Vercel).
