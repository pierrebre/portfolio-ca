import { ClipboardCheck, CheckCircle2, FileText, TrendingUp } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/audits-techniques-core-web-vitals";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Audit Technique de Site Web & Core Web Vitals | Montréal | Pierre Barbé",
    description:
      "Audit technique complet de votre site web : Core Web Vitals, performance, accessibilité, SEO et sécurité. Rapport clair et vulgarisé avec plan d'action concret. Audit gratuit de 30 min disponible à Montréal.",
    url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
    keywords:
      "audit technique site web Montréal, audit Core Web Vitals, analyse performance site, audit accessibilité WCAG, audit SEO technique, santé site web, développeur audit Québec",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Audits Techniques & Core Web Vitals",
  description:
    "Audit technique complet de votre site web : Core Web Vitals, performance, accessibilité, SEO et sécurité. Rapport clair et vulgarisé avec plan d'action concret.",
  url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
  serviceType: "Technical Website Audit",
});

export default function AuditsTechniquesCoreWebVitals() {
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
            { label: "Audits Techniques & Core Web Vitals" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Audit à 360° de ton site
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Audits Techniques & Core Web Vitals
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Comprends enfin pourquoi ton site est lent, inaccessible ou
              invisible sur Google. Rapport clair + plan d'action.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Un Audit à 360° de la Santé de Ton Site
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                ⚡ Performance & Core Web Vitals
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• LCP (Largest Contentful Paint)</li>
                <li>• FID/INP (Interactivité)</li>
                <li>• CLS (Stabilité visuelle)</li>
                <li>• Analyse Lighthouse, PageSpeed Insights</li>
                <li>• Identification des ressources lourdes</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                ♿ Accessibilité (WCAG 2.1 AA)
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Contraste des couleurs</li>
                <li>• Navigation au clavier</li>
                <li>• Étiquettes ARIA</li>
                <li>• Structure des headings</li>
                <li>• Compatibilité lecteurs d'écran</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                🔍 SEO Technique
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Balises meta (title, description)</li>
                <li>• Structure HTML et sémantique</li>
                <li>• Données structurées (Schema.org)</li>
                <li>• Sitemap, robots.txt</li>
                <li>• Erreurs 404, redirections</li>
                <li>• Mobile-friendliness</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-xl font-semibold mb-4 flex items-center gap-2">
                🔒 Sécurité & 🌱 Empreinte Carbone
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• HTTPS/SSL</li>
                <li>• Headers de sécurité</li>
                <li>• Vulnérabilités connues</li>
                <li>• Poids de la page</li>
                <li>• Nombre de requêtes HTTP</li>
                <li>• Estimation CO₂ par visite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Ce Que Tu Reçois
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {[
              "Rapport d'audit PDF complet (30-50 pages) vulgarisé et illustré",
              "Scores et métriques avant/après projetés",
              "Liste hiérarchisée des problèmes (critique → mineur)",
              "Plan d'action détaillé avec estimations de temps",
              "Recommandations techniques et outils",
              "Présentation vidéo (30 min) pour expliquer les résultats",
              "1 mois de support pour questions de suivi",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base-content/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Formules d'Audit Disponibles
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card bg-base-200 p-8">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-2">
                Audit Express
              </h3>
              <p className="text-sm text-base-content/60 mb-4">Gratuit - 30 min</p>
              <ul className="space-y-2 text-base-content/80 text-sm mb-6">
                <li>• Analyse rapide des Core Web Vitals</li>
                <li>• Identification des 3 problèmes majeurs</li>
                <li>• Recommandations prioritaires</li>
              </ul>
              <p className="text-sm font-semibold">Idéal pour : Première prise de contact</p>
            </div>

            <div className="card bg-base-200 p-8 border-2 border-primary">
              <ClipboardCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-2">
                Audit Standard
              </h3>
              <p className="text-sm text-base-content/60 mb-4">5-7 jours</p>
              <ul className="space-y-2 text-base-content/80 text-sm mb-6">
                <li>• Performance, SEO, accessibilité</li>
                <li>• Rapport détaillé + plan d'action</li>
                <li>• Présentation vidéo</li>
              </ul>
              <p className="text-sm font-semibold">
                Idéal pour : Sites vitrines, blogs, petits e-commerces
              </p>
            </div>

            <div className="card bg-base-200 p-8">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-2">
                Audit Premium
              </h3>
              <p className="text-sm text-base-content/60 mb-4">10-15 jours</p>
              <ul className="space-y-2 text-base-content/80 text-sm mb-6">
                <li>• Tout de l'Audit Standard</li>
                <li>• Sécurité avancée, empreinte carbone</li>
                <li>• Tests utilisateurs (A/B testing)</li>
                <li>• Analyse de la concurrence</li>
              </ul>
              <p className="text-sm font-semibold">
                Idéal pour : Gros e-commerces, sites à fort traffic
              </p>
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
                Quelle différence entre l'audit gratuit et l'audit payant ?
              </h3>
              <p className="text-base-content/80">
                L'audit gratuit (30 min) identifie les 3 problèmes principaux pour te donner une vue d'ensemble. L'audit payant est un rapport détaillé de 30-50 pages avec plan d'action complet et priorisation.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Dois-je implémenter les correctifs moi-même ?
              </h3>
              <p className="text-base-content/80">
                Non, tu as le choix. Je peux gérer l'implémentation des correctifs ou former ton équipe. L'audit inclut toutes les instructions techniques nécessaires.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                À quelle fréquence faire un audit technique ?
              </h3>
              <p className="text-base-content/80">
                Tous les 6-12 mois pour les sites actifs, ou après chaque refonte majeure. Un audit de suivi léger peut être fait trimestriellement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Réserve Ton Audit Gratuit de 30 Min
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Découvre les 3 problèmes principaux de ton site en 30 minutes.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Réserver maintenant
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
