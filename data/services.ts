import { Laptop, Bot, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PRICING } from "./pricing";

export type ServiceProps = {
  readonly key: string;
  readonly icon: LucideIcon;
  /** Nom court (menus, cartes). */
  readonly name: string;
  /** Le besoin tel que le client le formule. */
  readonly problem: string;
  readonly description: string;
  /** Ce que comprend l'offre, en 3 points. */
  readonly includes: readonly string[];
  /** Prix d'entrée affiché, issu de data/pricing.ts. */
  readonly from: string;
};

/** URL de la page d'un service : les routes suivent sa clé. */
export function serviceUrl(key: string): string {
  return `/services/${key}`;
}

// Trois offres, chacune adossée à au moins une étude de cas réelle.
export const services: ServiceProps[] = [
  {
    key: "creation-maintenance-sites",
    icon: Laptop,
    name: "Site web",
    problem: "J'ai besoin d'un site, ou le mien est à refaire.",
    description:
      `Un site WordPress rapide et clair, que tu apprends à modifier toi-même, en ligne en ${PRICING.siteVitrine.delay} — puis entretenu chaque mois pour qu'il reste sûr et à jour.`,
    includes: [
      "Création, refonte ou boutique en ligne",
      "Hébergement, sécurité et sauvegardes",
      "Politique de confidentialité et consentement (Loi 25)",
    ],
    from: PRICING.siteVitrine.label,
  },
  {
    key: "optimisation-web-performance",
    icon: Rocket,
    name: "Performance",
    problem: "Mon site est lent, surtout sur cellulaire.",
    description:
      "Un audit complet de ton site (vitesse, référencement technique, accessibilité, sécurité), puis les corrections, mesurées avant et après.",
    includes: [
      "Audit écrit avec priorités et coûts",
      "Optimisation de la vitesse et du SEO technique",
      "Résultats mesurés avant/après",
    ],
    from: PRICING.auditComplet.label,
  },
  {
    key: "automatisation-workflows",
    icon: Bot,
    name: "Automatisation & IA",
    problem: "Je perds des heures sur des tâches répétitives.",
    description:
      "Confirmations, relances, CRM, rapports : je fais faire tes tâches répétitives par tes logiciels, et j'ajoute un assistant IA là où il fait vraiment gagner du temps.",
    includes: [
      "Tâches automatisées entre tes outils",
      "Assistant IA qui répond à partir de ton contenu",
      "Automatisations hébergées au Canada si tu le souhaites",
    ],
    from: PRICING.workflowSimple.label,
  },
];
