import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, AlertTriangle } from "lucide-react";

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
};

export default function Toast({
  message,
  type = "info",
  position = "bottom-end",
  onClose,
  visible = true,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!message) return null;

  // DaisyUI toast position classes
  const positionClass = `toast toast-${position}`;

  // DaisyUI alert variants based on type
  const alertTypeClass = `alert alert-${type}`;

  // Icon selection based on type
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6" />;
      case "error":
        return <XCircle className="h-6 w-6" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6" />;
      case "info":
      default:
        return <AlertCircle className="h-6 w-6" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={positionClass}>
      <div className={`${alertTypeClass} shadow-lg`}>
        <div className="flex items-start gap-2">
          {getIcon()}
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="btn btn-sm btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
