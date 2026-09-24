import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),

  ...prefix("services", [
    index("routes/services/services._index.tsx"),
    route(
      "optimisation-web-performance",
      "routes/services/optimisation-web-performance.tsx"
    ),
    route(
      "creation-maintenance-sites",
      "routes/services/creation-maintenance-sites.tsx"
    ),
    route(
      "automatisation-workflows",
      "routes/services/automatisation-workflows.tsx"
    ),
    // Pages regroupées dans les 3 offres : redirection 301
    ...[
      "audits-techniques-core-web-vitals",
      "gestion-serveur-deploiement",
      "integration-outils-ia",
    ].map((slug) =>
      route(slug, "routes/services/legacy-redirect.tsx", { id: `legacy-${slug}` })
    ),
  ]),

  ...prefix("blog", [
    index("routes/blog/blog._index.tsx"),
    route(":slug", "routes/blog/blog.$slug.tsx"),
    route("feed.xml", "routes/blog/feed[.]xml.tsx"),
  ]),

  ...prefix("projects", [
    index("routes/projects/projects._index.tsx"),
    route(":slug", "routes/projects/projects.$slug.tsx"),
  ]),

  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),

  route("politique-confidentialite", "routes/privacy-policy.tsx"),
  route("mentions-legales", "routes/legal-notice.tsx"),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
