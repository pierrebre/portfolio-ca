import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postToApi } from "~/lib/api";
import { useToast } from "~/context/toast-context";
import FormField from "./form-field";
import { HoneypotField, NoScriptNotice } from "./form-guard";
import { useHydrated } from "~/hooks/use-hydrated";
import { FREE_AUDIT } from "data/pricing";

const auditFormSchema = z.object({
  websiteUrl: z
    .string()
    .url({ message: "Une URL de site Web valide est requise" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  additionalInfo: z.string().optional(),
  company: z.string().optional(), // champ piège
});

type AuditFormType = z.infer<typeof auditFormSchema>;

type AuditFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function AuditForm({ onSuccess, onCancel }: AuditFormProps) {
  const { showToast } = useToast();
  const hydrated = useHydrated();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuditFormType>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      websiteUrl: "",
      email: "",
      additionalInfo: "",
      company: "",
    },
  });

  const onSubmit: SubmitHandler<AuditFormType> = async ({ company, ...data }) => {
    const success = "Votre demande d'audit a été soumise avec succès !";
    // Robot : on simule un succès sans rien envoyer
    if (company) {
      showToast(success, "success");
      reset();
      onSuccess();
      return;
    }
    try {
      await postToApi("/request-audit", data);
      showToast(success, "success");
      reset();
      onSuccess();
    } catch (err: unknown) {
      showToast((err as Error).message, "error");
    }
  };

  return (
    // noValidate / method="post" : voir ContactForm.
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative mt-4 space-y-4"
    >
      <HoneypotField registration={register("company")} />
      <FormField id="audit-website-url" label="URL du site Web" error={errors.websiteUrl?.message}>
        {(field) => (
          <input
            {...field}
            type="url"
            autoComplete="url"
            placeholder="https://exemple.com"
            className="input input-md w-full"
            {...register("websiteUrl")}
          />
        )}
      </FormField>

      <FormField id="audit-email" label="Courriel" error={errors.email?.message}>
        {(field) => (
          <input
            {...field}
            type="email"
            autoComplete="email"
            placeholder="courriel@exemple.com"
            className="input input-md w-full"
            {...register("email")}
          />
        )}
      </FormField>

      <FormField id="audit-additional-info" label="Informations supplémentaires (optionnel)">
        {(field) => (
          <textarea
            {...field}
            placeholder="Informations supplémentaires..."
            className="textarea textarea-md w-full"
            {...register("additionalInfo")}
          />
        )}
      </FormField>

      <NoScriptNotice />
      <div className="modal-action flex justify-between">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          // Désactivé avant l'hydratation (voir ContactForm)
          disabled={!hydrated || isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : FREE_AUDIT.cta}
        </button>
      </div>
    </form>
  );
}
