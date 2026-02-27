import { Link } from "react-router";
import ServiceCard from "./service-card";
import { services } from "data/services";
import { getServiceUrl } from "~/utils/service-links";

export default function Services() {
  const featuredServices = services.slice(0, 3);

  return (
    <section id="services" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist content text-4xl font-bold md:text-5xl">
            Ce que je fais concrètement
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              name={service.name}
              description={service.description}
              linkTo={getServiceUrl(service.key)}
            />
          ))}
        </div>
        <p className="text-base-content/60 font-urbanist mt-10 text-center text-sm">
          Je fais aussi des audits techniques, de la gestion serveur et du
          déploiement.{" "}
          <Link to="/services" className="link link-primary font-medium">
            Voir tous mes services →
          </Link>
        </p>
      </div>
    </section>
  );
}
