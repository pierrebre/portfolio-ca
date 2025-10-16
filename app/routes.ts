import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),

  // Section Services
  route("services", "routes/services/services._layout.tsx", [
    index("routes/services/services._index.tsx"),
    route("optimisation-web-performance", "routes/services/optimisation-web-performance.tsx"),
    route("creation-maintenance-sites", "routes/services/creation-maintenance-sites.tsx"),
    route("automatisation-workflows", "routes/services/automatisation-workflows.tsx"),
    route("audits-techniques-core-web-vitals", "routes/services/audits-techniques-core-web-vitals.tsx"),
    route("gestion-serveur-deploiement", "routes/services/gestion-serveur-deploiement.tsx"),
    route("integration-outils-ia", "routes/services/integration-outils-ia.tsx"),
  ]),

  route("politique-confidentialite", "routes/privacy-policy.tsx"),
  route("mentions-legales", "routes/legal-notice.tsx"),
  route("blog", "./routes/blog/blog._layout.tsx", [
    route("", "./routes/blog/blog._index.tsx"),
    route(":slug", "./routes/blog/blog.$slug.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
