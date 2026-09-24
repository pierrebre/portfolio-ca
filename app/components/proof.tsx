import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { ProjectMeta } from "~/lib/projects.server";

const shortClient = (client: string) => client.replace(/\s*\(.*\)$/, "");
const place = (client: string) => client.match(/\((.*)\)$/)?.[1];

/**
 * Preuves de l'accueil, tirées de content/projects : l'étude de cas détaillée
 * en vedette, puis les autres projets avec leurs mesures avant/après.
 */
export default function Proof({ projects }: { projects: ProjectMeta[] }) {
  const featured = projects.find((p) => p.href);
  const others = projects.filter((p) => p !== featured && p.metrics.length > 1);
  if (!featured && others.length === 0) return null;

  return (
    <section className="bg-base-100 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <header className="max-w-2xl">
            <p className="text-primary text-sm font-semibold">Projets récents</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Des résultats mesurés, chez des PME d'ici
            </h2>
          </header>
          <Link to="/projects" className="text-primary inline-flex items-center gap-1 font-semibold underline underline-offset-4">
            Tous les projets
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {featured?.href && (
            <Link
              to={featured.href}
              aria-labelledby="proof-featured-title"
              className="border-base-content/10 hover:border-primary/40 bg-base-200 flex flex-col rounded-xl border p-6 transition-colors md:p-8 lg:col-span-7"
            >
              <p className="text-base-content/70 text-sm font-medium">
                {featured.category}
                {place(featured.client) && ` · ${place(featured.client)}`}
              </p>
              <h3 id="proof-featured-title" className="mt-1 text-2xl font-bold">
                {shortClient(featured.client)}
              </h3>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-semibold">Le problème</dt>
                  <dd className="text-base-content/80 mt-1 leading-relaxed">{featured.challenge}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Ce que j'ai fait</dt>
                  <dd className="text-base-content/80 mt-1 leading-relaxed">{featured.solution}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                {featured.outcome && (
                  <p className="inline-flex items-center gap-2 font-bold text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" aria-hidden="true" />
                    {featured.outcome}
                  </p>
                )}
                <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
                  Lire l'étude de cas
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )}

          <div className="grid gap-6 lg:col-span-5">
            {others.map((project) => (
              <article key={project.slug} className="border-base-content/10 rounded-xl border p-6">
                <p className="text-base-content/70 text-sm font-medium">
                  {project.category}
                  {place(project.client) && ` · ${place(project.client)}`} · {project.year}
                </p>
                <h3 className="mt-1 text-lg font-bold">{shortClient(project.client)}</h3>
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="text-base-content/70">
                      <th scope="col" className="pb-2 text-left font-medium">Mesure</th>
                      <th scope="col" className="pb-2 text-right font-medium">Avant</th>
                      <th scope="col" className="pb-2 text-right font-medium">Après</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.metrics.slice(0, 2).map((m) => (
                      <tr key={m.label} className="border-base-content/10 border-t">
                        <th scope="row" className="py-2 pr-3 text-left font-normal">{m.label}</th>
                        <td className="text-base-content/70 py-2 text-right whitespace-nowrap">{m.before}</td>
                        <td className="py-2 pl-3 text-right font-bold whitespace-nowrap text-green-700 dark:text-green-400">{m.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
