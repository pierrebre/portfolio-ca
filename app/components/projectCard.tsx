import type { ProjectCardProps } from "data/Projects";

export default function ProjectCard({
  image,
  title,
  client,
  services,
  duration,
  results,
  id,
}: ProjectCardProps) {
  return (
    <div className="relative grid items-center gap-12 md:grid-cols-2">
      <div className={`relative ${id % 2 === 0 ? "md:order-1" : ""}`}>
        <div className="border-base-content/10 overflow-hidden rounded-2xl border shadow-xl">
          <img
            src={image}
            alt={title}
            className="h-[400px] w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      <div className={`space-y-6 ${id % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
        <div className="flex items-center gap-4">
          <div className="bg-primary h-px w-12" />
          <span className="text-primary font-urbanist font-medium">
            Project {id + 1}
          </span>
        </div>

        <h2 className="font-urbanist text-3xl leading-tight font-bold">
          {title}
        </h2>

        <div className="flex gap-8">
          <div>
            <p className="text-base-content/60 font-urbanist text-sm">Client</p>
            <p className="font-urbanist font-medium">{client}</p>
          </div>
          <div>
            <p className="text-base-content/60 font-urbanist text-sm">
              Duration
            </p>
            <p className="font-urbanist font-medium">{duration}</p>
          </div>
        </div>

        <div>
          <p className="text-base-content/60 font-urbanist mb-2 text-sm">
            Services
          </p>
          <div className="flex flex-wrap gap-2">
            {services.map((service, i) => (
              <span
                key={i}
                className="badge badge-soft badge-primary font-urbanist rounded-full px-3 py-1.5 text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base-content/60 font-urbanist mb-2 text-sm">
            Key Results
          </p>
          <div className="space-y-2">
            {results.map((result, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <span className="font-urbanist font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
