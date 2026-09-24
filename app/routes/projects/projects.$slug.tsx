import { CheckCircle, Calendar, Wrench } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import AuditButton from "~/components/audit-button";
import CtaSection from "~/components/cta-section";
import LinkCard from "~/components/link-card";
import FaqItem from "~/components/faq-item";
import JsonLd from "~/components/json-ld";
import ProseHtml from "~/components/prose-html";
import { getCaseStudy } from "~/lib/projects.server";
import { formatPostDate } from "~/utils/date";
import { AUTHOR_SCHEMA, PUBLISHER_SCHEMA } from "~/utils/seo";
import type { Route } from "./+types/projects.$slug";

const SITE = "https://pierrebarbe.ca";
const IMAGE = `${SITE}/images/pb-og-image.jpg`;

export async function loader({ params }: Route.LoaderArgs) {
  const study = await getCaseStudy(params.slug);
  if (!study) {
    throw new Response("Étude de cas non trouvée", { status: 404 });
  }
  return { study };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.study) {
    return [{ title: "Étude de cas non trouvée | Pierre Barbé" }];
  }

  const { study } = data;
  const url = `${SITE}${study.href}`;

  return [
    { title: study.metaTitle },
    { tagName: "link", rel: "canonical", href: url },
    { name: "description", content: study.metaDescription },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { property: "og:title", content: study.metaTitle },
    { property: "og:description", content: study.metaDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: "Pierre Barbé" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:title", content: study.metaTitle },
    { name: "twitter:description", content: study.metaDescription },
    { name: "twitter:image", content: IMAGE },
  ];
}

export default function ProjectCaseStudy({ loaderData }: Route.ComponentProps) {
  const { study } = loaderData;
  const url = `${SITE}${study.href}`;
  const modified = study.updatedDate ?? study.date;
  const shortName = study.client.replace(/\s*\(.*\)$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: study.headline,
        name: study.headline,
        description: study.description,
        inLanguage: "fr-CA",
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: AUTHOR_SCHEMA,
        publisher: PUBLISHER_SCHEMA,
        datePublished: `${study.date}T00:00:00-05:00`,
        dateModified: `${modified}T00:00:00-05:00`,
        articleSection: "Études de cas",
        keywords: study.tags,
        image: IMAGE,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: study.headline,
        inLanguage: "fr-CA",
        isPartOf: { "@id": `${SITE}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: IMAGE },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Projets", item: `${SITE}/projects` },
          { "@type": "ListItem", position: 3, name: shortName, item: url },
        ],
      },
    ],
  };

  const faqSchema = study.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: study.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <JsonLd data={schema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Projets", href: "/projects" },
            { label: shortName },
          ]}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
        <header className="pt-8 pb-10 border-b border-base-content/10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary text-sm font-medium">Étude de cas</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {study.headline}
          </h1>

          {study.subtitle && (
            <p className="text-base-content/70 mt-4 text-lg leading-relaxed">{study.subtitle}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {study.outcome && (
              <div className="badge badge-primary gap-1">
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
                {study.outcome}
              </div>
            )}
            <div className="badge badge-outline gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {study.duration}
            </div>
            <span className="text-base-content/70 self-center text-sm">
              Mis à jour le{" "}
              <time dateTime={modified}>{formatPostDate(modified)}</time>
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="badge badge-sm badge-ghost">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Contenu MDX : défi, méthode, corrections, résultats */}
        <ProseHtml html={study.html} className="mt-10" />

        {study.highlights.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.highlights.map((h) => (
              <div key={h.label} className="bg-base-200 rounded-xl p-5 text-center">
                <div className="text-3xl font-black text-primary">{h.value}</div>
                <div className="text-base-content/70 text-sm mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {study.midCta && (
          <div className="my-12 rounded-2xl bg-primary/5 border-l-4 border-primary py-6 px-6">
            <p className="font-bold text-base-content mb-2">{study.midCta.title}</p>
            <p className="text-base-content/70 leading-relaxed">
              {study.midCta.text}{" "}
              <AuditButton className="text-primary font-semibold underline underline-offset-2 hover:no-underline" />
            </p>
          </div>
        )}

        {/* TODO témoignage : ajouter la citation du client quand il l'aura
            fournie. Pas de JSON-LD Review : Google ignore les avis sur sa propre
            entreprise publiés sur son site. */}

        {study.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
            <div className="flex flex-col space-y-2">
              {study.faq.map((item) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  accordionName={`${study.slug}-faq`}
                />
              ))}
            </div>
          </section>
        )}

        {study.services.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Services mobilisés</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {study.services.map((s) => (
                <LinkCard key={s.to} to={s.to} title={s.title} label="Voir le service" bg="bg-base-200" />
              ))}
            </div>
          </section>
        )}

        {study.related.length > 0 && (
          <section className="mt-8">
            <p className="text-base-content/70 text-xs font-medium uppercase tracking-wide mb-3">
              Lire aussi
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {study.related.map((r) => (
                <LinkCard key={r.to} to={r.to} title={r.title} label="Lire l'article" bg="bg-base-200" />
              ))}
            </div>
          </section>
        )}
      </article>

      <CtaSection title={study.cta.title} secondary={{ to: "/projects", label: "Tous les projets" }}>
        {study.cta.text}
      </CtaSection>
    </div>
  );
}
