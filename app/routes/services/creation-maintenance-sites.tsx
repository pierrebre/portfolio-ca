import { Laptop, CheckCircle2, Wrench, Shield } from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/creation-maintenance-sites";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Création & Maintenance de Sites WordPress Rapides | Montréal | Pierre Barbé",
    description:
      "Création de sites web WordPress rapides, propres et éco-responsables pour PME du Québec. Maintenance mensuelle, mises à jour et support continu. Développeur web freelance basé à Montréal.",
    url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
    keywords:
      "création site WordPress Montréal, développeur WordPress Québec, maintenance site web, site éco-responsable, développement web PME, freelance WordPress Montréal, site rapide durable",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Création & Maintenance de Sites WordPress",
  description:
    "Création de sites web WordPress rapides, propres et éco-responsables. Maintenance mensuelle, mises à jour et support continu.",
  url: "https://pierrebarbe.ca/services/creation-maintenance-sites",
  serviceType: "Web Development and Maintenance",
});

export default function CreationMaintenanceSites() {
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
            { label: "Création & Maintenance de Sites" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Laptop className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Sites performants et durables
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Création & Maintenance de Sites WordPress
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Des sites web rapides, propres et durables. Et je reste après le
              lancement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Sites Web Conçus Pour Durer et Performer
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-2xl font-semibold mb-4">
                Types de sites
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Sites vitrines professionnels
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  E-commerce (WooCommerce)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Blogs et sites de contenu
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Portfolios créatifs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Sites sur mesure (React/Next.js)
                </li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <h3 className="font-urbanist text-2xl font-semibold mb-4">
                Inclus dans chaque projet
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Design responsive (mobile-first)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Optimisation SEO de base
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Performance web (score Lighthouse &gt; 90)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Accessibilité (WCAG AA minimum)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Formation à l'utilisation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  Documentation complète
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Maintenance : Ton Site Reste Sain et Sécurisé
          </h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="card bg-base-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="h-8 w-8 text-primary" />
                <h3 className="font-urbanist text-xl font-semibold">
                  Maintenance Essentielle
                </h3>
              </div>
              <ul className="space-y-2 text-base-content/80 mb-6">
                <li>• Mises à jour WordPress, plugins, thèmes</li>
                <li>• Sauvegardes hebdomadaires</li>
                <li>• Surveillance de sécurité</li>
                <li>• Support par email (&lt;48h)</li>
              </ul>
              <div className="text-primary font-semibold">Forfait mensuel</div>
            </div>

            <div className="card bg-base-100 p-8 border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="font-urbanist text-xl font-semibold">
                  Maintenance Premium
                </h3>
              </div>
              <ul className="space-y-2 text-base-content/80 mb-6">
                <li>• Tout de la formule Essentielle</li>
                <li>• Optimisation performance mensuelle</li>
                <li>• Ajout/modification contenu (2h/mois)</li>
                <li>• Support prioritaire (&lt;24h)</li>
                <li>• Rapport mensuel de santé du site</li>
              </ul>
              <div className="text-primary font-semibold">Forfait mensuel</div>
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
                Combien coûte un site WordPress sur mesure ?
              </h3>
              <p className="text-base-content/80">
                À partir de 3000$ selon les fonctionnalités (site vitrine simple). Les e-commerces et sites complexes démarrent à 5000$. Devis gratuit après consultation de 30 min.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Offres-tu la maintenance après la mise en ligne ?
              </h3>
              <p className="text-base-content/80">
                Oui, j'ai des forfaits mensuels (Essentiel et Premium). Le premier mois de support est inclus dans tous mes projets de création.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Puis-je modifier mon site moi-même après ?
              </h3>
              <p className="text-base-content/80">
                Absolument. Formation incluse + documentation complète. Tu pourras gérer le contenu facilement (textes, images, articles).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Prêt à Créer Ton Site ?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Discutons de ton projet et vois comment je peux t'aider.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="/contact"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Demander un devis
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
