import { Target, Zap, Leaf } from "lucide-react";
import ServiceCard from "~/components/service-card";
import { services } from "data/services";
import { generateSEOMeta } from "~/utils/seo";
import type { Route } from "./+types/services._index";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title: "Services de Développement Web & Performance | Pierre Barbé Montréal",
    description:
      "Découvrez mes services de développement web à Montréal : optimisation web-performance, création de sites WordPress, audits techniques, automatisation de workflows, gestion serveur et intégration d'IA pour PME et agences du Québec.",
    url: "https://pierrebarbe.ca/services",
    keywords:
      "services développement web Montréal, optimisation performance site web, audit Core Web Vitals, création site WordPress Québec, automatisation workflows n8n, gestion serveur, intégration IA, développeur freelance Montréal",
  });
}

// Mapping des services vers leurs URLs
const serviceLinks: Record<string, string> = {
  "Optimisation Web‑Performance": "/services/optimisation-web-performance",
  "Création & Maintenance de Sites": "/services/creation-maintenance-sites",
  "Automatisation de Workflows (n8n)": "/services/automatisation-workflows",
  "Audits Techniques & Core Web Vitals":
    "/services/audits-techniques-core-web-vitals",
  "Gestion Serveur & Déploiement": "/services/gestion-serveur-deploiement",
  "Intégration d'Outils IA": "/services/integration-outils-ia",
};

export default function ServicesIndex() {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center">
              <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
            </div>
            <h1 className="font-urbanist content text-4xl font-bold md:text-5xl mb-6">
              Services de Développement Web pour Entreprises du Québec
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Je t'accompagne à chaque étape de la vie de ton site web : de
              l'audit initial à l'optimisation continue, en passant par la
              création, la maintenance et l'automatisation. Mes services sont
              pensés pour les PME, e-commerces et agences qui veulent un site
              rapide, éco-responsable et rentable.
            </p>
          </div>
        </div>
      </section>

      {/* Grid des services */}
      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.name}
                icon={service.icon}
                name={service.name}
                description={service.description}
                linkTo={serviceLinks[service.name]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Choisir Mes Services */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-center text-3xl font-bold md:text-4xl mb-16">
            Pourquoi Travailler Avec Moi ?
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Target className="h-10 w-10 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Approche Sur Mesure
              </h3>
              <p className="text-base-content/80">
                Pas de solutions cookie-cutter. Chaque projet est analysé pour
                répondre exactement à tes besoins.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Zap className="h-10 w-10 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Performance Garantie
              </h3>
              <p className="text-base-content/80">
                Engagement sur les Core Web Vitals et la vitesse de chargement.
                Ton site sera dans le top 10% du web.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Leaf className="h-10 w-10 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Éco-Conception
              </h3>
              <p className="text-base-content/80">
                Sites web à faible empreinte carbone. Bon pour la planète,
                excellent pour ton image de marque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Prêt à Booster Ton Site Web ?
          </h2>
          <p className="text-base-content/80 text-lg mb-10">
            Réserve ta consultation gratuite de 30 minutes ou envoie-moi un
            message. Je te réponds en moins de 24h.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-base-100 rounded-full px-8 py-3"
            >
              Réserver une consultation
            </a>
            <a
              href="/contact"
              className="btn btn-outline rounded-full px-8 py-3"
            >
              Envoyer un message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
