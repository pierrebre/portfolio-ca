export default function WhyMe() {
  const features = [
    {
      title: "Performance + éco-conception",
      description:
        "Ton site sera plus rapide, mieux classé sur Google, et plus léger pour la planète. Ce n’est pas du greenwashing : un site éco-conçu est un site performant. L’un ne va pas sans l’autre.",
    },
    {
      title: "Bilingue, local, disponible",
      description:
        "Français, anglais — je parle ta langue, au sens propre comme technique. Basé à Montréal, je comprends le marché québécois et je réponds en moins de 24 h.",
    },
    {
      title: "Des résultats prouvés",
      description:
        "+38 points Lighthouse sur un site e-commerce. 10 h/semaine économisées grâce à l’automatisation n8n. Ce ne sont pas des promesses — ce sont des chiffres de vrais clients.",
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-base-100 py-20 md:py-28">
      <section className="bg-base-200 rounded-xl py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-16 md:grid-cols-1">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Pourquoi les entreprises québécoises me font confiance
                </h2>
                <p className="text-base-content/70 mt-2">
                  Pas juste un dev. Un partenaire technique qui rend des comptes.
                </p>
                <div className="bg-primary h-px w-24" />
              </div>

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
