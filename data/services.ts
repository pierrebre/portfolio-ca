export type ServiceProps = {
  readonly icon: string;
  readonly name: string;
  readonly description: string;
};

export const services: ServiceProps[] = [
  {
    icon: "https://picsum.photos/id/1/200/300",
    name: "Optimisation Web‑Performance",
    description:
      "Analyse Core Web Vitals, optimisation webperformance Québec : code allégé, images compressées, cache malin.",
  },
  {
    icon: "https://picsum.photos/id/2/200/300",
    name: "Création & Maintenance de Sites",
    description:
      "WordPress, Next.js ou simple Vanilla JS/HTML/CSS. Thèmes sur mesure, extensions, tests, sécurité : tu dors tranquille. Besoin d’un pigiste WordPress ? J’intègre aussi tes maquettes blocs ACF.",
  },
  {
    icon: "https://picsum.photos/id/3/200/300",
    name: "Automatisation de Workflows",
    description:
      "n8n, Make, scripts JS / Python : moins de tâches manuelles, moins d’erreurs, plus de temps pour ton vrai boulot.",
  },
  {
    icon: "https://picsum.photos/id/4/200/300",
    name: "Audits Techniques Complets",
    description:
      "Webperf, SEO, sécurité. Rapport clair, priorités classées, quick wins livrés dès J+1.",
  },
  {
    icon: "https://picsum.photos/id/5/200/300",
    name: "Gestion Serveur & Déploiement",
    description:
      "CI/CD, monitoring, alertes. Du code à la prod sans mauvaise surprise.",
  },
  {
    icon: "https://picsum.photos/id/6/200/300",
    name: "Intégration d’Outils IA on‑Premise",
    description:
      "Chatbots privés, génération de contenu, classement automatique des tickets.",
  },
];
