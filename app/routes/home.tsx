import { Link } from "react-router";
import Hero, { HERO_IMAGE, type HeroProof } from "~/components/hero";
import Services from "~/components/services";
import Proof from "~/components/proof";
import Process from "~/components/process";
import Faq from "~/components/faq";
import JsonLd from "~/components/json-ld";
import CtaSection from "~/components/cta-section";
import { getAllProjects } from "~/lib/projects.server";
import { services, serviceUrl } from "data/services";
import { FREE_AUDIT } from "data/pricing";

import type { Route } from "./+types/home";

// Mêmes chiffres que les études de cas : l'accueil lit content/projects.
export async function loader() {
  const projects = await getAllProjects();
  const clinic = projects.find((p) => p.slug === "automatisation-n8n-clinique");
  const metric = clinic?.metrics[0];
  const proof: HeroProof | undefined = metric && {
    label: "Administratif par semaine",
    before: metric.before,
    after: metric.after,
    context: "Clinique de santé, Montréal",
  };
  return { projects, proof };
}

export function links() {
  return [
    // Portrait affiché en desktop seulement (vignette de 48 px sur mobile) :
    // préchargé à partir de 1024 px, avec srcset/sizes identiques à l'<img>.
    {
      rel: "preload",
      as: "image",
      type: "image/avif",
      href: HERO_IMAGE.src,
      imageSrcSet: HERO_IMAGE.srcSet,
      imageSizes: HERO_IMAGE.sizes,
      media: "(min-width: 1024px)",
    },
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
        "Développeur web freelance à Montréal : je crée, j'accélère et j'entretiens le site de ta PME et j'automatise tes tâches répétitives. Audit gratuit.",
    },
    {
      property: "og:title",
      content: "Développeur web freelance Montréal — Pierre Barbé",
    },
    {
      property: "og:description",
      content:
        "Je crée, j'accélère et j'entretiens le site de ta PME. Prix affichés, audit gratuit de 30 minutes.",
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
        "Sites WordPress, performance et automatisation pour PME québécoises. Audit gratuit de 30 minutes.",
    },
    { name: "twitter:image", content: image },
    {
      name: "twitter:image:alt",
      content: "Pierre Barbé — Développeur web freelance Montréal",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, proof } = loaderData;
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
          "Développeur web freelance à Montréal : sites WordPress, performance web et automatisation (n8n, IA) pour les PME du Québec",
        url,
        image: "https://pierrebarbe.ca/images/me.avif",
        email: "contact@pierrebarbe.ca",
        telephone: "+1-438-543-6986",
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
        worksFor: { "@id": `${url}#organization` },
      },

      // 2. LocalBusiness
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${url}#business`,
        name: "Pierre Barbé",
        description:
          "Développeur web freelance à Montréal : création et maintenance de sites WordPress, audit et optimisation de la performance, automatisation et IA pour les PME du Québec",
        url,
        telephone: "+1-438-543-6986",
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
          latitude: "45.50174",
          longitude: "-73.56726",
        },
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "City", name: "Laval" },
          { "@type": "City", name: "Longueuil" },
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
          telephone: "+1-438-543-6986",
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
          "Développeur web freelance à Montréal : sites WordPress, performance et automatisation pour les PME du Québec.",
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
        name: "Développeur web freelance Montréal — Pierre Barbé",
        description:
          "Je crée, j'accélère et j'entretiens le site web des PME québécoises, et j'automatise leurs tâches répétitives. Prix affichés, audit gratuit de 30 minutes.",
        inLanguage: "fr-CA",
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": `${url}#person` },
        mainEntity: { "@id": `${url}#faq` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        },
      },

      // 6. Les 3 offres (même source que les cartes)
      ...services.map((service) => ({
        "@type": "Service",
        "@id": `https://pierrebarbe.ca${serviceUrl(service.key)}#service`,
        name: service.name,
        description: service.description,
        url: `https://pierrebarbe.ca${serviceUrl(service.key)}`,
        provider: { "@id": `${url}#person` },
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "State", name: "Québec" },
        ],
      })),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Hero proof={proof} featured={projects.find((p) => p.href)} />
      <Services />
      <Proof projects={projects} />
      <Process />
      <Faq
        intro={
          <p>
            Une autre question ?{" "}
            <Link to="/contact" className="underline">
              Écris-moi
            </Link>
            . {FREE_AUDIT.reply.replace(" pour fixer le moment", "")}
          </p>
        }
        className="bg-base-100 py-16 md:py-24"
      />
      <CtaSection title="Commence par un audit gratuit de 30 minutes">
        Envoie-moi l'adresse de ton site, ou quelques lignes sur ton projet si tu n'en as
        pas encore. {FREE_AUDIT.reply} Tu repars avec 3 recommandations prioritaires, sans
        engagement.
      </CtaSection>
    </>
  );
}
