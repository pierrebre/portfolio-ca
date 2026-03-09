import { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import { getAllPosts } from "~/lib/content.server";
import type { Route } from "./+types/blog._index";

export async function loader() {
  const posts = await getAllPosts();
  return { posts };
}

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/blog";
  const image = "https://pierrebarbe.ca/images/pb-og-image.avif";

  return [
    { title: "Blog — Web performance, automatisation & éco-conception | Pierre Barbé" },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Articles pratiques sur la web-performance WordPress, l'automatisation n8n et l'éco-conception web pour PME québécoises.",
    },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    {
      property: "og:title",
      content: "Blog — Web performance, automatisation & éco-conception",
    },
    {
      property: "og:description",
      content:
        "Articles pratiques sur la web-performance, l'automatisation n8n et l'éco-conception pour PME du Québec.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:title", content: "Blog — Web performance & automatisation | Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Articles pratiques sur la web-performance, n8n et l'éco-conception.",
    },
    { name: "twitter:image", content: image },
  ];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Web Performance": "badge-primary",
  Automatisation: "badge-secondary",
  "Éco-conception": "badge-success",
  Général: "badge-neutral",
};

const CATEGORY_BUTTON_COLORS: Record<string, string> = {
  "Web Performance": "btn-primary",
  Automatisation: "btn-secondary",
  "Éco-conception": "btn-success",
  Général: "btn-neutral",
};

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Catégories uniques avec comptage, ordre de première apparition (par date décroissante)
  const categories = Array.from(
    posts.reduce((acc, p) => {
      acc.set(p.category, (acc.get(p.category) ?? 0) + 1);
      return acc;
    }, new Map<string, number>())
  );

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://pierrebarbe.ca/blog#blog",
        name: "Blog — Pierre Barbé",
        description:
          "Articles pratiques sur la web-performance WordPress, l'automatisation n8n et l'éco-conception web pour PME québécoises.",
        url: "https://pierrebarbe.ca/blog",
        inLanguage: "fr-CA",
        author: { "@id": "https://pierrebarbe.ca/#person" },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          "@id": `https://pierrebarbe.ca/blog/${p.slug}#article`,
          headline: p.title,
          url: `https://pierrebarbe.ca/blog/${p.slug}`,
          datePublished: p.date,
          articleSection: p.category,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pierrebarbe.ca/blog#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://pierrebarbe.ca/" },
          { "@type": "ListItem", position: 2, name: "Blog" },
        ],
      },
    ],
  };

  return (
    <div className="bg-base-100 font-urbanist min-h-screen">
      <JsonLd data={blogSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Blog</h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary text-sm font-medium">
              Web performance · Automatisation · Éco-conception
            </span>
            <div className="bg-primary h-px w-16" />
          </div>
          <p className="text-base-content/70 mx-auto mt-6 max-w-2xl text-lg">
            Des articles pratiques pour aider les PME québécoises à avoir des sites
            plus rapides, plus verts et mieux automatisés.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Filtre catégories */}
          {posts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrer par catégorie">
              <button
                onClick={() => setActiveCategory(null)}
                className={`btn btn-sm rounded-full transition-all ${
                  activeCategory === null
                    ? "btn-primary"
                    : "btn-ghost border border-base-content/20 hover:border-primary/40"
                }`}
                aria-pressed={activeCategory === null}
              >
                Tous
                <span className="badge badge-sm ml-1.5">{posts.length}</span>
              </button>
              {categories.map(([cat, count]) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`btn btn-sm rounded-full transition-all ${
                    activeCategory === cat
                      ? (CATEGORY_BUTTON_COLORS[cat] ?? "btn-primary")
                      : "btn-ghost border border-base-content/20 hover:border-primary/40"
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                  <span className="badge badge-sm ml-1.5">{count}</span>
                </button>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base-content/60 text-lg">
                Aucun article pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base-content/60 text-lg">
                Aucun article dans cette catégorie pour le moment.
              </p>
              <button
                onClick={() => setActiveCategory(null)}
                className="btn btn-ghost btn-sm mt-4 text-primary"
              >
                Voir tous les articles
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="card bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="card-body p-6 sm:p-8">
                    {/* Catégorie + date + lecture */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`badge badge-sm font-medium ${CATEGORY_COLORS[post.category] ?? "badge-neutral"}`}
                      >
                        <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                        {post.category}
                      </span>
                      <span className="text-base-content/50 flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("fr-CA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </span>
                      <span className="text-base-content/50 flex items-center gap-1 text-sm">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readingTime} min de lecture
                      </span>
                    </div>

                    <h2 className="card-title text-xl sm:text-2xl font-bold leading-snug">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-base-content/70 mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="card-actions mt-4">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 gap-1 pl-0"
                        aria-label={`Lire l'article : ${post.title}`}
                      >
                        Lire l'article
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA contact */}
          <div className="mt-16 text-center">
            <p className="text-base-content/70 mb-4">
              Un sujet que vous aimeriez que j&apos;aborde ?
            </p>
            <Link to="/contact" className="btn btn-primary rounded-full px-8">
              Suggérer un article
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
