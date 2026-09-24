import { Link } from "react-router";

interface ErrorPageProps {
  title: string;
  message: string;
  /** Pile d'appels, affichée en développement uniquement. */
  stack?: string;
}

/** Page d'erreur : route 404 et ErrorBoundary racine (article inexistant…). */
export default function ErrorPage({ title, message, stack }: ErrorPageProps) {
  return (
    <div className="bg-base-100 mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="text-primary text-6xl font-bold mb-6">{title}</h1>
      <p className="text-base-content/80 mb-8 text-lg">{message}</p>
      <Link to="/" className="btn btn-primary rounded-full">
        Retour à l’accueil
      </Link>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto p-4 text-left">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}

export const NOT_FOUND_MESSAGE =
  "Oups ! La page que tu cherches est introuvable.";
