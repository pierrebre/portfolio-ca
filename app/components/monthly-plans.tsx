import { CheckCircle } from "lucide-react";
import { PRICING } from "data/pricing";

// Un seul tableau de suivi pour les 3 offres : site, performance et
// automatisations. Chaque forfait = heures comprises × taux horaire.
const plans = [
  {
    name: "Essentiel",
    price: PRICING.maintenanceEssentiel,
    features: [
      "Mises à jour WordPress, plugins et thèmes",
      "Sauvegardes hebdomadaires hors serveur",
      "Surveillance de disponibilité avec alerte",
      "Réponse par courriel sous 48 h ouvrables",
      "1 h de corrections ou de petites demandes",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: PRICING.maintenancePro,
    features: [
      "Tout l'Essentiel",
      "Sauvegardes quotidiennes",
      "Suivi mensuel de la vitesse + rapport",
      "Surveillance de tes automatisations",
      "Réponse sous 24 h ouvrables",
      "2 h de corrections ou d'améliorations",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: PRICING.maintenancePremium,
    features: [
      "Tout le Pro",
      "Réponse le jour même (jours ouvrables)",
      "5 h de corrections ou de nouveautés",
      "Bilan SEO et performance chaque trimestre",
    ],
    highlight: false,
  },
];

/** Forfaits de suivi mensuel, affichés sur les pages de services. */
export default function MonthlyPlans({ className = "" }: { className?: string }) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center">Suivi mensuel</h2>
        <p className="text-base-content/70 text-center mt-4 mb-12 max-w-2xl mx-auto">
          Le même forfait couvre ton site, sa vitesse et tes automatisations.
          Sans engagement annuel, résiliable avec 30 jours de préavis.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border ${
                plan.highlight
                  ? "bg-primary text-primary-content border-primary"
                  : "bg-base-100 border-base-content/10"
              }`}
            >
              <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
              <p className={`text-2xl font-black ${plan.highlight ? "" : "text-primary"}`}>
                {plan.price.label}/mois
              </p>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-primary-content/90" : "text-base-content/70"}`}>
                {plan.price.hours} h de travail comprises
              </p>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-primary-content/90" : "text-primary"}`}
                      aria-hidden="true"
                    />
                    <span className={plan.highlight ? "text-primary-content" : "text-base-content/80"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
