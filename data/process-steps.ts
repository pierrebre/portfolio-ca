export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Diagnostic express gratuit (30 min)",
    description:
      "État de santé du site : vitesse, SEO, accessibilité, empreinte carbone. Tu reçois le résumé dès la fin dans ta boite mail.",
  },
  {
    title: "Plan d’action priorisé",
    description:
      " Objectifs classés par impact : quick wins sous 24 h,améliorations majeures planifiées avec budget et échéancier clair.",
  },
  {
    title: "Mise en œuvre + suivi continu",
    description:
      "Déploiements agiles, rapports hebdomadaires,transfert de connaissances à ton équipe. Support post‑projet inclus pendant 30 jours.",
  },
];
