import { processSteps } from "data/process-steps";
import React from "react";

export default function Process() {
  return (
    <section id="process" className="bg-base-200 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist text-base-content text-4xl font-bold md:text-5xl">
            Process en 3 étapes
          </h2>
          <p className="text-base-content/70">
            Simple, transparent et efficace
          </p>
        </div>

        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          {processSteps.map((step, index) => (
            <li key={index} className="step step-primary">
              <div className="mt-4 text-center lg:mt-6">
                <div className="font-medium">{step.title}</div>
                <div className="text-sm text-base-content/70">
                  {step.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
