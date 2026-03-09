import { Link } from "react-router";
import ServiceCard from "~/components/service-card";
import JsonLd from "~/components/json-ld";
import { services } from "data/services";
import { generateSEOMeta } from "~/utils/seo";
import Breadcrumbs from "~/components/breadcrumbs";
import { getServiceUrl } from "~/utils/service-links";
import type { Route } from "./+types/services._index";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Services de Développement Web & Performance | Pierre Barbé Montréal",
      description: "Découvrez mes services de développement web à Montréal : optimisation web-performance, création de sites WordPress, audits techniques, automatisation de workflows, gestion serveur et intégration d'IA pour PME et agences du Québec.",
      url: "https://pierrebarbe.ca/services",
    }),
  ];
}

export default function ServicesIndex() {
  const servicesList = services.map(s => ({
    name: s.name,
    description: s.description,
    url: `https://pierrebarbe.ca${getServiceUrl(s.key)}`
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://pierrebarbe.ca/services#webpage",
        "url": "https://pierrebarbe.ca/services",
        "name": "Services de Développement Web & Performance | Pierre Barbé Montréal",
        "description": "Découvrez mes services de développement web à Montréal : optimisation performance, WordPress, audits techniques, automatisation et intégration IA",
        "inLanguage": "fr-CA",
        "isPartOf": {
          "@id": "https://pierrebarbe.ca/#website"
        },
        "breadcrumb": {
          "@id": "https://pierrebarbe.ca/services#breadcrumb"
        },
        "hasPart": [
          { "@id": "https://pierrebarbe.ca/services/optimisation-web-performance#service" },
          { "@id": "https://pierrebarbe.ca/services/creation-maintenance-sites#service" },
          { "@id": "https://pierrebarbe.ca/services/automatisation-workflows#service" },
          { "@id": "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals#service" },
          { "@id": "https://pierrebarbe.ca/services/gestion-serveur-deploiement#service" },
          { "@id": "https://pierrebarbe.ca/services/integration-outils-ia#service" }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://pierrebarbe.ca/services#itemlist",
        "name": "Services de Développement Web - Pierre Barbé",
        "description": "Liste complète des services de développement web, optimisation performance et automatisation proposés à Montréal et au Québec",
        "numberOfItems": servicesList.length,
        "itemListElement": servicesList.map((service, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "@id": `${service.url}#service`,
            "name": service.name,
            "description": service.description,
            "url": service.url,
            "provider": {
              "@id": "https://pierrebarbe.ca/#person"
            }
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pierrebarbe.ca/services#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://pierrebarbe.ca/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services"
            // Pas de "item" pour le dernier élément (page actuelle)
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-base-100">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        />
      </div>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center">
              <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
            </div>
            <h1 className="font-urbanist content text-4xl font-bold md:text-5xl mb-6">
              Services de développement web à Montréal
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg">
              Performance, création, automatisation, IA — tout ce dont ton entreprise a besoin pour
              que son site web travaille vraiment pour toi. Tarifs transparents, résultats mesurables.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                name={service.name}
                description={service.description}
                linkTo={getServiceUrl(service.key)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">Pas sûr de ce qu'il te faut ?</h2>
          <p className="text-base-content/70 mt-4">
            Réserve 30 minutes avec moi — c'est gratuit et sans engagement.
            On regarde ensemble ce qui freine ton site et ce qui aurait le plus d'impact.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Réserver une consultation gratuite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
