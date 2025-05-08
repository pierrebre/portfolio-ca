import { useState } from "react";
import AuditForm from "./audit-form";
import Toast from "~/components/toast";

export default function AuditModal() {
  const [toastState, setToastState] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleFormSubmitResult = (
    success: boolean,
    message: string,
    closeModal: boolean = true
  ) => {
    setToastState({
      visible: true,
      message:
        message ||
        (success
          ? "Your audit request has been submitted successfully!"
          : "Failed to submit your audit request. Please try again."),
      type: success ? "success" : "error",
    });

    // If successful and closeModal is true, close the modal after a short delay
    if (success && closeModal) {
      setTimeout(() => {
        const modal = document.getElementById("audit_modal");
        if (modal) {
          (modal as HTMLDialogElement).close();
        }
      }, 2000); // 2 seconds delay to show the success message
    }
  };

  const closeToast = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <dialog id="audit_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <h3 className="font-bold text-lg">Request a Free Audit</h3>
        <p className="py-2">
          Fill out the form below to request a free website audit.
        </p>
        <AuditForm onSubmitResult={handleFormSubmitResult} />

        {toastState.visible && (
          <div className="absolute top-4 right-4 left-4">
            <Toast
              message={toastState.message}
              type={toastState.type}
              visible={toastState.visible}
              onClose={closeToast}
              position="top"
            />
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
