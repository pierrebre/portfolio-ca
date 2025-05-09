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
          ? "Your message has been sent successfully!"
          : "Failed to send your message. Please try again."),
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
        <h3 className="font-bold text-lg">Request a Free Audit</h3>
        <p className="py-2">
          Fill out the form below to request a free website audit.
        </p>
        <AuditForm onSubmitResult={handleFormSubmitResult} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
