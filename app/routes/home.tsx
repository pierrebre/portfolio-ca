import Hero from "~/components/hero";
import Problem from "~/components/problem";
import Services from "~/components/services";
import Results from "~/components/results";
import CtaBand from "~/components/cta-band";
import WhyMe from "~/components/why-me";
import Process from "~/components/process";
import Faq from "~/components/faq";
import AuditModal from "~/components/audit-modal";
import JsonLd from "~/components/json-ld";

import type { Route } from "./+types/home";

export function links() {
  return [
    { rel: "preload", as: "image", type: "image/avif", href: "/images/me-800.avif" },
  ];
}

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/";
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    {
      title:
        "Développeur web freelance Montréal — Pierre Barbé",
    },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Développeur web freelance à Montréal. J'aide les PME québécoises à avoir des sites rapides, bien référencés et faciles à maintenir. Premier échange gratuit.",
    },
    {
      property: "og:title",
      content: "Développeur web freelance Montréal — Pierre Barbé",
    },
    {
      property: "og:description",
      content:
        "J'aide les PME québécoises à avoir des sites rapides, bien référencés et faciles à maintenir. Premier échange gratuit.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    {
      property: "og:image:alt",
      content: "Pierre Barbé — Développeur web freelance Montréal",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },

    {
      name: "twitter:title",
      content: "Développeur web freelance Montréal — Pierre Barbé",
    },
    {
      name: "twitter:description",
      content:
        "Premier échange gratuit, web‑performance et automatisation pour PME québécoises.",
    },
    { name: "twitter:image", content: image },
    {
      name: "twitter:image:alt",
      content: "Pierre Barbé — Développeur web freelance Montréal",
    },
    { name: "twitter:url", content: url },
  ];
}

export default function Home() {
  const url = "https://pierrebarbe.ca/";
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Person
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: "Pierre Barbé",
        alternateName: "Pierre Barbe",
        jobTitle: "Développeur Web Freelance",
        description:
          "Développeur web freelance spécialisé en React Router v7, React, WordPress, SEO et automatisation (n8n) à Montréal",
        url,
        image: "https://pierrebarbe.ca/images/me.avif",
        email: "contact@pierrebarbe.ca",
        telephone: "+1-438-448-8408",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montréal",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        sameAs: [
          "https://www.linkedin.com/in/pierre-barb%C3%A9/",
          "https://github.com/pierrebre",
          "https://twitter.com/PierreBarbe",
        ],
        knowsAbout: [
          "React Router v7",
          "React",
          "Node.js",
          "WordPress",
          "SEO",
          "Web Performance",
          "Automatisation",
          "n8n",
        ],
        memberOf: { "@id": `${url}#organization` },
      },

      // 2. LocalBusiness
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${url}#business`,
        name: "Pierre Barbé",
        description:
          "Services de développement web freelance à Montréal : création de sites rapides, optimisation web-performance, WordPress, SEO et automatisation pour PME et agences du Québec",
        url,
        telephone: "+1-438-448-8408",
        email: "contact@pierrebarbe.ca",
        image,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montréal",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.5017",
          longitude: "-73.5673",
        },
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "State", name: "Québec" },
          { "@type": "Country", name: "Canada" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        sameAs: [
          "https://www.linkedin.com/in/pierre-barb%C3%A9/",
          "https://github.com/pierrebre",
          "https://twitter.com/PierreBarbe",
        ],
        founder: { "@id": `${url}#person` },
      },

      // 3. Organization
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: "Pierre Barbé",
        url,
        logo: {
          "@type": "ImageObject",
          url: "https://pierrebarbe.ca/images/pierre-barbe-logo.png",
          width: 512,
          height: 512,
        },
        founder: { "@id": `${url}#person` },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-438-448-8408",
          contactType: "Customer Service",
          email: "contact@pierrebarbe.ca",
          areaServed: "CA",
          availableLanguage: ["fr-CA", "en"],
        },
        sameAs: [
          "https://www.linkedin.com/in/pierre-barb%C3%A9/",
          "https://github.com/pierrebre",
          "https://twitter.com/PierreBarbe",
        ],
      },

      // 4. WebSite
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: "Pierre Barbé — Développeur Web Freelance Montréal",
        description:
          "Développeur web freelance à Montréal. Sites rapides, bien référencés et faciles à maintenir pour PME québécoises.",
        inLanguage: "fr-CA",
        publisher: { "@id": `${url}#organization` },
        hasPart: [
          { "@id": "https://pierrebarbe.ca/services#webpage" },
          { "@id": "https://pierrebarbe.ca/contact#webpage" },
          { "@id": "https://pierrebarbe.ca/blog#blog" },
          { "@id": "https://pierrebarbe.ca/about#webpage" },
        ],
      },

      // 5. WebPage / HomePage
      {
        "@type": ["WebPage", "HomePage"],
        "@id": `${url}#webpage`,
        url,
        name: "Développeur web freelance Montréal | Sites rapides & automatisation — Pierre Barbé",
        description:
          "Développeur web freelance à Montréal. J'aide les PME québécoises à avoir des sites rapides, bien référencés et faciles à maintenir. Premier échange gratuit.",
        inLanguage: "fr-CA",
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": `${url}#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        },
      },

      // 6. Services
      {
        "@type": "Service",
        "@id": `${url}#service-nextjs`,
        name: "Développement Next.js & React",
        description:
          "Création de sites web rapides et performants avec Next.js et React pour PME et agences",
        url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
        provider: { "@id": `${url}#person` },
        serviceType: "Web Development",
        areaServed: { "@type": "City", name: "Montréal" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://pierrebarbe.ca/contact",
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service-wordpress`,
        name: "Développement WordPress",
        description:
          "Création et optimisation de sites WordPress sur mesure pour PME québécoises",
        url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
        provider: { "@id": `${url}#person` },
        serviceType: "WordPress Development",
        areaServed: { "@type": "City", name: "Montréal" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://pierrebarbe.ca/contact",
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service-seo`,
        name: "Optimisation SEO & Web Performance",
        description:
          "Audit SEO gratuit, optimisation de la vitesse et amélioration du référencement naturel",
        url: "https://pierrebarbe.ca/services/optimisation-web-performance",
        provider: { "@id": `${url}#person` },
        serviceType: "SEO Services",
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "State", name: "Québec" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://pierrebarbe.ca/contact",
        },
        offers: {
          "@type": "Offer",
          name: "Premier échange gratuit",
          description: "Premier échange gratuit par courriel ou visio pour cadrer ton projet",
          price: "0",
          priceCurrency: "CAD",
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service-automation`,
        name: "Automatisation (n8n, Make)",
        description:
          "Automatisation de processus métier avec n8n et Make pour gagner du temps",
        url: "https://pierrebarbe.ca/services/automatisation-workflows",
        provider: { "@id": `${url}#person` },
        serviceType: "Business Automation",
        areaServed: { "@type": "Country", name: "Canada" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://pierrebarbe.ca/contact",
        },
      },

    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <Problem />
      <Services />
      <Results />
      <CtaBand />
      <WhyMe />
      <Process />
      <Faq />
      <AuditModal />
    </>
  );
}
