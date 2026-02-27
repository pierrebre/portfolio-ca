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
  readonly key: string;
  readonly icon: LucideIcon;
  readonly name: string;
  readonly description: string;
};

export const services: ServiceProps[] = [
  {
    key: "creation-maintenance-sites",
    icon: Laptop,
    name: "Création & Maintenance de Sites",
    description:
      "Tu as besoin d'un nouveau site ou d'une refonte complète ? Je développe des sites WordPress rapides, propres et durables. Et je reste disponible après la mise en ligne — pas de disparition.",
  },
  {
    key: "optimisation-web-performance",
    icon: Rocket,
    name: "Optimisation Web‑Performance",
    description:
      "Un site lent perd des visiteurs — et Google le sait. J'analyse ta performance et j'optimise le temps de chargement jusqu'à ce que ça file. Résultat moyen : +38 points Lighthouse.",
  },
  {
    key: "automatisation-workflows",
    icon: Bot,
    name: "Automatisation de Workflows (n8n)",
    description:
      "Envois de courriels, mises à jour de contenu, rapports, synchronisation de données — j'automatise tes processus avec n8n et autres outils. Un client économise 10 h par semaine grâce à ça.",
  },
  {
    key: "audits-techniques-core-web-vitals",
    icon: ClipboardCheck,
    name: "Audits Techniques & Core Web Vitals",
    description:
      "Ton site semble mou ? Je réalise des audits clairs et vulgarisés sur tes Core Web Vitals, l'accessibilité et la santé globale du site — avec des recommandations actionnables.",
  },
  {
    key: "gestion-serveur-deploiement",
    icon: Server,
    name: "Gestion Serveur & Déploiement",
    description:
      "Serveurs, mises à jour, pipelines de déploiement — je gère la technique en coulisses pour que ton site reste en ligne, sécurisé et sans souci.",
  },
  {
    key: "integration-outils-ia",
    icon: BrainCircuit,
    name: "Intégration d'Outils IA",
    description:
      "Du chatbot aux recommandations de contenu, j'intègre des outils IA qui apportent une vraie valeur à tes utilisateurs — pas juste une tendance à cocher.",
  },
];
