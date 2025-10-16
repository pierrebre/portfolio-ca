import { Laptop, CheckCircle2, Wrench, Shield } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/creation-maintenance-sites";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Création & Maintenance de Sites WordPress Rapides | Montréal | Pierre Barbé",
    description:
      "Création de sites web WordPress rapides, propres et éco-responsables pour PME du Québec. Maintenance mensuelle, mises à jour et support continu. Développeur web freelance basé à Montréal.",
    url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
    keywords:
      "création site WordPress Montréal, développeur WordPress Québec, maintenance site web, site éco-responsable, développement web PME, freelance WordPress Montréal, site rapide durable",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Création & Maintenance de Sites WordPress",
  description:
    "Création de sites web WordPress rapides, propres et éco-responsables. Maintenance mensuelle, mises à jour et support continu.",
  url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
  serviceType: "Web Development and Maintenance",
});

export default function CreationMaintenanceSites() {
  return (
    <div className="bg-base-100">
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Création & Maintenance de Sites" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Laptop className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Sites performants et durables
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Création & Maintenance de Sites WordPress
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Des sites web rapides, propres et durables.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
