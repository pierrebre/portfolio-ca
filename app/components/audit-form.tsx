import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { postToApi } from "~/lib/api";
import { useToast } from "~/context/toast-context";
import FormField from "./form-field";
import { HoneypotField, NoScriptNotice, PrivacyNotice } from "./form-guard";
import { useHydrated } from "~/hooks/use-hydrated";
import { FREE_AUDIT } from "data/pricing";
import { services } from "data/services";

const NEEDS = [...services.map((s) => s.name), "Je ne sais pas encore"];

const auditFormSchema = z.object({
  // Facultatif (projet neuf, automatisation) ; « monsite.ca » est accepté.
  websiteUrl: z
    .string()
    .trim()
    .transform((s) => (s && !/^https?:\/\//i.test(s) ? `https://${s}` : s))
    // Pas d'espace et un domaine avec un point : Chromium accepte « a b »
    // comme adresse (encodée), l'API la refuserait.
    .refine((s) => s === "" || (/^https?:\/\/[^\s/]+\.[^\s/]{2,}(\/\S*)?$/i.test(s) && z.string().url().safeParse(s).success), {
      message: "Vérifie l'adresse du site (ex. : monsite.ca)",
    }),
  email: z.string().trim().email({ message: "Vérifie ton adresse courriel" }),
  need: z.string().optional(),
  additionalInfo: z.string().optional(),
  company: z.string().optional(), // champ piège
});

type AuditFormInput = z.input<typeof auditFormSchema>;
type AuditFormType = z.output<typeof auditFormSchema>;

type AuditFormProps = {
  onClose: () => void;
  /** Bouton qui a ouvert la fenêtre (mesure des emplacements qui convertissent). */
  getSource: () => string | undefined;
};

export default function AuditForm({ onClose, getSource }: AuditFormProps) {
  const { showToast } = useToast();
  const hydrated = useHydrated();
  const [sent, setSent] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormInput, unknown, AuditFormType>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: { websiteUrl: "", email: "", need: "", additionalInfo: "", company: "" },
  });

  // La confirmation remplace le formulaire : le focus y va pour qu'elle soit lue.
  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  const onSubmit: SubmitHandler<AuditFormType> = async ({ company, ...data }) => {
    // Robot : on simule un succès sans rien envoyer
    if (company) return setSent(true);
    try {
      // Champs vides omis : l'API ne reçoit que ce qui est renseigné.
      const filled = Object.fromEntries(Object.entries(data).filter(([, v]) => v));
      await postToApi("/request-audit", { ...filled, source: getSource() });
      setSent(true);
    } catch (err: unknown) {
      showToast((err as Error).message, "error");
    }
  };

  if (sent) {
    return (
      <div ref={confirmationRef} tabIndex={-1} className="mt-4 outline-none" role="status">
        <p className="flex items-center gap-2 text-lg font-bold">
          <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-400" aria-hidden="true" />
          Merci, ta demande est envoyée !
        </p>
        <p className="text-base-content/80 mt-2">
          {FREE_AUDIT.reply} Surveille ta boîte de réception (et les courriels indésirables, au cas où).
        </p>
        <div className="modal-action">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    // noValidate / method="post" : voir ContactForm.
    <form method="post" onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-4 space-y-4">
      <HoneypotField registration={register("company")} />
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

      <FormField id="audit-website-url" label="Adresse de ton site (si tu en as un)" error={errors.websiteUrl?.message}>
        {(field) => (
          <input
            {...field}
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            placeholder="monsite.ca"
            className="input input-md w-full"
            {...register("websiteUrl")}
          />
        )}
      </FormField>

      <FormField id="audit-need" label="Ton besoin (facultatif)">
        {(field) => (
          <select {...field} className="select select-md w-full" {...register("need")}>
            <option value="">Choisir…</option>
            {NEEDS.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField id="audit-additional-info" label="Ton besoin en une phrase (facultatif)">
        {(field) => (
          <textarea
            {...field}
            placeholder="Ex. : mon formulaire de soumission ne fonctionne plus"
            className="textarea textarea-md w-full"
            {...register("additionalInfo")}
          />
        )}
      </FormField>

      <NoScriptNotice />
      <PrivacyNotice onNavigate={onClose} />
      <div className="modal-action flex justify-between">
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          // Désactivé avant l'hydratation (voir ContactForm)
          disabled={!hydrated || isSubmitting}
        >
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}
