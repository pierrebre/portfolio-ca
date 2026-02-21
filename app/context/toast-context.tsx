import { createContext, useContext, useState, useEffect, useRef } from "react";
import Toast, { type ToastProps } from "~/components/toast";

const TOAST_DURATION = 5000;

type ToastState = {
  visible: boolean;
  message: string;
  type: ToastProps["type"];
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastProps["type"]) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeToast = () => {
    setToast((t) => ({ ...t, visible: false }));
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showToast = (message: string, type: ToastProps["type"] = "info") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visible: true, message, type });
    timerRef.current = setTimeout(closeToast, TOAST_DURATION);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onClose={closeToast}
          position="bottom-end"
          duration={TOAST_DURATION}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider/> ❗");
  return ctx;
}
