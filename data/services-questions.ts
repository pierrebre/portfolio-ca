import type { Question } from "./questions";

export const servicesQuestions: Question[] = [
  {
    index: 0,
    question: "Quel est le budget moyen d'un site web pour une PME au Québec ?",
    answer:
      "Pour un site vitrine PME soigné (design sur mesure, perf Lighthouse 90+, SEO technique, conformité Loi 25) : 3 500 à 7 500 $ CAD. Un e-commerce WordPress/WooCommerce démarre autour de 6 000 $. Un projet d'automatisation n8n ou d'intégration IA : 1 500 à 5 000 $. Détail complet dans mon guide « coût d'un site web au Québec » sur le blog.",
  },
  {
    index: 1,
    question: "Quels délais pour un site livré ?",
    answer:
      "Un site vitrine PME : 3 à 5 semaines du kick-off à la mise en ligne. Un e-commerce : 6 à 10 semaines. Un audit technique + plan d'action : 5 à 10 jours. Je fixe des jalons hebdo et je m'engage sur le délai dès le devis — pas de dérive.",
  },
  {
    index: 2,
    question: "Tu travailles avec quelles technologies ?",
    answer:
      "Côté CMS : WordPress + WooCommerce (pour les PME qui veulent gérer leur contenu) ou Shopify pour les e-commerces. Côté custom : React, Next.js, React Router, TypeScript, Tailwind. Automatisation : n8n, Make, OpenAI. Infra : Vercel, VPS Linux, Docker. Stack détaillée sur la page « à propos ».",
  },
  {
    index: 3,
    question: "Est-ce que tu assures la maintenance après la livraison ?",
    answer:
      "Oui, option mensuelle : mises à jour de sécurité, sauvegardes, monitoring performance, petits correctifs. Je propose 3 paliers (essentiel, standard, premium) selon la criticité du site. Voir le service création & maintenance.",
  },
  {
    index: 4,
    question:
      "Tu peux reprendre un site qu'un autre développeur a laissé tomber ?",
    answer:
      "Oui — c'est même une part importante de mes projets. Je commence toujours par un audit technique pour évaluer l'état du code, des performances et de la sécurité. Ensuite, on décide : on nettoie, on refait partiellement, ou on repart d'une base saine.",
  },
  {
    index: 5,
    question: "Le site sera conforme à la Loi 25 ?",
    answer:
      "Oui, systématiquement. Tout site livré inclut politique de confidentialité, mentions légales, consentement cookies (si applicable) et respect des droits d'accès/rectification/retrait. Détail dans mon guide Loi 25 pour PME sur le blog.",
  },
];
