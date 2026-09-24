import type { MouseEvent, ReactNode } from "react";
import { Link } from "react-router";
import { FREE_AUDIT } from "data/pricing";

export const AUDIT_DIALOG_ID = "audit_modal";

interface AuditButtonProps {
  className?: string;
  children?: ReactNode;
  /** Appelé avant l'ouverture (ex. fermer le menu mobile). */
  onClick?: () => void;
  /** Emplacement du bouton, transmis avec la demande (ex. « accueil-haut »). */
  source?: string;
}

/**
 * Appel à l'action principal du site : ouvre la fenêtre de demande d'audit
 * (AuditModal, rendue une fois dans root.tsx). Sans JavaScript, avant
 * l'hydratation ou en clic modifié (nouvel onglet), c'est un lien vers /contact.
 */
export default function AuditButton({
  className,
  children = FREE_AUDIT.cta,
  onClick,
  source,
}: AuditButtonProps) {
  const openDialog = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const dialog = document.getElementById(AUDIT_DIALOG_ID);
    if (dialog instanceof HTMLDialogElement) {
      e.preventDefault();
      dialog.dataset.source = [window.location.pathname, source].filter(Boolean).join(" · ");
      dialog.showModal();
    }
  };

  return (
    <Link to="/contact" className={className} aria-haspopup="dialog" onClick={openDialog}>
      {children}
    </Link>
  );
}
