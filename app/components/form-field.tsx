import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  /** Reçoit les attributs à poser sur le champ : id et liaison à l'erreur. */
  children: (fieldProps: {
    id: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }) => ReactNode;
}

/** Champ à label flottant (DaisyUI) avec message d'erreur annoncé. */
export default function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="floating-label">
        {children({
          id,
          ...(error ? { "aria-invalid": true, "aria-describedby": errorId } : {}),
        })}
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="text-red-700 dark:text-red-400 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
