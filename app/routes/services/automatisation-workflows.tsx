import { Bot, Clock, CheckCircle, Zap, MessageSquare, Inbox, FileText, AlertTriangle } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import CtaSection from "~/components/cta-section";
import LinkCard from "~/components/link-card";
import JsonLd from "~/components/json-ld";
import MonthlyPlans from "~/components/monthly-plans";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/automatisation-workflows";
import { PRICING } from "data/pricing";

const URL = "https://pierrebarbe.ca/services/automatisation-workflows";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Automatisation n8n et IA pour PME | Montréal",
      description: `J'automatise tes tâches répétitives avec n8n (formulaires, relances, CRM, rapports) et j'ajoute l'IA quand elle fait gagner du temps. Dès ${PRICING.workflowSimple.label}.`,
      url: URL,
    }),
  ];
}

const examples = [
  { context: "Clinique / service", workflow: "Rendez-vous confirmé → rappel 24 h avant → suivi après la visite" },
  { context: "Prestataire", workflow: "Formulaire rempli → contact créé dans le CRM → courriel de bienvenue → alerte à l'équipe" },
  { context: "Soumissions", workflow: "Soumission envoyée → relance à J+3 puis J+7 → alerte si toujours sans réponse" },
  { context: "E-commerce", workflow: "Nouvelle commande → client ajouté au CRM → facture générée → suivi de livraison" },
  { context: "Direction", workflow: "Chaque lundi, un rapport par courriel : nouveaux leads, soumissions envoyées, contrats signés" },
];

const aiUses = [
  {
    icon: MessageSquare,
    title: "Assistant IA sur ton site",
    description: "Il répond aux questions fréquentes (horaires, services, prix, délais) à partir de tes propres contenus, et passe la main à un humain pour le reste.",
    price: `À partir de ${PRICING.assistantIa.label}`,
  },
  {
    icon: Inbox,
    title: "Tri et résumé des demandes",
    description: "Les courriels et formulaires entrants sont classés, résumés et envoyés à la bonne personne, avec un brouillon de réponse à valider.",
    price: "Compris dans le prix du workflow",
  },
  {
    icon: FileText,
    title: "Extraction de données",
    description: "Les informations utiles d'une facture, d'un bon de commande ou d'un formulaire sont extraites et saisies à ta place dans tes outils.",
    price: "Compris dans le prix du workflow",
  },
];

