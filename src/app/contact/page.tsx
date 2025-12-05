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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden text-foreground">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Contact Form Section */}
      <section className="relative z-10 pt-8 md:pt-12 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Send us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Message</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto font-light">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl p-px bg-gradient-to-b from-white/10 to-white/5">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <div className="rounded-2xl p-px bg-gradient-to-r from-white/10 via-white/5 to-white/10">
            <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-neutral-900/50">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                What Happens Next?
              </h2>
              <p className="text-neutral-400 mb-6">
                After you submit, we&apos;ll review your message and reach out within 24 hours to schedule a free consultation call.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-300">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700">
                  ✓ Free 30-min consultation
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700">
                  ✓ No commitment required
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700">
                  ✓ Custom quote provided
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


