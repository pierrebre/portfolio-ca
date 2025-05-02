import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (
    data: FormSchemaType
  ) => {
    console.log(data);
    reset();
  };

  return (
    <div className="card bg-base-100 border-base-content/10 border">
      <div className="card-body">
        <h2 className="card-title text-2xl">Send a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className="input w-full"
                {...register("firstName")}
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="input w-full"
                {...register("lastName")}
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </div>
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>Message</label>
            <textarea
              placeholder="Your message here..."
              {...register("message")}
            ></textarea>
            {errors.message && <span>{errors.message.message}</span>}
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
