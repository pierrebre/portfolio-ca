import { useRef } from "react";
import AuditForm from "./audit-form";

export default function AuditModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      id="audit_modal"
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby="audit-modal-title"
      aria-describedby="audit-modal-desc"
    >
      <div className="modal-box relative">
        <h2 id="audit-modal-title" className="font-bold text-lg">
          Demander un audit gratuit
        </h2>
        <p id="audit-modal-desc" className="py-2">
          Remplissez le formulaire ci-dessous pour demander un audit gratuit de
          votre site Web.
        </p>
        {/* Laisse le temps de voir la confirmation avant de fermer */}
        <AuditForm onSuccess={() => setTimeout(close, 1000)} onCancel={close} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>fermer</button>
      </form>
    </dialog>
  );
}
