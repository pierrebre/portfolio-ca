import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import type { Route } from "./+types/legal-notice";

const SITE = "https://pierrebarbe.ca";
const URL = `${SITE}/mentions-legales`;
const DATE_MODIFIED = "2026-04-16";
const DATE_PUBLISHED = "2025-06-03";

const legalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#webpage`,
      url: URL,
      name: "Mentions légales",
      description:
        "Mentions légales du site pierrebarbe.ca : éditeur, hébergement, propriété intellectuelle, droit applicable et limitation de responsabilité.",
      inLanguage: "fr-CA",
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: { "@id": `${URL}#breadcrumb` },
      about: { "@id": `${SITE}/#business` },
      dateModified: DATE_MODIFIED,
      datePublished: DATE_PUBLISHED,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Mentions légales" },
      ],
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  const image = `${SITE}/images/pb-og-image.jpg`;

  return [
    { title: "Mentions légales | Pierre Barbé" },
    {
      name: "description",
      content:
        "Mentions légales du site pierrebarbe.ca : éditeur, hébergement, propriété intellectuelle, droit applicable.",
    },
    { name: "robots", content: "noindex, follow" },
    { tagName: "link", rel: "canonical", href: URL },
    { property: "og:title", content: "Mentions légales" },
    {
      property: "og:description",
      content:
        "Mentions légales du site pierrebarbe.ca — éditeur, hébergement, droit applicable.",
    },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { property: "og:url", content: URL },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Mentions légales | Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Mentions légales du site pierrebarbe.ca.",
    },
    { name: "twitter:image", content: image },
  ];
}

export default function LegalNotice() {
  return (
    <div>
      <JsonLd data={legalSchema} />

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
        <p className="mb-4 text-sm text-base-content/60">
          Dernière mise à jour&nbsp;:{" "}
          <time dateTime={DATE_MODIFIED}>16 avril 2026</time>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Éditeur du site</h2>
        <p className="mb-4">
          Ce site est édité par&nbsp;:<br />
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

        <h2 className="text-xl font-semibold mt-6 mb-2">Enregistrement</h2>
        <p className="mb-4">
          Travailleur autonome opérant sous son nom légal.
          <br />
          Non assujetti à l&apos;immatriculation au Registraire des entreprises du
          Québec.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Hébergement</h2>
        <p className="mb-4">
          Ce site est hébergé par&nbsp;:<br />
          <strong>Vercel Inc.</strong>
          <br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
          <br />
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            https://vercel.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Propriété intellectuelle
        </h2>
        <p className="mb-4">
          Le contenu de ce site (textes, visuels, code) est protégé par le
          droit d&apos;auteur. Toute reproduction, même partielle, est interdite
          sans autorisation écrite préalable. Les icônes proviennent de{" "}
          <a
            href="https://lucide.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Lucide
          </a>{" "}
          (licence ISC).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Limitation de responsabilité
        </h2>
        <p className="mb-4">
          Pierre Barbé s&apos;efforce de maintenir les informations de ce site
          exactes et à jour, mais ne peut garantir l&apos;absence totale
          d&apos;erreurs ou d&apos;omissions. L&apos;utilisateur reconnaît
          utiliser ces informations sous sa seule responsabilité. En aucun cas
          Pierre Barbé ne saurait être tenu responsable d&apos;un dommage direct
          ou indirect résultant de l&apos;usage de ce site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Liens vers d&apos;autres sites
        </h2>
        <p className="mb-4">
          Ce site peut contenir des liens vers des sites tiers. Pierre Barbé ne
          contrôle pas le contenu de ces sites et décline toute responsabilité
          quant à leurs pratiques ou contenus.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Droit applicable et juridiction
        </h2>
        <p className="mb-4">
          Les présentes mentions légales sont régies par les lois en vigueur au
          Québec et au Canada. Tout litige relatif au présent site relèvera de
          la compétence exclusive des tribunaux de Montréal (Québec, Canada).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Protection des données
        </h2>
        <p className="mb-4">
          Pour toute question relative à la collecte et à l&apos;utilisation
          des données personnelles, consulte la{" "}
          <a
            href="/politique-confidentialite"
            className="text-primary underline"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </section>
    </div>
  );
}
