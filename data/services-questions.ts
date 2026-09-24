import { PRICING, HOURLY_RATE, formatPrice } from "./pricing";

const RATE = `${formatPrice(HOURLY_RATE)}/h`;

import type { Question } from "./questions";

export const servicesQuestions: Question[] = [
  {
    index: 0,
    question: "Quel est le budget moyen d'un site web pour une PME au Québec ?",
    answer:
      `Je facture ${RATE}, ou au forfait calculé sur ce taux. Un site vitrine PME soigné (design adapté à ton image, vitesse dans le vert, SEO technique, conformité Loi 25) démarre à ${PRICING.siteVitrine.label}, soit environ ${PRICING.siteVitrine.hours} h de travail. Une boutique en ligne démarre à ${PRICING.shopify.label} sur Shopify et à ${PRICING.woocommerce.label} sur WooCommerce. Audit complet d'un site existant : ${PRICING.auditComplet.label}. Automatisation n8n : à partir de ${PRICING.workflowSimple.label} ; assistant IA : à partir de ${PRICING.assistantIa.label}. Détail complet dans mon guide « coût d'un site web au Québec » sur le blog.`,
  },
  {
    index: 1,
    question: "Quels délais pour un site livré ?",
    answer:
      `Un site vitrine PME : ${PRICING.siteVitrine.delay} du lancement à la mise en ligne, dès réception de tes contenus (textes, photos). Une boutique WooCommerce : ${PRICING.woocommerce.delay}. Un audit complet (rapport écrit avec plan d'action) : ${PRICING.auditComplet.delay}. Je fixe des jalons clairs et je m'engage sur le délai dès la soumission — pas de dérive.`,
  },
  {
    index: 2,
    question: "Tu travailles avec quelles technologies ?",
    answer:
      "Sites : WordPress + WooCommerce (pour les PME qui veulent gérer leur contenu elles-mêmes) ou Shopify pour l'e-commerce. Ce site-ci est codé en React et TypeScript, mais pour un site de PME je travaille avec WordPress ou Shopify : tu restes autonome pour le modifier. Automatisation : n8n, Make, API d'IA (OpenAI, Anthropic). Hébergement : un hébergeur avec serveurs au Canada, ouvert à ton nom ; n8n sur un serveur privé si tu veux garder tes données chez toi. Outils détaillés sur la page « à propos ».",
  },
  {
    index: 3,
    question: "Est-ce que tu assures la maintenance après la livraison ?",
    answer:
      `Oui, en option mensuelle : mises à jour de sécurité, sauvegardes, surveillance, suivi de la vitesse et de tes automatisations, petites corrections. 3 forfaits (Essentiel ${PRICING.maintenanceEssentiel.label}, Pro ${PRICING.maintenancePro.label}, Premium ${PRICING.maintenancePremium.label} par mois), sans engagement annuel.`,
  },
  {
    index: 4,
    question:
      "Tu peux reprendre un site qu'un autre développeur a laissé tomber ?",
    answer:
      "Oui — c'est même une part importante de mes projets. Je commence toujours par un audit pour évaluer l'état du code, de la vitesse et de la sécurité. Ensuite, on décide : on nettoie, on refait partiellement, ou on repart d'une base saine.",
  },
  {
    index: 5,
    question: "Le site sera conforme à la Loi 25 ?",
    answer:
      "Le site, oui : tout site livré inclut politique de confidentialité, mentions légales, consentement aux témoins (cookies) si le site en utilise, et un moyen d'exercer les droits d'accès, de rectification et de retrait. La conformité de ton entreprise va au-delà du site (responsable désigné, registre des incidents…) : je te dis quoi prévoir, sans remplacer un avis juridique. Détail dans mon guide Loi 25 pour PME sur le blog.",
  },
];
