import { Link } from "react-router";
import ServiceCard from "~/components/service-card";
import JsonLd from "~/components/json-ld";
import Faq from "~/components/faq";
import { services } from "data/services";
import { servicesQuestions } from "data/services-questions";
import { generateSEOMeta } from "~/utils/seo";
import Breadcrumbs from "~/components/breadcrumbs";
import { getServiceUrl } from "~/utils/service-links";
import type { Route } from "./+types/services._index";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Services de développement web pour PME au Québec | Pierre Barbé",
      description: "6 services web pour PME : création de sites WordPress, optimisation performance, audits Core Web Vitals, automatisation n8n et intégration IA. Devis sous 24 h.",
      url: "https://pierrebarbe.ca/services",
    }),
  ];
}

export default function ServicesIndex() {
  const servicesList = services.map(s => ({
    name: s.name,
    description: s.description,
    url: `https://pierrebarbe.ca${getServiceUrl(s.key)}`
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://pierrebarbe.ca/services#webpage",
        "url": "https://pierrebarbe.ca/services",
        "name": "Services de développement web pour PME au Québec",
        "description": "6 services web pour PME : création WordPress, optimisation performance, audits Core Web Vitals, automatisation n8n et intégration IA.",
        "inLanguage": "fr-CA",
        "isPartOf": {
          "@id": "https://pierrebarbe.ca/#website"
        },
        "breadcrumb": {
          "@id": "https://pierrebarbe.ca/services#breadcrumb"
        },
        "hasPart": [
          { "@id": "https://pierrebarbe.ca/services/optimisation-web-performance#service" },
          { "@id": "https://pierrebarbe.ca/services/creation-maintenance-sites#service" },
          { "@id": "https://pierrebarbe.ca/services/automatisation-workflows#service" },
          { "@id": "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals#service" },
          { "@id": "https://pierrebarbe.ca/services/gestion-serveur-deploiement#service" },
          { "@id": "https://pierrebarbe.ca/services/integration-outils-ia#service" }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://pierrebarbe.ca/services#itemlist",
        "name": "Services de Développement Web - Pierre Barbé",
        "description": "Liste complète des services de développement web, optimisation performance et automatisation proposés à Montréal et au Québec",
        "numberOfItems": servicesList.length,
        "itemListElement": servicesList.map((service, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "@id": `${service.url}#service`,
            "name": service.name,
            "description": service.description,
            "url": service.url,
            "provider": {
              "@id": "https://pierrebarbe.ca/#person"
            }
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pierrebarbe.ca/services#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://pierrebarbe.ca/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services"
            // Pas de "item" pour le dernier élément (page actuelle)
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-base-100">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        />
      </div>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center">
              <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
            </div>
            <h1 className="font-urbanist content text-4xl font-bold md:text-5xl mb-6">
              Services de développement web pour PME au Québec
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg leading-relaxed">
              Création de sites, optimisation performance, automatisation et
              intégration IA — 6 prestations claires pensées pour les PME, e-commerces
              et agences du Québec. Tarifs transparents, livrables mesurables,
              zéro promesse creuse.
            </p>
            <p className="text-base-content/70 mx-auto max-w-3xl text-base mt-4 leading-relaxed">
              Que ton site soit lent, vieillissant ou qu'il traîne de la patte
              côté SEO — ou que tu parts de zéro — je livre du concret avec des
              métriques avant/après. Premier échange gratuit (mail ou visio),
              devis sous 24 h, réponse en français ou en anglais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Mes 6 services</h2>
            <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
              Chaque service répond à un besoin précis. Clique pour voir le
              détail, les livrables et les tarifs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                name={service.name}
                description={service.description}
                linkTo={getServiceUrl(service.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Une méthode claire, des livrables mesurables
            </h2>
            <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
              Quel que soit le service, le processus reste le même : simple,
              transparent, sans surprises.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <li className="bg-base-200 rounded-2xl p-6">
              <div className="text-primary text-sm font-bold tracking-widest mb-2">
                ÉTAPE 1
              </div>
              <h3 className="font-bold text-lg mb-2">Premier échange</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                Échange gratuit (mail ou visio, tu choisis) pour cadrer le
                besoin, les contraintes et le budget. Je te dis franchement si
                je suis le bon choix — sinon je redirige.
              </p>
            </li>
            <li className="bg-base-200 rounded-2xl p-6">
              <div className="text-primary text-sm font-bold tracking-widest mb-2">
                ÉTAPE 2
              </div>
              <h3 className="font-bold text-lg mb-2">Devis détaillé</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                Sous 24-48 h, un devis clair avec périmètre, livrables, délai et
                prix fixe (pas de régie ouverte). Tu valides, on démarre.
              </p>
            </li>
            <li className="bg-base-200 rounded-2xl p-6">
              <div className="text-primary text-sm font-bold tracking-widest mb-2">
                ÉTAPE 3
              </div>
              <h3 className="font-bold text-lg mb-2">Exécution</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                Point hebdo, accès au repo Git en live, métriques mesurées avant
                et après (Lighthouse, Core Web Vitals, Ahrefs). Tu vois tout.
              </p>
            </li>
            <li className="bg-base-200 rounded-2xl p-6">
              <div className="text-primary text-sm font-bold tracking-widest mb-2">
                ÉTAPE 4
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison & suivi</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                Rapport final avec résultats chiffrés, documentation et
                formation si besoin. Garantie 30 jours + option maintenance
                mensuelle.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <Faq
        questions={servicesQuestions}
        title="Questions fréquentes"
        accordionName="services-faq"
        idPrefix="services-faq-item"
        className="bg-base-200 py-20 md:py-24"
      />

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Pas sûr de ce qu'il te faut ?</h2>
          <p className="text-base-content/70 mt-4 leading-relaxed">
            Parle-moi de ton projet — c'est gratuit et sans engagement (mail ou
            visio, tu décides). On regarde ensemble ce qui freine ton site et ce
            qui aurait le plus d'impact. Tu repars avec un diagnostic clair,
            même si on ne travaille pas ensemble.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10">
              Parle-moi de ton projet
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost rounded-full px-10 border border-base-content/20"
            >
              Qui suis-je ?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
