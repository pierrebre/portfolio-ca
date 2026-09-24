import { Link } from "react-router";

interface LinkCardProps {
  to: string;
  title: string;
  /** Texte d'action, affiché précédé d'une flèche. */
  label: string;
  /** Fond de la carte, à contraster avec celui de la section. */
  bg?: "bg-base-100" | "bg-base-200";
}

/** Carte de maillage interne (services complémentaires, « Lire aussi »). */
export default function LinkCard({ to, title, label, bg = "bg-base-100" }: LinkCardProps) {
  return (
    <Link
      to={to}
      className={`${bg} border border-base-content/10 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-all`}
    >
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-primary text-sm mt-1">→ {label}</p>
    </Link>
  );
}
