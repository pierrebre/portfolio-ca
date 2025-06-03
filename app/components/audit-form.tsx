import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const auditFormSchema = z.object({
  websiteUrl: z
    .string()
    .url({ message: "Une URL de site Web valide est requise" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  additionalInfo: z.string().optional(),
});

type AuditFormType = z.infer<typeof auditFormSchema>;

type AuditFormProps = {
  onSubmitResult?: (
    success: boolean,
    message: string,
    closeModal?: boolean
  ) => void;
};

export default function AuditForm({ onSubmitResult }: AuditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<AuditFormType>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteUrl: "",
      email: "",
      additionalInfo: "",
    },
  });

  const onSubmit: SubmitHandler<AuditFormType> = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/request-audit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            websiteUrl: data.websiteUrl,
            email: data.email,
            additionalInfo: data.additionalInfo,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (onSubmitResult) {
          onSubmitResult(
            false,
            errorData.error ?? "Une erreur s'est produite",
            false
          );
        }
        throw new Error(errorData.error ?? "Une erreur s'est produite");
      }

      if (onSubmitResult) {
        onSubmitResult(
          true,
          "Votre demande d'audit a été soumise avec succès !",
          true
        );
      }

      reset();
    } catch (err: any) {
      console.error(err);
      if (onSubmitResult) {
        onSubmitResult(
          false,
          err.message || "Échec de la soumission de votre demande d'audit",
          false
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <div>
        <label className="floating-label">
          <input
            type="url"
            placeholder="https://exemple.com"
            className="input input-md w-full"
            {...register("websiteUrl")}
          />
          <span className="">URL du site Web</span>
        </label>
        {errors.websiteUrl && (
          <span className="text-error text-sm">
            {errors.websiteUrl.message}
          </span>
        )}
      </div>

      <div>
        <label className="floating-label">
          <input
            type="email"
            placeholder="courriel@exemple.com"
            className="input input-md w-full"
            {...register("email")}
          />
          <span className="">Courriel</span>
        </label>
        {errors.email && (
          <span className="text-error text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="floating-label">
          <textarea
            placeholder="Informations supplémentaires..."
            className="textarea textarea-md w-full"
            {...register("additionalInfo")}
          />
          <span className="">Informations supplémentaires (optionnel)</span>
        </label>
      </div>

      <div className="modal-action flex justify-between">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            const modal = document.getElementById("audit_modal");
            if (modal) {
              (modal as HTMLDialogElement).close();
            }
          }}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Demander un audit"}
        </button>
      </div>
    </form>
  );
}
