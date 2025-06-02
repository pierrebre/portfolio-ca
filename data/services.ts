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
      "Des sites plus rapides signifient des utilisateurs plus heureux, un meilleur SEO et plus de conversions. J’analyse la vitesse, les Core Web Vitals et l’impact carbone, puis j’optimise jusqu’à ce que ça file. Pas de rapports inutiles : des correctifs clairs et des résultats concrets.",
  },
  {
    icon: Laptop,
    name: "Création & Maintenance de Sites",
    description:
      "Besoin d’un site tout neuf ou de redonner vie à l’actuel ? Je développe des sites WordPress rapides, propres et durables. Et oui, je reste disponible pour la maintenance. Pas de disparition après la mise en ligne.",
  },
  {
    icon: Bot,
    name: "Automatisation de Workflows (n8n)",
    description:
      "Vous répétez encore et encore les mêmes tâches ? J’automatise vos processus avec n8n et autres outils, économisant temps, énergie et maux de tête.",
  },
  {
    icon: ClipboardCheck,
    name: "Audits Techniques & Core Web Vitals",
    description:
      "Votre site semble mou ? Je réalise des audits clairs et vulgarisés sur vos Core Web Vitals, l’accessibilité et la santé globale du site.",
  },
  {
    icon: Server,
    name: "Gestion Serveur & Déploiement",
    description:
      "Serveurs, mises à jour, pipelines de déploiement — je gère la technique en coulisses pour un site en ligne, sécurisé et sans souci.",
  },
  {
    icon: BrainCircuit,
    name: "Intégration d’Outils IA",
    description:
      "Du chatbot aux recommandations de contenu, j’intègre des IA utiles pour vos utilisateurs, pas juste pour frimer.",
  },
];
