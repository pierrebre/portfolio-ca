import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postToApi } from "~/lib/api";
import { useToast } from "~/context/toast-context";
import FormField from "./form-field";
import { HoneypotField, NoScriptNotice, PrivacyNotice } from "./form-guard";
import { useHydrated } from "~/hooks/use-hydrated";

const contactformSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  message: z.string().min(1, { message: "Le message est requis" }),
  company: z.string().optional(), // champ piège
});

type FormSchemaType = z.infer<typeof contactformSchema>;

export default function ContactForm() {
  const { showToast } = useToast();
  const hydrated = useHydrated();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(contactformSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      company: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ company, ...data }) => {
    const success = "Ton message a bien été envoyé !";
    // Robot : on simule un succès sans rien envoyer
    if (company) {
      showToast(success, "success");
      reset();
      return;
    }
    try {
      await postToApi("/send-email", data);
      showToast(success, "success");
      reset();
    } catch (err: unknown) {
      showToast((err as Error).message, "error");
    }
  };

  return (
    // noValidate : les messages de validation (zod, en français) remplacent
    // les bulles natives du navigateur. method="post" : si le formulaire
    // partait quand même sans JS, les données ne finiraient pas dans l'URL.
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative mt-6 space-y-6"
    >
      <HoneypotField registration={register("company")} />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="contact-first-name" label="Prénom" error={errors.firstName?.message}>
          {(field) => (
            <input
              {...field}
              type="text"
              autoComplete="given-name"
              placeholder="Jean"
              className="input input-md w-full"
              {...register("firstName")}
            />
          )}
        </FormField>
        <FormField id="contact-last-name" label="Nom de famille" error={errors.lastName?.message}>
          {(field) => (
            <input
              {...field}
              type="text"
              autoComplete="family-name"
              placeholder="Dupont"
              className="input input-md w-full"
              {...register("lastName")}
            />
          )}
        </FormField>
      </div>

      <FormField id="contact-email" label="Courriel" error={errors.email?.message}>
        {(field) => (
          <input
            {...field}
            type="email"
            autoComplete="email"
            placeholder="jean.dupont@example.com"
            className="input input-md w-full"
            {...register("email")}
          />
        )}
      </FormField>

      <FormField id="contact-message" label="Message" error={errors.message?.message}>
        {(field) => (
          <textarea
            {...field}
            placeholder="Ton message ici…"
            className="textarea textarea-md w-full"
            {...register("message")}
          />
        )}
      </FormField>

      <NoScriptNotice />
      <PrivacyNotice />
      <button
        type="submit"
        className="btn btn-primary w-full"
        // Désactivé avant l'hydratation : sinon l'envoi natif contourne la
        // validation et l'API.
        disabled={!hydrated || isSubmitting}
      >
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
