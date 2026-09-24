import type { ReactNode } from "react";
import { Link } from "react-router";
import { CalendarCheck } from "lucide-react";
import AuditButton from "./audit-button";
import { FREE_AUDIT } from "data/pricing";

interface CtaSectionProps {
  title: string;
  /** Accroche propre à la page. */
  children: ReactNode;
  /** Lien secondaire facultatif (ex. « Voir tous mes services »). */
  secondary?: { to: string; label: string };
}

/**
 * Appel à l'action de fin de page, le même partout : titre et accroche propres
 * à la page, bouton principal commun (audit gratuit). Un seul par page.
 */
export default function CtaSection({ title, children, secondary }: CtaSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Sombre : surface foncée bordée plutôt qu'un grand panneau clair */}
      <div className="bg-primary text-primary-content dark:bg-base-300 dark:text-base-content dark:border-primary/40 overflow-hidden rounded-2xl px-6 py-12 text-center md:px-16 md:py-16 dark:border">
        <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          {FREE_AUDIT.badge}
        </p>

        <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
          {children}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <AuditButton source="fin de page" className="btn btn-lg bg-base-100 text-base-content hover:bg-base-200 dark:bg-primary dark:text-primary-content dark:hover:bg-primary/90 w-full rounded-full border-0 px-8 font-semibold sm:w-auto" />
          {secondary && (
            <Link
              to={secondary.to}
              className="btn btn-lg btn-ghost border-primary-content/40 hover:bg-primary-content/10 dark:border-base-content/20 dark:hover:bg-base-content/5 w-full rounded-full border px-8 sm:w-auto"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
