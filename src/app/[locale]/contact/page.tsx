"use client";

import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FooterCTANewsletter } from "@/components/ui/footer-cta";

export default function ContactPage() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Contact Section */}
      <section id="book-consultation" className="bg-background pt-8 md:pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-6 text-foreground">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              Let&apos;s discuss your custom chatbot solutions. We&apos;re here to help.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column - Contact Form */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 h-full shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="bg-gray-50 dark:bg-neutral-950 rounded-2xl p-8 h-full">
                <h2 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-foreground mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 h-full shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="bg-gray-50 dark:bg-neutral-950 rounded-2xl p-8 h-full flex flex-col">
                <h2 className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-foreground mb-6">Contact Information</h2>
                
                <div className="space-y-5 mb-8">
                  {/* Email */}
                  <a
                    href="mailto:abe@abemedia.online"
                    className="flex items-center gap-4 text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-border flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                      <Mail className="w-5 h-5 text-orange-500" />
                    </div>
                    <span>abe@abemedia.online</span>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+16264814827" 
                    className="flex items-center gap-4 text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-border flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <span>626-481-4827</span>
                      <p className="text-sm md:text-base font-normal leading-relaxed text-muted-foreground">(Mon-Fri, 9am-5pm PST)</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800/50 border border-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p>1951 W Camelback Rd #269,</p>
                      <p>Phoenix, AZ 85015</p>
                    </div>
                  </div>
                </div>

                {/* Map Image */}
                <div className="mt-auto rounded-xl overflow-hidden border border-border/50">
                  <Image
                    src="/images/home/map.png"
                    alt="Office Location Map"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover brightness-110 dark:brightness-125"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-center">
            <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/home/abe-fire.png"
                alt="Abe - Founder"
                fill
                className="object-cover"
                sizes="280px"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {t("Founder.badge")}
              </span>
              <h2 className="text-[28px] md:text-[32px] font-medium tracking-[-0.02em] text-foreground">
                {t("Founder.title")}
              </h2>
              <p className="text-muted-foreground">{t("Founder.p1")}</p>
              <p className="text-muted-foreground">{t("Founder.p2")}</p>
              <p className="text-foreground font-medium">{t("Founder.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-20">
        <FooterCTANewsletter
          heading="Stay Updated"
          subtext="Subscribe to our newsletter for the latest insights, tutorials, and resources on web development and digital marketing."
          inputPlaceholder="my@email.com"
          buttonText="JOIN NEWSLETTER"
        />
      </section>
    </div>
  );
}
