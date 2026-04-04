export interface ProjectMetric {
  label: string;
  before: string;
  after: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly client: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly description: string;
  readonly challenge: string;
  readonly solution: string;
  readonly metrics: readonly ProjectMetric[];
  readonly duration: string;
  readonly year: number;
  readonly featured: boolean;
  readonly href?: string;
}

export const projects: Project[] = [
  {
    slug: "piscines-jolicoeur",
    title: "Corrections WordPress & intégration CRM — Service de Piscines Jolicoeur",
    client: "Service de Piscines Jolicoeur (Rive-Nord de Montréal)",
    category: "Création de site",
    tags: ["WordPress", "Fluent Forms", "Plannit CRM"],
    description:
      "Diagnostic et correction de dysfonctionnements sur un site WordPress avec intégration CRM Plannit pour une PME piscines. Formulaire cassé, mapping CRM erroné, soumissions en double.",
    challenge:
      "Le site développé par une agence externe sans support présentait plusieurs dysfonctionnements dans la liaison formulaire–CRM : données mal mappées, champs manquants, logique conditionnelle cassée et doublons.",
    solution:
      "Diagnostic complet par logging custom et analyse du code PHP. Correction du mapping services, ajout des champs manquants, correction de la logique conditionnelle et suppression des déclenchements en double.",
    metrics: [
      { label: "Problèmes identifiés", before: "Multiples", after: "0" },
    ],
    duration: "Mars 2026",
    year: 2026,
    featured: true,
    href: "/projects/piscines-jolicoeur",
  },
  {
    slug: "optimisation-performance-ecommerce-wordpress",
    title: "Optimisation performance — Site e-commerce WordPress",
    client: "PME e-commerce (Montréal)",
    category: "Web Performance",
    tags: ["WordPress", "WooCommerce", "Core Web Vitals", "Performance"],
    description:
      "Audit et optimisation complète d'une boutique WooCommerce montréalaise. Migration vers un thème léger, optimisation des images en AVIF, mise en place du cache serveur et suppression des plugins redondants.",
    challenge:
      "Le site s'appuyait sur un thème lourd avec 18 plugins actifs. Score Lighthouse mobile de 42/100, temps de chargement moyen de 4,2 s. Le taux de rebond mobile atteignait 68 % et les conversions stagnaient.",
    solution:
      "Audit WebPageTest + Lighthouse pour identifier les goulots d'étranglement. Migration vers un thème Gutenberg allégé, conversion de toutes les images en AVIF, activation du cache Nginx FastCGI et désactivation de 11 plugins non essentiels.",
    metrics: [
      { label: "Score Lighthouse mobile", before: "42", after: "80" },
      { label: "Temps de chargement", before: "4,2 s", after: "1,1 s" },
      { label: "Taux de rebond mobile", before: "68 %", after: "45 %" },
    ],
    duration: "2 semaines",
    year: 2025,
    featured: true,
  },
  {
    slug: "automatisation-n8n-clinique",
    title: "Automatisation des opérations — Clinique de santé",
    client: "Clinique de santé (Montréal)",
    category: "Automatisation",
    tags: ["n8n", "Automatisation", "API", "Santé"],
    description:
      "Mise en place de workflows n8n pour automatiser la confirmation de rendez-vous, les rappels SMS/courriel et le suivi post-consultation d'une clinique montréalaise.",
    challenge:
      "La réceptionniste consacrait 10 h par semaine à des tâches administratives répétitives : confirmations manuelles, relances patients et saisie dans deux systèmes séparés. Risque d'erreur humaine élevé.",
    solution:
      "Déploiement de n8n en self-hosted. Création de 4 workflows : confirmation automatique à la réservation, rappel SMS 24 h avant, courriel de suivi post-consultation et synchronisation entre le calendrier et le CRM.",
    metrics: [
      { label: "Heures admin économisées/semaine", before: "10 h", after: "1 h" },
      { label: "Délai de réponse patient", before: "4 h", after: "< 5 min" },
      { label: "Erreurs de saisie manuelle", before: "~6/mois", after: "0" },
    ],
    duration: "3 semaines",
    year: 2025,
    featured: true,
  },
  {
    slug: "creation-site-wordpress-cabinet-conseil",
    title: "Création site WordPress — Cabinet conseil",
    client: "Cabinet conseil (Québec)",
    category: "Création de site",
    tags: ["WordPress", "Création", "SEO", "Performance"],
    description:
      "Conception et développement d'un site vitrine WordPress sur mesure pour un cabinet de conseil québécois. Priorité : performance Lighthouse 90+, accessibilité WCAG 2.1 AA et référencement local.",
    challenge:
      "Le cabinet utilisait un constructeur de page générique avec un abonnement mensuel élevé. Site lent (Lighthouse 48/100) et peu visible localement sur Google.",
    solution:
      "Développement WordPress sans constructeur de page, thème Gutenberg natif léger, images AVIF auto-hébergées, polices locales et optimisation SEO on-page complète. Livraison en 3 semaines, zéro bug post-lancement.",
    metrics: [
      { label: "Score Lighthouse", before: "48", after: "95" },
      { label: "Coût mensuel outil", before: "65 $/mois", after: "0 $/mois" },
      { label: "Bugs post-lancement", before: "—", after: "0" },
    ],
    duration: "3 semaines",
    year: 2024,
    featured: false,
  },
];
