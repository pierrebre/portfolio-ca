import { data } from "react-router";
import ErrorPage, { NOT_FOUND_MESSAGE } from "~/components/error-page";
import type { Route } from "./+types/not-found";

export async function loader() {
  return data(null, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page non trouvée (404) | Pierre Barbé" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "description", content: "Cette page n'existe pas ou a été déplacée. Retourne à l'accueil pour trouver ce que tu cherches." },
    { property: "og:title", content: "Page non trouvée | Pierre Barbé" },
    { property: "og:description", content: "Cette page n'existe pas. Retourne à l'accueil." },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
  ];
}

export default function NotFound() {
  return <ErrorPage title="404" message={NOT_FOUND_MESSAGE} />;
}
