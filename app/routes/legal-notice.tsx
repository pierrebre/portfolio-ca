import React from "react";
import Breadcrumbs from "~/components/breadcrumbs";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/mentions-legales";
  const image = "https://pierrebarbe.ca/images/pb-og-image.avif";

  return [
    { title: "Mentions légales | Pierre Barbé" },
    { name: "description", content: "Mentions légales, informations éditeur et hébergement du site pierrebarbe.ca." },
    { name: "robots", content: "noindex, follow" },
    { tagName: "link", rel: "canonical", href: url },
    {
      property: "og:title",
      content: "Mentions légales",
    },
    {
      property: "og:site_name",
      content: "Pierre Barbé",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/avif" },
    { property: "og:type", content: "website" },
  ];
}

export default function LegalNotice() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Mentions Légales" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
      <p className="mb-4 text-sm text-gray-500">
        Dernière mise à jour : 3 juin 2025
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">👤 Éditeur du site</h2>
      <p className="mb-4">
        Ce site est édité par :<br />
        <strong>Pierre Barbé</strong>
        <br />
        Développeur web freelance
        <br />
        Montréal, Québec (Canada)
        <br />
        <a
          href="mailto:contact@pierrebarbe.ca"
          className="text-primary underline"
        >
          contact@pierrebarbe.ca
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🆔 Enregistrement</h2>
      <p className="mb-4">
        Numéro d’entreprise (NEQ) : [à compléter si applicable]
        <br />
        Enregistré au Registraire des entreprises du Québec
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">💻 Hébergement</h2>
      <p className="mb-4">
        Ce site est hébergé par :<br />
        <strong>Vercel Inc.</strong>
        <br />
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
        <br />
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener"
          className="text-primary underline"
        >
          https://vercel.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        📜 Propriété intellectuelle
      </h2>
      <p className="mb-4">
        Le contenu de ce site (textes, visuels, code) est protégé par le droit
        d'auteur. Toute reproduction, même partielle, est interdite sans
        autorisation écrite préalable.
      </p>
      </section>
    </div>
  );
}
