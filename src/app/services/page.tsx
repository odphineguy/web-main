"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Palette, Smartphone, Globe, Zap, Bot, Sparkles } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Development",
    description: "Custom websites built with modern technologies like Next.js, React, and TypeScript.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Fast Loading Times",
      "Cross-Browser Compatibility"
    ],
    placeholderLabel: "Website preview coming soon",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "React Native Development",
      "iOS & Android Apps",
      "App Store Optimization",
      "Push Notifications"
    ],
    placeholderLabel: "Mobile app preview coming soon",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive user interfaces that enhance user experience.",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing"
    ],
    placeholderLabel: "Design mockups coming soon",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Custom Solutions",
    description: "Tailored software solutions to meet your specific business needs.",
    features: [
      "API Development",
      "Database Design",
      "Third-party Integrations",
      "Maintenance & Support"
    ],
    placeholderLabel: "Custom integration preview coming soon",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience.",
    features: [
      "Code Optimization",
      "Image Optimization",
      "Caching Strategies",
      "Performance Monitoring"
    ],
    placeholderLabel: "Performance metrics coming soon",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Chatbots & Agents",
    description: "Custom AI assistants tailored to your brand voice and customer needs.",
    features: [
      "Business-specific chatbot development",
      "Training and fine-tuning AI agents",
      "Bilingual support in English & Spanish",
      "Integrations with your existing tools"
    ],
    placeholderLabel: "AI assistant preview coming soon",
  }
];

const testimonials = [
  {
    quote: "Abe Media delivered a beautiful site and a bilingual chatbot that now handles 70% of our inbound questions.",
    name: "Lucía Hernández",
    role: "Founder, Casa Verde",
  },
  {
    quote: "Their team trained AI agents that feel like real teammates—our response time is faster than ever.",
    name: "Daniel Ortiz",
    role: "Operations Lead, MetroFit",
  },
  {
    quote: "We launched in weeks with a polished product and smarter support automation. Clients rave about the experience.",
    name: "Rebecca Collins",
    role: "CEO, Summit Legal",
  },
];

export default function Services() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="pt-8 md:pt-12 pb-12 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto font-light">
            We provide comprehensive design and development services to bring your digital vision to life.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsConsultationOpen(true)}
          >
            Book Consultation
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 h-40 w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-orange-600 dark:text-orange-300 text-center px-4">
                      {service.placeholderLabel}
                    </span>
                  </div>
                  <div className="text-orange-500 mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-orange-500" />
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-orange-500">Client Voices</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: index * 0.4, repeatType: "loop" }}
                  className="relative flex-1 rounded-3xl border border-orange-500/20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur px-6 py-8 shadow-sm"
                >
                  <div className="absolute -top-4 left-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                      <Sparkles className="h-4 w-4" />
                      Testimonial
                    </span>
                  </div>
                  <blockquote className="mt-6 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
