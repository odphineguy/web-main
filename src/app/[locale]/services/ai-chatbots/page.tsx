"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ConsultationForm from "@/components/ConsultationForm";
import {
  Bot,
  MessageSquare,
  Users,
  Clock,
  Globe,
  Scale,
  Heart,
  Home,
  ShoppingCart,
  Briefcase,
  Phone,
  Headphones,
  Calendar,
  Mail,
  CreditCard,
  Link2,
  Check,
  HelpCircle,
  BarChart3,
  Paintbrush,
  Smartphone,
  Shield,
  Settings,
  Brain,
  ArrowRight,
} from "lucide-react";

const ChatDemoShowcase = dynamic(
  () => import("@/components/demos/ChatDemoShowcase"),
  { ssr: false }
);

const chatbotCapabilities = [
  {
    icon: MessageSquare,
    title: "Answer Customer Questions Instantly",
    items: [
      "Common FAQs about your products or services",
      "Business hours, location, and contact information",
      "Pricing and service details",
      "Appointment scheduling",
    ],
  },
  {
    icon: Users,
    title: "Qualify and Capture Leads",
    items: [
      "Ask the right questions to identify serious buyers",
      "Collect contact information automatically",
      "Route hot leads to your sales team",
      "Follow up with interested prospects",
    ],
  },
  {
    icon: Clock,
    title: "Work Around the Clock",
    description:
      "Your chatbot handles inquiries 24/7, even when your office is closed. Never miss a potential customer again.",
  },
  {
    icon: Globe,
    title: "Speak Multiple Languages",
    description:
      "Our chatbots can communicate in English and Spanish, serving your entire customer base.",
  },
];

const industries = [
  {
    icon: Scale,
    name: "Law Firms",
    features: [
      "Screen potential clients before consultation",
      "Answer common legal questions",
      "Schedule appointments with attorneys",
      "Collect case details upfront",
    ],
    keywords: "AI legal chatbot, law firm lead capture, attorney client intake automation",
  },
  {
    icon: Heart,
    name: "Healthcare & Medical Practices",
    features: [
      "Schedule patient appointments",
      "Provide office hours and location info",
      "Answer insurance questions",
      "Send appointment reminders",
    ],
  },
  {
    icon: Home,
    name: "Real Estate",
    features: [
      "Qualify home buyers and sellers",
      "Provide property information",
      "Schedule showings automatically",
      "Capture buyer preferences",
    ],
  },
  {
    icon: ShoppingCart,
    name: "E-commerce & Retail",
    features: [
      "Help customers find products",
      "Track orders and shipments",
      "Process returns and exchanges",
      "Upsell related products",
    ],
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    features: [
      "Answer service questions",
      "Provide quotes and estimates",
      "Book consultations",
      "Explain your process",
    ],
  },
];

const integrations = [
  { icon: Users, name: "CRM Systems", tools: "Salesforce, HubSpot, Zoho" },
  { icon: Mail, name: "Email Platforms", tools: "Mailchimp, Constant Contact" },
  { icon: Calendar, name: "Calendar Tools", tools: "Google Calendar, Calendly" },
  { icon: Headphones, name: "Live Chat", tools: "Transfer to human agents when needed" },
  { icon: CreditCard, name: "Payment Systems", tools: "Stripe, PayPal for instant payments" },
  { icon: Phone, name: "Phone Systems", tools: "Send SMS or call notifications" },
];

const features = [
  { icon: MessageSquare, text: "Natural conversation flow" },
  { icon: Brain, text: "Learns from interactions" },
  { icon: Paintbrush, text: "Customizable personality and tone" },
  { icon: Link2, text: "Branded to match your website" },
  { icon: BarChart3, text: "Analytics and reporting dashboard" },
  { icon: Settings, text: "Easy updates without coding" },
  { icon: Shield, text: "HIPAA compliant options available" },
  { icon: Smartphone, text: "Mobile-friendly design" },
];

