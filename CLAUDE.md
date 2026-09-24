# Conventions du projet

Commandes et structure : voir `README.md`. Vérifier avec `pnpm typecheck && pnpm build` avant de pousser (pas de tests automatisés).

## Contenu

- Site en français (fr-CA). Titres ≤ 60 caractères, meta descriptions ≤ 160.
- Nouvel article : `content/blog/<slug>.mdx`, slug en `[a-z0-9-]`. Un article daté dans le futur est programmé (ni listé ni servi).
- Afficher une date d'article avec `formatPostDate` (`app/utils/date.ts`) : un formatage local décale d'un jour et casse l'hydratation.

## Nouvelle page

1. Route dans `app/routes.ts`.
2. `meta()` complet : `og:type`, `og:site_name` et `og:locale` compris (root.tsx ne les définit pas). `generateSEOMeta` (`app/utils/seo.ts`) couvre le cas standard.
3. JSON-LD via `<JsonLd>`. Auteur et éditeur inlinés avec `AUTHOR_SCHEMA` / `PUBLISHER_SCHEMA` : Google ne résout pas un `@id` défini sur une autre page.
4. Ajouter l'URL au sitemap (`app/routes/sitemap[.]xml.tsx`, `lastmod` manuel) et à `scripts/changed-urls.sh`.

## Code

- Liens internes avec `<Link>`, jamais `<a href="/…">` (rechargement complet).
- Classes Tailwind écrites en entier, jamais construites (`alert-${type}` n'est pas généré).
- Texte sur fond `primary` : `text-primary-content` (forcé en blanc dans `app.css` pour le contraste AA).
- Police : Urbanist est la police par défaut, pas de classe à ajouter.
- Formulaires : `postToApi` (`app/lib/api.ts`) et `FormField` ; les messages d'erreur montrés au visiteur ne doivent jamais être techniques.
