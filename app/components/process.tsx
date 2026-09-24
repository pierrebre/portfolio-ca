import { FileText, KeyRound, MapPin, UserRound } from "lucide-react";
import { processSteps } from "data/process-steps";
import AuditButton from "./audit-button";
import { FREE_AUDIT } from "data/pricing";

// Engagements vérifiables (pas de « toujours ») : ils remplacent les promesses.
const commitments = [
  { icon: UserRound, title: "Une seule personne", text: "Du premier échange à la maintenance, tu parles à celui qui fait le travail." },
  { icon: FileText, title: "Un prix écrit avant de commencer", text: "Les tarifs sont affichés sur ce site, et le plan chiffré fixe le prix et le délai." },
  { icon: KeyRound, title: "Tout reste à ton nom", text: "Site, nom de domaine, hébergement et accès : tu es propriétaire de tout, dès le départ." },
  { icon: MapPin, title: "En français, depuis Montréal", text: "Pour les PME de Montréal, Laval, Longueuil et de la Rive-Nord, et à distance partout au Québec." },
];

export default function Process() {
  return (
    <section id="process" className="bg-base-200 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-primary text-sm font-semibold">Comment ça se passe</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Rien ne commence sans un plan chiffré que tu as accepté
          </h2>
        </header>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className={`border-t-2 pt-6 ${index === 0 ? "border-primary" : "border-base-content/20"}`}
            >
              <span className="text-primary text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-base-content/80 mt-2 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => (
            <li key={item.title}>
              <item.icon className="text-primary h-6 w-6" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="text-base-content/80 mt-1 text-sm leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="bg-base-100 border-base-content/10 mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border p-6 sm:flex-row sm:items-center">
          <p className="font-semibold">
            La première étape ne coûte rien.{" "}
            <span className="text-base-content/70 font-normal">{FREE_AUDIT.badge}.</span>
          </p>
          <AuditButton className="btn btn-primary rounded-full px-6" source="déroulement" />
        </div>
      </div>
    </section>
  );
}
