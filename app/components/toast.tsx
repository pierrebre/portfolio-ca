import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, AlertTriangle, X } from "lucide-react";

export type ToastProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "middle"
    | "middle-start"
    | "middle-end";
  onClose?: () => void;
  visible?: boolean;
  duration?: number;
};

const ICONS: Record<NonNullable<ToastProps["type"]>, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  error: <XCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  info: <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
};

export default function Toast({
  message,
  type = "info",
  position = "bottom-end",
  onClose,
  visible = true,
  duration = 5000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!message || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className={`toast toast-${position} z-50`} role="alert" aria-live="polite">
      <div className={`alert alert-${type} relative overflow-hidden pr-10 shadow-lg max-w-sm`}>
        {ICONS[type]}
        <span className="font-medium text-sm">{message}</span>
        <button
          onClick={handleClose}
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
