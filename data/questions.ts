import { PRICING, HOURLY_RATE, formatPrice } from "./pricing";

const RATE = `${formatPrice(HOURLY_RATE)}/h`;

export interface Question {
  index: number;
  question: string;
  answer: string;
}

// FAQ de l'accueil : les objections d'abord. Réponses en texte brut (elles
// alimentent aussi le JSON-LD FAQPage), chiffre en tête.
export const questions: Question[] = [
  {
    index: 0,
    question: "Combien ça coûte ?",
    answer: `Un site vitrine commence à ${PRICING.siteVitrine.label}, soit environ ${PRICING.siteVitrine.hours} h à ${RATE}. Une refonte coûte de ${PRICING.refonte.from.label} à ${PRICING.refonte.to.label}, un audit complet ${PRICING.auditComplet.label} et une première automatisation à partir de ${PRICING.workflowSimple.label}. Tu reçois le prix exact par écrit avant de t'engager.`,
  },
  {
    index: 1,
    question: "L'audit gratuit, c'est quoi exactement ? Vas-tu essayer de me vendre quelque chose ?",
    answer:
      "Un échange de 30 minutes en visioconférence (ou un retour écrit si tu préfères). Tu repars avec 3 recommandations prioritaires, que tu peux appliquer toi-même ou avec quelqu'un d'autre. Si un mandat a du sens, je te propose un plan chiffré. Sinon, on s'arrête là.",
  },
  {
    index: 2,
    question: "Je n'ai pas encore de site, ou je viens pour l'automatisation. C'est pour moi ?",
    answer:
      "Oui. L'audit porte alors sur ton projet ou sur tes tâches répétitives plutôt que sur ton site : on regarde ce que tu veux obtenir, et je te dis par où commencer.",
  },
  {
    index: 3,
    question: "Ça prend combien de temps ?",
    answer: `Un site vitrine : ${PRICING.siteVitrine.delay} une fois tes contenus (textes, photos) prêts. Une refonte : ${PRICING.refonte.delay}. Un audit complet : ${PRICING.auditComplet.delay}. Le calendrier précis est écrit dans le plan chiffré.`,
  },
  {
    index: 4,
    question: "Mon site a été fait par quelqu'un d'autre. Peux-tu le reprendre ?",
    answer:
      "Oui, c'est même la majorité de mes interventions de correction. Un accès administrateur et un accès à l'hébergement suffisent pour commencer le diagnostic.",
  },
  {
    index: 5,
    question: "Et si je ne suis pas satisfait ?",
    answer:
      "Tu valides chaque étape avant de passer à la suivante : pas de surprise à la livraison. Si quelque chose ne te convient pas, on l'ajuste avant la mise en ligne. Et ton site, ton nom de domaine et ton hébergement restent à ton nom.",
  },
];
