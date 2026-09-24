import { FREE_AUDIT, PRICING } from "./pricing";

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Audit gratuit de 30 minutes",
    description: `Tu m'envoies l'adresse de ton site, ou deux lignes sur ton projet. ${FREE_AUDIT.reply} Tu repars avec 3 recommandations prioritaires, qu'on travaille ensemble ou non.`,
  },
  {
    title: "Un plan chiffré, par écrit",
    description:
      "Ce que je fais, dans quel ordre, combien d'heures, le prix et le délai. Rien ne commence sans ton accord.",
  },
  {
    title: "Je réalise, tu valides",
    description:
      "Tu valides chaque étape avant la mise en ligne. Formation pour modifier tes contenus et 30 jours de support compris pour un site.",
  },
  {
    title: "Après la mise en ligne",
    description: `Un forfait de suivi à partir de ${PRICING.maintenanceEssentiel.label}/mois si tu le souhaites, sans engagement annuel, résiliable avec 30 jours de préavis.`,
  },
];
