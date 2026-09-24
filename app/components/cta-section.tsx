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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
      <div className="from-primary to-primary/90 overflow-hidden rounded-2xl bg-linear-to-t px-8 py-14 text-center shadow-xl lg:px-16 lg:py-20">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-primary-content text-sm font-medium">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          {FREE_AUDIT.badge}
        </p>

        <h2 className="text-primary-content text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>

        <p className="text-primary-content mx-auto mt-6 max-w-2xl text-lg">
          {children}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <AuditButton className="btn w-full min-w-[250px] rounded-full font-semibold lg:w-auto" />
          {secondary && (
            <Link
              to={secondary.to}
              className="btn btn-ghost w-full min-w-[250px] rounded-full border border-primary-content/40 text-primary-content hover:bg-primary-content/10 lg:w-auto"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
