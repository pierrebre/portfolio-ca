import { Link } from "react-router";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-base-100 relative min-h-screen overflow-hidden"
    >
      <div className="absolute top-0 left-0 hidden h-full w-full lg:block">
        <div className="from-primary/20 to-primary/5 absolute top-32 -left-20 h-96 w-96 rounded-full bg-linear-to-br blur-3xl" />
        <div className="from-secondary/20 to-secondary/5 absolute right-10 bottom-20 h-72 w-72 rounded-full bg-linear-to-br blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="relative z-10 lg:w-1/2">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-base-content/40 h-px w-8" />
              <span className="font-urbanist text-base-content/80 text-sm font-medium tracking-widest uppercase">
                Je fais travailler ton site pour toi
              </span>
            </div>

            <h1 className="font-urbanist text-base-content mb-6 text-4xl font-bold md:text-5xl lg:text-[3rem]">
              Développeur web freelance à Montréal{" "}
            </h1>

            <p className="font-urbanist text-base-content/80 mb-8 max-w-xl text-lg">
              J'aide les PME québécoises à avoir des sites rapides, bien
              référencés et faciles à maintenir. Performance, automatisation,
              résultats mesurables.
            </p>

            <div className="font-urbanist mb-12 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn btn-primary text-base-100 rounded-full px-8 py-3"
              >
                Réserve ton audit gratuit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                to="/services"
                className="btn btn-ghost border-base-content/20 hover:bg-base-content/5 rounded-full px-8 py-3"
              >
                Voir ce que je fais
              </Link>
            </div>

            <div className="border-base-content/10 font-urbanist grid max-w-lg grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4">
              {[
                { value: "100%", label: "Livraisons" },
                { value: "3+", label: "Ans" },
                { value: "< 24 h", label: "Temps de réponse" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="border-base-content/10 border-l pl-4"
                >
                  <div className="text-primary text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-base-content/60 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/images/me-800.avif"
                srcSet="/images/me-800.avif 800w, /images/me.avif 2662w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Portrait de Pierre Barbé, développeur web freelance basé à Montréal spécialisé en performance web et automatisation."
                className="h-auto max-h-[580px] w-full object-cover"
                width={800}
                height={962}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
