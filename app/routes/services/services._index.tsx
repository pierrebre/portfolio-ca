import ServiceCard from "~/components/service-card";
import JsonLd from "~/components/json-ld";
import Faq from "~/components/faq";
import { services, serviceUrl } from "data/services";
import { servicesQuestions } from "data/services-questions";
import { generateSEOMeta } from "~/utils/seo";
import Breadcrumbs from "~/components/breadcrumbs";
import CtaSection from "~/components/cta-section";
import MonthlyPlans from "~/components/monthly-plans";
import type { Route } from "./+types/services._index";

export function meta({}: Route.MetaArgs) {
  return [
    ...generateSEOMeta({
      title: "Services de développement web pour PME | Pierre Barbé",
      description: "3 offres claires pour PME au Québec : site web WordPress, audit et optimisation de la performance, automatisation n8n et IA. Prix affichés, devis sous 24-48 h.",
      url: "https://pierrebarbe.ca/services",
    }),
  ];
}

export default function ServicesIndex() {
  const servicesList = services.map(s => ({
    name: s.name,
    description: s.description,
    url: `https://pierrebarbe.ca${serviceUrl(s.key)}`
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://pierrebarbe.ca/services#webpage",
        "url": "https://pierrebarbe.ca/services",
        "name": "Services de développement web pour PME au Québec",
        "description": "3 offres pour PME : site web WordPress, audit et optimisation de la performance, automatisation n8n et IA.",
        "inLanguage": "fr-CA",
        "isPartOf": {
          "@id": "https://pierrebarbe.ca/#website"
        },
        "breadcrumb": {
          "@id": "https://pierrebarbe.ca/services#breadcrumb"
        },
        "hasPart": [
          ...servicesList.map((service) => ({ "@id": `${service.url}#service` })),
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
            <h1 className="content text-4xl font-bold md:text-5xl mb-6">
              Services de développement web pour PME au Québec
            </h1>
            <p className="text-base-content/80 mx-auto max-w-3xl text-lg leading-relaxed">
              Trois offres, pour les trois besoins que me décrivent le plus souvent
              les PME du Québec : un site à créer ou à refaire, un site qui ne
              performe pas, et des heures perdues sur des tâches répétitives.
              Prix affichés, livrables mesurables.
            </p>
            <p className="text-base-content/70 mx-auto max-w-3xl text-base mt-4 leading-relaxed">
              Tu ne sais pas par où commencer ? Le premier diagnostic est gratuit
              (courriel ou visio), et le devis arrive sous 24-48 h. Réponse en
              français ou en anglais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">3 offres, selon ton besoin</h2>
            <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
              Clique sur une offre pour voir le détail, les livrables, les délais et les tarifs.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.key} service={service} />
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
                Points d'étape réguliers, accès au code en tout temps, résultats
                mesurés avant et après (vitesse, Core Web Vitals, référencement).
              </p>
            </li>
            <li className="bg-base-200 rounded-2xl p-6">
              <div className="text-primary text-sm font-bold tracking-widest mb-2">
                ÉTAPE 4
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison & suivi</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                Bilan chiffré, documentation et formation si besoin. 30 jours de
                support compris, puis suivi mensuel si tu le souhaites.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <MonthlyPlans className="bg-base-200" />

      <Faq
        questions={servicesQuestions}
        title="Questions fréquentes"
        accordionName="services-faq"
        schemaId="https://pierrebarbe.ca/services#faq"
        className="py-20 md:py-24"
      />

      <CtaSection title="Pas sûr de ce qu'il te faut ?" secondary={{ to: "/about", label: "Qui suis-je ?" }}>
        Parle-moi de ton projet — c'est gratuit et sans engagement (mail ou visio, tu décides). On regarde ensemble ce qui freine ton site et ce qui aurait le plus d'impact. Tu repars avec un diagnostic clair, même si on ne travaille pas ensemble.
      </CtaSection>
    </div>
  );
}
