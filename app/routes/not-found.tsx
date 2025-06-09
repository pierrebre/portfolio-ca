import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Page non trouvée | Pierre Barbé" }];
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
