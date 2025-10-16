interface SEOMetaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
}

export function generateSEOMeta({
  title,
  description,
  url,
  image = "https://pierrebarbe.ca/images/pb-og-image.avif",
  type = "website",
  keywords,
  noindex = false,
}: SEOMetaProps) {
  const meta = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:creator", content: "@PierreBarbe" },
    { name: "twitter:site", content: "@PierreBarbe" },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

/**
 * Génère le schéma JSON-LD Service pour les pages de service
 * Améliore le référencement et l'affichage dans les résultats de recherche Google
 */
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string | string[];
  provider?: {
    name: string;
    url: string;
  };
}

export function generateServiceSchema({
  name,
  description,
  url,
  serviceType = "Service",
  areaServed = ["Montréal", "Québec"],
  provider = {
    name: "Pierre Barbé",
    url: "https://pierrebarbe.ca",
  },
}: ServiceSchemaProps) {
  const areas = Array.isArray(areaServed) ? areaServed : [areaServed];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: {
      "@type": "Person",
      name: provider.name,
      url: provider.url,
    },
    areaServed: areas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://pierrebarbe.ca/contact",
    },
  };
}
