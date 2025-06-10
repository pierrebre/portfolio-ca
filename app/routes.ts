import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("politique-confidentialite", "routes/privacy-policy.tsx"),
  route("mentions-legales", "routes/legal-notice.tsx"),
  route("*", "routes/not-found.tsx"),
  route("blog", "./routes/blog/blog._layout.tsx", [
    route("", "./routes/blog/blog._index.tsx"),
    route(":slug", "./routes/blog/blog.$slug.tsx"),
  ]),
] satisfies RouteConfig;
