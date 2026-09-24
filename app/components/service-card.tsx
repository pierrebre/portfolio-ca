import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { serviceUrl, type ServiceProps } from "data/services";

export default function ServiceCard({
  service: { key, icon: Icon, name, problem, description, includes, from },
}: {
  service: ServiceProps;
}) {
  return (
    <Link
      to={serviceUrl(key)}
      // Nom accessible = titre visible (WCAG 2.5.3), sans toute la description
      aria-labelledby={`service-card-${key}`}
      className="group border-base-content/10 bg-base-100 hover:border-primary/40 flex flex-col rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="bg-primary/10 mb-5 flex h-11 w-11 items-center justify-center rounded-lg p-2.5">
          <Icon className="text-primary h-full w-full" aria-hidden="true" />
        </div>
        <p className="text-base-content/70 text-sm font-medium mb-2">« {problem} »</p>
        <h3 id={`service-card-${key}`} className="text-base-content text-xl font-bold mb-2">
          {name}
        </h3>
        <p className="text-base-content/80 leading-relaxed mb-5">{description}</p>
        <ul className="space-y-2 mb-6">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-base-content/80">
              <CheckCircle className="text-primary h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-base-content/10 pt-4">
          <span className="text-sm">
            <span className="text-base-content/70">À partir de</span>{" "}
            <span className="font-bold">{from}</span>
          </span>
          <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
            Détails
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
