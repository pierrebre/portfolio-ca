import type { Question } from "data/questions";

interface FaqItemProps extends Question {
  accordionName?: string;
  idPrefix?: string;
}

export default function FaqItem({
  question,
  answer,
  index,
  accordionName = "my-accordion-2",
  idPrefix = "faq-item",
}: FaqItemProps) {
  const itemId = `${idPrefix}-${index}`;

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input
        type="radio"
        name={accordionName}
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
