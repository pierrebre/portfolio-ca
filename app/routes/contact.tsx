import ContactForm from "~/components/contact-form";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "~/context/toast-context";

export default function Contact() {
  const { showToast } = useToast();

  const handleFormSubmitResult = (success: boolean, message?: string) => {
    showToast(
      message ??
        (success
          ? "Your message has been sent successfully!"
          : "Failed to send your message. Please try again."),
      success ? "success" : "error"
    );
  };

  return (
    <div className="bg-base-100 font-urbanist mx-auto max-w-7xl">
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="bg-primary h-px w-16" />
            <span className="text-primary">Get in Touch</span>
            <div className="bg-primary h-px w-16" />
          </div>
          <p className="text-base-content/80 mt-6 text-lg md:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
            mollitia!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="card-title text-2xl">Contact Information</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Global Headquarters</h3>
                  <p className="text-base-content/80 mt-1">
                    123 Innovation Boulevard
                    <br />
                    Montréal, QC HXX 1X1
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-base-content/80 mt-1">
                    +1 (514) 123-4567
                    <br />
                    24/7 Technical Support
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-base-content/80 mt-1">
                    contact@pierrebarbe.ca
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-medium">Office Hours</h3>
                  <p className="text-base-content/80 mt-1">
                    Monday - Friday: 9AM - 6PM
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 border-base-content/10 border">
            <div className="card-body">
              <h2 className="card-title text-2xl">A project? A message?</h2>
              <ContactForm onSubmitResult={handleFormSubmitResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
