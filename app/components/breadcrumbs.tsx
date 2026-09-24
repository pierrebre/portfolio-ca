import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    // Navigation visible uniquement : le BreadcrumbList est déclaré en JSON-LD
    // dans le @graph de chaque route (pas de microdata, pour éviter le doublon).
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link
                to={item.href}
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-base-content font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight
                className="h-4 w-4 text-base-content/40"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
