# pierrebarbe.ca

Site de Pierre Barbé, développeur web freelance à Montréal.

React Router v7 (SSR) · Tailwind CSS v4 + daisyUI 5 · articles en MDX · hébergé sur Vercel.

## Commandes

```bash
pnpm install
pnpm dev         # http://localhost:5173
pnpm typecheck   # typegen React Router + tsc
pnpm build       # build de production
pnpm start       # sert le build en local
pnpm indexnow    # soumet toutes les URLs du sitemap à IndexNow
```

## Structure

| Chemin | Contenu |
| --- | --- |
| `app/routes.ts` | Déclaration des routes (URLs en français) |
| `app/routes/` | Pages |
| `app/components/` | Composants partagés |
| `app/lib/` | `content.server.ts` (lecture des articles MDX), `api.ts` (envoi des formulaires) |
| `app/utils/` | Meta et JSON-LD (`seo.ts`), dates, catégories du blog |
| `content/blog/*.mdx` | Articles. Frontmatter : `title`, `description`, `date`, `updatedDate`, `category`, `excerpt`, `faq` |
| `data/` | Services, projets, FAQ, étapes du processus |
| `public/` | Images, polices auto-hébergées, `robots.txt`, `llms.txt`, clé IndexNow |

## Variables d'environnement

- `VITE_API_URL` : URL de l'API qui reçoit les formulaires (`/send-email`, `/request-audit`). Injectée dans le bundle au build.

## Déploiement

Vercel déploie `master`. Le HTML est servi depuis le cache du CDN (1 h, purgé à chaque déploiement) ; les en-têtes de sécurité (CSP, HSTS…) sont dans `vercel.json`. À chaque push sur `master`, `.github/workflows/post-deploy.yml` soumet les URLs modifiées à IndexNow (correspondance fichier → URL dans `scripts/changed-urls.sh`) et lance PageSpeed Insights (secret `PSI_API_KEY`). Sur chaque pull request, `.github/workflows/ci.yml` vérifie le lockfile, les types, le build, `pnpm audit` et le rendu de toutes les URL du sitemap.
