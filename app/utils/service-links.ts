/**
 * Service Links Utility
 *
 * Mapping centralisé des services vers leurs URLs et variations d'ancres
 * pour le maillage interne SEO-friendly.
 */

export interface ServiceLink {
  url: string;
  anchors: readonly string[];
  shortDescription: string;
}

export const SERVICE_LINKS = {
  "Optimisation Web‑Performance": {
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
  "Création & Maintenance de Sites": {
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
  "Automatisation de Workflows (n8n)": {
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
  "Audits Techniques & Core Web Vitals": {
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
  "Gestion Serveur & Déploiement": {
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
  "Intégration d'Outils IA": {
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

export type ServiceName = keyof typeof SERVICE_LINKS;

/**
 * Retourne l'URL d'un service à partir de son nom
 */
export function getServiceUrl(name: string): string {
  const service = SERVICE_LINKS[name as ServiceName];
  return service?.url || "/services";
}

/**
 * Retourne la description courte d'un service
 */
export function getServiceDescription(name: string): string {
  const service = SERVICE_LINKS[name as ServiceName];
  return service?.shortDescription || "";
}

/**
 * Retourne une ancre aléatoire pour un service (SEO: variations naturelles)
 * Utile pour éviter la sur-optimisation et varier les ancres de liens internes
 */
export function getRandomAnchor(serviceName: string): string {
  const service = SERVICE_LINKS[serviceName as ServiceName];
  if (!service) return serviceName;

  const anchors = service.anchors;
  const randomIndex = Math.floor(Math.random() * anchors.length);
  return anchors[randomIndex];
}

/**
 * Retourne tous les services sous forme de tableau
 * Utile pour générer des listes de navigation
 */
export function getAllServices(): Array<{
  name: ServiceName;
  url: string;
  shortDescription: string;
}> {
  return Object.entries(SERVICE_LINKS).map(([name, data]) => ({
    name: name as ServiceName,
    url: data.url,
    shortDescription: data.shortDescription,
  }));
}

/**
 * Retourne les services complémentaires recommandés pour un service donné
 * Basé sur la matrice de pertinence du plan de maillage interne
 */
export function getRelatedServices(
  currentServiceName: string,
): Array<{ name: ServiceName; url: string; shortDescription: string }> {
  const relatedMap: Record<string, ServiceName[]> = {
    "Optimisation Web‑Performance": [
      "Audits Techniques & Core Web Vitals",
      "Gestion Serveur & Déploiement",
      "Création & Maintenance de Sites",
    ],
    "Création & Maintenance de Sites": [
      "Optimisation Web‑Performance",
      "Audits Techniques & Core Web Vitals",
      "Automatisation de Workflows (n8n)",
    ],
    "Automatisation de Workflows (n8n)": [
      "Intégration d'Outils IA",
      "Gestion Serveur & Déploiement",
      "Création & Maintenance de Sites",
    ],
    "Audits Techniques & Core Web Vitals": [
      "Optimisation Web‑Performance",
      "Création & Maintenance de Sites",
      "Gestion Serveur & Déploiement",
    ],
    "Gestion Serveur & Déploiement": [
      "Optimisation Web‑Performance",
      "Automatisation de Workflows (n8n)",
      "Création & Maintenance de Sites",
    ],
    "Intégration d'Outils IA": [
      "Automatisation de Workflows (n8n)",
      "Création & Maintenance de Sites",
      "Optimisation Web‑Performance",
    ],
  };

  const relatedNames = relatedMap[currentServiceName] || [];

  return relatedNames.map((name) => ({
    name,
    url: SERVICE_LINKS[name].url,
    shortDescription: SERVICE_LINKS[name].shortDescription,
  }));
}
