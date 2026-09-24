import { Link } from "react-router";
import { ArrowRight, CalendarCheck } from "lucide-react";
import AuditButton from "./audit-button";
import { FREE_AUDIT, PRICING } from "data/pricing";
import type { ProjectMeta } from "~/lib/projects.server";

/** Un résultat réel, tiré d'une étude de cas (content/projects). */
export interface HeroProof {
  label: string;
  before: string;
  after: string;
  context: string;
}

export const HERO_IMAGE = {
  src: "/images/me-800.avif",
  srcSet: "/images/me-800.avif 800w, /images/me.avif 1122w",
  // Photo à droite en desktop, vignette de 48 px sur mobile : les deux
  // utilisent me-800, téléchargée une seule fois.
  sizes: "(min-width: 1024px) 40vw, 48px",
};

export default function Hero({
  proof,
  featured,
}: {
  proof?: HeroProof;
  featured?: ProjectMeta;
}) {
  return (
    <section id="home" className="bg-base-100">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-7">
          <h1>
            <span className="text-primary block text-sm font-semibold sm:text-base">
              Développeur web freelance à Montréal
            </span>{" "}
            <span className="mt-3 block text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
              Je crée, j'accélère et j'entretiens le site web de ta PME
            </span>
          </h1>
          <p className="text-base-content/80 mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
            Tu parles directement à la personne qui fait le travail, les prix sont
            affichés d'avance, et je reste là après la mise en ligne. J'automatise
            aussi les tâches répétitives de ton bureau.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AuditButton className="btn btn-primary btn-lg rounded-full px-7" source="haut de page">
              {FREE_AUDIT.cta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </AuditButton>
            {/* Ancre dans la page : pas de <Link> nécessaire */}
            <a
              href="#offres"
              className="btn btn-ghost btn-lg border-base-content/20 rounded-full px-7"
            >
              Voir les prix
            </a>
          </div>
          <p className="text-base-content/70 mt-4 flex items-center gap-2 text-sm font-medium">
            <CalendarCheck className="text-primary h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {FREE_AUDIT.badge}
          </p>

          {/* Mobile : le visage reste visible sans occuper un écran entier */}
          <div className="mt-6 flex items-center gap-3 lg:hidden">
            <img
              src={HERO_IMAGE.src}
              alt=""
              className="h-12 w-12 rounded-full object-cover object-top"
              width={48}
              height={48}
            />
            <p className="text-sm">
              <span className="font-semibold">Pierre Barbé</span>
              <br />
              <span className="text-base-content/70">
                Ton seul contact, du premier échange à la maintenance
              </span>
            </p>
          </div>

          <dl className="border-base-content/10 mt-10 grid gap-5 border-t pt-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <dt className="text-base-content/70 text-sm font-medium">Site vitrine WordPress</dt>
              <dd className="mt-1 text-2xl font-bold">
                <span className="text-base-content/70 text-base font-normal">dès </span>
                {PRICING.siteVitrine.label}
              </dd>
              <dd className="text-base-content/70 mt-1 text-sm">
                en ligne en {PRICING.siteVitrine.delay}
              </dd>
            </div>
            {proof && (
              <div>
                <dt className="text-base-content/70 text-sm font-medium">{proof.label}</dt>
                <dd className="mt-1 text-2xl font-bold">
                  <span className="sr-only">de </span>
                  {proof.before}{" "}
                  <span className="text-base-content/70 font-normal" aria-hidden="true">→</span>
                  <span className="sr-only"> à </span>{" "}
                  <span className="text-green-700 dark:text-green-400">{proof.after}</span>
                </dd>
                <dd className="text-base-content/70 mt-1 text-sm">{proof.context}</dd>
              </div>
            )}
            {featured?.href && (
              <div>
                <dt className="text-base-content/70 text-sm font-medium">Étude de cas</dt>
                <dd className="mt-1 text-lg leading-snug font-bold">
                  {featured.client.replace(/\s*\(.*\)$/, "")}
                </dd>
                <dd className="mt-1 text-sm">
                  <Link to={featured.href} className="text-primary font-medium underline underline-offset-2">
                    {featured.outcome ?? "Lire l'étude de cas"}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <img
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcSet}
            sizes={HERO_IMAGE.sizes}
            alt="Pierre Barbé"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            width={800}
            height={1000}
            loading="eager"
            fetchPriority="high"
          />
          <div className="bg-base-100 border-base-content/10 absolute -bottom-6 -left-8 max-w-64 rounded-xl border p-4 shadow-lg">
            <p className="font-semibold">Pierre Barbé</p>
            <p className="text-base-content/70 text-sm">
              Une seule personne, du premier échange à la maintenance. Pas de ticket, pas
              d'intermédiaire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
