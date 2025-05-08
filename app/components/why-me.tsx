import React from "react";

export default function WhyMe() {
  const features = [
    {
      title: "Expertise prouvée",
      description:
        "5 ans en agence puis en solo, plus de 50 mandats livrés et 98 % de clients satisfaits. Approche itérative et documentée.",
    },
    {
      title: "Communication bilingue",
      description:
        "Collaboration fluide en français et en anglais, sans jargon. Je traduis les rapports pour ton équipe, côté client ou agence.",
    },
    {
      title: "Code vert & performant",
      description:
        "Chaque ligne est pensée pour réduire le poids des pages, abaisser la facture énergétique et grimper dans les Core Web Vitals.",
    },
    {
      title: "Budget clair & accessibilité",
      description:
        "Devis détaillé, tarifs flexibles de pigiste et livrables compréhensibles : tu sais toujours où part ton argent.",
    },
    {
      title: "Présence locale",
      description:
        "Basé à Montréal, je me déplace (ou me connecte) sans délai pour Laval, Longueuil et Québec. Un café pour jaser ? On fixe ça !",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-base-100 py-20 md:py-28">
      <section className="bg-base-200 rounded-xl py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-16 md:grid-cols-1">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Pourquoi moi&nbsp;?
                </h2>
                <p className="text-base-content/70 mt-2">
                  Des solutions web adaptées à vos besoins
                </p>
                <div className="bg-primary h-px w-24" />
              </div>

              {/* Cartes générées à partir de features */}
              <div className="grid grid-cols-1 gap-8 space-y-12 md:grid-cols-2 lg:grid-cols-3">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="border-primary border-l-2 pl-6 space-y-2"
                  >
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-base-content/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
