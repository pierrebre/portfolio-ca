import { Phone } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="font-urbanist mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
      <div className="from-primary to-primary/70 relative overflow-hidden rounded-2xl bg-linear-to-t shadow-xl">
        <div className="relative px-8 py-14 text-center lg:px-16 lg:py-20">
          <div className="bg-primary-800/20 mb-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 backdrop-blur-sm">
            <Phone className="text-base-100 h-5 w-5" />
            <span className="text-base-100 text-sm font-medium">
              Support FR/EN – Disponible 24/7
            </span>
          </div>

          <h2 className="text-base-100 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Parlons de vos objectifs
          </h2>

          <p className="text-base-100/90 mx-auto mt-6 max-w-2xl text-lg text-justify">
            Un projet en tête ? Un site à optimiser ? Parlons-en. Réservez
            30 min gratuites ou envoyez-moi un message. C’est simple, rapide et
            sans engagement. Et surtout, c’est vous qui décidez comment on
            commence.
          </p>

          <div className="mt-10 flex justify-center gap-2 flex-col-reverse lg:flex-row">
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener"
              className="w-full lg:w-auto"
            >
              <button className="btn w-full min-w-[250px] rounded-full font-semibold">
                <span>Réserver une consultation</span>
              </button>
            </a>

            <a href="/contact" className="w-full lg:w-auto">
              <button className="btn w-full min-w-[250px] rounded-full font-semibold">
                <span>Envoyer un message</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
