/**
 * Service Links Utility
 *
 * Mapping centralisé des services vers leurs URLs et variations d'ancres
 * pour le maillage interne SEO-friendly.
 *
 * Utilise des slugs stables comme clés pour éviter les problèmes
 * avec les caractères spéciaux et les noms longs.
 */

export interface ServiceLink {
  name: string;
  url: string;
  anchors: readonly string[];
  shortDescription: string;
}

export const SERVICE_LINKS = {
  "optimisation-web-performance": {
    name: "Optimisation Web‑Performance",
    url: "/services/optimisation-web-performance",
    shortDescription: "Sites plus rapides, mieux classés sur Google",
    anchors: [
      "optimisation web-performance",
      "optimisation de performance",
      "rendre ton site plus rapide",
      "améliorer la vitesse",
      "Core Web Vitals",
      "service d'optimisation",
    ],
  },
  "creation-maintenance-sites": {
    name: "Création & Maintenance de Sites",
    url: "/services/creation-maintenance-sites",
    shortDescription: "Sites WordPress rapides, propres et durables",
    anchors: [
      "création et maintenance de sites",
      "créer un site WordPress",
      "développement de site",
      "site web sur mesure",
      "maintenance de site",
      "service de création",
    ],
  },
  "automatisation-workflows": {
    name: "Automatisation de Workflows (n8n)",
    url: "/services/automatisation-workflows",
    shortDescription: "Automatise tes processus, gagne du temps",
    anchors: [
      "automatisation de workflows",
      "automatiser avec n8n",
      "workflows automatisés",
      "automatisation de tâches",
      "gain de temps",
      "service d'automatisation",
    ],
  },
  "audits-techniques-core-web-vitals": {
    name: "Audits Techniques & Core Web Vitals",
    url: "/services/audits-techniques-core-web-vitals",
    shortDescription: "Audits clairs et vulgarisés de ton site",
    anchors: [
      "audits techniques et Core Web Vitals",
      "audit de performance",
      "audit technique de site",
      "analyse Core Web Vitals",
      "audit complet",
      "service d'audit",
    ],
  },
  "gestion-serveur-deploiement": {
    name: "Gestion Serveur & Déploiement",
    url: "/services/gestion-serveur-deploiement",
    shortDescription: "Site en ligne, sécurisé et sans souci",
    anchors: [
      "gestion serveur et déploiement",
      "gestion d'infrastructure",
      "hébergement performant",
      "déploiement automatisé",
      "infrastructure serveur",
      "service serveur",
    ],
  },
  "integration-outils-ia": {
    name: "Intégration d'Outils IA",
    url: "/services/integration-outils-ia",
    shortDescription: "Intègre des IA utiles pour tes utilisateurs",
    anchors: [
      "intégration d'outils IA",
      "intégrer l'IA",
      "chatbot intelligent",
      "solutions IA",
      "intelligence artificielle",
      "service IA",
    ],
  },
} as const;

export type ServiceSlug = keyof typeof SERVICE_LINKS;

/**
 * Retourne l'URL d'un service à partir de son slug
 */
export function getServiceUrl(slug: string): string {
  const service = SERVICE_LINKS[slug as ServiceSlug];
  return service?.url || "/services";
}

/**
 * Retourne tous les services sous forme de tableau
 * Utile pour générer des listes de navigation
 */
export function getAllServices(): Array<{
  slug: ServiceSlug;
  name: string;
  url: string;
  shortDescription: string;
}> {
  return Object.entries(SERVICE_LINKS).map(([slug, data]) => ({
    slug: slug as ServiceSlug,
    name: data.name,
    url: data.url,
    shortDescription: data.shortDescription,
  }));
}
