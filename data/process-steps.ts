export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "On se parle (30 min, gratuit)",
    description:
      "Tu réserves un appel. On regarde ton site ensemble, on identifie les problèmes et les opportunités. Tu repars avec un diagnostic clair — même si tu ne travailles pas avec moi.",
  },
  {
    title: "Tu reçois un plan d'action chiffré",
    description:
      "Pas de devis générique. Un plan concret avec des priorités, des délais réalistes et un budget transparent. Tu sais exactement ce qui va être fait, dans quel ordre, et combien ça coûte.",
  },
  {
    title: "Je livre — et je reste",
    description:
      "Je code, j'optimise, je teste. Tu reçois des mises à jour régulières. Et après la livraison, je suis encore là pour la maintenance et les évolutions. Pas de surprise.",
  },
];
