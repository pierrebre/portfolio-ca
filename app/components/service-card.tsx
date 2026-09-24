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
      className="group border-base-content/10 bg-base-100 relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="flex flex-1 flex-col p-8">
        <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl p-3.5">
          <Icon className="text-primary h-full w-full" aria-hidden="true" />
        </div>
        <p className="text-base-content/70 text-sm font-medium mb-2">« {problem} »</p>
        <h3 id={`service-card-${key}`} className="text-base-content text-2xl font-bold mb-3">
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
            <span className="text-primary font-bold">{from}</span>
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
