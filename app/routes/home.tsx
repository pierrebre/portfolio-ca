import Hero from "~/components/hero";
import Services from "~/components/services";
import WhyMe from "~/components/why-me";
import Process from "~/components/process";
import CtaBanner from "~/components/cta-banner";
import Faq from "~/components/faq";

import type { Route } from "./+types/home";
import AuditModal from "~/components/audit-modal";

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
      <Services />
      <WhyMe />
      <Process />
     {/*  <CtaBanner /> */}
      <Faq />
      <AuditModal />

    </>
  );
}
