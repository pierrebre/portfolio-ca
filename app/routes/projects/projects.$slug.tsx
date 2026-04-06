import { Link } from "react-router";
import { ArrowLeft, CheckCircle, Calendar, Wrench } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import type { Route } from "./+types/projects.$slug";

const CASE_STUDIES: Record<
  string,
  {
    title: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  "piscines-jolicoeur": {
    title: "Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur",
    metaTitle:
      "Service de Piscines Jolicoeur — Corrections WordPress & intégration CRM | Pierre Barbé",
    metaDescription:
      "Diagnostic et correction de dysfonctionnements sur un site WordPress avec intégration CRM Plannit pour une PME piscines sur la Rive-Nord de Montréal. Tous les problèmes résolus.",
  },
};

export function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  if (!CASE_STUDIES[slug]) {
    throw new Response("Étude de cas non trouvée", { status: 404 });
  }

  return { slug };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.slug || !CASE_STUDIES[data.slug]) {
    return [{ title: "Étude de cas non trouvée | Pierre Barbé" }];
  }

  const study = CASE_STUDIES[data.slug];
  const url = `https://pierrebarbe.ca/projects/${data.slug}`;
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    { title: study.metaTitle },
    { tagName: "link", rel: "canonical", href: url },
    { name: "description", content: study.metaDescription },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { property: "og:title", content: study.metaTitle },
    { property: "og:description", content: study.metaDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: study.metaTitle },
    { name: "twitter:description", content: study.metaDescription },
    { name: "twitter:image", content: image },
  ];
}

