import { Link } from "react-router";
import ServiceCard from "./service-card";
import { services } from "data/services";
import { getServiceUrl } from "~/utils/service-links";

export default function Services() {
  return (
    <section id="services" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist content text-4xl font-bold md:text-5xl">
            Des services concrets pour des résultats mesurables
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              name={service.name}
              description={service.description}
              linkTo={getServiceUrl(service.key)}
            />
          ))}
        </div>
        <div className="flex mt-16 flex-col items-center justify-center px-4">
          <p className="font-urbanist text-base-content/80 mb-2 max-w-xl text-center text-lg font-semibold">
            Tu ne sais pas par où commencer ?
          </p>
          <p className="font-urbanist text-base-content/70 mb-8 max-w-xl text-center">
            Réserve 30 minutes avec moi — c’est gratuit et sans engagement.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary text-base-100 rounded-full px-8"
          >
            Réserver une consultation gratuite
          </Link>
        </div>
      </div>
    </section>
  );
}
