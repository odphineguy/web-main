"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "q1",
    question: "Do I need to know tech?",
    answer: "No. We make it simple — we guide you the whole way.",
  },
  {
    id: "q2",
    question: "Can we start small?",
    answer: "Yes. We customize everything — we can start with just a website or just ads.",
  },
  {
    id: "q3",
    question: "What if I'm not happy?",
    answer: "Satisfaction guaranteed — if it's not right, we fix it.",
  },
];

export default function HomeFaq() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16">
        {/* Heading on the left */}
        <div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            <span className="font-sans">Frequently asked</span>
            <br />
            <span className="font-serif text-4xl md:text-5xl italic font-normal">questions</span>
          </h2>
        </div>

        {/* Questions on the right */}
        <div className="w-full">
          <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {faqs.map((item) => (
              <AccordionPrimitive.Item 
                key={item.id} 
                value={item.id}
                className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base md:text-lg font-normal text-gray-900 dark:text-gray-100 hover:no-underline transition-all outline-none">
                    <span className="pr-4 flex-1">
                      {item.question}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-5 text-muted-foreground">
                    {item.answer}
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


