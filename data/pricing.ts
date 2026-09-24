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
  // 1. Site web. Délais : du lancement à la mise en ligne, contenus fournis ;
  // cohérents avec les heures (40 h ≈ une semaine de travail).
  siteVitrine: { ...offer(40), delay: "5 à 10 jours ouvrables" },
  shopify: offer(40),
  woocommerce: { ...offer(80), delay: "2 à 3 semaines" },
  refonte: { from: offer(80), to: offer(200), delay: "2 à 6 semaines" },

  // 2. Performance : l'audit complet précède l'optimisation.
  auditComplet: { ...offer(8), delay: "2 à 5 jours ouvrables" },
  optimisation: offer(20),

  // 3. Automatisation & IA
  workflowSimple: offer(6),
  workflowMoyen: offer(20),
  workflowSysteme: offer(40),
  assistantIa: offer(30), // assistant IA qui répond à partir de ton contenu

  // Forfaits de suivi mensuel, communs aux 3 offres (heures comprises chaque
  // mois : entretien courant + corrections ou améliorations).
  maintenanceEssentiel: offer(2),
  maintenancePro: offer(4),
  maintenancePremium: offer(8),
};

/** Offre d'entrée, proposée par tous les appels à l'action du site. */
export const FREE_AUDIT = {
  // « Demander » : il n'y a pas d'agenda en ligne, on envoie une demande.
  cta: "Demander mon audit gratuit",
  short: "Audit gratuit", // barre de navigation
  badge: "Audit gratuit · 30 min · sans engagement",
  summary:
    "30 minutes en visioconférence (ou un retour écrit si tu préfères) : je regarde ton site ou ton projet, et tu repars avec 3 recommandations prioritaires, sans engagement.",
  reply: "Je te réponds sous 1 jour ouvrable pour fixer le moment.",
};
