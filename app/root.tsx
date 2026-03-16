import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import ContactCard from "./components/contact-card";
import { ToastProvider } from "./context/toast-context";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const hideContactCardOn = ["/contact"];
  const shouldShowContactCard = !hideContactCardOn.includes(location.pathname);

  return (
    <html lang="fr-CA" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Script anti-FOUC : applique le thème avant l'hydratation React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <Meta />
        {/* Preload des fonts Urbanist pour éviter le FOUT */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/L0x-DF02iFML4hGCyMqrbS10ig.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/L0x-DF02iFML4hGCyMqlbS0.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/L0x4DF02iFML4hGCyMqgXS9sjg.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/L0x4DF02iFML4hGCyMqgXSFsjkK3.woff2" crossOrigin="anonymous" />
        {/* Preload de l'image hero (LCP) */}
        <link rel="preload" as="image" type="image/avif" href="/images/me-800.avif" />
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

<meta property="og:site_name" content="Pierre Barbé" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_CA" />

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
          </main>
          {shouldShowContactCard && <ContactCard />}
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Une erreur inattendue s'est produite.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erreur";
    details =
      error.status === 404
        ? "La page demandée est introuvable."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
