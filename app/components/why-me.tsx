const features = [
  {
    title: "Je réponds en moins de 24 h — toujours.",
    description:
      "Pas de ticket de support, pas de \"on revient vers vous\". Tu m'écris, je te réponds. Directement. Si ton site a un problème urgent, je suis là.",
  },
  {
    title: "Tu sais exactement ce que tu paies — et pourquoi.",
    description:
      "Pas de devis mystère ni de frais cachés. Je t'explique chaque ligne du budget avant de commencer. Si quelque chose change en cours de route, on en parle avant.",
  },
  {
    title: "Je ne disparais pas après la livraison.",
    description:
      "Ton site évolue, et moi aussi. Maintenance, mises à jour, nouvelles fonctionnalités — je reste ton contact technique, sans avoir à tout réexpliquer à quelqu'un de nouveau.",
  },
  {
    title: "Basé à Montréal, je parle ta langue.",
    description:
      "Français, anglais — au sens propre comme technique. Je connais le marché québécois, les réalités des PME d'ici et je suis disponible dans ton fuseau horaire.",
  },
];

export default function WhyMe() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-base-100 py-20 md:py-28">
      <section className="bg-base-200 rounded-xl py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-16 md:grid-cols-1">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Pourquoi les PME québécoises travaillent avec moi
                </h2>
                <p className="text-base-content/70 mt-2">
                  Pas juste un dev. Un partenaire technique à Montréal.
                </p>
                <div className="bg-primary h-px w-24" />
              </div>

              <div className="grid grid-cols-1 gap-8 space-y-12 md:grid-cols-2">
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
