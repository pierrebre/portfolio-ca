import {
  Zap,
  CheckCircle2,
  ClipboardCheck,
  Server,
  Laptop,
} from "lucide-react";
import { Link } from "react-router";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/optimisation-web-performance";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Optimisation Web-Performance & Core Web Vitals | Montréal | Pierre Barbé",
    description:
      "Service d'optimisation de la performance web et Core Web Vitals à Montréal. Amélioration de la vitesse de chargement, réduction de l'empreinte carbone et boost du SEO pour PME du Québec. Audit gratuit disponible.",
    url: "https://pierrebarbe.ca/services/optimisation-web-performance",
    keywords:
      "optimisation web-performance Montréal, Core Web Vitals amélioration, vitesse site web, LCP FID CLS optimisation, performance site WordPress, éco-conception web Québec, réduction empreinte carbone site",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Optimisation Web-Performance & Core Web Vitals",
  description:
    "Service d'optimisation de la performance web et Core Web Vitals. Amélioration de la vitesse de chargement, réduction de l'empreinte carbone et boost du SEO.",
  url: "https://pierrebarbe.ca/services/optimisation-web-performance",
  serviceType: "Web Performance Optimization",
});

export default function OptimisationWebPerformance() {
  return (
    <div className="bg-base-100">
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Breadcrumbs */}
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
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Amélioration moyenne : +60% de vitesse
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Optimisation Web-Performance & Core Web Vitals
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Rends ton site plus rapide, plus vert et mieux classé sur Google
            </p>
          </div>
        </div>
      </section>


      {/* Ce qui est Inclus */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Ce que Comprend l'Optimisation
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Audit complet des Core Web Vitals (LCP, FID/INP, CLS)",
              "Optimisation des images (formats modernes WebP/AVIF, compression, lazy-loading)",
              "Minification et compression du code (CSS, JS, HTML)",
              "Mise en cache avancée (browser cache, CDN si applicable)",
              "Optimisation du Critical Rendering Path",
              "Analyse et réduction de l'empreinte carbone",
              "Rapport avant/après avec métriques Lighthouse et PageSpeed Insights",
              "Recommandations de maintenance continue",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-base-content/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Pour Qui */}
      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-8 text-center">
            Ce Service Est Fait Pour Toi Si...
          </h2>
          <div className="space-y-4">
            {[
              "Ton site charge en plus de 3 secondes",
              "Tu vois des visiteurs quitter avant que la page ne charge",
              "Ton score PageSpeed Insights est en-dessous de 75",
              "Tu veux améliorer ton classement Google",
              "Tu souhaites réduire ton empreinte carbone numérique",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="checkbox checkbox-primary checkbox-sm mt-1" />
                <span className="text-base-content/80 text-lg">{item}</span>
              </div>
            ))}
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
                Combien de temps prend une optimisation complète ?
              </h3>
              <p className="text-base-content/80">
                Entre 2 et 4 semaines selon la complexité du site. Les résultats
                sont visibles dès les premières itérations, et je te tiens au
                courant à chaque étape.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Mon site WordPress peut-il vraiment atteindre 90+ sur PageSpeed ?
              </h3>
              <p className="text-base-content/80">
                Oui, absolument. Avec les bonnes optimisations (images, cache,
                code propre), j'ai des dizaines de sites WordPress qui tournent à
                95+. C'est tout à fait réalisable.
              </p>
            </div>

            <div className="card bg-base-200 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Est-ce que l'optimisation affecte le design de mon site ?
              </h3>
              <p className="text-base-content/80">
                Non, l'optimisation se fait « sous le capot ». Ton site garde le
                même look, mais charge beaucoup plus rapidement. Aucun compromis
                sur le design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Complémentaires */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Services Complémentaires
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              to="/services/audits-techniques-core-web-vitals"
              className="card bg-base-200 hover:bg-base-300 transition-colors p-6"
            >
              <ClipboardCheck
                className="w-12 h-12 text-primary mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-2">
                Audits Techniques & Core Web Vitals
              </h3>
              <p className="text-base-content/80 text-sm">
                Identifie tous les problèmes de performance avant de les
                corriger
              </p>
            </Link>

            <Link
              to="/services/gestion-serveur-deploiement"
              className="card bg-base-200 hover:bg-base-300 transition-colors p-6"
            >
              <Server
                className="w-12 h-12 text-primary mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-2">
                Gestion Serveur & Déploiement
              </h3>
              <p className="text-base-content/80 text-sm">
                Un serveur bien configuré = un site encore plus rapide
              </p>
            </Link>

            <Link
              to="/services/creation-maintenance-sites"
              className="card bg-base-200 hover:bg-base-300 transition-colors p-6"
            >
              <Laptop
                className="w-12 h-12 text-primary mb-4"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-2">
                Création & Maintenance de Sites
              </h3>
              <p className="text-base-content/80 text-sm">
                Un site conçu performant dès le départ
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Prêt à Accélérer Ton Site ?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Réserve ton audit gratuit de 30 minutes et découvre comment
            améliorer tes performances.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Réserver mon audit gratuit
            </a>
            <a
              href="/contact"
              className="btn btn-outline text-primary-content hover:bg-primary-content hover:text-primary border-primary-content rounded-full px-8 py-3"
            >
              Discuter de mon projet
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
