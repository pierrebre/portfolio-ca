import { Zap, CheckCircle, BarChart3, Image, Code2, Server, Search, Shield, Accessibility, Smartphone } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import CtaSection from "~/components/cta-section";
import LinkCard from "~/components/link-card";
import JsonLd from "~/components/json-ld";
import MonthlyPlans from "~/components/monthly-plans";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/optimisation-web-performance";
import { FREE_AUDIT, PRICING } from "data/pricing";

const URL = "https://pierrebarbe.ca/services/optimisation-web-performance";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Audit et optimisation de site web à Montréal | Pierre Barbé",
      description: `Audit complet de ton site (${PRICING.auditComplet.label}) : vitesse, SEO technique, accessibilité, sécurité. Puis optimisation mesurée avant/après. Premier diagnostic gratuit.`,
      url: URL,
    }),
  ];
}

const auditScope = [
  { icon: BarChart3, title: "Vitesse et Core Web Vitals", description: "Temps de chargement, LCP, INP, CLS : les données réelles de tes visiteurs (Chrome), pas seulement des tests en labo." },
  { icon: Search, title: "Référencement technique", description: "Indexation, structure des pages, balises, sitemap, données structurées : ce que Google voit vraiment de ton site." },
  { icon: Accessibility, title: "Accessibilité", description: "Contrastes, navigation au clavier, lecteurs d'écran : un site que tout le monde peut utiliser, selon les critères WCAG." },
  { icon: Shield, title: "Sécurité", description: "HTTPS, en-têtes de sécurité, plugins vulnérables ou abandonnés, versions logicielles en fin de vie." },
  { icon: Smartphone, title: "Mobile", description: "Affichage, taille des boutons, vitesse sur réseau cellulaire : la plupart de tes visiteurs arrivent sur téléphone." },
  { icon: CheckCircle, title: "Poids des pages", description: "Images, scripts et polices superflus : un site plus léger est plus rapide et consomme moins de ressources." },
];

const optimPoints = [
  { icon: Image, title: "Images et médias", description: "Formats WebP/AVIF, dimensions adaptées à chaque écran, chargement différé. Les images sont souvent la plus grosse part du poids d'une page." },
  { icon: Code2, title: "Code", description: "Scripts inutiles retirés ou différés, CSS allégé. Moins de JavaScript = un site plus rapide sur mobile." },
  { icon: Server, title: "Serveur et cache", description: "Cache, compression, version de PHP à jour, hébergement proche de tes visiteurs." },
  { icon: Zap, title: "WordPress", description: "Plugins en trop, thème lourd, base de données encombrée : un WordPress bien réglé est rapide." },
];

const steps = [
  {
    title: "Premier diagnostic (gratuit)",
    price: "Gratuit",
    desc: `${FREE_AUDIT.summary} C'est souvent suffisant pour savoir si un audit complet vaut la peine.`,
  },
  {
    title: "Audit complet",
    price: PRICING.auditComplet.label,
    desc: `Un rapport écrit et vulgarisé : chaque problème avec sa priorité (critique, important, mineur) et une estimation du coût de correction. Livré en ${PRICING.auditComplet.delay}. Tu peux l'utiliser toi-même, le donner à ton développeur ou me confier les corrections.`,
  },
  {
    title: "Optimisation",
    price: `À partir de ${PRICING.optimisation.label}`,
    desc: "Je corrige dans l'ordre des priorités de l'audit, en mesurant chaque modification avant et après. Tu reçois un bilan chiffré à la fin.",
  },
  {
    title: "Suivi (facultatif)",
    price: `Dès ${PRICING.maintenancePro.label}/mois`,
    desc: "Un contrôle mensuel de la vitesse et un rapport, pour que chaque nouveau plugin ou nouvelle image ne fasse pas tout reculer.",
  },
];

export default function OptimisationWebPerformance() {
  const schema = generateServicePageSchema({
    name: "Audit et optimisation de la performance web",
    description: "Audit complet de site web (vitesse, SEO technique, accessibilité, sécurité) et optimisation des Core Web Vitals pour les PME du Québec.",
    url: URL,
    serviceType: "Web Performance Optimization",
    areaServed: ["Montréal", "Québec"],
    offers: {
      name: "Audit complet de site web",
      description: `Rapport écrit priorisé avec estimation du coût de chaque correction, livré en ${PRICING.auditComplet.delay}.`,
      price: String(PRICING.auditComplet.price),
      priceCurrency: "CAD",
    },
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Performance", url: URL },
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
            { label: "Performance" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">Mesuré avant, mesuré après</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-6">
            Audit et optimisation de ton site web
          </h1>
          <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
            Ton site est lent, mal classé sur Google ou ne t'apporte pas de demandes ?
            Je trouve pourquoi, je te l'explique sans jargon, puis je corrige ce qui a
            le plus d'impact — chiffres à l'appui.
          </p>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Pourquoi la vitesse compte</h2>
          <ul className="space-y-3 mb-6">
            {[
              "53 % des visiteurs mobiles quittent une page qui met plus de 3 secondes à charger (Google)",
              "Google tient compte des Core Web Vitals dans son classement depuis 2021",
              "Seuls 48 % des sites offrent de bons Core Web Vitals sur mobile (HTTP Archive, 2025)",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-base-content/80">{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-base-content/80 leading-relaxed">
            Sources et méthode détaillées dans mon{" "}
            <Link to="/blog/audit-performance-site-web" className="underline">
              guide d'audit de performance
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Ce que couvre l'audit */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3 text-center">Ce que couvre l'audit</h2>
          <p className="text-base-content/70 text-center mb-12">
            Tout ce qui freine ton site, pas seulement la vitesse.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auditScope.map((item) => (
              <div key={item.title} className="bg-base-100 border border-base-content/10 rounded-2xl p-6 shadow-sm">
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

      {/* Parcours et prix */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Le parcours, étape par étape</h2>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10 flex gap-6">
                <div className="text-primary font-black text-3xl leading-none w-10 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {step.title} <span className="text-primary whitespace-nowrap">· {step.price}</span>
                  </h3>
                  <p className="text-base-content/70 leading-relaxed mt-1">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ce que j'optimise */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Ce que je corrige le plus souvent</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {optimPoints.map((item) => (
              <div key={item.title} className="bg-base-100 border border-base-content/10 rounded-2xl p-6 shadow-sm">
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

      <MonthlyPlans className="bg-base-200" />

      {/* Liens internes */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Pour aller plus loin</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/projects" title="Études de cas : les résultats avant/après" label="Voir les projets" bg="bg-base-200" />
            <LinkCard to="/services/creation-maintenance-sites" title="L'audit montre qu'une refonte serait plus rentable ?" label="Site web" bg="bg-base-200" />
          </div>
          <p className="text-base-content/70 text-xs font-medium uppercase tracking-wide mt-8 mb-3">Lire aussi</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/blog/audit-performance-site-web" title="Comment auditer la performance de ton site web" label="Lire l'article" bg="bg-base-200" />
            <LinkCard to="/blog/optimisation-vitesse-wordpress" title="Optimiser la vitesse de ton site WordPress" label="Lire l'article" bg="bg-base-200" />
          </div>
        </div>
      </section>

      <CtaSection title="Commence par le diagnostic gratuit" secondary={{ to: "/services", label: "Voir les 3 offres" }}>
        30 minutes, par courriel ou en visio : je regarde ton site et je te dis ce qui te coûte
        le plus de visiteurs. Sans engagement.
      </CtaSection>
    </div>
  );
}
