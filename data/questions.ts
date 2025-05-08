export interface Question {
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    question: "Pourquoi optimiser la web‑performance ?",
    answer:
      "Un site rapide améliore l'expérience, le référencement et les ventes. Google l'a confirmé.",
  },
  {
    question: "Qu'est‑ce que l'éco‑conception web ?",
    answer:
      "Réduire la consommation d'énergie : poids des pages, hébergement vert, code sobre.",
  },
  {
    question: "Travailles‑tu seulement à Montréal ?",
    answer:
      "Basé à Montréal, j'interviens aussi pour Québec, Laval, Longueuil et tout le Québec sans frais supplémentaires.",
  },
  {
    question: "L'audit est‑il vraiment gratuit ?",
    answer:
      "Oui. Zéro frais, zéro engagement. Tu repars avec une liste de recommandations concrètes.",
  },
];
