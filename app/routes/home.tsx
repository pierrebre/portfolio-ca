import { useState } from "react";
import Hero from "~/components/hero";
import Services from "~/components/services";
import WhyMe from "~/components/why-me";
import Process from "~/components/process";
import CtaBanner from "~/components/cta-banner";
import Faq from "~/components/faq";
import AuditModal from "~/components/audit-modal";
import Toast from "~/components/toast";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/";
  const image = "https://pierrebarbe.ca/images/pb-og-image.avif";

  return [
    { title: "Développeur web freelance Montréal | Pierre Barbé" },
    {
      name: "description",
      content:
        "Sites rapides, verts et rentables pour PME et agences du Québec. Audit de site gratuit, web‑performance, éco‑conception et automatisation.",
    },
    {
      name: "keywords",
      content:
        "développeur web freelance Montréal, optimisation webperformance Québec, audit de site gratuit, pigiste WordPress, éco‑conception web",
    },
    {
      property: "og:title",
      content: "Développeur web freelance Montréal | Pierre Barbé",
    },
    {
      property: "og:description",
      content:
        "Sites rapides, verts et rentables pour PME et agences du Québec. Audit gratuit en 30 min.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    {
      name: "twitter:title",
      content: "Développeur web freelance Montréal | Pierre Barbé",
    },
    {
      name: "twitter:description",
      content:
        "Audit gratuit, web‑performance et éco‑conception pour PME et agences.",
    },
    { name: "twitter:image", content: image },
    { name: "twitter:url", content: url },
  ];
}

export default function Home() {
  const [globalToast, setGlobalToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const closeGlobalToast = () => {
    setGlobalToast((prev) => ({ ...prev, visible: false }));
  };

  const showGlobalToast = (message: string, type: "success" | "error") => {
    setGlobalToast({
      visible: true,
      message,
      type,
    });
  };

  return (
    <>
      <Hero />
      <Services />
      <WhyMe />
      <Process />
      {/* <CtaBanner /> */}
      <Faq />
      <AuditModal />
    </>
  );
}
