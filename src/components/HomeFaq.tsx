"use client";

import { useTranslations } from "next-intl";
import { FaqAccordion } from "@/components/FaqAccordion";

export const homeFaqIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default function HomeFaq() {
  const t = useTranslations("Home.Faq");

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-24 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16">
        {/* Heading on the left */}
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {t("title")}
          </h2>
        </div>

        <FaqAccordion
          items={homeFaqIds.map((id) => ({
            key: id,
            question: t(`${id}.question`),
            answer: t(`${id}.answer`),
          }))}
        />
      </div>
    </section>
  );
}