export default function AutomatisationWorkflows() {
  const schema = generateServicePageSchema({
    name: "Automatisation de workflows n8n et IA",
    description: `Automatisation des tâches répétitives avec n8n et intégration d'IA utile pour les PME du Québec. Workflows à partir de ${PRICING.workflowSimple.label}.`,
    url: URL,
    serviceType: "Workflow Automation",
    areaServed: ["Montréal", "Québec", "Canada"],
    offers: {
      name: "Workflow simple n8n",
      description: "Conception, développement, tests et mise en production d'un workflow n8n de 2 à 3 étapes.",
      price: String(PRICING.workflowSimple.price),
      priceCurrency: "CAD",
      isMinimumPrice: true,
    },
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Automatisation & IA", url: URL },
    ],
  });

  return (
    <div className="bg-base-100">
      <JsonLd data={schema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Automatisation & IA" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">
              Une clinique est passée de 10 h à 1 h d'administratif par semaine
            </span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-6">
            Automatisation et IA pour les PME
          </h1>
          <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
            Tu passes des heures chaque semaine à copier-coller des données, relancer des clients
            ou remplir des tableaux ? Je relie tes outils avec n8n pour que ces tâches se fassent
            toutes seules, et j'ajoute l'IA seulement là où elle fait vraiment gagner du temps.
          </p>
        </div>
      </section>

      {/* Exemples */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3">Exemples d'automatisations</h2>
          <p className="text-base-content/70 mb-10">
            Des scénarios que j'adapte à tes outils (Gmail, Google Sheets, ton CRM, ta facturation…).
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

      {/* IA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3 text-center">L'IA, quand elle est utile</h2>
          <p className="text-base-content/70 text-center mb-12 max-w-2xl mx-auto">
            Pas d'IA partout : trois usages concrets, qui s'appuient sur tes données et restent
            sous ton contrôle.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {aiUses.map((item) => (
              <div key={item.title} className="bg-base-100 border border-base-content/10 rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed mb-4">{item.description}</p>
                <p className="text-primary font-semibold text-sm mt-auto">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3 rounded-2xl border border-base-content/10 bg-base-200 p-5 max-w-4xl mx-auto">
            <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-base-content/80 text-sm leading-relaxed">
              Une IA peut se tromper. Sur les prix, les délais ou les sujets sensibles, ses réponses
              s'appuient uniquement sur tes contenus validés, et un humain garde la main. Si ton volume
              de demandes ne justifie pas un assistant, je te le dis : une bonne page FAQ suffit parfois.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi n8n */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Pourquoi n8n plutôt que Zapier ou Make ?</h2>
          <p className="text-base-content/80 leading-relaxed mb-4">
            n8n peut être installé sur ton propre serveur, au Canada : tes données y restent, et
            la version auto-hébergée ne facture pas au nombre de tâches exécutées.
          </p>
          <p className="text-base-content/80 leading-relaxed mb-8">
            Si Make ou Zapier convient mieux à ta situation, je te le dis honnêtement. L'objectif,
            c'est le bon outil pour ton cas.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "Auto-hébergeable", desc: "Tes données restent sur ton serveur" },
              { icon: Zap, label: "Coût prévisible", desc: "Pas de frais qui explosent avec le volume" },
              { icon: CheckCircle, label: "Puissant", desc: "Conditions, boucles, API : sans limite d'étapes" },
            ].map((item) => (
              <div key={item.label} className="bg-base-100 rounded-xl p-4 text-center">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-base-content/70 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Comment ça se passe</h2>
          <ol className="space-y-6">
            {[
              { num: "01", title: "Cartographie", desc: "On liste tes tâches manuelles et on commence par celles qui te coûtent le plus de temps." },
              { num: "02", title: "Conception", desc: "Je dessine le workflow, tu valides la logique avant le développement. Pas de surprise." },
              { num: "03", title: "Développement et tests", desc: "Construction dans n8n, tests avec tes vraies données et gestion des cas d'erreur." },
              { num: "04", title: "Mise en production et formation", desc: "Je te montre comment suivre tes workflows et quoi faire si un outil change." },
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
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Tarifs</h2>
          <div className="space-y-4">
            {[
              { label: "Workflow simple (2-3 étapes)", price: `À partir de ${PRICING.workflowSimple.label}` },
              { label: "Workflow intermédiaire (5-10 étapes, API)", price: `À partir de ${PRICING.workflowMoyen.label}` },
              { label: "Système complet (plusieurs workflows reliés)", price: `À partir de ${PRICING.workflowSysteme.label}` },
              { label: "Assistant IA sur ton site", price: `À partir de ${PRICING.assistantIa.label}` },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-100 rounded-xl p-4 gap-2">
                <span className="font-semibold">{item.label}</span>
                <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-base-content/70 text-sm mt-4">
            Surveillance et ajustements ensuite : compris dans les forfaits de suivi ci-dessous.
          </p>
        </div>
      </section>

      <MonthlyPlans />

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Pour aller plus loin</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/projects" title="Étude de cas : automatisation d'une clinique de santé" label="Voir les projets" />
            <LinkCard to="/blog/chatbot-ia-site-web-pme" title="Chatbot IA pour PME : quand ça vaut le coup (ou pas)" label="Lire l'article" />
          </div>
          <p className="text-base-content/70 text-xs font-medium uppercase tracking-wide mt-8 mb-3">Lire aussi</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/blog/automatiser-business-n8n-pme" title="5 workflows n8n concrets pour PME" label="Lire l'article" />
            <LinkCard to="/blog/n8n-vs-zapier-vs-make-pme-2026" title="n8n, Zapier ou Make : quel outil choisir ?" label="Lire l'article" />
          </div>
        </div>
      </section>

      <CtaSection title="Identifions tes automatisations prioritaires" secondary={{ to: "/services", label: "Voir les 3 offres" }}>
        Un premier échange gratuit pour lister tes tâches manuelles et repérer celles qui te
        feront gagner le plus de temps.
      </CtaSection>
    </div>
  );
}
