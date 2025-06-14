import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import ContactCard from "./components/contact-card";
import { ToastProvider } from "./context/toast-context";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link
          rel="icon"
          type="image/png"
          href="favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Pierre Barbé" />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        <meta property="og:site_name" content="Pierre Barbé Web" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@PierreBarbe" />
        <meta name="twitter:site" content="@PierreBarbe" />
        <Links />
      </head>
      <body>
        <ToastProvider>
          <NavBar />
          {children}
          <ContactCard />
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
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
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
