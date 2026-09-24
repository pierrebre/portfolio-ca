import { useRef, useState } from "react";
import AuditForm from "./audit-form";
import { AUDIT_DIALOG_ID } from "./audit-button";
import { FREE_AUDIT } from "data/pricing";
import { useHydrated } from "~/hooks/use-hydrated";

export default function AuditModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Nouvelle clé à chaque fermeture : le formulaire repart vide à la réouverture.
  const [formKey, setFormKey] = useState(0);
  const close = () => dialogRef.current?.close();
  // Rendue seulement côté client : elle ne sert qu'avec JavaScript (sinon
  // AuditButton mène à /contact) et son texte n'a rien à faire dans le HTML
  // de chaque page indexée.
  const hydrated = useHydrated();
  if (!hydrated) return null;

  return (
    <dialog
      ref={dialogRef}
      id={AUDIT_DIALOG_ID}
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby="audit-modal-title"
      aria-describedby="audit-modal-desc"
      onClose={() => setFormKey((k) => k + 1)}
    >
      <div className="modal-box relative">
        <h2 id="audit-modal-title" className="font-bold text-lg">
          Demande d'audit gratuit
        </h2>
        <p id="audit-modal-desc" className="py-2">
          {FREE_AUDIT.summary} {FREE_AUDIT.reply}
        </p>
        <AuditForm
          key={formKey}
          onClose={close}
          getSource={() => dialogRef.current?.dataset.source}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>fermer</button>
      </form>
    </dialog>
  );
}
