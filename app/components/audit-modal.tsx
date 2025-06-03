import { useToast } from "~/context/toast-context";
import AuditForm from "./audit-form";

export default function AuditModal() {
  const { showToast } = useToast();

  const handleFormSubmitResult = (
    success: boolean,
    message: string,
    closeModal: boolean = true
  ) => {
    showToast(
      message ??
        (success
          ? "Votre message a été envoyé avec succès !"
          : "Échec de l'envoi de votre message. Veuillez réessayer."),
      success ? "success" : "error"
    );

    if (success && closeModal) {
      setTimeout(() => {
        const modal = document.getElementById("audit_modal");
        if (modal) {
          (modal as HTMLDialogElement).close();
        }
      }, 1000);
    }
  };

  return (
    <dialog id="audit_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <h3 className="font-bold text-lg">Demander un audit gratuit</h3>
        <p className="py-2">
          Remplissez le formulaire ci-dessous pour demander un audit gratuit de
          votre site Web.
        </p>
        <AuditForm onSubmitResult={handleFormSubmitResult} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>fermer</button>
      </form>
    </dialog>
  );
}
