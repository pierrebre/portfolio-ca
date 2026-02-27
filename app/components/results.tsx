const results = [
  {
    value: "+38 pts",
    description:
      "Score Lighthouse amélioré sur un site e-commerce — temps de chargement divisé par 3.",
    sector: "E-commerce",
  },
  {
    value: "10 h / sem.",
    description:
      "Temps économisé grâce à l'automatisation des workflows d'un client avec n8n.",
    sector: "PME",
  },
  {
    value: "0",
    description:
      "Perte de trafic lors d'une migration WordPress → Next.js avec redirections SEO complètes.",
    sector: "Site corporate",
  },
];

export default function Results() {
  return (
    <section className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist text-base-content text-4xl font-bold md:text-5xl">
            Des résultats, pas des promesses
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="border-base-content/10 rounded-xl border p-8 text-center"
            >
              <div className="text-primary font-urbanist mb-3 text-5xl font-bold">
                {result.value}
              </div>
              <p className="text-base-content/70 mb-4 leading-relaxed">
                {result.description}
              </p>
              <span className="badge badge-outline badge-sm">
                {result.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
