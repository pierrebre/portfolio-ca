import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postToApi } from "~/lib/api";
import { useToast } from "~/context/toast-context";
import FormField from "./form-field";

const contactformSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  message: z.string().min(1, { message: "Le message est requis" }),
});

type FormSchemaType = z.infer<typeof contactformSchema>;

export default function ContactForm() {
  const { showToast } = useToast();
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
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await postToApi("/send-email", data);
      showToast("Votre message a été envoyé avec succès !", "success");
      reset();
    } catch (err: unknown) {
      showToast((err as Error).message, "error");
    }
  };

  return (
    // noValidate : les messages de validation (zod, en français) remplacent
    // les bulles natives du navigateur.
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-6">
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
            placeholder="Votre message ici..."
            className="textarea textarea-md w-full"
            {...register("message")}
          />
        )}
      </FormField>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
