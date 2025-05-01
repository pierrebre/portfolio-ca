import Hero from "~/components/hero";
import type { Route } from "./+types/home";
import ServiceCard from "~/components/serviceCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pierre Barbé" },
    { name: "description", content: "Welcome to my website!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <section id="services"  className="bg-base-100 py-20 md:py-28">
        <h2 className="font-urbanist text-base-content text-4xl font-bold md:text-5xl">
          Our Services
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nisi.</p>
        <ServiceCard />
      </section>
    </>
  );
}
