import { useEffect, type RefObject } from "react";

/**
 * Ferme un élément déroulant ouvert avec Échap (le focus revient au bouton
 * déclencheur) ou par un clic/tap en dehors de son conteneur.
 */
export function useDismiss(
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  containerRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, setIsOpen, containerRef, triggerRef]);
}
