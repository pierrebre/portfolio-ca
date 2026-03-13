import type { Route } from "./+types/not-found";

export function loader() {
  throw new Response(null, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page non trouvée (404) | Pierre Barbé" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "description", content: "Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour trouver ce que vous cherchez." },
    { tagName: "link", rel: "canonical", href: "https://pierrebarbe.ca/" },
    { property: "og:title", content: "Page non trouvée | Pierre Barbé" },
    { property: "og:description", content: "Cette page n'existe pas. Retournez à l'accueil." },
    { property: "og:url", content: "https://pierrebarbe.ca/" },
  ];
}

export default function NotFound() {
  return (
    <div className="bg-base-100 font-urbanist mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="text-primary text-6xl font-bold mb-6">404</h1>
      <p className="text-base-content/80 mb-8 text-lg">
        Oups ! La page que vous recherchez est introuvable.
      </p>
      <a href="/" className="btn btn-primary rounded-full">
        Retour à l’accueil
      </a>
    </div>
  );
}
