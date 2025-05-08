import FaqItem from "./faq-item";
import { questions } from "data/questions";

export default function Faq() {
  return (
    <section id="faq" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 flex justify-center">
            <div className="via-primary h-px w-24 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="font-urbanist text-base-content text-4xl font-bold md:text-5xl">
            FAQ
          </h2>
        </div>
        <div className="flex flex-col space-y-2">
          {questions.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
