export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Analyse gratuite du site",
    description:
      "Réservez un audit gratuit. Je vous dirai exactement où en est votre site, ce qui fonctionne, ce qui ne fonctionne pas, et comment y remédier. Sans jargon. Sans engagement.",
  },
  {
    title: "Plan clair et personnalisé",
    description:
      "Ensemble, nous définirons vos priorités — que ce soit la vitesse, l’automatisation, la sécurité, ou tout cela à la fois. Vous recevrez un plan concret, sans blabla, qui respecte vos objectifs, votre budget et vos échéances.",
  },
  {
    title: "Mise en œuvre et accompagnement",
    description:
      "Je me charge du code, de la technique et des ajustements, pendant que vous vous concentrez sur la gestion de votre entreprise. Et je ne disparais pas après la livraison. Je suis là quand vous avez besoin de moi.",
  },
];
