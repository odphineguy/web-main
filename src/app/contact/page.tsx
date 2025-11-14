import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get Your Free Consultation | Abe Media",
  description: "Get in touch with Abe Media for bilingual web development, AI chatbot solutions, and custom digital tools for your small business. Free 30-minute strategy call available.",
  keywords: ["contact abe media", "web development consultation", "small business website consultation", "AI chatbot consultation", "bilingual website consultation"],
  alternates: {
    canonical: "https://abemedia.online/contact",
  },
  openGraph: {
    title: "Contact Us — Get Your Free Consultation | Abe Media",
    description: "Get in touch with Abe Media for bilingual web development, AI chatbot solutions, and custom digital tools for your small business.",
    url: "https://abemedia.online/contact",
  },
  twitter: {
    title: "Contact Us — Get Your Free Consultation | Abe Media",
    description: "Get in touch with Abe Media for bilingual web development, AI chatbot solutions, and custom digital tools for your small business.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-foreground">

      {/* Contact Form Section */}
      <section className="pt-8 md:pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Send us a <span className="text-orange-500">Message</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          {/* Empty placeholder section */}
        </div>
      </section>
    </div>
  );
}


