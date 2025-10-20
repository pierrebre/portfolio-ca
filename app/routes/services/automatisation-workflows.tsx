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
    </div>
  );
}
