import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const auditFormSchema = z.object({
  websiteUrl: z.string().url({ message: "Valid website URL is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  additionalInfo: z.string().optional(),
});

type AuditFormType = z.infer<typeof auditFormSchema>;

export default function AuditForm() {
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
        throw new Error(errorData.error ?? "An error occurred");
      }

      reset();

      const modal = document.getElementById("audit_modal");
      if (modal) {
        (modal as HTMLDialogElement).close();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <div>
        <label className="floating-label">
          <input
            type="url"
            placeholder="https://example.com"
            className="input input-md w-full"
            {...register("websiteUrl")}
          />
          <span className="">Website URL</span>
        </label>
        {errors.websiteUrl && (
          <span className="text-red-500 text-sm">
            {errors.websiteUrl.message}
          </span>
        )}
      </div>

      <div>
        <label className="floating-label">
          <input
            type="email"
            placeholder="email@example.com"
            className="input input-md w-full"
            {...register("email")}
          />
          <span className="">Email</span>
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="floating-label">
          <textarea
            placeholder="Additional information..."
            className="textarea textarea-md w-full"
            {...register("additionalInfo")}
          />
          <span className="">Additional Information (Optional)</span>
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
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Request Audit"}
        </button>
      </div>
    </form>
  );
}
