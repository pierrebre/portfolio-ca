import { Link } from "react-router";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { getPost, getAdjacentPosts } from "~/lib/content.server";
import type { Route } from "./+types/blog.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const [post, adjacent] = await Promise.all([
    getPost(slug),
    getAdjacentPosts(slug),
  ]);

  if (!post) {
    throw new Response("Article non trouvé", { status: 404 });
  }

  return { post, adjacent };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Article non trouvé | Pierre Barbé" }];
  }

  const { post } = data;
  const url = `https://pierrebarbe.ca/blog/${post.slug}`;
  const image = post.image ?? "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    { title: `${post.title} | Pierre Barbé` },
    { tagName: "link", rel: "canonical", href: url },
    { name: "description", content: post.description },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: post.title },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "fr_CA" },
    { property: "article:published_time", content: `${post.date}T00:00:00-05:00` },
    { property: "article:modified_time", content: `${post.updatedDate ?? post.date}T00:00:00-05:00` },
    { property: "article:author", content: "Pierre Barbé" },
    { property: "article:section", content: post.category },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: post.title },
  ];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Web Performance": "badge-primary",
  Automatisation: "badge-secondary",
  "Éco-conception": "badge-success",
  Général: "badge-neutral",
};

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, adjacent } = loaderData;
  const url = `https://pierrebarbe.ca/blog/${post.slug}`;
  const image = post.image ?? "https://pierrebarbe.ca/images/pb-og-image.jpg";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        },
        datePublished: `${post.date}T00:00:00-05:00`,
        dateModified: `${post.updatedDate ?? post.date}T00:00:00-05:00`,
        author: {
          "@type": "Person",
          "@id": "https://pierrebarbe.ca/#person",
          name: "Pierre Barbé",
          url: "https://pierrebarbe.ca/about",
          image: {
            "@type": "ImageObject",
            url: "https://pierrebarbe.ca/images/me.avif",
            width: 2662,
            height: 3201,
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://pierrebarbe.ca/#organization",
          name: "Pierre Barbé",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        inLanguage: "fr-CA",
        articleSection: post.category,
        wordCount: post.wordCount,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://pierrebarbe.ca/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://pierrebarbe.ca/blog" },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ],
  };

  const faqSchema = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <div className="bg-base-100 font-urbanist min-h-screen">
      <JsonLd data={blogPostingSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* En-tête de l'article */}
        <header className="pt-8 pb-10 border-b border-base-content/10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`badge font-medium ${CATEGORY_COLORS[post.category] ?? "badge-neutral"}`}
            >
              <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
              {post.category}
            </span>
            <span className="text-base-content/50 flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("fr-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="text-base-content/50 flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTime} min de lecture
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="text-base-content/70 mt-4 text-lg leading-relaxed">
            {post.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">PB</span>
            </div>
            <div>
              <Link to="/about" className="font-semibold text-sm hover:text-primary transition-colors">
                Pierre Barbé
              </Link>
              <p className="text-base-content/50 text-xs">
                Développeur web freelance · Montréal
              </p>
            </div>
          </div>
        </header>

        {/* Contenu MDX rendu côté serveur */}
        <div
          className="prose prose-base md:prose-lg max-w-none mt-10
            prose-headings:font-bold
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-h2:mt-10 prose-h3:mt-6 prose-h3:mb-2
            prose-p:leading-relaxed
            prose-a:no-underline hover:prose-a:underline
            prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-base-content/10
            prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:border-l-4
            [&_blockquote]:rounded-r-xl [&_blockquote]:bg-primary/5 [&_blockquote]:py-4
            prose-table:text-sm [&_thead_th]:bg-base-200"
          dangerouslySetInnerHTML={{ __html: post.html }}
          aria-label={`Contenu de l'article : ${post.title}`}
        />

        {/* Navigation prev / next */}
        {(adjacent.prev ?? adjacent.next) && (
          <nav
            aria-label="Navigation entre les articles"
            className="mt-16 pt-8 border-t border-base-content/10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {adjacent.prev ? (
              <Link
                to={`/blog/${adjacent.prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-base-content/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <span className="text-base-content/50 text-xs flex items-center gap-1">
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Article précédent
                </span>
                <span className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {adjacent.prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next && (
              <Link
                to={`/blog/${adjacent.next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-base-content/10 hover:border-primary/30 hover:bg-primary/5 transition-all text-right sm:col-start-2"
              >
                <span className="text-base-content/50 text-xs flex items-center gap-1 justify-end">
                  Article suivant
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {adjacent.next.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Bio de l'auteur */}
        <div className="mt-16 p-6 bg-base-200 rounded-2xl flex gap-4 items-start">
          <div className="bg-primary text-primary-content rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold">PB</span>
          </div>
          <div>
            <p className="font-bold text-base">
              Écrit par{" "}
              <Link to="/about" className="text-primary hover:underline">
                Pierre Barbé
              </Link>
            </p>
            <p className="text-base-content/70 text-sm mt-1 leading-relaxed">
              Développeur web freelance à Montréal, spécialisé en performance WordPress,
              automatisation n8n et intégration IA pour PME québécoises.{" "}
              <Link to="/about" className="text-primary hover:underline">
                En savoir plus →
              </Link>
            </p>
          </div>
        </div>

        {/* CTA retour + contact */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-base-200 rounded-2xl">
          <Link
            to="/blog"
            className="btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tous les articles
          </Link>
          <Link to="/contact" className="btn btn-primary rounded-full">
            Discutons de votre projet
          </Link>
        </div>
      </article>
    </div>
  );
}
