import ServiceCard from "./service-card";
import { services } from "data/services";

export default function Services() {
  return (
    <section id="services" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist content text-4xl font-bold md:text-5xl">
            Mes Services
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.name}
              icon={service.icon}
              name={service.name}
              description={service.description}
            />
          ))}
        </div>
        <div className="flex mt-16 flex-col items-center justify-center px-4">
          <p className="font-urbanist text-base-content/80 mb-8 max-w-xl text-center text-lg">
            Vous souhaitez en savoir plus sur mes services ? Contactez‑moi dès
            aujourd’hui.
          </p>

          <a
            href="/contact"
            className="btn btn-primary text-base-100 rounded-full px-8 py-7"
          >
            Parlons de votre projet et de vos besoins techniques.
          </a>
        </div>
      </div>
    </section>
  );
}
