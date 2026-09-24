import type { ReactNode } from "react";
import FaqItem from "./faq-item";
import JsonLd from "./json-ld";
import { questions as defaultQuestions, type Question } from "data/questions";

interface FaqProps {
  questions?: Question[];
  title?: string;
  accordionName?: string;
  className?: string;
  // Stable ID for the FAQPage node — lets parent WebPage @graph reference it
  // via mainEntity. Defaults to home page #faq.
  schemaId?: string;
  /** Texte sous le titre : active la mise en page en deux colonnes. */
  intro?: ReactNode;
}

export default function Faq({
  questions = defaultQuestions,
  title = "Questions fréquentes",
  accordionName = "home-faq",
  className = "bg-base-100 py-20 md:py-28",
  schemaId = "https://pierrebarbe.ca/#faq",
  intro,
}: FaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": schemaId,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  const items = (
    <div className="flex flex-col space-y-2">
      {questions.map((item) => (
        <FaqItem
          key={item.index}
          question={item.question}
          answer={item.answer}
          accordionName={accordionName}
        />
      ))}
    </div>
  );

  if (intro) {
    return (
      <section id="faq" className={className}>
        <JsonLd data={faqSchema} />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <header className="lg:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            <div className="text-base-content/80 mt-4 leading-relaxed">{intro}</div>
          </header>
          <div className="lg:col-span-8">{items}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className={className}>
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="text-base-content text-4xl font-bold md:text-5xl">
            {title}
          </h2>
        </div>
        {items}
      </div>
    </section>
  );
}
