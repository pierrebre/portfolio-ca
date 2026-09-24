// Classes écrites en entier (pas de `badge-${x}`) pour que Tailwind les génère.
// Une catégorie absente de ces tables retombe sur le style neutre.

const BADGE_CLASSES: Record<string, string> = {
  "Web Performance": "badge-primary",
  Automatisation: "badge-secondary",
  "Éco-conception": "badge-success",
};

const BUTTON_CLASSES: Record<string, string> = {
  "Web Performance": "btn-primary",
  Automatisation: "btn-secondary",
  "Éco-conception": "btn-success",
  Général: "btn-neutral",
};

export function categoryBadgeClass(category: string): string {
  return BADGE_CLASSES[category] ?? "badge-neutral";
}

export function categoryButtonClass(category: string): string {
  return BUTTON_CLASSES[category] ?? "btn-primary";
}
