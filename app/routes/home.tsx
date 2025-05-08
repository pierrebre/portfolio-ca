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
  return [
    { title: "Pierre Barbé" },
    { name: "description", content: "Welcome to my website!" },
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

      {globalToast.visible && (
        <Toast
          message={globalToast.message}
          type={globalToast.type}
          visible={globalToast.visible}
          onClose={closeGlobalToast}
          position="bottom-end"
        />
      )}
    </>
  );
}
