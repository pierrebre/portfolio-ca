// Classes écrites en entier (pas de `badge-${x}`) pour que Tailwind les génère.
// Une catégorie absente de ces tables retombe sur le style neutre.
// Catégories des articles : Web Performance, Automatisation & IA, WordPress,
// Projet web (prix, choix du prestataire, Loi 25).

const BADGE_CLASSES: Record<string, string> = {
  "Web Performance": "badge-primary",
  "Automatisation & IA": "badge-secondary",
  WordPress: "badge-accent",
};

const BUTTON_CLASSES: Record<string, string> = {
  "Web Performance": "btn-primary",
  "Automatisation & IA": "btn-secondary",
  WordPress: "btn-accent",
  "Projet web": "btn-neutral",
};

export function categoryBadgeClass(category: string): string {
  return BADGE_CLASSES[category] ?? "badge-neutral";
}

export function categoryButtonClass(category: string): string {
  return BUTTON_CLASSES[category] ?? "btn-primary";
}
