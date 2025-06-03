export interface Question {
  index: number;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    index: 0,
    question: "Pourquoi optimiser la web‑performance ?",
    answer:
      "Un site rapide améliore l'expérience, le référencement et les ventes. Google l'a confirmé.",
  },
  {
    index: 1,
    question: "Qu'est‑ce que l'éco‑conception web ?",
    answer:
      "Réduire la consommation d'énergie : poids des pages, hébergement vert, code sobre.",
  },
  {
    index: 2,
    question: "Avec qui je travaille ?",
    answer:
      "PME de Montréal, Laval, Longueuil et partout au Québec : des commerces de proximité aux prestataires de services, sans oublier les marques e-commerce en pleine croissance.",
  },
  {
    index: 3,
    question: "L'audit est‑il vraiment gratuit ?",
    answer:
      "Oui. Zéro frais, zéro engagement. Tu repars avec une liste de recommandations concrètes.",
  },
];
