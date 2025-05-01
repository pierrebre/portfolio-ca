import Hero from "~/components/hero";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pierre Barbé" },
    { name: "description", content: "Welcome to my website!" },
  ];
}

export default function Home() {
  return <Hero />;
}
