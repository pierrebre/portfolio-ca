import {
  Zap,
  CheckCircle2,
  ClipboardCheck,
  Server,
  Laptop,
} from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/optimisation-web-performance";

export function meta({}: Route.MetaArgs) {
  const schema = generateServicePageSchema({
    name: "Optimisation Web-Performance & Core Web Vitals",
    description: "Service d'optimisation de la performance web et Core Web Vitals à Montréal. Amélioration de la vitesse de chargement, réduction de l'empreinte carbone et boost du SEO pour PME du Québec. Audit gratuit disponible.",
    url: "https://pierrebarbe.ca/services/optimisation-web-performance",
    serviceType: "Web Performance Optimization",
    areaServed: ["Montréal", "Québec"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Optimisation Web-Performance", url: "https://pierrebarbe.ca/services/optimisation-web-performance" }
    ]
  });

  return [
    ...generateSEOMeta({
      title: "Optimisation Web-Performance & Core Web Vitals | Montréal | Pierre Barbé",
      description: "Service d'optimisation de la performance web et Core Web Vitals à Montréal. Amélioration de la vitesse de chargement, réduction de l'empreinte carbone et boost du SEO pour PME du Québec. Audit gratuit disponible.",
      url: "https://pierrebarbe.ca/services/optimisation-web-performance",
      keywords: "optimisation web-performance Montréal, Core Web Vitals amélioration, vitesse site web, LCP FID CLS optimisation, performance site WordPress, éco-conception web Québec, réduction empreinte carbone site",
      type: "article",
    }),
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(schema)
    }
  ];
}

export default function OptimisationWebPerformance() {
  return (
    <div className="bg-base-100">

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Optimisation Web-Performance" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Amélioration moyenne : +60% de vitesse
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Optimisation Web-Performance & Core Web Vitals
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Rends ton site plus rapide, plus vert et mieux classé sur Google
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
