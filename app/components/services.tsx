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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nisi.
          </p>
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
      </div>
    </section>
  );
}
