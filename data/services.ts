import {
  Laptop,
  Bot,
  ClipboardCheck,
  Server,
  BrainCircuit,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceProps = {
  readonly icon: LucideIcon;
  readonly name: string;
  readonly description: string;
};

export const services: ServiceProps[] = [
  {
    icon: Rocket,
    name: "Optimisation Web‑Performance",
    description:
      "Analyse Core Web Vitals, optimisation webperformance Québec : code allégé, images compressées, cache malin.",
  },
  {
    icon: Laptop,
    name: "Création & Maintenance de Sites",
    description:
      "WordPress, Next.js ou simple Vanilla JS/HTML/CSS. Thèmes sur mesure, extensions, tests, sécurité : tu dors tranquille. Besoin d’un pigiste WordPress ? J’intègre aussi tes maquettes.",
  },
  {
    icon: Bot,
    name: "Automatisation de Workflows",
    description:
      "n8n, Make, scripts JS / Python : moins de tâches manuelles, moins d’erreurs, plus de temps pour ton vrai boulot.",
  },
  {
    icon: ClipboardCheck,
    name: "Audits Techniques Complets",
    description:
      "Webperf, SEO, sécurité. Rapport clair, priorités classées, quick wins livrés dès J+1.",
  },
  {
    icon: Server,
    name: "Gestion Serveur & Déploiement",
    description:
      "CI/CD, monitoring, alertes. Du code à la prod sans mauvaise surprise.",
  },
  {
    icon: BrainCircuit,
    name: "Intégration d’Outils IA on‑Premise",
    description:
      "Chatbots privés, génération de contenu, classement automatique des tickets.",
  },
];
