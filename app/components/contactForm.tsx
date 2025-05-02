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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label>First Name</label>
            <input type="text" placeholder="John" {...register("firstName")} />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Doe" {...register("lastName")} />
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
  );
}
