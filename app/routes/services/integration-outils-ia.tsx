import { BrainCircuit, MessageSquare, Search, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/integration-outils-ia";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Intégration d'outils IA pour ton site web | Chatbots & IA | Montréal",
      description: "Intègre l'IA sur ton site : chatbot GPT entraîné sur ton contenu, recherche sémantique, recommandations. Développeur IA freelance à Montréal. Données hébergées chez toi.",
      url: "https://pierrebarbe.ca/services/integration-outils-ia",
    }),
  ];
}

const iaFeatures = [
  { icon: MessageSquare, title: "Chatbot intelligent (GPT)", description: "Entraîné sur ton contenu, il répond aux questions fréquentes de tes clients en langage naturel — 24/7, sans que tu sois là." },
  { icon: Search, title: "Recherche sémantique", description: "Tes visiteurs trouvent ce qu'ils cherchent même sans utiliser les bons mots-clés. La recherche comprend l'intention, pas juste les mots." },
  { icon: BrainCircuit, title: "Recommandations de contenu", description: "Suggère des articles, produits ou services pertinents selon le comportement du visiteur. Plus d'engagement, plus de conversions." },
  { icon: Zap, title: "Automatisation IA + n8n", description: "Combine l'IA avec des workflows automatisés pour des processus métier intelligents — résumés, classification, extraction de données." },
];

export default function IntegrationOutilsIA() {
  const schema = generateServicePageSchema({
    name: "Intégration d'Outils IA",
    description: "Intégration d'outils IA sur ton site web : chatbots GPT, recherche sémantique, recommandations. Données hébergées chez toi.",
    url: "https://pierrebarbe.ca/services/integration-outils-ia",
    serviceType: "AI Integration Services",
    areaServed: ["Montréal", "Québec", "Canada"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Intégration d'Outils IA", url: "https://pierrebarbe.ca/services/integration-outils-ia" },
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
            { label: "Intégration d'Outils IA" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <BrainCircuit className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">IA utile, pas gadget</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Intégration d'outils IA pour ton site web
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              L'IA n'est pas un buzzword. Bien utilisée, elle peut répondre aux questions de tes clients
              24/7, recommander du contenu pertinent ou automatiser des tâches que tu fais manuellement
              chaque jour. Mal utilisée, c'est un gadget qui coûte cher et n'apporte rien.
              Je t'aide à faire la différence.
            </p>
          </div>
        </div>
      </section>

      {/* Ce que je peux intégrer */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Ce que je peux intégrer</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {iaFeatures.map((item) => (
              <div key={item.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
                <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Mon approche</h2>
          <ol className="space-y-6">
            {[
              { num: "01", text: "On identifie un cas d'usage concret — pas « mettre de l'IA partout »." },
              { num: "02", text: "Je propose la solution la plus simple et rentable pour ce cas précis." },
              { num: "03", text: "Je développe, teste et déploie avec tes vraies données." },
              { num: "04", text: "Les données restent chez toi (hébergement sur ton serveur si nécessaire)." },
            ].map((step) => (
              <li key={step.num} className="flex gap-6">
                <div className="text-primary font-black text-3xl leading-none w-12 flex-shrink-0">{step.num}</div>
                <p className="text-base-content/80 leading-relaxed pt-1">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Tarification</h2>
          <div className="space-y-4">
            {[
              { label: "Chatbot FAQ simple", price: "À partir de 2 000 $" },
              { label: "Recherche sémantique intégrée", price: "À partir de 2 500 $" },
              { label: "Solution IA sur mesure", price: "À partir de 3 500 $" },
              { label: "Maintenance & affinage", price: "200 $/mois" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-100 rounded-xl p-4 gap-2">
                <span className="font-semibold">{item.label}</span>
                <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Services complémentaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/automatisation-workflows"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">L'IA seule ne suffit pas — combine-la avec de l'automatisation</p>
              <p className="text-primary text-sm mt-1">→ Automatisation de workflows n8n</p>
            </Link>
            <Link
              to="/services/creation-maintenance-sites"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Besoin d'un site pour héberger ton chatbot ?</p>
              <p className="text-primary text-sm mt-1">→ Création & maintenance de sites</p>
            </Link>
          </div>
          <p className="text-base-content/50 text-xs font-medium uppercase tracking-wide mt-8 mb-3">Lire aussi</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/blog/chatbot-ia-site-web-pme"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Chatbot IA pour site web : guide complet pour PME</p>
              <p className="text-primary text-sm mt-1">→ Lire l'article</p>
            </Link>
            <Link
              to="/blog/automatiser-business-n8n-pme"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Automatisation + IA : comment les combiner avec n8n</p>
              <p className="text-primary text-sm mt-1">→ Lire l'article</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Parlons de ton cas d'usage IA</h2>
          <p className="text-base-content/70 mt-4">
            Un premier échange gratuit (mail ou visio) pour identifier si l'IA
            peut vraiment t'aider — et comment. Si ce n'est pas le bon moment
            pour toi, je te le dis honnêtement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Parle-moi de ton projet
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
