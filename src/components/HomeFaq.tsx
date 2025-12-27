"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "q1",
    question: "Do I need to know tech?",
    answer: "Not at all. We handle all the technical stuff — from design to development to launch. We guide you through every step and explain things in plain language. You focus on your business, we handle the tech.",
  },
  {
    id: "q2",
    question: "Can we start small?",
    answer: "Absolutely. We offer flexible packages starting at $499 for a custom AI chatbot. You can start with just a website, just a chatbot, or combine services as your business grows. No pressure to buy everything at once.",
  },
  {
    id: "q3",
    question: "What if I'm not happy?",
    answer: "Satisfaction guaranteed — if something isn't right, we fix it. We believe in building long-term relationships, not one-time transactions. Your success is our success.",
  },
  {
    id: "q4",
    question: "Do you offer bilingual websites and chatbots?",
    answer: "Yes! Bilingual (English & Spanish) support is one of our specialties. We build websites, chatbots, and marketing materials that speak to both English and Spanish-speaking audiences — helping you reach more customers.",
  },
  {
    id: "q5",
    question: "How long does it take to build a website?",
    answer: "Most projects launch within 2-4 weeks depending on complexity. A simple website can be ready in as little as 1-2 weeks, while larger projects with custom features may take 4-6 weeks. We'll give you a clear timeline during our consultation.",
  },
  {
    id: "q6",
    question: "What's included in your AI chatbot?",
    answer: "Our chatbots include custom training on your business, 24/7 automated lead capture, email integration, and basic analytics. They can answer FAQs, book appointments, and qualify leads — all in English and Spanish if needed.",
  },
  {
    id: "q7",
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes. We offer ongoing support packages to keep your website and chatbots running smoothly. This includes updates, security patches, content changes, and performance monitoring. We're here for the long haul.",
  },
  {
    id: "q8",
    question: "What industries do you work with?",
    answer: "We work with small businesses across many industries — restaurants, barbershops, law firms, real estate, healthcare, retail, and more. If you serve customers and want to look professional online, we can help.",
  },
  {
    id: "q9",
    question: "How much does a website cost?",
    answer: "Our Business Web & AI Chatbot package is $1,499, which includes a custom website (up to 5 pages), AI chatbot, basic SEO, and 30-day support. For more advanced needs, our Professional Web & App package at $3,500 includes custom design, SEO optimization, advanced chatbot integration, CMS, and priority support.",
  },
  {
    id: "q10",
    question: "How do I get started?",
    answer: "Easy! Book a free 30-minute strategy call with us. We'll discuss your goals, answer your questions, and create a custom plan for your business. No commitment required — just a friendly conversation about how we can help.",
  },
];

export default function HomeFaq() {
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-24 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-16">
        {/* Heading on the left */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* Questions on the right */}
        <div className="w-full">
          <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {faqs.map((item) => (
              <AccordionPrimitive.Item 
                key={item.id} 
                value={item.id}
                className="border-b border-gray-200 dark:border-neutral-800 last:border-b-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base md:text-lg font-normal text-gray-900 dark:text-neutral-100 hover:no-underline transition-all outline-none">
                    <span className="pr-4 flex-1">
                      {item.question}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-neutral-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-5 text-gray-600 dark:text-neutral-400">
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
