import { Phone } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="font-urbanist mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
      <div className="from-primary to-primary/70 relative overflow-hidden rounded-2xl bg-linear-to-t shadow-xl">
        <div className="relative px-8 py-14 text-center lg:px-16 lg:py-20">
          <div className="bg-primary-800/20 mb-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 backdrop-blur-sm">
            <Phone className="text-base-100 h-5 w-5" />
            <span className="text-base-100 text-sm font-medium">
              Support&nbsp;FR/EN&nbsp;24 h/24
            </span>
          </div>

          <h2 className="text-base-100 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Planifie ta consultation gratuite
          </h2>

          <p className="text-base-100/90 mx-auto mt-6 max-w-2xl text-lg text-justify">
            Une question, une idée ou l’envie de muscler ton site ? Écris‑moi,
            ou réserve 30 minutes pour en jaser. C’est gratuit, sans engagement
            et 100 % transparent : prends l’option qui t’arrange et on se
            parle !
          </p>

          <div className="mt-10 flex justify-center gap-2">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener"
            >
              <button className="btn rounded-full font-semibold">
                <span>Réserver la consultation</span>
              </button>
            </a>

            <a href="/contact">
              <button className="btn rounded-full font-semibold">
                <span>Écris‑moi</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
