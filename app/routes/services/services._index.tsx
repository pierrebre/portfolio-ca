import ServiceCard from "~/components/service-card";
import { services } from "data/services";
import { generateSEOMeta, generateServiceIndexSchema } from "~/utils/seo";
import Breadcrumbs from "~/components/breadcrumbs";
import { getServiceUrl } from "~/utils/service-links";
import type { Route } from "./+types/services._index";

export function meta({}: Route.MetaArgs) {
  const servicesList = services.map(s => ({
    name: s.name,
    description: s.description,
    url: `https://pierrebarbe.ca${getServiceUrl(s.key)}`
  }));

  const schema = generateServiceIndexSchema({
    services: servicesList,
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" }
    ]
  });

  return [
    ...generateSEOMeta({
      title: "Services de Développement Web & Performance | Pierre Barbé Montréal",
      description: "Découvrez mes services de développement web à Montréal : optimisation web-performance, création de sites WordPress, audits techniques, automatisation de workflows, gestion serveur et intégration d'IA pour PME et agences du Québec.",
      url: "https://pierrebarbe.ca/services",
      keywords: "services développement web Montréal, optimisation performance site web, audit Core Web Vitals, création site WordPress Québec, automatisation workflows n8n, gestion serveur, intégration IA, développeur freelance Montréal",
    }),
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(schema)
    }
  ];
}

export default function ServicesIndex() {
  return (
    <div className="bg-base-100">
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
              Services Web pour Entreprises
            </h1>
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
    </div>
  );
}
