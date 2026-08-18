"use client";

import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageShell, { Reveal } from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";

const RAIL = [
  { id: "book-consultation", label: "Get in touch" },
  { id: "founder", label: "Founder" },
];

export default function ContactPage() {
  const t = useTranslations("Home");
  return (
    <PageShell railCap="CONTACT" railItems={RAIL}>
      <div id="book-consultation">
        <PageHero
          title={
            <>
              Get in <span className="text-[var(--ds-accent)]">Touch</span>
            </>
          }
          lede="Tell us how your operation works—and where it gets stuck. We’ll help you map the right automation, software, or AI system."
        />

        <div className="grid items-stretch gap-px bg-[var(--ds-line-soft)] lg:grid-cols-2">
          {/* Contact Form */}
          <Reveal index={0} className="h-full">
            <div className="flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] p-8">
              <h3 className="mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </Reveal>

          {/* Contact Information */}
          <Reveal index={1} className="h-full">
            <div className="flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] p-8">
              <h3 className="mb-6">Contact Information</h3>

              <div className="mb-8 space-y-5">
                {/* Email */}
                <a
                  href="mailto:abe@abemedia.online"
                  className="group flex items-center gap-4 text-[var(--ds-ink-mute)] transition-colors hover:text-[var(--ds-accent)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[var(--ds-line)] transition-colors group-hover:border-[var(--ds-accent)]">
                    <Mail className="h-5 w-5 text-[var(--ds-accent)]" />
                  </div>
                  <span>abe@abemedia.online</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+12138452704"
                  className="group flex items-center gap-4 text-[var(--ds-ink-mute)] transition-colors hover:text-[var(--ds-accent)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[var(--ds-line)] transition-colors group-hover:border-[var(--ds-accent)]">
                    <Phone className="h-5 w-5 text-[var(--ds-accent)]" />
                  </div>
                  <div>
                    <span>(213) 845-2704</span>
                    <p className="ds-meta mt-1">(Mon-Fri, 9am-5pm PST)</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 text-[var(--ds-ink-mute)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--ds-line)]">
                    <MapPin className="h-5 w-5 text-[var(--ds-accent)]" />
                  </div>
                  <div>
                    <p>2026 W Colter St,</p>
                    <p>Phoenix, AZ 85015</p>
                  </div>
                </div>
              </div>

              {/* Map Image */}
              <div className="mt-auto overflow-hidden border border-[var(--ds-line-soft)]">
                <Image
                  src="/images/home/map.png"
                  alt="Office Location Map"
                  width={500}
                  height={300}
                  className="h-auto w-full object-cover brightness-110 dark:brightness-125"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Founder story */}
      <Section id="founder" bleed>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <Reveal index={0}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden border border-[var(--ds-line)] md:mx-0">
              <Image
                src="/images/home/abe-fire.png"
                alt="Abe - Founder"
                fill
                className="object-cover"
                sizes="280px"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="space-y-4">
              <h2>{t("Founder.title")}</h2>
              <p className="text-[var(--ds-ink-mute)]">{t("Founder.p1")}</p>
              <p className="text-[var(--ds-ink-mute)]">{t("Founder.p2")}</p>
              <p className="font-medium">{t("Founder.p3")}</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
