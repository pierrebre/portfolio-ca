import { Laptop, CheckCircle, Wrench, Shield } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/creation-maintenance-sites";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Création & Maintenance de Sites WordPress & Shopify | Montréal | Pierre Barbé",
      description: "Création de sites WordPress et Shopify rapides et durables pour PME du Québec. Forfaits maintenance à partir de 150 $/mois. Développeur freelance Montréal sans contrat annuel.",
      url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
      keywords: "création site WordPress Montréal, développeur WordPress Québec, maintenance site web, site Shopify, développement web PME, freelance WordPress Montréal",
      type: "article",
    }),
  ];
}

const maintenancePlans = [
  {
    name: "Essentiel",
    price: "150 $/mois",
    features: [
      "Mises à jour WordPress/plugins",
      "Sauvegardes hebdomadaires",
      "Monitoring uptime 24/7",
      "Support par courriel (48h)",
      "1 h de corrections/mois",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "300 $/mois",
    features: [
      "Tout l'Essentiel",
      "Sauvegardes quotidiennes",
      "Support prioritaire (24h)",
      "3 h de corrections/mois",
      "Optimisation mensuelle",
      "Rapport mensuel",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "500 $/mois",
    features: [
      "Tout le Pro",
      "Support même jour",
      "5 h de corrections/mois",
      "2 h de développement incluses",
      "Optimisation hebdomadaire",
      "Audit SEO trimestriel",
    ],
    highlight: false,
  },
];

export default function CreationMaintenanceSites() {
  const schema = generateServicePageSchema({
    name: "Création & Maintenance de Sites WordPress",
    description: "Création de sites WordPress et Shopify rapides et durables pour PME du Québec. Forfaits maintenance sans contrat annuel à partir de 150 $/mois.",
    url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
    serviceType: "Web Development and Maintenance",
    areaServed: ["Montréal", "Québec"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Création & Maintenance de Sites", url: "https://pierrebarbe.ca/services/creation-maintenance-sites" },
    ],
  });

  return (
    <div className="bg-base-100 font-urbanist">
      <JsonLd data={schema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Création & Maintenance de Sites" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Laptop className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">Sites performants et durables</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Création et maintenance de sites web WordPress & Shopify
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Tu as besoin d'un site neuf qui charge vite et convertit ? Ou d'un contrat de maintenance
              pour que ton site actuel arrête de casser à chaque mise à jour ? Je crée des sites
              WordPress et Shopify propres, rapides et faciles à maintenir. Et contrairement à certains,
              je ne disparais pas après la mise en ligne.
            </p>
          </div>
        </div>
      </section>

      {/* Création */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Création de site web</h2>
          <div className="space-y-6">
            {[
              {
                icon: Wrench,
                title: "WordPress",
                desc: "WordPress propulse 43 % du web — et pour de bonnes raisons. Mais un WordPress mal construit, c'est un cauchemar de maintenance. Je développe des sites WordPress sans Elementor, sans page builder lourd, avec un thème sur mesure ou léger (Gutenberg natif). Résultat : un site 3x plus rapide et 10x plus facile à maintenir.",
                price: "À partir de 2 500 $",
              },
              {
                icon: Shield,
                title: "Shopify",
                desc: "Pour l'e-commerce, Shopify est souvent le meilleur choix pour les PME. Pas de gestion serveur, pas de mises à jour de sécurité, et un écosystème d'apps solide. Je configure, personnalise et optimise ta boutique Shopify pour qu'elle convertisse mieux dès le premier jour.",
                price: "À partir de 3 000 $",
              },
              {
                icon: Laptop,
                title: "Next.js / React",
                desc: "Pour les projets qui ont besoin de plus de puissance — applications web, dashboards, sites avec des interactions complexes. C'est ce qui propulse pierrebarbe.ca.",
                price: "À partir de 4 000 $",
              },
            ].map((item) => (
              <div key={item.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-bold text-xl">{item.title}</h3>
                </div>
                <p className="text-base-content/80 leading-relaxed mb-3">{item.desc}</p>
                <p className="text-primary font-semibold text-sm">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold">Forfaits maintenance</h2>
          </div>
          <p className="text-base-content/70 text-center mb-12">
            Pas de contrat annuel obligatoire. Résiliable en 30 jours.
            Tu paies pour un service, pas pour être enfermé.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border ${
                  plan.highlight
                    ? "bg-primary text-primary-content border-primary"
                    : "bg-base-100 border-base-content/10"
                }`}
              >
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? "text-primary-content" : ""}`}>
                  {plan.name}
                </h3>
                <p className={`text-2xl font-black mb-6 ${plan.highlight ? "text-primary-content" : "text-primary"}`}>
                  {plan.price}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-primary-content/80" : "text-primary"}`}
                        aria-hidden="true"
                      />
                      <span className={plan.highlight ? "text-primary-content/90" : "text-base-content/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Services complémentaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/optimisation-web-performance"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Ton site actuel est lent ?</p>
              <p className="text-primary text-sm mt-1">→ Optimisation web-performance</p>
            </Link>
            <Link
              to="/services/automatisation-workflows"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Tu veux automatiser la gestion de ton site ?</p>
              <p className="text-primary text-sm mt-1">→ Automatisation de workflows</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Discutons de ton projet</h2>
          <p className="text-base-content/70 mt-4">
            Chaque projet est différent. Un appel de 30 minutes suffit pour identifier
            la meilleure approche et te donner une fourchette de prix réaliste.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Réserver un appel gratuit
            </Link>
            <Link to="/services" className="btn btn-ghost rounded-full px-10 border border-base-content/20">
              Voir tous mes services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
