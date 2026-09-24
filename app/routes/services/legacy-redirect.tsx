import { redirect } from "react-router";
import type { Route } from "./+types/legacy-redirect";

// Anciennes pages de services, regroupées dans les 3 offres : redirection
// permanente pour conserver les liens et le référencement acquis.
const TARGETS: Record<string, string> = {
  "/services/audits-techniques-core-web-vitals": "/services/optimisation-web-performance",
  "/services/gestion-serveur-deploiement": "/services/creation-maintenance-sites",
  "/services/integration-outils-ia": "/services/automatisation-workflows",
};

export function loader({ url }: Route.LoaderArgs) {
  throw redirect(TARGETS[url.pathname.replace(/\/$/, "")] ?? "/services", 301);
}
