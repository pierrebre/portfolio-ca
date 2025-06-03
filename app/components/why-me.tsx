import React from "react";

export default function WhyMe() {
  const features = [
    {
      title: "Un équilibre entre technologie, écologie et humain",
      description:
        "Je rassemble la précision technique, la responsabilité écologique et une communication centrée sur l’humain. Votre site est plus rapide. Vos clients restent plus longtemps. Et vous vous sentez bien quant à votre impact numérique.",
    },
    {
      title: "Bilingue et local",
      description:
        "Que vous travailliez en français ou en anglais, je parle votre langue — au sens propre comme au sens technique. Je comprends les subtilités du monde des affaires numériques au Québec et au niveau du Canada.", 
    },
    {
      title: "Des résultats prouvés, pas des promesses",
      description:
        "J’ai aidé plus de 50 entreprises à faire évoluer leur site, améliorer leurs performances et optimiser leur SEO, avec un taux de réussite de 98 %. Le site e-commerce de l’un de mes clients a gagné 38 points sur Google Lighthouse. Ce n’est pas qu’un score technique : c’est plus de conversions, un meilleur classement et une expérience plus fluide pour leurs visiteurs.",
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
                  Pourquoi les entreprises me font confiance&nbsp;?
                </h2>
                <p className="text-base-content/70 mt-2">
                  Des solutions web adaptées à vos besoins
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
