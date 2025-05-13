import type { Question } from "data/questions";

export default function FaqItem({ question, answer, index }: Question) {
  const itemId = `faq-item-${index}`;

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input
        type="radio"
        name="my-accordion-2"
        id={itemId}
        aria-labelledby={`${itemId}-header`}
      />
      <label
        htmlFor={itemId}
        id={`${itemId}-header`}
        className="collapse-title font-semibold"
      >
        {question}
      </label>
      <div className="collapse-content text-sm">{answer}</div>
    </div>
  );
}
