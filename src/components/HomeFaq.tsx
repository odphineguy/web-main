"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const faqIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

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

        {/* Questions on the right */}
        <div className="w-full">
          <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {faqIds.map((id) => (
              <AccordionPrimitive.Item
                key={id}
                value={id}
                className="border-b border-border last:border-b-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base md:text-lg font-normal text-foreground hover:no-underline transition-all outline-none">
                    <span className="pr-4 flex-1">
                      {t(`${id}.question`)}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-5 text-muted-foreground">
                    {t(`${id}.answer`)}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}
