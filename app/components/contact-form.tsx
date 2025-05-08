import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactformSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
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
          onSubmitResult(false, errorData.error ?? "An error occurred");
        }
        throw new Error(errorData.error ?? "An error occurred");
      }

      // Notify parent component about successful submission
      if (onSubmitResult) {
        onSubmitResult(true, "Your message has been sent successfully!");
      }

      reset();
    } catch (err: any) {
      console.error(err);
      if (
        onSubmitResult &&
        !onSubmitResult.toString().includes("onSubmitResult(false")
      ) {
        onSubmitResult(false, err.message || "Failed to send your message");
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
              placeholder="John"
              className="input input-md w-full"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-error text-sm">
                {errors.firstName.message}
              </span>
            )}
            <span className="">First Name</span>
          </label>
        </div>
        <div>
          <label className="floating-label">
            <input
              type="text"
              placeholder="Doe"
              className="input input-md w-full"
              {...register("lastName")}
            />
            <span className="">Last Name</span>
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
            placeholder="john.doe@example.com"
            className="input input-md w-full"
            {...register("email")}
          />
          <span className="">Email</span>
        </label>
        {errors.email && (
          <span className="text-error text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="floating-label">
          <textarea
            placeholder="Your message here..."
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
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
