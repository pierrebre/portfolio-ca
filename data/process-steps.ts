export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Audit gratuit (30 min)",
    description:
      "On se parle 30 minutes. Je regarde ton site, tes objectifs et tes contraintes. Tu repars avec un diagnostic clair — même si tu ne travailles pas avec moi.",
  },
  {
    title: "Plan d’action personnalisé",
    description:
      "Pas de devis template copié-collé. Un plan concret, priorisé, avec des délais et un budget transparent. Tu sais exactement ce que tu paies et pourquoi.",
  },
  {
    title: "Exécution + suivi",
    description:
      "Je code, j’optimise, je teste. Tu reçois des mises à jour régulières. Et après la livraison ? Je suis encore là. Pas de disparition.",
  },
];
