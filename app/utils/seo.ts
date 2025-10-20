interface SEOMetaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  robots?: string;
}

export function generateSEOMeta({
  title,
  description,
  url,
  image = "https://pierrebarbe.ca/images/pb-og-image.avif",
  imageWidth = "1200",
  imageHeight = "630",
  imageType = "image/avif",
  type = "website",
  keywords,
  noindex = false,
  robots,
}: SEOMetaProps) {
  const meta = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: robots || (noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1")
    },
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: imageWidth },
    { property: "og:image:height", content: imageHeight },
    { property: "og:image:type", content: imageType },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:creator", content: "@PierreBarbe" },
    { name: "twitter:site", content: "@PierreBarbe" },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
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

/**
 * Génère BreadcrumbList JSON-LD
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Génère le schéma JSON-LD Service avec BreadcrumbList (via @graph)
 */
export function generateServiceSchemaWithBreadcrumb({
  name,
  description,
  url,
  serviceType = "Service",
  breadcrumbs,
}: Omit<ServiceSchemaProps, 'areaServed' | 'provider'> & { breadcrumbs: BreadcrumbItem[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        url,
        serviceType,
        provider: {
          "@type": "Person",
          "@id": "https://pierrebarbe.ca/#person",
          name: "Pierre Barbé",
          url: "https://pierrebarbe.ca"
        },
        areaServed: [
          { "@type": "City", "name": "Montréal" },
          { "@type": "City", "name": "Québec" }
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://pierrebarbe.ca/contact"
        }
      },
      {
        ...generateBreadcrumbSchema(breadcrumbs),
        "@id": `${url}#breadcrumb`
      }
    ]
  };
}
