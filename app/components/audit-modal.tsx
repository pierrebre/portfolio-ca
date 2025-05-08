import { useForm, type SubmitHandler } from "react-hook-form";
import AuditForm from "./audit-form";

export default function AuditModal() {
  return (
    <dialog id="audit_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Request a Free Audit</h3>
        <p className="py-2">
          Fill out the form below to request a free website audit.
        </p>
        <AuditForm />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
