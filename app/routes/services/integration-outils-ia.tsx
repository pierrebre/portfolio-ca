import { BrainCircuit, MessageSquare, Search, Shield, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/integration-outils-ia";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Intégration d'Outils IA pour Sites Web | Chatbots & IA | Montréal",
    description:
      "Intégration d'intelligence artificielle sur votre site web : chatbots, recommandations de contenu, recherche intelligente et plus. Développeur IA freelance à Montréal pour PME du Québec.",
    url: "https://pierrebarbe.ca/services/integration-outils-ia",
    keywords:
      "intégration IA site web Montréal, chatbot personnalisé, intelligence artificielle PME, développeur IA Québec, chatbot GPT, recommandations contenu IA, recherche intelligente site",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Intégration d'Outils IA",
  description:
    "Intégration d'intelligence artificielle sur votre site web : chatbots, recommandations de contenu, recherche intelligente. IA utile, pas gadget.",
  url: "https://pierrebarbe.ca/services/integration-outils-ia",
  serviceType: "AI Integration Services",
});

export default function IntegrationOutilsIA() {
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
            { label: "Intégration d'Outils IA" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                IA utile, pas gadget
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Intégration d'Outils IA
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Rends ton site plus intelligent : chatbots, recommandations et
              automatisation IA pour améliorer l'expérience utilisateur.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Ce Qu'on Peut Faire Ensemble
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-base-200 p-8">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Chatbots Intelligents
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Support client 24/7 (FAQ, guidage produits)</li>
                <li>• Qualification de leads automatique</li>
                <li>• Prise de rendez-vous intégrée</li>
                <li>• Multilingue (FR/EN et plus)</li>
                <li>• Intégration avec CRM/Email</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <Search className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Recommandations de Contenu
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Suggestions de produits personnalisées (e-commerce)</li>
                <li>• Articles de blog recommandés selon lecture</li>
                <li>• Moteur de recherche intelligent (recherche sémantique)</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <BrainCircuit className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Analyse & Insights
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Analyse de sentiment des commentaires/avis</li>
                <li>• Génération automatique de résumés de contenu</li>
                <li>• Extraction de mots-clés et tagging automatique</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Génération de Contenu
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Descriptions de produits assistées par IA</li>
                <li>• Traduction automatique avec révision humaine</li>
                <li>• Génération de variantes de texte pour A/B testing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Combien coûte l'intégration d'un chatbot IA ?
              </h3>
              <p className="text-base-content/80">
                Ça dépend de la complexité. Un chatbot simple (FAQ, guidage basique) démarre à 1500$. Les chatbots avancés (CRM intégré, multilangue, apprentissage continu) partent de 3000$. Prototype gratuit de 30 min disponible.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Mes données sont-elles protégées avec l'IA ?
              </h3>
              <p className="text-base-content/80">
                Oui. Je privilégie les solutions conformes RGPD/PIPEDA. Tes données restent chez toi (hébergement local) ou sur des serveurs certifiés. Transparence totale sur l'utilisation des données.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                L'IA nécessite-t-elle beaucoup de maintenance ?
              </h3>
              <p className="text-base-content/80">
                Modérée. Après le déploiement initial, l'IA nécessite un suivi mensuel pour ajuster les réponses selon les nouvelles questions. Je propose des forfaits de maintenance (1-2h/mois) pour garder ton IA performante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Prêt à Rendre Ton Site Plus Intelligent ?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Discutons de ton idée IA et vois comment je peux l'intégrer.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="/contact"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Discuter de mon idée IA
            </a>
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-primary-content hover:bg-primary-content hover:text-primary border-primary-content rounded-full px-8 py-3"
            >
              Réserver une consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
