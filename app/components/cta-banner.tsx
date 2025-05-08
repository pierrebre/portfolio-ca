import React from "react";

export default function CtaBanner() {
  return (
    <section id="cta" className="bg-primary py-12 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Appel à l'action principal</h2>

        <p className="mb-6 text-2xl font-bold text-primary-content">
          🚀 Prêt à donner un coup de boost à ton site ?
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#audit" className="btn btn-accent btn-lg">
            Réserve ton audit de site gratuit
          </a>

          <a href="#contact" className="btn btn-ghost btn-lg">
            Écris‑moi
          </a>
        </div>
      </div>
    </section>
  );
}
