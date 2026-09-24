import { Link } from "react-router";
import ServiceCard from "./service-card";
import AuditButton from "./audit-button";
import { services } from "data/services";
import { HOURLY_RATE, PRICING, formatPrice } from "data/pricing";

/** Les 3 offres de l'accueil, avec prix d'entrée (ancre « Voir les prix »). */
export default function Services() {
  return (
    <section id="offres" className="bg-base-200 scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-primary text-sm font-semibold">Ce que je fais</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Trois offres, des prix affichés
          </h2>
          <p className="text-base-content/80 mt-4 text-lg leading-relaxed">
            Chaque prix correspond aux heures estimées × {formatPrice(HOURLY_RATE)}/h. Tu
            reçois un plan chiffré par écrit avant que quoi que ce soit commence.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </div>

        <div className="border-base-content/10 mt-10 grid gap-6 border-t pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="text-base-content/80 space-y-2 leading-relaxed">
            <p>
              <span className="text-base-content font-semibold">
                Inclus dans un site vitrine à {PRICING.siteVitrine.label} :
              </span>{" "}
              design adapté à ton image, SEO technique, politique de confidentialité et
              consentement aux témoins (Loi 25), formation et 30 jours de support. Le site,
              le nom de domaine et l'hébergement restent à ton nom.
            </p>
            <p>
              Ton site a été fait par quelqu'un d'autre ? Je peux le reprendre.{" "}
              <Link to="/services" className="text-primary font-medium underline underline-offset-2">
                Comparer les 3 offres et les forfaits de suivi
              </Link>
            </p>
          </div>
          <AuditButton className="btn btn-primary rounded-full px-6" source="offres" />
        </div>
      </div>
    </section>
  );
}
