import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import AuditModal from "./components/audit-modal";
import { ToastProvider } from "./context/toast-context";
import ErrorPage, { NOT_FOUND_MESSAGE } from "./components/error-page";

// Force le pathname en minuscules pour éliminer la duplication de contenu
// (ex. /SERVICES, /About, /Blog renvoyaient HTTP 200 avec le même contenu).
// 308 = permanent + préserve méthode, recommandé par GSC.
// `url` et non `request.url` : avec v8_passThroughRequests, `request.url` d'une
// requête de données garde le suffixe `.data`.
export function loader({ url }: Route.LoaderArgs) {
  if (/[A-Z]/.test(url.pathname)) {
    const target = new URL(url);
    target.pathname = target.pathname.toLowerCase();
    throw redirect(target.toString(), 308);
  }
  return null;
}

// Le HTML ne dépend ni du visiteur ni de cookies (thème et formulaires sont
// gérés côté client) : le CDN de Vercel peut le servir depuis son cache.
// s-maxage ne vise que le CDN, purgé à chaque déploiement ; le navigateur
// revalide toujours (max-age=0). Une page d'erreur n'est jamais mise en cache.
// S'applique à toutes les routes qui n'exportent pas leur propre headers().
export function headers({ errorHeaders }: Route.HeadersArgs) {
  if (errorHeaders) return { "Cache-Control": "no-store" };
  return {
    "Cache-Control":
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Script anti-FOUC : applique le thème (choix enregistré, sinon préférence
            système) avant l'hydratation React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <Meta />
        {/* Preload du subset latin (normal) utilisé au-dessus du pli ; latin-ext
            et italique ne chargent que si la page en contient (unicode-range). */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/L0x-DF02iFML4hGCyMqlbS0.woff2" crossOrigin="anonymous" />
        {/* Pas de hreflang : site monolingue (lang="fr-CA" suffit). Une balise
            globale pointerait toutes les pages vers l'accueil. */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Pierre Barbé" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Blog — Pierre Barbé"
          href="/blog/feed.xml"
        />

        {/* og:type / og:site_name / og:locale sont définis par le meta() de
            chaque route — les répéter ici créait des doublons contradictoires. */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@PierreBarbe" />
        <meta name="twitter:site" content="@PierreBarbe" />
        <Links />
      </head>
      <body>
        <ToastProvider>
          {/* Lien d'évitement pour l'accessibilité */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:btn focus:btn-primary focus:rounded-full"
          >
            Aller au contenu principal
          </a>
          <NavBar />
          <main id="main-content">
            {children}
            {/* Fenêtre de demande d'audit, ouverte par tous les AuditButton */}
            <AuditModal />
          </main>
          <Footer />
        </ToastProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Rendu à l'intérieur du Layout (en-tête, <main>, pied de page).
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <ErrorPage title="404" message={NOT_FOUND_MESSAGE} />;
  }

  // En production, aucun détail technique n'est montré au visiteur.
  const devError = import.meta.env.DEV && error instanceof Error ? error : null;

  return (
    <ErrorPage
      title={isRouteErrorResponse(error) ? `Erreur ${error.status}` : "Erreur"}
      message={
        devError?.message ??
        "Une erreur inattendue s'est produite. Réessayez dans un instant."
      }
      stack={devError?.stack}
    />
  );
}
