import { Laptop, CheckCircle, ShoppingCart, RefreshCw, Server, Shield, HardDrive, Bell } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import CtaSection from "~/components/cta-section";
import LinkCard from "~/components/link-card";
import JsonLd from "~/components/json-ld";
import MonthlyPlans from "~/components/monthly-plans";
import { generateSEOMeta, generateServicePageSchema } from "~/utils/seo";
import type { Route } from "./+types/creation-maintenance-sites";
import { PRICING } from "data/pricing";

const URL = "https://pierrebarbe.ca/services/creation-maintenance-sites";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Création et maintenance de sites WordPress à Montréal",
      description: `Site vitrine WordPress dès ${PRICING.siteVitrine.label}, livré en ${PRICING.siteVitrine.delay}. Refonte, boutique en ligne et maintenance dès ${PRICING.maintenanceEssentiel.label}/mois.`,
      url: URL,
    }),
  ];
}

const offers = [
  {
    icon: Laptop,
    title: "Site vitrine WordPress",
    desc: "5 à 10 pages pour présenter ton entreprise et recevoir des demandes : accueil, services, à propos, contact. Construit sans constructeur de pages lourd, donc rapide et simple à modifier toi-même.",
    price: `À partir de ${PRICING.siteVitrine.label}`,
    delay: PRICING.siteVitrine.delay,
  },
  {
    icon: ShoppingCart,
    title: "Boutique en ligne",
    desc: "Shopify si tu veux démarrer vite sans gérer de serveur ; WooCommerce si tu veux garder la main sur tes données et éviter les frais par vente. Paiements, taxes TPS/TVQ et livraison configurés.",
    price: `À partir de ${PRICING.shopify.label} (Shopify) · ${PRICING.woocommerce.label} (WooCommerce)`,
    delay: PRICING.woocommerce.delay,
  },
  {
    icon: RefreshCw,
    title: "Refonte d'un site existant",
    desc: "Ton site a vieilli, il est lent ou impossible à modifier ? Je le refais en gardant ce qui marche : contenus, adresses des pages et référencement acquis (redirections comprises).",
    price: `${PRICING.refonte.from.label} à ${PRICING.refonte.to.label}`,
    delay: PRICING.refonte.delay,
  },
];

const included = [
  "Design adapté à ton image, pensé d'abord pour le mobile",
  "Vitesse et Core Web Vitals dans le vert à la livraison",
  "SEO technique : structure, balises, sitemap, Google Search Console",
  "Conformité Loi 25 : politique de confidentialité, consentement aux témoins",
  "Formation pour modifier tes contenus toi-même",
  "30 jours de support après la mise en ligne",
];

const hosting = [
  { icon: Server, title: "Hébergement adapté", desc: "Un hébergement fiable avec serveurs au Canada, à ton nom et sur ton compte. Je m'occupe de la configuration et de la migration." },
  { icon: Shield, title: "Sécurité", desc: "HTTPS, en-têtes de sécurité, mises à jour appliquées et vérifiées, accès protégés par double authentification." },
  { icon: HardDrive, title: "Sauvegardes", desc: "Sauvegardes automatiques stockées hors du serveur, et restauration testée : une sauvegarde qu'on n'a jamais restaurée ne vaut rien." },
  { icon: Bell, title: "Surveillance", desc: "Je reçois une alerte si ton site ne répond plus, et j'interviens pendant mes heures ouvrables selon ton forfait." },
];

export default function CreationMaintenanceSites() {
  const schema = generateServicePageSchema({
    name: "Création et maintenance de sites WordPress",
    description: `Création de sites WordPress et de boutiques en ligne pour PME du Québec, hébergement, sécurité et maintenance. Site vitrine à partir de ${PRICING.siteVitrine.label}.`,
    url: URL,
    serviceType: "Web Development and Maintenance",
    areaServed: ["Montréal", "Québec"],
    offers: {
      name: "Site vitrine WordPress",
      description: `Site vitrine de 5 à 10 pages, livré en ${PRICING.siteVitrine.delay} : design, SEO technique, conformité Loi 25, formation et 30 jours de support.`,
      price: String(PRICING.siteVitrine.price),
      priceCurrency: "CAD",
    },
    breadcrumbs: [
      { name: "Accueil", url: "https://pierrebarbe.ca/" },
      { name: "Services", url: "https://pierrebarbe.ca/services" },
      { name: "Site web", url: URL },
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
            { label: "Site web" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Laptop className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">
              Site vitrine livré en {PRICING.siteVitrine.delay}
            </span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-6">
            Création et maintenance de sites WordPress
          </h1>
          <p className="text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
            Tu as besoin d'un site neuf, ou le tien est à refaire ? Je construis des sites
            WordPress rapides, clairs et faciles à modifier, puis je m'occupe de l'hébergement,
            de la sécurité et des mises à jour pour que tu n'aies plus à y penser.
          </p>
        </div>
      </section>

      {/* Offres */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Ce que je construis</h2>
          <div className="space-y-6">
            {offers.map((item) => (
              <div key={item.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-bold text-xl">{item.title}</h3>
                </div>
                <p className="text-base-content/80 leading-relaxed mb-3">{item.desc}</p>
                <p className="text-sm">
                  <span className="text-primary font-semibold">{item.price}</span>
                  <span className="text-base-content/70"> · délai : {item.delay}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-base-content/70 text-sm mt-6">
            Délais comptés du lancement à la mise en ligne, dès réception de tes contenus (textes, photos).
          </p>
        </div>
      </section>

      {/* Inclus */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Inclus dans chaque site</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-base-content/80">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-base-content/70 mt-8">
            Non inclus : la rédaction de tes textes et les photos professionnelles. Ton site,
            ton nom de domaine et ton hébergement restent à ton nom.
          </p>
        </div>
      </section>

      {/* Hébergement & sécurité */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Hébergement, sécurité et sauvegardes</h2>
          <p className="text-base-content/70 text-center mb-12 max-w-2xl mx-auto">
            La partie technique en coulisses, pour que ton site reste en ligne et protégé.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hosting.map((item) => (
              <div key={item.title} className="bg-base-100 rounded-2xl p-6 border border-base-content/10">
                <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MonthlyPlans />

      {/* Liens internes */}
      <section className="bg-base-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Pour aller plus loin</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/projects/piscines-jolicoeur" title="Étude de cas : un site WordPress et son CRM remis d'aplomb" label="Lire l'étude de cas" />
            <LinkCard to="/services/optimisation-web-performance" title="Ton site actuel est surtout lent ?" label="Performance" />
          </div>
          <p className="text-base-content/70 text-xs font-medium uppercase tracking-wide mt-8 mb-3">Lire aussi</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkCard to="/blog/cout-site-web-quebec-prix" title="Combien coûte un site web au Québec en 2026 ?" label="Lire l'article" />
            <LinkCard to="/blog/maintenance-site-web-pme-guide" title="Guide complet : maintenance de site web pour PME" label="Lire l'article" />
          </div>
        </div>
      </section>

      <CtaSection title="Discutons de ton site" secondary={{ to: "/services", label: "Voir les 3 offres" }}>
        Un premier échange gratuit suffit pour cadrer ton besoin et te donner un prix réaliste.
        Tu repars avec des recommandations claires, même si on ne travaille pas ensemble.
      </CtaSection>
    </div>
  );
}
