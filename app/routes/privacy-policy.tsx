import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import type { Route } from "./+types/privacy-policy";

const SITE = "https://pierrebarbe.ca";
const URL = `${SITE}/politique-confidentialite`;
const DATE_MODIFIED = "2026-04-16";
const DATE_PUBLISHED = "2025-06-03";

const privacySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#webpage`,
      url: URL,
      name: "Politique de confidentialité",
      description:
        "Politique de confidentialité conforme à la Loi 25 du Québec : données collectées, durée de conservation, transferts hors Québec, droits et recours.",
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
        { "@type": "ListItem", position: 2, name: "Politique de confidentialité" },
      ],
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  const image = `${SITE}/images/pb-og-image.jpg`;

  return [
    { title: "Politique de confidentialité | Pierre Barbé" },
    {
      name: "description",
      content:
        "Politique de confidentialité conforme à la Loi 25 du Québec : données collectées, conservation, transferts et droits des utilisateurs.",
    },
    { name: "robots", content: "noindex, follow" },
    { tagName: "link", rel: "canonical", href: URL },
    { property: "og:title", content: "Politique de confidentialité" },
    {
      property: "og:description",
      content:
        "Politique de confidentialité conforme à la Loi 25 du Québec — collecte, conservation, droits.",
    },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { property: "og:url", content: URL },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: "Politique de confidentialité | Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Politique de confidentialité conforme à la Loi 25 du Québec.",
    },
    { name: "twitter:image", content: image },
  ];
}

