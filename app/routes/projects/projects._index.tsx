import { Link } from "react-router";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { useIntersectionObserver } from "~/hooks/use-intersection-observer";
import { projects } from "data/projects";
import type { Route } from "./+types/projects._index";

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/projects";
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    { title: "Études de cas — Performance & automatisation | Pierre Barbé" },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Études de cas pour PME québécoises : corrections WordPress et CRM, optimisation de performance, automatisation n8n. Le défi, la méthode et les résultats.",
    },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { property: "og:title", content: "Projets — Études de cas | Pierre Barbé" },
    {
      property: "og:description",
      content:
        "Résultats mesurables sur de vrais projets québécois : performance, e-commerce, automatisation et éco-conception.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:title", content: "Projets — Études de cas | Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Résultats mesurables sur de vrais projets québécois.",
    },
    { name: "twitter:image", content: image },
  ];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Web Performance": "badge-primary",
  "E-commerce": "badge-secondary",
  Automatisation: "badge-accent",
  "Création de site": "badge-success",
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pierrebarbe.ca/projects#webpage",
      url: "https://pierrebarbe.ca/projects",
      name: "Projets — Études de cas | Pierre Barbé",
      description:
        "Études de cas concrets : web performance, e-commerce, automatisation et éco-conception pour PME québécoises.",
      inLanguage: "fr-CA",
      isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pierrebarbe.ca/projects#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://pierrebarbe.ca/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projets",
          item: "https://pierrebarbe.ca/projects",
        },
      ],
    },
  ],
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const pageRef = useIntersectionObserver();

  return (
    <div ref={pageRef} className="bg-base-100 min-h-screen">
      <JsonLd data={projectsSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "Projets" }]}
        />
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Projets & résultats
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary text-sm font-medium">
              Des chiffres réels, pas des estimations
            </span>
            <div className="bg-primary h-px w-16" />
          </div>
          <p className="text-base-content/70 mx-auto mt-6 max-w-2xl text-lg">
            Chaque projet est mesuré avant et après. Voici quelques études de
            cas qui illustrent l'impact concret de mon travail sur de vraies
            entreprises québécoises.
          </p>
        </div>
      </section>

      {/* Projets en vedette */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base-content/70 text-lg">
                Les études de cas arrivent bientôt.
              </p>
              <Link to="/contact" className="btn btn-primary rounded-full mt-6">
                Discutons de ton projet
              </Link>
            </div>
          ) : null}
          <div className="space-y-12">
            {featured.map((project, idx) => (
              <article
                key={project.slug}
                // Le premier projet est visible dès l'arrivée : l'animer le
                // masquerait jusqu'au chargement du JS (affichage retardé).
                className={`card bg-base-100 border border-base-content/10 shadow-sm overflow-hidden ${idx > 0 ? "animate-on-scroll" : ""}`}
              >
                <div className="card-body p-0">
                  <div
                    className={`grid lg:grid-cols-2 ${idx % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
                  >
                    {/* Couleur / visuel */}
                    <div
                      className={`bg-primary/5 flex items-center justify-center p-12 min-h-[240px] ${idx % 2 !== 0 ? "lg:col-start-2" : ""}`}
                      aria-hidden="true"
                    >
                      <div className="text-center">
                        {/* Filigrane décoratif : l'année vient du CSS (attr),
                            pas du contenu de la page */}
                        <div
                          data-year={project.year}
                          className="text-6xl font-black text-primary/20 leading-none before:content-[attr(data-year)]"
                        />
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="badge badge-primary badge-outline text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span
                            className={`badge font-medium ${CATEGORY_COLORS[project.category] ?? "badge-neutral"}`}
                          >
                            <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                            {project.category}
                          </span>
                          <span className="text-base-content/70 flex items-center gap-1 text-sm">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {project.duration}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                          {project.title}
                        </h2>
                        <p className="text-base-content/70 text-sm font-medium mb-3">
                          {project.client}
                        </p>
                        <p className="text-base-content/70 leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div>
                            <h3 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-1">Défi</h3>
                            <p className="text-base-content/70 text-sm leading-relaxed">{project.challenge}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-1">Solution</h3>
                            <p className="text-base-content/70 text-sm leading-relaxed">{project.solution}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.href && (
                          <Link
                            to={project.href}
                            className="btn btn-primary btn-sm rounded-full gap-1"
                          >
                            Voir l'étude de cas
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
                        <Link
                          to="/contact"
                          className={`btn btn-sm rounded-full gap-1 ${project.href ? "btn-ghost border border-base-content/20" : "btn-primary"}`}
                        >
                          Projet similaire ?
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Autres projets */}
      {others.length > 0 && (
        <section className="bg-base-200 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Autres projets</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((project) => (
                <article
                  key={project.slug}
                  className="card bg-base-100 border border-base-content/10 shadow-sm animate-on-scroll"
                >
                  <div className="card-body p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`badge badge-sm font-medium ${CATEGORY_COLORS[project.category] ?? "badge-neutral"}`}
                      >
                        {project.category}
                      </span>
                      <span className="text-base-content/70 text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {project.duration}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-base-content/70 text-sm mb-3">
                      {project.client}
                    </p>
                    <p className="text-base-content/70 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Métrique clé */}
                    {project.metrics[0] && (
                      <div className="bg-base-200 rounded-lg p-3 flex items-center gap-2">
                        <TrendingUp
                          className="h-4 w-4 text-success flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm">
                          <span className="font-medium">{project.metrics[0].label} :</span>{" "}
                          <span className="text-red-700 dark:text-red-400 line-through text-xs">
                            {project.metrics[0].before}
                          </span>
                          {" → "}
                          <span className="text-green-700 dark:text-green-400 font-bold">
                            {project.metrics[0].after}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ton projet, les prochains chiffres</h2>
          <p className="text-base-content/70 mt-4 text-lg">
            Chaque site est différent. Commençons par un premier échange gratuit
            (mail ou visio) pour identifier où se trouvent tes gains les plus
            rapides.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Parle-moi de ton projet
            </Link>
            <Link
              to="/services"
              className="btn btn-ghost rounded-full px-10 border border-base-content/20"
            >
              Voir mes services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
