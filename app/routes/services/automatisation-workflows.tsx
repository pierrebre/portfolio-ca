import { Bot, Clock, Target, DollarSign, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/automatisation-workflows";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Automatisation de Workflows avec n8n | Gain de Temps pour PME | Montréal",
    description:
      "Automatisation de tâches répétitives et workflows avec n8n pour PME du Québec. Économisez du temps, évitez les erreurs humaines et boostez votre productivité. Développeur n8n freelance à Montréal.",
    url: "https://pierrebarbe.ca/services/automatisation-workflows",
    keywords:
      "automatisation workflows Montréal, n8n développeur Québec, automatisation tâches répétitives, intégration API, workflow automation PME, gain temps automatisation, développeur freelance n8n",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Automatisation de Workflows avec n8n",
  description:
    "Automatisation de tâches répétitives et workflows avec n8n. Économisez du temps, évitez les erreurs humaines et boostez votre productivité.",
  url: "https://pierrebarbe.ca/services/automatisation-workflows",
  serviceType: "Workflow Automation",
});

export default function AutomatisationWorkflows() {
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
            { label: "Automatisation de Workflows (n8n)" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Gagnez 5-20h par semaine
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Automatisation de Workflows avec n8n
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Arrête de perdre du temps sur les tâches répétitives. Automatise
              et concentre-toi sur l'essentiel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Que Peut-on Automatiser ?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                📧 Email & Communication
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>
                  • Envoyer un email de bienvenue automatique quand un client
                  s'inscrit
                </li>
                <li>
                  • Notifications Slack quand un formulaire de contact est
                  rempli
                </li>
                <li>• Rappels automatiques pour suivis clients</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                📊 Données & Rapports
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Synchroniser les ventes WooCommerce vers Google Sheets</li>
                <li>• Générer des rapports hebdomadaires et les envoyer par email</li>
                <li>
                  • Importer automatiquement des leads depuis Facebook Ads vers
                  ton CRM
                </li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                🔗 Intégrations
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>
                  • Publier automatiquement sur les réseaux sociaux quand un
                  article de blog sort
                </li>
                <li>
                  • Sauvegarder les pièces jointes Gmail dans Google
                  Drive/Dropbox
                </li>
                <li>
                  • Créer des factures automatiques dans ton logiciel de
                  comptabilité
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Ce Que Tu Gagnes
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="card bg-base-100 p-8 text-center">
              <Clock
                className="h-12 w-12 text-primary mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-urbanist text-xl font-semibold mb-3">
                Temps
              </h3>
              <p className="text-base-content/80">
                Récupère 5-20h par semaine sur des tâches manuelles
              </p>
            </div>

            <div className="card bg-base-100 p-8 text-center">
              <Target
                className="h-12 w-12 text-primary mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-urbanist text-xl font-semibold mb-3">
                Précision
              </h3>
              <p className="text-base-content/80">
                Fini les erreurs de saisie ou les oublis
              </p>
            </div>

            <div className="card bg-base-100 p-8 text-center">
              <DollarSign
                className="h-12 w-12 text-primary mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-urbanist text-xl font-semibold mb-3">ROI</h3>
              <p className="text-base-content/80">
                L'investissement est amorti en quelques mois grâce au temps
                économisé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                N8n, c'est compliqué à maintenir ?
              </h3>
              <p className="text-base-content/80">
                Non, l'interface visuelle est intuitive. Je te forme lors de la livraison, et tu pourras éditer les workflows toi-même après. Pas besoin de coder.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Quel ROI attendre de l'automatisation ?
              </h3>
              <p className="text-base-content/80">
                En moyenne, mes clients économisent 10-20h par mois. Le ROI est atteint en 3-6 mois selon le projet. Sans compter la réduction des erreurs humaines.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Combien coûte l'automatisation de workflows ?
              </h3>
              <p className="text-base-content/80">
                Ça varie selon la complexité. Un workflow simple (3-5 étapes) démarre à 500$. Les workflows complexes avec multiples intégrations partent de 1500$. Devis gratuit après consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Prêt à Gagner du Temps ?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Discutons de tes processus et vois comment l'automatisation peut
            t'aider.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Réserver une consultation
            </a>
            <a
              href="/contact"
              className="btn btn-outline text-primary-content hover:bg-primary-content hover:text-primary border-primary-content rounded-full px-8 py-3"
            >
              Envoyer un message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
