import { Zap, CheckCircle, BarChart3, Image, Code2, Server, LineChart } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/optimisation-web-performance";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Optimisation performance web & Core Web Vitals | Montréal | Pierre Barbé",
      description: "Ton site met plus de 3 secondes à charger ? J'audite et optimise la performance web de ton site WordPress, Shopify ou React : LCP, INP, CLS, images, cache. Audit gratuit 30 min disponible.",
      url: "https://pierrebarbe.ca/services/optimisation-web-performance",
    }),
  ];
}

const optimPoints = [
  {
    icon: Image,
    title: "Images & médias",
    description: "Conversion WebP/AVIF, lazy loading, responsive images, CDN. Les images représentent souvent 60 % du poids d'une page.",
  },
  {
    icon: Code2,
    title: "Code frontend",
    description: "Minification, tree-shaking, code splitting, CSS critique. Moins de JavaScript = site plus rapide sur mobile.",
  },
  {
    icon: Server,
    title: "Serveur & cache",
    description: "Headers HTTP, compression Brotli/Gzip, cache navigateur. Chaque requête évitée est du temps gagné.",
  },
  {
    icon: BarChart3,
    title: "Core Web Vitals",
    description: "LCP < 2,5 s, INP < 200 ms, CLS < 0,1. Les métriques exactes que Google utilise pour classer ton site.",
  },
  {
    icon: CheckCircle,
    title: "WordPress spécifique",
    description: "Audit plugins, requêtes SQL, cache objet, thème allégé. Un WordPress bien optimisé bat souvent un site React mal codé.",
  },
  {
    icon: LineChart,
    title: "Mesure & suivi",
    description: "Lighthouse, WebPageTest, CrUX data, monitoring continu. Ce qui se mesure s'améliore.",
  },
];

export default function OptimisationWebPerformance() {
  const schema = generateServicePageSchema({
    name: "Optimisation Web-Performance & Core Web Vitals",
    description: "Audit et optimisation de la performance web pour sites WordPress, Shopify et React à Montréal. LCP, INP, CLS, images, cache. Audit gratuit 30 min.",
    url: "https://pierrebarbe.ca/services/optimisation-web-performance",
    serviceType: "Web Performance Optimization",
    areaServed: ["Montréal", "Québec"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Optimisation Web-Performance", url: "https://pierrebarbe.ca/services/optimisation-web-performance" },
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
            { label: "Optimisation Web-Performance" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">Amélioration moyenne : +60 % de vitesse</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Optimisation de la performance web & Core Web Vitals
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Ton site met plus de 3 secondes à charger ? Chaque seconde de plus, c'est 7 % de
              conversions en moins. J'audite, j'optimise et je mesure — jusqu'à ce que ton site soit
              dans le top 10 % des sites les plus rapides de ton industrie.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi ça compte */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Pourquoi la performance web compte</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Un site lent ne fait pas que frustrer tes visiteurs. Il te coûte de l'argent tous les jours.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Google pénalise les sites lents depuis 2021 (Core Web Vitals dans le ranking)",
              "53 % des visiteurs mobile quittent si la page met plus de 3 secondes à charger",
              "Amazon a calculé que 100 ms de latence = 1 % de ventes en moins",
              "Un score Lighthouse sous 50 signifie des positions perdues sur les pages de résultats",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-base-content/80">{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-base-content/80 leading-relaxed">
            La bonne nouvelle ? L'optimisation de performance a le meilleur ROI de tous les investissements
            web. C'est souvent le quick win que personne n'a encore exploité sur ton site.
          </p>
        </div>
      </section>

      {/* Ce que j'optimise */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3 text-center">Ce que j'optimise concrètement</h2>
          <p className="text-base-content/70 text-center mb-12">
            Une approche systématique, pas du bricolage.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {optimPoints.map((item) => (
              <div
                key={item.title}
                className="bg-base-100 border border-base-content/10 rounded-2xl p-6 shadow-sm"
              >
                <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Mon processus en 4 étapes</h2>
          <ol className="space-y-8">
            {[
              {
                num: "01",
                title: "Audit initial (gratuit, 30 min)",
                desc: "Je passe ton site au crible : Lighthouse, WebPageTest, Core Web Vitals réels. Tu reçois un rapport avec les problèmes et les gains potentiels — sans engagement.",
              },
              {
                num: "02",
                title: "Plan d'optimisation priorisé",
                desc: "On cible les corrections qui auront le plus d'impact en premier (80/20). Devis clair, sans surprise.",
              },
              {
                num: "03",
                title: "Optimisation technique",
                desc: "Je corrige, j'optimise, je teste. Chaque modification est mesurée avant/après pour prouver l'impact.",
              },
              {
                num: "04",
                title: "Rapport final + suivi",
                desc: "Tu reçois un rapport avec les métriques avant/après. Et on peut mettre en place un suivi mensuel si tu veux garder le cap.",
              },
            ].map((step) => (
              <li key={step.num} className="flex gap-6">
                <div className="text-primary font-black text-3xl leading-none w-12 flex-shrink-0">
                  {step.num}
                </div>
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
          <h2 className="text-3xl font-bold mb-8">Combien ça coûte</h2>
          <div className="space-y-4">
            {[
              { label: "Audit express (30 min)", price: "Gratuit", note: "Diagnostic + 3 recommandations prioritaires" },
              { label: "Optimisation ponctuelle", price: "À partir de 1 500 $", note: "Site vitrine WordPress" },
              { label: "Suivi mensuel performance", price: "À partir de 300 $/mois", note: "Monitoring + rapport mensuel" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-200 rounded-xl p-4 gap-2"
              >
                <div>
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-base-content/60 text-sm ml-2">— {item.note}</span>
                </div>
                <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-base-content/60 text-sm mt-4">
            Le coût final dépend de la complexité de ton site. On en parle pendant l'audit gratuit.
          </p>
        </div>
      </section>

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Services complémentaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/audits-techniques-core-web-vitals"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Tu veux d'abord un audit complet ?</p>
              <p className="text-primary text-sm mt-1">→ Audits techniques & Core Web Vitals</p>
            </Link>
            <Link
              to="/services/creation-maintenance-sites"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Ton WordPress a besoin d'une refonte ?</p>
              <p className="text-primary text-sm mt-1">→ Création & maintenance de sites</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Réserve ton audit de performance gratuit</h2>
          <p className="text-base-content/70 mt-4">
            30 minutes. Je regarde ton site en direct et je te dis ce qui te coûte le plus de trafic.
            Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Réserver l'audit gratuit
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
