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
 * Génère le schéma JSON-LD complet pour une page de service individuelle
 * Optimisé SEO avec @graph (Service + WebPage + BreadcrumbList)
 */
interface ServicePageSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string | string[];
  image?: string;
  offers?: {
    name: string;
    description: string;
    price: string;
    priceCurrency: string;
  };
  breadcrumbs: BreadcrumbItem[];
}

export function generateServicePageSchema({
  name,
  description,
  url,
  serviceType = "Professional Service",
  areaServed = ["Montréal", "Québec"],
  image = "https://pierrebarbe.ca/images/pb-og-image.avif",
  offers,
  breadcrumbs,
}: ServicePageSchemaProps) {
  const areas = Array.isArray(areaServed) ? areaServed : [areaServed];

  const serviceSchema: any = {
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
      url: "https://pierrebarbe.ca",
      jobTitle: "Développeur Web Freelance",
      email: "contact@pierrebarbe.ca",
      telephone: "+1-438-448-8408"
    },
    areaServed: areas.map((area) => ({
      "@type": area === "Canada" || area === "Québec" ? "State" : "City",
      name: area,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://pierrebarbe.ca/contact",
      servicePhone: "+1-438-448-8408",
      availableLanguage: ["fr-CA", "en"]
    },
    image
  };

  // Ajouter l'offre si fournie
  if (offers) {
    serviceSchema.offers = {
      "@type": "Offer",
      name: offers.name,
      description: offers.description,
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split('T')[0]
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "fr-CA",
        isPartOf: {
          "@id": "https://pierrebarbe.ca/#website"
        },
        about: {
          "@id": `${url}#service`
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image
        }
      },
      {
        ...generateBreadcrumbSchema(breadcrumbs),
        "@id": `${url}#breadcrumb`
      }
    ]
  };
}

/**
 * Génère le schéma JSON-LD pour la page index des services (liste de tous les services)
 * Utilise ItemList pour lister tous les services offerts
 */
interface ServiceIndexSchemaProps {
  services: {
    name: string;
    description: string;
    url: string;
  }[];
  breadcrumbs: BreadcrumbItem[];
}

export function generateServiceIndexSchema({
  services,
  breadcrumbs
}: ServiceIndexSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": "https://pierrebarbe.ca/services#itemlist",
        name: "Services de Développement Web - Pierre Barbé",
        description: "Liste complète des services de développement web, optimisation performance et automatisation proposés à Montréal et au Québec",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": `${service.url}#service`,
            name: service.name,
            description: service.description,
            url: service.url,
            provider: {
              "@type": "Person",
              "@id": "https://pierrebarbe.ca/#person",
              name: "Pierre Barbé"
            }
          }
        }))
      },
      {
        "@type": "WebPage",
        "@id": "https://pierrebarbe.ca/services#webpage",
        url: "https://pierrebarbe.ca/services",
        name: "Services de Développement Web & Performance | Pierre Barbé Montréal",
        description: "Découvrez mes services de développement web à Montréal : optimisation performance, WordPress, audits techniques, automatisation et intégration IA",
        inLanguage: "fr-CA",
        isPartOf: {
          "@id": "https://pierrebarbe.ca/#website"
        },
        breadcrumb: {
          "@id": "https://pierrebarbe.ca/services#breadcrumb"
        }
      },
      {
        ...generateBreadcrumbSchema(breadcrumbs),
        "@id": "https://pierrebarbe.ca/services#breadcrumb"
      }
    ]
  };
}
