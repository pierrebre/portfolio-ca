import type { Question } from "data/questions";

export default function FaqItem({ question, answer }: Question) {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title font-semibold">{question}</div>
      <div className="collapse-content text-sm">{answer}</div>
    </div>
  );
}
