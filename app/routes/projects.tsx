import { projects } from "data/Projects";
import ProjectCard from "~/components/project-card";
import { generateSEOMeta } from "~/utils/seo";
import Breadcrumbs from "~/components/breadcrumbs";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title: "Projets & Réalisations | Pierre Barbé - Portfolio Développeur Web Montréal",
    description:
      "Découvrez mes projets récents de développement web pour PME et agences du Québec : optimisation de performance, éco-conception et résultats concrets. Portfolio de développeur web freelance à Montréal.",
    url: "https://pierrebarbe.ca/projects",
    keywords:
      "portfolio développeur web Montréal, projets web Québec, réalisations développeur freelance, optimisation performance projets, sites web PME Montréal",
  });
}

export default function Portfolio() {
  return (
    <div className="bg-base-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Projets" },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-4 flex justify-center">
            <div className="via-primary h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
          </div>

          <h1 className="font-urbanist text-4xl font-bold md:text-5xl">
            Mes <span className="text-primary">projets récents</span>
          </h1>

          <p className="text-base-content/80 font-urbanist mx-auto mt-4 max-w-2xl">
            Aperçu de mandats menés pour des PME et agences web du Québec :
            performance, éco‑conception et résultats concrets.
          </p>
        </div>

        <div className="relative mb-10 space-y-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              client={project.client}
              services={project.services}
              duration={project.duration}
              results={project.results}
              id={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
