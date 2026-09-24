interface FaqItemProps {
  question: string;
  answer: string;
  /** Même nom pour tout un groupe : une seule question ouverte à la fois. */
  accordionName: string;
}

// <details>/<summary> natif : clavier (Entrée/Espace), refermable, annoncé
// comme dépliable par les lecteurs d'écran.
export default function FaqItem({ question, answer, accordionName }: FaqItemProps) {
  return (
    <details
      name={accordionName}
      className="collapse collapse-arrow bg-base-100 border border-base-300"
    >
      <summary className="collapse-title font-semibold">{question}</summary>
      <div className="collapse-content text-sm">{answer}</div>
    </details>
  );
}
