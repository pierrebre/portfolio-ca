import ContactForm from "~/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "~/context/toast-context";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/contact";
  const image = "https://pierrebarbe.ca/images/pb-og-image.png";

  return [
    { title: "Contact | Pierre Barbé – Développeur webperformant Montréal" },
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
      content: "Contact | Pierre Barbé – Développeur webperformant Montréal",
    },
    {
      property: "og:description",
      content:
        "Réserve ta consultation gratuite ou envoie‑moi un message. Réponse en moins de 24 h.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },

    { name: "twitter:title", content: "Contacte Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Web‑performance, éco‑conception, automatisation : parlons‑en !",
    },
    { name: "twitter:image", content: image },
    { name: "twitter:url", content: url },
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
            <span className="text-primary">On jase ?</span>
            <div className="bg-primary h-px w-16" />
          </div>

          <p className="text-base-content/80 mt-6 text-lg md:text-xl">
            Une idée de projet, une question  ? Écris‑moi, en français ou en
            anglais, et je reviens vers toi en moins de 24 h.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="card-title text-2xl">Coordonnées</h2>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Bureau principal</h3>
                  <p className="text-base-content/80 mt-1">
                    123 boulevard Innovation
                    <br />
                    Montréal, QC&nbsp;HXX&nbsp;1X1
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Téléphone</h3>
                  <p className="text-base-content/80 mt-1">
                    +1&nbsp;(514)&nbsp;123‑4567
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
              <h2 className="card-title text-2xl">Un projet ? Un message ?</h2>
              <p className="text-base-content/80 mb-4">
                Décris‑moi ton besoin ; je reviendrai vers toi sous 24 h avec
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
