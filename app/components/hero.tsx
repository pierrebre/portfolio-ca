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
                Développeur web – Montréal
              </span>
            </div>

            <h1 className="font-urbanist text-base-content mb-6 text-4xl font-bold md:text-5xl lg:text-[4.5rem]">
              Ton site, plus vite
              <span className="text-primary block">et plus vert</span>
            </h1>

            <p className="font-urbanist text-base-content/80 mb-8 max-w-xl text-lg">
              Votre site est-il à la hauteur ? Ou freine-t-il vos visiteurs et
              vos ventes ? Dans un monde numérique rapide, la vitesse, le code
              propre et l’expérience utilisateur font toute la différence.
              <br /> <br />Home Page Content for Pierre Barbé – Freelance Web Developer, Montreal
Give Your Website the Edge It Deserves
Local Web Performance, Clean Code & Eco-Friendly Results. All in One Place
Is your website really pulling its weight? Or is it stuck in slow mode, leaving visitors and sales behind?
 In today’s crowded digital world, speed matters. Clean code matters. User experience matters. And let’s not forget: the planet matters, too.

Hi, I’m Pierre Barbé.
 I help businesses like yours: SMEs, e-commerce, service providers, and agencies in Quebec, create websites that work harder, load faster, and leave a smaller carbon footprint.
 No tech buzzwords. No cookie-cutter solutions. Just honest, down-to-earth expertise.

[CTA] Book your free site audit now
 Découvrez comment améliorer la vitesse et l'impact de votre site dès aujourd'hui.


Websites That Load Fast, Convert More & Waste Less
Your site isn’t just an online brochure. It’s the front door to your business.
 And if it’s slow, clunky, or poorly maintained, it’s not just frustrating for your visitors, it’s costing you money.

I specialize in turning underperforming websites into efficient, conversion-focused tools that serve both your business and your customers better.

My approach?
 Simple. Practical. Focused on your reality as a local business owner or agency.
 I cut the fat. I fix the bottlenecks. I build only what you need and nothing you don’t.

[CTA] Let’s optimize your website now
 Optimisons votre site ensemble, rapide, simple, efficace.
              Je suis Pierre Barbé, et j’aide les PME, e-commerces, agences et
              prestataires québécois à créer des sites web plus performants,
              plus rapides et plus responsables. Sans jargon, sans recettes
              toutes faites. Juste du concret, accessible et efficace.
            </p>

            <div className="font-urbanist mb-12 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="btn btn-primary text-base-100 rounded-full px-8 py-3"
              >
                Écris‑moi
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <button
                className="btn btn-ghost border-base-content/20 hover:bg-base-content/5 rounded-full px-8 py-3"
                onClick={() => {
                  const modal = document.getElementById(
                    "audit_modal"
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }}
              >
                Réservez votre audit gratuit dès maintenant
              </button>
            </div>

            <div className="border-base-content/10 font-urbanist grid max-w-md grid-cols-3 gap-8 border-t pt-8">
              {[
                { value: "50+", label: "Projets" },
                { value: "98 %", label: "Taux de succès" },
                { value: "3+", label: "Ans d'expérience" },
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
                src="/images/me.avif"
                alt="Pierre Barbé – développeur webperformant"
                className="h-[580px] w-full object-cover"
                width={1152}
                height={1152}
                loading="eager"
              />

              <div className="border-base-content/10 bg-base-100/95 absolute bottom-6 left-6 rounded-lg border px-4 py-3 backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="font-urbanist">
                    <div className="text-base-content/60 text-xs">
                      Fiable pour
                    </div>
                    <div className="text-sm font-medium">50+ clients</div>
                  </div>
                </div>
              </div>

              <div className="border-base-content/10 bg-base-100/95 absolute top-6 right-6 rounded-lg border px-4 py-3 backdrop-blur-xs">
                <div className="font-urbanist text-center">
                  <div className="text-primary text-lg font-bold">#1</div>
                  <div className="text-base-content/60 text-xs">
                    Web‑Performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
