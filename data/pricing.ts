/**
 * Grille tarifaire unique du site.
 *
 * Chaque prix = heures × taux horaire : modifier HOURLY_RATE ou un nombre
 * d'heures met à jour toutes les pages, FAQ et données structurées qui les
 * affichent. Les articles de blog (MDX) citent certains de ces chiffres en
 * dur : les vérifier si la grille change (voir CLAUDE.md).
 */
export const HOURLY_RATE = 75;

/** Formate un montant en dollars canadiens (espace insécable, sans ICU). */
export function formatPrice(amount: number): string {
  return `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;
}

const offer = (hours: number) => {
  const price = hours * HOURLY_RATE;
  return { hours, price, label: formatPrice(price) };
};

export const PRICING = {
  // Création de sites
  siteVitrine: { ...offer(40), delay: "3 à 5 semaines" },
  shopify: offer(40),
  woocommerce: { ...offer(80), delay: "6 à 10 semaines" },
  siteSurMesure: offer(60), // Next.js / React
  refonte: { from: offer(80), to: offer(200), delay: "6 à 12 semaines" },

  // Performance et audits
  optimisation: offer(20),
  auditComplet: { ...offer(8), delay: "5 à 10 jours" },

  // Automatisation (n8n)
  workflowSimple: offer(6),
  workflowMoyen: offer(20),
  workflowSysteme: offer(40),

  // Intégration IA
  chatbot: offer(30),
  rechercheSemantique: offer(40),
  iaSurMesure: offer(50),

  // Forfaits mensuels (heures de travail comprises chaque mois)
  maintenanceEssentiel: offer(2),
  maintenancePro: offer(4),
  maintenancePremium: offer(8),
  suiviPerformance: offer(4),
  maintenanceWorkflows: offer(2),
  maintenanceIa: offer(3),
};

/** Offre d'entrée, proposée par tous les appels à l'action du site. */
export const FREE_AUDIT = {
  cta: "Réserver mon audit gratuit",
  badge: "Audit gratuit · 30 min · sans engagement",
  summary:
    "30 minutes par courriel ou en visio : un diagnostic du site et 3 recommandations prioritaires, sans engagement.",
};
