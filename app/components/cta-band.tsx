import { Link } from "react-router";

export default function CtaBand() {
  return (
    <section className="bg-base-200 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-urbanist text-base-content mb-4 text-3xl font-bold md:text-4xl">
          Prêt à améliorer ton site ?
        </h2>
        <p className="text-base-content/70 font-urbanist mx-auto mb-8 max-w-xl text-lg">
          Réserve 30 minutes avec moi. C'est gratuit, sans engagement, et tu
          repars avec un diagnostic clair — même si on ne travaille pas
          ensemble.
        </p>
        <Link
          to="/contact"
          className="btn btn-primary text-base-100 rounded-full px-8"
        >
          Réserver mon audit gratuit →
        </Link>
      </div>
    </section>
  );
}
