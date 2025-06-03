import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactformSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  message: z.string().min(1, { message: "Le message est requis" }),
});

type FormSchemaType = z.infer<typeof contactformSchema>;

type ContactFormProps = {
  onSubmitResult?: (success: boolean, message?: string) => void;
};

export default function ContactForm({ onSubmitResult }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            message: data.message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (onSubmitResult) {
          onSubmitResult(false, errorData.error ?? "Une erreur s'est produite");
        }
        throw new Error(errorData.error ?? "Une erreur s'est produite");
      }

      if (onSubmitResult) {
        onSubmitResult(true, "Votre message a été envoyé avec succès !");
      }

      reset();
    } catch (err: any) {
      console.error(err);
      if (
        onSubmitResult &&
        !onSubmitResult.toString().includes("onSubmitResult(false")
      ) {
        onSubmitResult(
          false,
          err.message || "Échec de l'envoi de votre message"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="floating-label">
            <input
              type="text"
              placeholder="Jean"
              className="input input-md w-full"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-error text-sm">
                {errors.firstName.message}
              </span>
            )}
            <span className="">Prénom</span>
          </label>
        </div>
        <div>
          <label className="floating-label">
            <input
              type="text"
              placeholder="Dupont"
              className="input input-md w-full"
              {...register("lastName")}
            />
            <span className="">Nom de famille</span>
          </label>
          {errors.lastName && (
            <span className="text-error text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="floating-label">
          <input
            type="email"
            placeholder="jean.dupont@example.com"
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
            placeholder="Votre message ici..."
            className="textarea textarea-md w-full"
            {...register("message")}
          />
          <span className="">Message</span>
        </label>
        {errors.message && (
          <span className="text-error text-sm">{errors.message.message}</span>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
