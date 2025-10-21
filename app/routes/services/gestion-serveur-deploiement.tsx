import { Server, Shield, Zap, LineChart, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/gestion-serveur-deploiement";

export function meta({}: Route.MetaArgs) {
  const schema = generateServicePageSchema({
    name: "Gestion Serveur & Déploiement",
    description: "Gestion d'infrastructure serveur, déploiement automatisé (CI/CD), mises à jour et sécurité pour sites web au Québec. Ton site en ligne, sécurisé et disponible 24/7. Développeur DevOps freelance à Montréal.",
    url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
    serviceType: "Server Management and Deployment",
    areaServed: ["Montréal", "Québec", "Canada"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Gestion Serveur & Déploiement", url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement" }
    ]
  });

  return [
    ...generateSEOMeta({
      title: "Gestion Serveur & Déploiement de Sites Web | DevOps Montréal | Pierre Barbé",
      description: "Gestion d'infrastructure serveur, déploiement automatisé (CI/CD), mises à jour et sécurité pour sites web au Québec. Ton site en ligne, sécurisé et disponible 24/7. Développeur DevOps freelance à Montréal.",
      url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
      keywords: "gestion serveur Montréal, déploiement site web, CI/CD pipeline, DevOps freelance Québec, infrastructure cloud, hébergement web sécurisé, mises à jour serveur, disponibilité 24/7",
      type: "article",
    }),
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(schema)
    }
  ];
}

export default function GestionServeurDeploiement() {
  return (
    <div className="bg-base-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Gestion Serveur & Déploiement" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Server className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                99,9% uptime garanti
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Gestion Serveur & Déploiement
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Ton site en ligne, sécurisé et disponible 24/7. Je gère la
              technique, tu gères ton business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
