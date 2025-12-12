import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      {/* Contact Section */}
      <section id="book-consultation" className="bg-white dark:bg-black pt-8 md:pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto font-light">
              Let&apos;s discuss your custom chatbot solutions. We&apos;re here to help.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column - Contact Form */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 h-full">
              <div className="bg-gray-50 dark:bg-neutral-950 rounded-2xl p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 h-full">
              <div className="bg-gray-50 dark:bg-neutral-950 rounded-2xl p-8 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                
                <div className="space-y-5 mb-8">
                  {/* Email */}
                  <a 
                    href="mailto:support@abemedia.online" 
                    className="flex items-center gap-4 text-gray-600 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-gray-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                      <Mail className="w-5 h-5 text-orange-500" />
                    </div>
                    <span>support@abemedia.online</span>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+16264814827" 
                    className="flex items-center gap-4 text-gray-600 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-gray-300 dark:border-neutral-700 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <span>626-481-4827</span>
                      <p className="text-sm text-gray-500 dark:text-neutral-500">(Mon-Fri, 9am-5pm PST)</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 text-gray-600 dark:text-neutral-300">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-gray-300 dark:border-neutral-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p>1951 W Camelback Rd #269,</p>
                      <p>Phoenix, AZ 85015</p>
                    </div>
                  </div>
                </div>

                {/* Map Image */}
                <div className="mt-auto rounded-xl overflow-hidden border border-gray-300 dark:border-neutral-700/50">
                  <Image
                    src="/images/home/map.png"
                    alt="Office Location Map"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
            <div className="bg-white dark:bg-neutral-950 rounded-2xl p-8 lg:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Stay Updated
              </h2>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                Subscribe to our newsletter for the latest insights, tutorials, and resources on web development and digital marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3.5 rounded-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
