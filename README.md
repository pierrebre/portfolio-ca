# pierrebarbe.ca

Site de Pierre Barbé, développeur web freelance à Montréal.

React Router v7 (SSR, comportements v8 activés) · Tailwind CSS v4 + daisyUI 5 · articles en MDX · hébergé sur Vercel.

## Commandes

```bash
pnpm install
pnpm dev         # http://localhost:5173
pnpm typecheck   # typegen React Router + tsc
pnpm build       # build de production
pnpm start       # sert le build en local
pnpm indexnow    # soumet toutes les URLs du sitemap à IndexNow
pnpm lastmod     # build puis dates du sitemap des pages fixes (data/lastmod.json)
```

## Structure

| Chemin | Contenu |
| --- | --- |
| `app/routes.ts` | Déclaration des routes (URLs en français) |
| `app/routes/` | Pages |
| `app/components/` | Composants partagés |
| `app/lib/` | `content.server.ts` (articles), `projects.server.ts` (projets), `mdx.server.ts` (MDX → HTML), `api.ts` (envoi des formulaires) |
| `app/utils/` | Meta et JSON-LD (`seo.ts`), dates, catégories du blog |
| `content/blog/*.mdx` | Articles. Frontmatter : `title`, `description`, `date`, `updatedDate`, `category`, `excerpt`, `faq` |
| `content/projects/*.mdx` | Projets : frontmatter pour la carte de `/projects`, corps MDX pour l'étude de cas détaillée |
| `data/` | Services, prix (`pricing.ts`), FAQ, étapes du processus, dates du sitemap (`lastmod.json`) |
| `public/` | Images, polices auto-hébergées, `robots.txt`, `llms.txt`, clé IndexNow |

## Variables d'environnement

- `VITE_API_URL` : URL de l'API qui reçoit les formulaires (`/send-email`, `/request-audit`). Injectée dans le bundle au build.

## Déploiement

Vercel déploie `master`. Le HTML est servi depuis le cache du CDN (1 h, purgé à chaque déploiement) ; les en-têtes de sécurité (CSP, HSTS…) sont dans `vercel.json`. À chaque push sur `master`, `.github/workflows/post-deploy.yml` soumet les URLs modifiées à IndexNow (`scripts/changed-urls.sh` : articles et projets modifiés, pages fixes dont la date a changé dans `data/lastmod.json`) et lance PageSpeed Insights (secret `PSI_API_KEY`). Sur chaque pull request, `.github/workflows/ci.yml` vérifie le lockfile, les types, le build, `pnpm audit`, les dates de `data/lastmod.json` et le rendu de toutes les URL du sitemap.
