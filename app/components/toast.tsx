import { CheckCircle, XCircle, AlertCircle, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  message: string;
  type: ToastType;
  duration: number;
  onClose: () => void;
};

// Classes écrites en entier : Tailwind ne génère pas les classes construites
// dynamiquement (`alert-${type}`), qui seraient absentes du CSS final.
const ALERT_CLASSES: Record<ToastType, string> = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
  info: "alert-info",
};

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  error: <XCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  info: <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
};

export default function Toast({ message, type, duration, onClose }: ToastProps) {
  return (
    // Une erreur est annoncée immédiatement (alert), le reste poliment (status).
    <div
      className="toast toast-bottom toast-end z-50"
      role={type === "error" ? "alert" : "status"}
    >
      <div className={`alert ${ALERT_CLASSES[type]} relative overflow-hidden pr-10 shadow-lg max-w-sm`}>
        {ICONS[type]}
        <span className="font-medium text-sm">{message}</span>
        <button
          onClick={onClose}
          className="btn btn-xs btn-ghost absolute top-2 right-2"
          aria-label="Fermer la notification"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        {/* Barre de progression auto-dismiss */}
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-current opacity-40 toast-progress"
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
