import { Link } from "react-router";
import { ArrowLeft, CheckCircle, Calendar, Wrench } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import FaqItem from "~/components/faq-item";
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
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline:
          "Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur",
        name: "Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur",
        description:
          "Diagnostic et correction de dysfonctionnements sur un site WordPress avec intégration CRM Plannit pour une PME piscines sur la Rive-Nord de Montréal.",
        inLanguage: "fr-CA",
        isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": "https://pierrebarbe.ca/#person" },
        publisher: { "@id": "https://pierrebarbe.ca/#organization" },
        datePublished: "2026-04-04T00:00:00-05:00",
        dateModified: "2026-08-21T00:00:00-04:00",
        articleSection: "Études de cas",
        keywords: [
          "WordPress",
          "Fluent Forms",
          "Plannit CRM",
          "Intégration CRM",
          "PHP",
          "PME Québec",
        ],
        image: "https://pierrebarbe.ca/images/pb-og-image.jpg",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Corrections WordPress & intégration CRM pour Service de Piscines Jolicoeur",
        inLanguage: "fr-CA",
        isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://pierrebarbe.ca/images/pb-og-image.jpg",
        },
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
            item: url,
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

  const faq = [
    {
      index: 0,
      question: "Peux-tu intervenir sur un site WordPress que tu n'as pas développé ?",
      answer:
        "Oui, c'est même la majorité de mes interventions de correction. Je pars du code en place et des données réellement transmises, sans dépendre de la documentation d'origine. Un accès administrateur WordPress et un accès SFTP suffisent pour lancer le diagnostic.",
    },
    {
      index: 1,
      question: "Qu'est-ce qui casse une intégration formulaire → CRM ?",
      answer:
        "Les causes les plus fréquentes : un mapping de champs qui ne correspond plus aux identifiants attendus par le CRM, une mise à jour de plugin qui change le comportement d'un hook, une logique conditionnelle configurée avec le mauvais opérateur, ou un déclenchement en double après l'ajout d'une extension. Ce sont des pannes silencieuses : côté visiteur le formulaire semble fonctionner, mais les données arrivent fausses, incomplètes ou dupliquées.",
    },
    {
      index: 2,
      question: "Comment savoir si mon formulaire envoie les bonnes données à mon CRM ?",
      answer:
        "Le test le plus simple : remplissez vous-même une soumission complète, puis comparez ligne par ligne ce que vous avez saisi avec la fiche créée dans le CRM. Champ vide, service mal identifié, fiche en double : chacun de ces écarts est un signal. Si le formulaire comporte des conditions d'affichage, refaites le test pour chaque service proposé — c'est souvent là que les écarts se cachent.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const results = [
    {
      label: "Services transmis au CRM",
      before: "Texte brut non reconnu",
      after: "Identifiants Plannit corrects",
    },
    {
      label: "Champs du formulaire remontés",
      before: "Incomplets",
      after: "Complets",
    },
    {
      label: "Soumissions en double",
      before: "À chaque envoi",
      after: "0",
    },
    {
      label: "Procédure conditionnelle",
      before: "Jamais affichée",
      after: "Affichée au bon service",
    },
  ];

  const method = [
    {
      title: "Reproduire avant de corriger",
      description:
        "Série de soumissions de test sur le formulaire en ligne pour reproduire chaque comportement signalé et écarter les fausses pistes.",
    },
    {
      title: "Observer les données réelles",
      description:
        "Logging temporaire sur les appels sortants vers l'API du CRM pour voir la charge utile exacte, champ par champ, telle qu'elle part du site.",
    },
    {
      title: "Remonter à la cause",
      description:
        "Lecture du code PHP et des hooks WordPress pour relier chaque symptôme à son origine : mapping, condition d'affichage ou ordre de déclenchement.",
    },
    {
      title: "Corriger puis revalider",
      description:
        "Correction ciblée, sans refonte, suivie d'une nouvelle série de tests pour confirmer que les données arrivent complètes et sans doublon.",
    },
  ];

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
        "La logique conditionnelle du formulaire utilisait le mauvais opérateur, empêchant l'affichage d'une procédure importante. Correction de la condition + remplacement d'un texte de remplissage (Lorem ipsum) resté en ligne.",
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
      <JsonLd data={faqSchema} />

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
            <span className="text-base-content/50 self-center text-sm">
              Mis à jour le{" "}
              <time dateTime="2026-08-21">21 août 2026</time>
            </span>
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
            Le site WordPress du client présentait plusieurs dysfonctionnements dans la liaison entre
            son formulaire de soumission (Fluent Forms Pro) et son CRM Plannit. En l'absence de suivi
            technique, les données ne remontaient plus correctement : services mal mappés, champs
            manquants, logique conditionnelle cassée, et soumissions en double causées par un hook
            WordPress qui se déclenchait deux fois.
          </p>
          <p className="text-base-content/80 leading-relaxed mt-3">
            Concrètement, chaque demande arrivait incomplète ou dupliquée dans le CRM. À l'approche de
            la saison, ça veut dire du temps perdu à rappeler des clients pour redemander des
            informations qu'ils avaient déjà fournies — et un risque réel de laisser filer une
            soumission.
          </p>
          <p className="text-base-content/70 text-sm mt-3">
            En savoir plus sur{" "}
            <Link to="/blog/wordpress-pme-quebec-2026" className="text-primary hover:underline">
              WordPress pour les PME québécoises en 2026
            </Link>
            .
          </p>
        </section>

        {/* La méthode */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">La méthode de diagnostic</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Ni documentation d'origine, ni historique des modifications : tout le diagnostic s'est
            appuyé sur le code en place et sur les données réellement envoyées au CRM.
          </p>
          <ol className="space-y-4">
            {method.map((step, idx) => (
              <li key={step.title} className="flex items-start gap-4">
                <span className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="text-base-content/70 mt-1 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
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
            Je diagnostique et corrige ce type de panne, y compris sur un site que je n'ai pas
            développé.{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline">
              Réservez votre audit gratuit →
            </Link>
          </p>
        </div>

        {/* Résultats */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Résultats</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-content/10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Point de contrôle</th>
                  <th scope="col">Avant</th>
                  <th scope="col">Après</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="font-semibold">
                      {row.label}
                    </th>
                    <td className="text-base-content/60">{row.before}</td>
                    <td className="text-success font-semibold">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-black text-success">5 / 5</div>
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

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="flex flex-col space-y-2">
            {faq.map((item) => (
              <FaqItem
                key={item.index}
                index={item.index}
                question={item.question}
                answer={item.answer}
                accordionName="jolicoeur-faq"
                idPrefix="jolicoeur-faq"
              />
            ))}
          </div>
        </section>

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
            Formulaire cassé, intégration CRM défaillante ou site WordPress à reprendre en main —
            je peux vous aider.
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
