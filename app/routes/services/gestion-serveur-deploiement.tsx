import { Server, Shield, Zap, CheckCircle, GitBranch } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/gestion-serveur-deploiement";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Gestion serveur & déploiement de sites web | DevOps Montréal | Pierre Barbé",
      description: "Gestion d'infrastructure serveur, CI/CD, sécurité et monitoring pour sites web au Québec. Ton site en ligne 24/7 sans que tu t'en occupes. Développeur DevOps freelance à Montréal.",
      url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
      keywords: "gestion serveur Montréal, déploiement site web, CI/CD pipeline, DevOps freelance Québec, infrastructure cloud, hébergement web sécurisé",
      type: "article",
    }),
  ];
}

const managed = [
  { icon: Server, label: "Hébergement optimisé", desc: "Vercel, VPS Linux, cloud — la bonne infra pour le bon usage." },
  { icon: GitBranch, label: "Pipeline CI/CD", desc: "Déploiement automatique à chaque modification. Zéro intervention manuelle." },
  { icon: Shield, label: "Sécurité", desc: "Certificats SSL, headers de sécurité, mises à jour système automatisées." },
  { icon: Zap, label: "Monitoring & alertes", desc: "Je suis alerté avant toi si ton site tombe. Intervention immédiate." },
  { icon: CheckCircle, label: "Sauvegardes auto", desc: "Sauvegardes quotidiennes + plan de récupération testé régulièrement." },
];

export default function GestionServeurDeploiement() {
  const schema = generateServicePageSchema({
    name: "Gestion Serveur & Déploiement",
    description: "Gestion d'infrastructure serveur, CI/CD, sécurité et monitoring pour sites web au Québec. Ton site en ligne 24/7.",
    url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
    serviceType: "Server Management and Deployment",
    areaServed: ["Montréal", "Québec", "Canada"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Gestion Serveur & Déploiement", url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement" },
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
            { label: "Gestion Serveur & Déploiement" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Server className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">99,9 % uptime — sans que tu t'en occupes</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Gestion serveur & déploiement
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Ton site tombe à chaque pic de trafic ? Les mises à jour serveur te donnent des sueurs
              froides ? Tu ne sais pas ce que "Docker" veut dire et tu t'en fiches — tu veux juste
              que ça marche ? Je gère l'infrastructure technique pour que tu puisses te concentrer
              sur ton entreprise. Ton site reste en ligne, sécurisé et rapide, 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Ce que je gère */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Ce que je gère</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {managed.map((item) => (
              <div key={item.label} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
                <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2">{item.label}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Pour qui ?</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Ce service est idéal si tu as un site qui génère du revenu et que tu ne peux pas te
            permettre de temps d'arrêt :
          </p>
          <ul className="space-y-3">
            {[
              "Cliniques et cabinets avec réservation en ligne",
              "E-commerces WooCommerce ou Shopify custom",
              "SaaS et applications web",
              "Sites avec pic de trafic prévisible (événements, promotions)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-base-content/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Services complémentaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/creation-maintenance-sites"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Besoin aussi de maintenance applicative WordPress ?</p>
              <p className="text-primary text-sm mt-1">→ Création & maintenance de sites</p>
            </Link>
            <Link
              to="/services/automatisation-workflows"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">J'héberge aussi n8n en self-hosted sur tes serveurs</p>
              <p className="text-primary text-sm mt-1">→ Automatisation de workflows</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Sécurise ton infrastructure</h2>
          <p className="text-base-content/70 mt-4">
            On fait un audit de ton infra actuelle et je te propose une solution adaptée
            à tes besoins et à ton budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Discutons de ton infrastructure
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
