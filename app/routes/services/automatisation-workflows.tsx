import { Bot, Clock, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/automatisation-workflows";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Automatisation de workflows avec n8n | Gain de temps pour PME | Montréal",
      description: "J'automatise tes tâches répétitives avec n8n : onboarding clients, rappels, rapports, intégrations API. À partir de 500 $. Développeur n8n freelance à Montréal.",
      url: "https://pierrebarbe.ca/services/automatisation-workflows",
      keywords: "automatisation workflows Montréal, n8n développeur Québec, automatisation tâches répétitives, intégration API, workflow automation PME, gain temps automatisation",
      type: "article",
    }),
  ];
}

const examples = [
  { context: "E-commerce", workflow: "Nouveau client Shopify → CRM mis à jour → courriel de bienvenue → facture générée" },
  { context: "Agence", workflow: "Formulaire rempli → lead créé dans le CRM → notification Slack → séquence courriel" },
  { context: "Clinique / service", workflow: "Rendez-vous confirmé → rappel SMS 24h avant → suivi post-visite automatique" },
  { context: "Marketing", workflow: "Nouveau post blog → partage réseaux sociaux → newsletter hebdomadaire auto" },
  { context: "Comptabilité", workflow: "Factures reçues → extraction données → entrée dans QuickBooks" },
];

export default function AutomatisationWorkflows() {
  const schema = generateServicePageSchema({
    name: "Automatisation de Workflows avec n8n",
    description: "Automatisation de tâches répétitives avec n8n pour PME du Québec. Économisez 5 à 20 h/semaine. Workflows à partir de 500 $.",
    url: "https://pierrebarbe.ca/services/automatisation-workflows",
    serviceType: "Workflow Automation",
    areaServed: ["Montréal", "Québec", "Canada"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Automatisation de Workflows (n8n)", url: "https://pierrebarbe.ca/services/automatisation-workflows" },
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
            { label: "Automatisation de Workflows (n8n)" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">Gagne 5 à 20 h par semaine</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Automatisation de workflows avec n8n
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Tu passes des heures chaque semaine à copier-coller des données, envoyer des courriels
              manuellement ou mettre à jour des fichiers Excel ? Avec n8n, j'automatise ces tâches
              répétitives pour que tu puisses te concentrer sur ce qui fait vraiment avancer ton entreprise.
            </p>
          </div>
        </div>
      </section>

      {/* Exemples */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3">Exemples concrets d'automatisation</h2>
          <p className="text-base-content/70 mb-10">
            Ces workflows existent déjà. Je les adapte à ton système et à tes données.
          </p>
          <div className="space-y-4">
            {examples.map((ex) => (
              <div key={ex.context} className="bg-base-100 rounded-xl p-5 border border-base-content/10 flex gap-4 items-start">
                <span className="badge badge-primary badge-sm mt-0.5 whitespace-nowrap">{ex.context}</span>
                <p className="text-base-content/80 text-sm leading-relaxed">{ex.workflow}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi n8n */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Pourquoi n8n plutôt que Zapier ou Make ?</h2>
          <p className="text-base-content/80 leading-relaxed mb-4">
            n8n est open source. Tu peux l'héberger toi-même — tes données restent chez toi. Pas de
            frais mensuels qui explosent avec le volume. Et c'est aussi puissant que Zapier, souvent plus.
          </p>
          <p className="text-base-content/80 leading-relaxed mb-8">
            Cela dit, si Make ou Zapier convient mieux à ta situation, je te le dis honnêtement.
            Mon objectif c'est le meilleur outil pour ton cas, pas de vendre un outil en particulier.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "Auto-hébergeable", desc: "Tes données restent sur ton serveur" },
              { icon: Zap, label: "Open source", desc: "Pas de frais qui explosent avec le volume" },
              { icon: CheckCircle, label: "Aussi puissant", desc: "Comparable à Zapier/Make, souvent plus" },
            ].map((item) => (
              <div key={item.label} className="bg-base-200 rounded-xl p-4 text-center">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-base-content/60 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Processus</h2>
          <ol className="space-y-6">
            {[
              { num: "01", title: "Cartographie", desc: "On identifie tes processus manuels et on priorise ceux qui ont le plus d'impact." },
              { num: "02", title: "Conception", desc: "Je conçois le workflow, tu valides la logique avant le développement. Pas de surprise." },
              { num: "03", title: "Développement & test", desc: "Développement dans n8n, tests avec tes vraies données pour valider chaque étape." },
              { num: "04", title: "Déploiement & formation", desc: "Mise en production + je te montre comment suivre et ajuster tes workflows." },
            ].map((step) => (
              <li key={step.num} className="flex gap-6">
                <div className="text-primary font-black text-3xl leading-none w-12 flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Tarification</h2>
          <div className="space-y-4">
            {[
              { label: "Workflow simple (2-3 étapes)", price: "À partir de 500 $" },
              { label: "Workflow moyen (5-10 étapes, API)", price: "À partir de 1 500 $" },
              { label: "Système complet (multi-workflows)", price: "À partir de 3 000 $" },
              { label: "Maintenance & support", price: "150 $/mois" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-200 rounded-xl p-4 gap-2">
                <span className="font-semibold">{item.label}</span>
                <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
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
              to="/services/integration-outils-ia"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Combine automatisation + IA pour des workflows intelligents</p>
              <p className="text-primary text-sm mt-1">→ Intégration d'outils IA</p>
            </Link>
            <Link
              to="/services/gestion-serveur-deploiement"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Héberger n8n sur ton propre serveur ?</p>
              <p className="text-primary text-sm mt-1">→ Gestion serveur & déploiement</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Identifions tes automatisations prioritaires</h2>
          <p className="text-base-content/70 mt-4">
            30 minutes pour cartographier tes processus manuels et identifier ceux qui ont
            le plus d'impact. C'est gratuit.
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
