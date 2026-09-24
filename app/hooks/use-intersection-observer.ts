import { useEffect, useRef } from "react";

// Hors du composant : un objet littéral en valeur par défaut serait recréé à
// chaque rendu et relancerait l'effet (dépendance [options]).
const DEFAULT_OPTIONS: IntersectionObserverInit = { threshold: 0.15 };

/**
 * Observes elements with the given selector inside the container and adds
 * `is-visible` once they enter the viewport.  Works with the CSS classes
 * `animate-on-scroll` and `animate-on-scroll-fade` defined in app.css.
 *
 * @param selector - CSS selector for animated children (default ".animate-on-scroll, .animate-on-scroll-fade")
 * @param options  - IntersectionObserver options (threshold, rootMargin…)
 */
export function useIntersectionObserver(
  selector = ".animate-on-scroll, .animate-on-scroll-fade",
  options: IntersectionObserverInit = DEFAULT_OPTIONS
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const targets = container.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, options]);

  return containerRef;
}
