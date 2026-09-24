/**
 * Auteur et éditeur à inclure dans le JSON-LD des articles et études de cas.
 * Google ne résout pas un "@id" défini sur une autre page : une référence
 * { "@id" } seule laisse l'auteur sans nom. On inline donc les propriétés
 * requises, avec le même @id que le graphe de l'accueil.
 */
export const AUTHOR_SCHEMA = {
  "@type": "Person",
  "@id": "https://pierrebarbe.ca/#person",
  name: "Pierre Barbé",
  url: "https://pierrebarbe.ca/about",
};

export const PUBLISHER_SCHEMA = {
  "@type": "Organization",
  "@id": "https://pierrebarbe.ca/#organization",
  name: "Pierre Barbé",
  url: "https://pierrebarbe.ca/",
  logo: {
    "@type": "ImageObject",
    url: "https://pierrebarbe.ca/images/pierre-barbe-logo.png",
    width: 512,
    height: 512,
  },
};

const DEFAULT_OG_IMAGE = "https://pierrebarbe.ca/images/pb-og-image.jpg";

interface SEOMetaProps {
  title: string;
  description: string;
  url: string;
}

export function generateSEOMeta({ title, description, url }: SEOMetaProps) {
  return [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    },
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: DEFAULT_OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },

    // Twitter (card/creator/site set globally in root.tsx)
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_OG_IMAGE },
  ];
}

/**
 * Génère BreadcrumbList JSON-LD
 * Google recommande désormais d'inclure `item` sur le dernier élément
 * (page courante) pour activer le rich result Breadcrumb dans la SERP.
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
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
  offers,
  breadcrumbs,
}: ServicePageSchemaProps) {
  const areas = Array.isArray(areaServed) ? areaServed : [areaServed];

  const serviceSchema: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType,
    image: DEFAULT_OG_IMAGE,
    provider: {
      "@type": "Person",
      "@id": "https://pierrebarbe.ca/#person",
      name: "Pierre Barbé",
      url: "https://pierrebarbe.ca",
      jobTitle: "Développeur Web Freelance",
      email: "contact@pierrebarbe.ca",
      telephone: "+1-438-543-6986"
    },
    areaServed: areas.map((area) => ({
      "@type": area === "Canada" ? "Country" : area === "Québec" ? "State" : "City",
      name: area,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://pierrebarbe.ca/contact",
      servicePhone: "+1-438-543-6986",
      availableLanguage: ["fr-CA", "en"]
    }
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
          url: DEFAULT_OG_IMAGE
        }
      },
      {
        ...generateBreadcrumbSchema(breadcrumbs),
        "@id": `${url}#breadcrumb`
      }
    ]
  };
}
