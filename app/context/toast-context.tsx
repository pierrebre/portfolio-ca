import { createContext, useContext, useState } from "react";
import Toast, { type ToastProps } from "~/components/toast";

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

  const showToast = (message: string, type: ToastProps["type"] = "info") =>
    setToast({ visible: true, message, type });

  const closeToast = () => setToast((t) => ({ ...t, visible: false }));

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onClose={closeToast}
          position="bottom-end" // always bottom‑right
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
