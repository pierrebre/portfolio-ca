import ContactForm from "~/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "~/context/toast-context";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";

import type { Route } from "./+types/contact";

const SITE = "https://pierrebarbe.ca";

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "ContactPage"],
      "@id": `${SITE}/contact#webpage`,
      url: `${SITE}/contact`,
      name: "Contact et devis site web à Montréal",
      description:
        "Demande un devis site web ou réserve ta consultation gratuite de 30 min. Développeur freelance à Montréal — Laval, Longueuil, partout au Québec.",
      inLanguage: "fr-CA",
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: { "@id": `${SITE}/contact#breadcrumb` },
      about: { "@id": `${SITE}/#business` },
      mainEntity: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}/contact#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Contact" },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Pierre Barbé",
      url: `${SITE}/about`,
      email: "contact@pierrebarbe.ca",
      telephone: "+1-438-448-8408",
      jobTitle: "Développeur Web Freelance",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      sameAs: [
        "https://www.linkedin.com/in/pierre-barb%C3%A9/",
        "https://github.com/pierrebre",
        "https://twitter.com/PierreBarbe",
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE}/#business`,
      name: "Pierre Barbé — Développeur Web Freelance",
      url: SITE,
      telephone: "+1-438-448-8408",
      email: "contact@pierrebarbe.ca",
      priceRange: "$$",
      image: `${SITE}/images/pb-og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "45.5017",
        longitude: "-73.5673",
      },
      areaServed: [
        { "@type": "City", name: "Montréal" },
        { "@type": "City", name: "Laval" },
        { "@type": "City", name: "Longueuil" },
        { "@type": "State", name: "Québec" },
        { "@type": "Country", name: "Canada" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-438-448-8408",
        email: "contact@pierrebarbe.ca",
        contactType: "Customer Service",
        areaServed: "CA",
        availableLanguage: ["fr-CA", "en"],
      },
      sameAs: [
        "https://www.linkedin.com/in/pierre-barb%C3%A9/",
        "https://github.com/pierrebre",
      ],
      founder: { "@id": `${SITE}/#person` },
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  const url = `${SITE}/contact`;
  const image = `${SITE}/images/pb-og-image.jpg`;

  return [
    { title: "Contact & devis site web à Montréal — Pierre Barbé" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Demande un devis site web ou réserve ta consultation gratuite 30 min. Développeur freelance à Montréal, Laval, Longueuil & Québec. Réponse sous 24 h.",
    },
    {
      property: "og:title",
      content: "Contact & devis site web à Montréal — Pierre Barbé",
    },
    {
      property: "og:description",
      content:
        "Devis site web gratuit ou consultation 30 min. Montréal, Laval, Longueuil & Québec. Réponse sous 24 h.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:title", content: "Contact & devis site web à Montréal — Pierre Barbé" },
    {
      name: "twitter:description",
      content:
        "Devis site web gratuit ou consultation 30 min. Montréal, Laval, Longueuil & Québec.",
    },
    { name: "twitter:image", content: image },
  ];
}

export default function Contact() {
  const { showToast } = useToast();

  const handleFormSubmitResult = (success: boolean, message?: string) => {
    showToast(
      message ??
        (success
          ? "Ton message a bien été envoyé ! Je te réponds sous 24 h."
          : "Oups ! L'envoi a échoué. Réessaie dans un instant."),
      success ? "success" : "error"
    );
  };

  return (
    <div className="bg-base-100 font-urbanist mx-auto max-w-7xl">
      <JsonLd data={contactSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Devis site web &amp; consultation gratuite — Montréal
          </h1>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary">Consultation 30 min offerte — réponse sous 24 h</span>
            <div className="bg-primary h-px w-16" />
          </div>

          <p className="text-base-content/80 mt-6 text-lg md:text-xl text-center max-w-3xl mx-auto">
            Développeur web freelance à Montréal, je conçois des sites rapides,
            bien référencés et éco-conçus pour les PME du Québec. Parle-moi de
            ton projet de création ou refonte — je te réponds sous 24 h avec un
            devis clair, sans engagement ni vente forcée.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="card-title text-2xl">Coordonnées</h2>

            <dl className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-lg font-medium">Téléphone</dt>
                  <dd className="text-base-content/80 mt-1">
                    <a
                      href="tel:+14384488408"
                      className="link link-hover"
                      aria-label="Appeler le +1 438 448 8408"
                    >
                      +1&nbsp;(438)&nbsp;448-8408
                    </a>
                    <br />
                    <span className="text-sm">Réponse rapide (FR/EN)</span>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-lg font-medium">Courriel</dt>
                  <dd className="text-base-content/80 mt-1">
                    <a
                      href="mailto:contact@pierrebarbe.ca"
                      className="link link-hover"
                    >
                      contact@pierrebarbe.ca
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-lg font-medium">Disponibilités</dt>
                  <dd className="text-base-content/80 mt-1">
                    Lundi – Vendredi : 9&nbsp;h – 18&nbsp;h (heure de Montréal)
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-lg font-medium">Zones servies</dt>
                  <dd className="text-base-content/80 mt-1">
                    Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord
                    <br />
                    <span className="text-sm">
                      Et partout au Québec en télétravail — FR/EN.
                    </span>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="card bg-base-100 border-base-content/10 border">
            <div className="card-body">
              <h2 className="card-title text-2xl">Un projet ? Une question ?</h2>
              <p className="text-base-content/80 mb-4">
                Décris-moi ton besoin&nbsp;: je reviens vers toi rapidement avec
                les prochaines étapes et un devis clair.
              </p>

              <ContactForm onSubmitResult={handleFormSubmitResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
