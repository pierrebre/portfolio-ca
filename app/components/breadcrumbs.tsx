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
  // Génération du JSON-LD pour BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `https://pierrebarbe.ca${item.href}`,
      }),
    })),
  };

  return (
    <>
      {/* JSON-LD Schema pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation visible avec microdata */}
      <nav aria-label="Fil d'Ariane" className="mb-8">
        <ol
          className="flex flex-wrap items-center gap-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              {item.href ? (
                <>
                  <Link
                    to={item.href}
                    itemProp="item"
                    className="text-base-content/60 hover:text-primary transition-colors"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                </>
              ) : (
                <>
                  <span
                    itemProp="name"
                    className="text-base-content font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                  <meta itemProp="position" content={String(index + 1)} />
                </>
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
    </>
  );
}