const processSteps = [
  { title: "Discovery Call", description: "We learn about your business and customer needs" },
  { title: "Custom Design", description: "Build conversation flows specific to your services" },
  { title: "Integration", description: "Connect with your CRM and tools" },
  { title: "Training", description: "Load your business information and FAQs" },
  { title: "Testing", description: "Refine responses based on real scenarios" },
  { title: "Launch", description: "Deploy on your website" },
  { title: "Optimize", description: "Monitor and improve based on data" },
];

const whyChooseUs = [
  "Custom-built for your specific business needs",
  "No generic templates or one-size-fits-all solutions",
  "Seamless integration with your existing systems",
  "Ongoing optimization included",
  "Small business pricing without enterprise complexity",
  "Personal support from our team",
];

const faqs = [
  {
    question: "Will the chatbot replace my staff?",
    answer:
      "No, it handles repetitive questions so your team can focus on complex customer needs.",
  },
  {
    question: "How long does setup take?",
    answer: "Most chatbots are live within 2-3 weeks.",
  },
  {
    question: "Can I update it myself?",
    answer:
      "Yes, we provide an easy dashboard for common updates, plus we handle complex changes.",
  },
  {
    question: "What if a customer needs a human?",
    answer:
      "The chatbot can transfer to live chat or collect info for your team to follow up.",
  },
];

export default function AIChatbots() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black pt-8 md:pt-16 pb-16 lg:pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              AI-Powered Solutions
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6 leading-tight">
              Custom AI Chatbot{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 mb-4">
              24/7 Customer Support That Never Sleeps
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your customer service with a custom AI chatbot designed specifically for
              your business. Answer questions instantly, qualify leads automatically, and free up
              your team to focus on high-value tasks.
            </p>
            <Button
              size="lg"
              className="text-sm px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              onClick={() => setIsConsultationOpen(true)}
            >
              Get Free Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What Our Chatbots Do */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              What Our Chatbots Do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chatbotCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 hover:from-orange-500/30 hover:to-orange-600/10">
                  <div className="h-full rounded-2xl p-6 lg:p-8 bg-white dark:bg-neutral-950">
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                      <capability.icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
                      {capability.title}
                    </h3>
                    {capability.items ? (
                      <ul className="space-y-3">
                        {capability.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{capability.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Showcase */}
      <ChatDemoShowcase onCtaClick={() => setIsConsultationOpen(true)} />

      {/* Industry-Specific Solutions */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Industry-Specific Solutions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() =>
                    setExpandedIndustry(expandedIndustry === index ? null : index)
                  }
                  className="w-full rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 hover:from-orange-500/30 hover:to-orange-600/10 transition-all duration-300"
                >
                  <div className="rounded-2xl p-5 bg-gray-50 dark:bg-neutral-900 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <industry.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-base md:text-lg">
                        {industry.name}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedIndustry === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>
                {expandedIndustry === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 rounded-2xl p-6 bg-gray-50 dark:bg-neutral-900 border border-orange-500/20"
                  >
                    <ul className="space-y-3 mb-4">
                      {industry.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {industry.keywords && (
                      <p className="text-xs text-gray-500 dark:text-neutral-500 italic">
                        Keywords: {industry.keywords}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Integration Options
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 leading-relaxed">
              We connect your chatbot with the tools you already use
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl p-5 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <integration.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {integration.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{integration.tools}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Features */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Chatbot Features
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-neutral-900"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line for mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-orange-500/30 lg:hidden" />

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="relative pl-16 lg:pl-0"
                >
                  {/* Mobile step number */}
                  <div className="absolute left-0 lg:relative lg:mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-medium text-sm z-10">
                    {index + 1}
                  </div>
                  <div className="lg:text-center lg:mt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                  {/* Connector line for desktop */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-orange-500/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Why Choose Our Chatbots?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-px bg-gradient-to-b from-orange-500/30 to-orange-600/10"
          >
            <div className="rounded-2xl p-8 bg-white dark:bg-neutral-950">
              <ul className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base text-gray-700 dark:text-neutral-300 leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white dark:bg-black py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl p-6 bg-gray-50 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Ready to Automate Your Customer Service?
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Get a free demo showing how a custom chatbot can work for your business.
            </p>
            <Button
              size="lg"
              className="text-sm px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              onClick={() => setIsConsultationOpen(true)}
            >
              Get Your Free Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

