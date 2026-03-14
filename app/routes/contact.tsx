import ContactForm from "~/components/contact-form";
import { Clock, Mail, Phone } from "lucide-react";
import { useToast } from "~/context/toast-context";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";

import type { Route } from "./+types/contact";

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "ContactPage"],
      "@id": "https://pierrebarbe.ca/contact#webpage",
      url: "https://pierrebarbe.ca/contact",
      name: "Contact et devis de site web à Montréal",
      description: "Une question ou un projet ? Écris‑moi ou réserve ta consultation gratuite de 30 min pour booster performance et éco‑conception de ton site.",
      inLanguage: "fr-CA",
      isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
      breadcrumb: { "@id": "https://pierrebarbe.ca/contact#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pierrebarbe.ca/contact#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://pierrebarbe.ca/" },
        { "@type": "ListItem", position: 2, name: "Contact" },
      ],
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/contact";
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    { title: "Contact et devis de site web à Montréal" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Une question ou un projet ? Écris‑moi ou réserve ta consultation gratuite de 30 min pour booster performance et éco‑conception de ton site.",
    },
    {
      property: "og:title",
      content: "Contact et devis de site web à Montréal",
    },
    {
      property: "og:description",
      content:
        "Réserve ta consultation gratuite ou envoie‑moi un message. Réponse en moins de 24 h.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact et devis de site web à Montréal" },
    { name: "twitter:description", content: "Réserve ta consultation gratuite ou envoie‑moi un message. Réponse en moins de 24 h." },
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

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Parlons de ton projet</h1>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary">Première consultation gratuite — 30 min</span>
            <div className="bg-primary h-px w-16" />
          </div>

          <p className="text-base-content/80 mt-6 text-lg md:text-xl text-center">
            On se parle 30 minutes. Tu m'expliques ton projet, je te donne mes
            premières recommandations. Aucun engagement, aucune vente forcée.
            <br />
            <br />
            Je travaille avec des entreprises locales à Montréal, Laval,
            Longueuil et partout au Québec — en français comme en anglais.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="card-title text-2xl">Coordonnées</h2>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Téléphone</h3>
                  <p className="text-base-content/80 mt-1">
                    +1&nbsp;(438)&nbsp;448-8408
                    <br />
                    Réponse rapide (FR/EN)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Courriel</h3>
                  <p className="text-base-content/80 mt-1">
                    contact@pierrebarbe.ca
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Disponibilités</h3>
                  <p className="text-base-content/80 mt-1">
                    Lundi – Vendredi : 9 h – 18 h (heure de Montréal)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border-base-content/10 border">
            <div className="card-body">
              <h2 className="card-title text-2xl">Un projet ? Une question?</h2>
              <p className="text-base-content/80 mb-4">
                Décris‑moi ton besoin ; je reviendrai vers toi rapidement avec
                les prochaines étapes.
              </p>

              <ContactForm onSubmitResult={handleFormSubmitResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