export default function ProjectCaseStudy({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData;

  if (slug === "piscines-jolicoeur") {
    return <PiscinesJolicoeur />;
  }

  return null;
}

function PiscinesJolicoeur() {
  const url = "https://pierrebarbe.ca/projects/piscines-jolicoeur";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur",
        description:
          "Diagnostic et correction de dysfonctionnements sur un site WordPress avec intégration CRM Plannit pour une PME piscines sur la Rive-Nord de Montréal.",
        inLanguage: "fr-CA",
        isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
        author: { "@id": "https://pierrebarbe.ca/#person" },
        publisher: { "@id": "https://pierrebarbe.ca/#organization" },
        datePublished: "2026-04-04T00:00:00-05:00",
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://pierrebarbe.ca/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projets",
            item: "https://pierrebarbe.ca/projects",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Service de Piscines Jolicoeur",
          },
        ],
      },
      /*
        ============================================
        TÉMOIGNAGE CLIENT — À ACTIVER QUAND REÇU
        ============================================

        Instructions :
        1. Décommenter le bloc JSON-LD ci-dessous
        2. Décommenter le bloc JSX de témoignage plus bas dans le composant
        3. Remplacer [NOM], [TEXTE], [DATE ISO]

        {
          "@type": "Review",
          "itemReviewed": { "@id": "https://pierrebarbe.ca/#business" },
          "author": { "@type": "Person", "name": "[NOM]" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "[TEXTE]",
          "datePublished": "[DATE ISO]"
        },
      */
    ],
  };

  const corrections = [
    {
      title: "Mapping des services vers le CRM",
      description:
        "Les services sélectionnés par les visiteurs arrivaient en texte brut au lieu d'être associés aux bons identifiants du CRM. Construction d'un mapping PHP sur mesure avec gestion des cas spéciaux (apostrophes, services multi-valeurs).",
    },
    {
      title: "Champ « Déjà client ? » non transmis",
      description:
        "Un champ du formulaire n'était pas inclus dans les données envoyées au CRM. Ajout du mapping vers les custom fields Plannit.",
    },
    {
      title: "Page « Vie privée » mal positionnée",
      description:
        "Retrait du menu principal, proposition de placement en footer. Conseil sur la conformité Loi 25.",
      link: { href: "/blog/loi-25-site-web-conformite-pme", label: "En savoir plus sur la Loi 25 →" },
    },
    {
      title: "Procédure invisible pour un service",
      description:
        "La logique conditionnelle du formulaire utilisait le mauvais opérateur, empêchant l'affichage d'une procédure importante. Correction de la condition + remplacement d'un Lorem ipsum oublié par le développeur précédent.",
    },
    {
      title: "Soumissions en double dans le CRM",
      description:
        "Un hook WordPress se déclenchait deux fois par soumission, créant des doublons dans Plannit. Diagnostic par logging custom et analyse des timestamps, puis correction du déclenchement.",
    },
  ];

  return (
    <div className="bg-base-100 font-urbanist min-h-screen">
      <JsonLd data={schema} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Projets", href: "/projects" },
            { label: "Service de Piscines Jolicoeur" },
          ]}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero */}
        <header className="pt-8 pb-10 border-b border-base-content/10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">Étude de cas</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur
          </h1>

          <p className="text-base-content/70 mt-4 text-lg leading-relaxed">
            PME spécialisée en piscines creusées · Rive-Nord de Montréal · En activité depuis 1999
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="badge badge-primary gap-1">
              <CheckCircle className="h-3 w-3" aria-hidden="true" />
              Tous les problèmes résolus
            </div>
            <div className="badge badge-outline gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              Mars 2026
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["WordPress", "Fluent Forms", "API REST", "Plannit CRM", "PHP"].map((tag) => (
              <span
                key={tag}
                className="badge badge-sm badge-ghost"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Le défi */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Le défi</h2>
          <p className="text-base-content/80 leading-relaxed">
            Le site WordPress du client, développé par une agence externe qui n'assurait plus le support,
            présentait plusieurs dysfonctionnements dans la liaison entre son formulaire de soumission (Fluent Forms
            Pro) et son CRM Plannit. Les données ne remontaient pas correctement : services mal mappés,
            champs manquants, logique conditionnelle cassée, et soumissions en double causées par un hook
            WordPress qui se déclenchait deux fois.
          </p>
          <p className="text-base-content/70 text-sm mt-3">
            En savoir plus sur{" "}
            <Link to="/blog/wordpress-pme-quebec-2026" className="text-primary hover:underline">
              WordPress pour les PME québécoises en 2026
            </Link>
            .
          </p>
        </section>

        {/* Les 5 corrections */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Les corrections</h2>
          <div className="space-y-4">
            {corrections.map((correction, idx) => (
              <div
                key={idx}
                className="bg-base-200 rounded-2xl p-6 border border-base-content/5"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{correction.title}</h3>
                    <p className="text-base-content/70 mt-1 leading-relaxed text-sm">
                      {correction.description}
                    </p>
                    {correction.link && (
                      <Link
                        to={correction.link.href}
                        className="text-primary text-sm hover:underline mt-2 inline-block"
                      >
                        {correction.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA mid-page */}
        <div className="my-12 rounded-2xl bg-primary/5 border-l-4 border-primary py-6 px-6">
          <p className="font-bold text-base-content mb-2">
            Un site WordPress qui dysfonctionne ? Un formulaire qui ne transmet pas les bonnes
            données à votre CRM ?
          </p>
          <p className="text-base-content/70 leading-relaxed">
            Je diagnostique et corrige les problèmes techniques que les agences laissent derrière
            elles.{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline">
              Réservez votre audit gratuit →
            </Link>
          </p>
        </div>

        {/* Résultats */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Résultats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-black text-success">100 %</div>
              <div className="text-base-content/60 text-sm mt-1">Problèmes résolus</div>
            </div>
            <div className="bg-base-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-black text-primary">En cours</div>
              <div className="text-base-content/60 text-sm mt-1">Collaboration active</div>
            </div>
          </div>
          <p className="text-base-content/70 mt-4 leading-relaxed">
            Client satisfait, collaboration en cours pour de nouvelles tâches. Un{" "}
            <Link to="/blog/maintenance-site-web-pme-guide" className="text-primary hover:underline">
              plan de maintenance régulier
            </Link>{" "}
            a été recommandé pour éviter que ces problèmes ne se reproduisent.
          </p>
        </section>

        {/* Témoignage client — commenté */}
        {/*
          ============================================
          TÉMOIGNAGE CLIENT — À ACTIVER QUAND REÇU
          ============================================

          Instructions :
          1. Décommenter le bloc JSX ci-dessous
          2. Décommenter le JSON-LD Review dans le @graph (voir schema plus haut)
          3. Remplacer [NOM], [TEXTE], [DATE]

          <section className="mt-12">
            <blockquote className="bg-base-200 rounded-2xl p-8 border-l-4 border-primary">
              <p className="text-lg leading-relaxed italic">"[TEXTE]"</p>
              <footer className="mt-4 flex items-center gap-3">
                <div>
                  <cite className="font-bold not-italic">[NOM]</cite>
                  <span className="text-base-content/60 text-sm block">Service de Piscines Jolicoeur</span>
                </div>
              </footer>
            </blockquote>
          </section>
        */}

        {/* Services mobilisés */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Services mobilisés</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/services/creation-maintenance-sites"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Création & maintenance de sites</p>
              <p className="text-primary text-sm mt-1">→ Voir le service</p>
            </Link>
            <Link
              to="/services/automatisation-workflows"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Automatisation de workflows</p>
              <p className="text-primary text-sm mt-1">→ Voir le service</p>
            </Link>
          </div>
        </section>

        {/* Lire aussi */}
        <section className="mt-8">
          <p className="text-base-content/50 text-xs font-medium uppercase tracking-wide mb-3">
            Lire aussi
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/blog/wordpress-pme-quebec-2026"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">WordPress pour les PME québécoises en 2026</p>
              <p className="text-primary text-sm mt-1">→ Lire l'article</p>
            </Link>
            <Link
              to="/blog/automatiser-business-n8n-pme"
              className="bg-base-200 border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <p className="font-semibold text-sm">Automatiser son business avec n8n</p>
              <p className="text-primary text-sm mt-1">→ Lire l'article</p>
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <div className="mt-16 p-8 bg-base-200 rounded-2xl text-center">
          <p className="font-bold text-lg mb-2">Un projet similaire ?</p>
          <p className="text-base-content/70 leading-relaxed max-w-xl mx-auto">
            Formulaire cassé, intégration CRM défaillante ou site WordPress sans support — je peux
            vous aider.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-8">
              Discutons de votre projet
            </Link>
            <Link
              to="/projects"
              className="btn btn-ghost rounded-full px-8 border border-base-content/20 gap-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Tous les projets
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
