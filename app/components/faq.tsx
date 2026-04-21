import FaqItem from "./faq-item";
import JsonLd from "./json-ld";
import { questions as defaultQuestions, type Question } from "data/questions";

interface FaqProps {
  questions?: Question[];
  title?: string;
  accordionName?: string;
  idPrefix?: string;
  className?: string;
}

export default function Faq({
  questions = defaultQuestions,
  title = "FAQ",
  accordionName = "my-accordion-2",
  idPrefix = "faq-item",
  className = "bg-base-100 py-20 md:py-28",
}: FaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <section id="faq" className={className}>
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist text-base-content text-4xl font-bold md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex flex-col space-y-2">
          {questions.map((item) => (
            <FaqItem
              key={item.index}
              index={item.index}
              question={item.question}
              answer={item.answer}
              accordionName={accordionName}
              idPrefix={idPrefix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
