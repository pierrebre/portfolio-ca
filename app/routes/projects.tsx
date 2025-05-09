import { projects } from "data/Projects";
import ProjectCard from "~/components/project-card";

export default function Portfolio() {
  return (
    <div className="bg-base-100">
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
