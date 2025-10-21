import {
  BrainCircuit,
  MessageSquare,
  Search,
  Shield,
  CheckCircle2,
} from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/integration-outils-ia";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Intégration d'Outils IA pour Sites Web | Chatbots & IA | Montréal",
      description: "Intégration d'intelligence artificielle sur votre site web : chatbots, recommandations de contenu, recherche intelligente et plus. Développeur IA freelance à Montréal pour PME du Québec.",
      url: "https://pierrebarbe.ca/services/integration-outils-ia",
      keywords: "intégration IA site web Montréal, chatbot personnalisé, intelligence artificielle PME, développeur IA Québec, chatbot GPT, recommandations contenu IA, recherche intelligente site",
      type: "article",
    }),
  ];
}

export default function IntegrationOutilsIA() {
  const schema = generateServicePageSchema({
    name: "Intégration d'Outils IA",
    description: "Intégration d'intelligence artificielle sur votre site web : chatbots, recommandations de contenu, recherche intelligente et plus. Développeur IA freelance à Montréal pour PME du Québec.",
    url: "https://pierrebarbe.ca/services/integration-outils-ia",
    serviceType: "AI Integration Services",
    areaServed: ["Montréal", "Québec", "Canada"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Intégration d'Outils IA", url: "https://pierrebarbe.ca/services/integration-outils-ia" }
    ]
  });

  return (
    <div className="bg-base-100">
      <JsonLd data={schema} />
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
    </div>
  );
}
