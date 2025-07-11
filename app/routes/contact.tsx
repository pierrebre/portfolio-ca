import ContactForm from "~/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "~/context/toast-context";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/contact";
  const image = "https://pierrebarbe.ca/images/pb-og-image.avif";

  return [
    { title: "Contact et devis de site web à Montréal" },
    { canonical: url },
    {
      name: "description",
      content:
        "Une question ou un projet ? Écris‑moi ou réserve ta consultation gratuite de 30 min pour booster performance et éco‑conception de ton site.",
    },
    {
      name: "keywords",
      content:
        "contact développeur web Montréal, consultation gratuite site web, audit web, performance site, éco‑conception",
    },
    {
      property: "og:title",
      content: "Contact et devis de site web à Montréal",
    },
    {
      property: "og:description",
      content:
        "Réserve ta consultation gratuite ou envoie‑moi un message. Réponse en moins de 24 h.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { property: "og:image:width", content: "370" },
    { property: "og:image:height", content: "374" },
  ];
}

export default function Contact() {
  const { showToast } = useToast();

  const handleFormSubmitResult = (success: boolean, message?: string) => {
    showToast(
      message ??
        (success
          ? "Ton message a bien été envoyé ! Je te réponds sous 24 h."
          : "Oups ! L’envoi a échoué. Réessaie dans un instant."),
      success ? "success" : "error"
    );
  };

  return (
    <div className="bg-base-100 font-urbanist mx-auto max-w-7xl">
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Contact</h1>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary">Parlons de vos objectifs</span>
            <div className="bg-primary h-px w-16" />
          </div>

          <p className="text-base-content/80 mt-6 text-lg md:text-xl text-center">
            Que vous soyez interéssé pour un audit gratuit de votre site, que
            vous ayez quelques questions techniques ou que vous souhaitiez
            simplement découvrir comment je peux aider votre entreprise en
            ligne, je suis là.
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
                    Lundi – Vendredi : 9 h – 18 h (heure de Montréal)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border-base-content/10 border">
            <div className="card-body">
              <h2 className="card-title text-2xl">Un projet ? Une question?</h2>
              <p className="text-base-content/80 mb-4">
                Décris‑moi ton besoin ; je reviendrai vers toi rapidement avec
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
