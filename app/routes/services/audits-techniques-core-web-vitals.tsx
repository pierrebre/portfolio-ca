import { ClipboardCheck, CheckCircle, FileText, Search, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/audits-techniques-core-web-vitals";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Audit technique de site web & Core Web Vitals | Montréal | Pierre Barbé",
      description: "Audit technique complet : Core Web Vitals, SEO, accessibilité, sécurité. Rapport clair avec plan d'action. Audit express gratuit (30 min) ou audit complet à partir de 500 $.",
      url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
      keywords: "audit technique site web Montréal, audit Core Web Vitals, analyse performance site, audit accessibilité WCAG, audit SEO technique, audit sécurité site",
      type: "article",
    }),
  ];
}

const auditPoints = [
  { icon: ClipboardCheck, title: "Performance & Core Web Vitals", description: "LCP, INP, CLS, TTFB, temps de chargement réel. On regarde les données terrain, pas juste les tests en labo." },
  { icon: Search, title: "SEO technique", description: "Structure des URLs, balises meta, sitemap, robots.txt, données structurées, indexation. Ce que Google voit de ton site." },
  { icon: Shield, title: "Accessibilité WCAG 2.1", description: "Navigation clavier, lecteurs d'écran, contrastes, ARIA. Un site accessible est un site que tout le monde peut utiliser." },
  { icon: FileText, title: "Sécurité", description: "HTTPS, headers de sécurité, failles connues, plugins vulnérables. La sécurité n'est pas optionnelle." },
  { icon: Smartphone, title: "Mobile", description: "Responsive, vitesse mobile, UX tactile. 18 % de tes visiteurs sont sur mobile — si ton site leur est hostile, tu perds des clients." },
  { icon: CheckCircle, title: "Éco-conception", description: "Poids des pages, requêtes HTTP, empreinte carbone estimée. Un site éco-conçu est un site performant." },
];

export default function AuditsTechniquesCoreWebVitals() {
  const schema = generateServicePageSchema({
    name: "Audits Techniques & Core Web Vitals",
    description: "Audit technique complet de site web : performance, SEO, accessibilité, sécurité. Audit express gratuit ou rapport complet à partir de 500 $.",
    url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
    serviceType: "Technical Website Audit",
    areaServed: ["Montréal", "Québec"],
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Audits Techniques & Core Web Vitals", url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals" },
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
            { label: "Audits Techniques & Core Web Vitals" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <ClipboardCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary text-sm font-medium">Audit à 360° de ton site</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              Audit technique de site web & Core Web Vitals
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Tu sens que ton site ne performe pas comme il devrait, mais tu ne sais pas pourquoi ?
              Un audit technique te donne la réponse — en clair, pas en jargon.
              Je vérifie tout : vitesse, SEO technique, accessibilité, sécurité.
              Tu repars avec un rapport vulgarisé et un plan d'action priorisé.
            </p>
          </div>
        </div>
      </section>

      {/* Ce que couvre l'audit */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Ce que couvre l'audit</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auditPoints.map((item) => (
              <div key={item.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
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

      {/* Deux formules */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Deux formules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-base-200 rounded-2xl p-8">
              <div className="badge badge-success mb-4">Gratuit</div>
              <h3 className="text-2xl font-bold mb-3">Audit Express (30 min)</h3>
              <p className="text-base-content/80 leading-relaxed">
                Je passe ton site dans mes outils, on se parle 30 minutes, et tu repars avec les
                3 problèmes les plus urgents et comment les corriger. Sans engagement, sans arnaque.
                C'est ma façon de prouver ma valeur.
              </p>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-primary-content">
              <div className="badge badge-warning mb-4">À partir de 500 $</div>
              <h3 className="text-2xl font-bold mb-3">Audit Complet</h3>
              <p className="text-primary-content/90 leading-relaxed">
                Rapport PDF de 15-25 pages. Chaque problème est expliqué en langage clair avec sa
                priorité (critique / important / mineur) et une estimation du coût de correction.
                Tu peux l'utiliser toi-même, le donner à ton dev, ou me confier les corrections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Services complémentaires</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/optimisation-web-performance"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Ton audit révèle des problèmes de vitesse ?</p>
              <p className="text-primary text-sm mt-1">→ Optimisation web-performance</p>
            </Link>
            <Link
              to="/services/creation-maintenance-sites"
              className="bg-base-100 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">L'audit montre qu'une refonte serait plus rentable ?</p>
              <p className="text-primary text-sm mt-1">→ Création & maintenance de sites</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Réserve ton audit express gratuit</h2>
          <p className="text-base-content/70 mt-4">
            30 minutes pour savoir exactement où en est ton site et quoi corriger en priorité.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Réserver l'audit express
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