export default function PrivacyPolicy() {
  return (
    <div>
      <JsonLd data={privacySchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Politique de Confidentialité" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
        <p className="mb-2 text-sm text-base-content/60">
          Dernière mise à jour&nbsp;:{" "}
          <time dateTime={DATE_MODIFIED}>16 avril 2026</time>
        </p>
        <p className="mb-6 text-sm text-base-content/60">
          Date de prise d&apos;effet&nbsp;:{" "}
          <time dateTime={DATE_PUBLISHED}>3 juin 2025</time>
        </p>

        <p className="mb-4">
          Chez Pierre Barbé, développeur web freelance basé à Montréal (Québec),
          la protection de ta vie privée est une priorité. La présente politique
          est conforme à la{" "}
          <strong>
            Loi sur la protection des renseignements personnels dans le secteur
            privé (Loi 25)
          </strong>{" "}
          du Québec. Elle explique quelles données sont collectées, comment
          elles sont utilisées, où elles sont stockées et quels sont tes droits.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Responsable de la protection des renseignements personnels
        </h2>
        <p className="mb-4">
          Conformément à l&apos;article&nbsp;3.1 de la Loi&nbsp;25, le
          responsable désigné est&nbsp;:<br />
          <strong>Pierre Barbé</strong>
          <br />
          <a
            href="mailto:contact@pierrebarbe.ca"
            className="text-primary underline"
          >
            contact@pierrebarbe.ca
          </a>
          <br />
          Montréal, Québec (Canada)
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Données collectées</h2>
        <p className="mb-4">
          Les informations recueillies via le formulaire de contact sont&nbsp;:
          prénom, nom de famille, adresse courriel et message. Aucune autre
          donnée n&apos;est collectée sur ce site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies et traceurs</h2>
        <p className="mb-4">
          Ce site <strong>n&apos;utilise pas de cookies de suivi</strong>,
          d&apos;outils d&apos;analyse (Google Analytics, Meta Pixel, etc.) ni
          de traceurs publicitaires. Seuls des cookies strictement techniques
          peuvent être utilisés par l&apos;hébergeur pour le bon fonctionnement
          du site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Utilisation des données
        </h2>
        <p className="mb-4">
          Les données sont utilisées uniquement pour répondre à ta demande.
          Elles ne sont ni revendues, ni partagées à des fins commerciales ou
          publicitaires.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Sous-traitants et transferts hors du Québec
        </h2>
        <p className="mb-4">
          Pour assurer le fonctionnement du site et le traitement des messages,
          les données peuvent transiter par les services suivants, pouvant
          impliquer un transfert hors du Québec&nbsp;:
        </p>
        <ul className="mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Vercel Inc.</strong> (hébergement, États-Unis) —{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              politique de confidentialité Vercel
            </a>
          </li>
          <li>
            <strong>Resend</strong> (envoi de courriels transactionnels,
            États-Unis) —{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              politique de confidentialité Resend
            </a>
          </li>
        </ul>
        <p className="mb-4">
          Ces sous-traitants sont liés par des engagements contractuels assurant
          un niveau de protection adéquat. Conformément à l&apos;article&nbsp;17
          de la Loi&nbsp;25, une évaluation des facteurs relatifs à la vie
          privée est réalisée pour tout transfert hors du Québec.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Durée de conservation
        </h2>
        <p className="mb-4">
          Les messages reçus via le formulaire de contact sont conservés
          pendant&nbsp;12&nbsp;mois avant suppression définitive, sauf si une
          relation contractuelle est établie (auquel cas la durée légale de
          conservation comptable s&apos;applique).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Sécurité</h2>
        <p className="mb-4">
          Les données sont protégées par des accès sécurisés (mots de passe
          forts, authentification à deux facteurs), un chiffrement en transit
          (HTTPS/TLS) et des sauvegardes régulières chez les hébergeurs.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Tes droits (Loi&nbsp;25)
        </h2>
        <p className="mb-4">
          En vertu de la Loi&nbsp;25, tu disposes des droits suivants sur tes
          renseignements personnels&nbsp;:
        </p>
        <ul className="mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Droit d&apos;accès</strong>&nbsp;: obtenir une copie des
            données te concernant (art.&nbsp;27)
          </li>
          <li>
            <strong>Droit de rectification</strong>&nbsp;: corriger des données
            inexactes, incomplètes ou équivoques (art.&nbsp;28)
          </li>
          <li>
            <strong>Droit à la portabilité</strong>&nbsp;: recevoir tes données
            dans un format technologique structuré et couramment utilisé
            (art.&nbsp;27)
          </li>
          <li>
            <strong>Droit à la désindexation</strong>&nbsp;: demander la
            cessation de la diffusion ou le déréférencement d&apos;un lien
            (art.&nbsp;28.1)
          </li>
          <li>
            <strong>Droit au retrait du consentement</strong> à tout moment
          </li>
          <li>
            <strong>Droit d&apos;effacement</strong>&nbsp;: demander la
            suppression de tes données
          </li>
        </ul>
        <p className="mb-4">
          Pour exercer ces droits, écris à{" "}
          <a
            href="mailto:contact@pierrebarbe.ca"
            className="text-primary underline"
          >
            contact@pierrebarbe.ca
          </a>
          . Une réponse te sera fournie dans les 30&nbsp;jours.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Décision automatisée
        </h2>
        <p className="mb-4">
          Aucune décision te concernant n&apos;est prise sur la base d&apos;un
          traitement automatisé de tes renseignements personnels.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Recours auprès de la Commission d&apos;accès à l&apos;information
        </h2>
        <p className="mb-4">
          Si tu estimes que tes droits ne sont pas respectés, tu peux déposer
          une plainte auprès de la Commission d&apos;accès à l&apos;information
          du Québec (CAI)&nbsp;:<br />
          <a
            href="https://www.cai.gouv.qc.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            www.cai.gouv.qc.ca
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Modifications de la politique
        </h2>
        <p className="mb-4">
          Cette politique peut être mise à jour pour refléter des changements
          légaux ou techniques. La date de dernière mise à jour est indiquée en
          haut de la page. Pour les autres informations légales, consulte les{" "}
          <a href="/mentions-legales" className="text-primary underline">
            mentions légales
          </a>
          .
        </p>
      </section>
    </div>
  );
}
