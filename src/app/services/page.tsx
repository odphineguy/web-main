"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Palette, Smartphone, Globe, Zap, Bot, Languages, ArrowRight } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

const services = [
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Chatbots & Agents",
    description: "Custom AI assistants tailored to your brand voice and customer needs.",
    features: [
      "24/7 customer support automation",
      "Lead capture and qualification",
      "Bilingual support in English & Spanish",
      "CRM and tool integrations"
    ],
    image: "/images/services/ai-chatbots-agents.png",
    placeholderLabel: "AI assistant preview coming soon",
    link: "/services/ai-chatbots",
  },
  {
    icon: <Languages className="h-8 w-8" />,
    title: "Bilingual Web Development",
    description: "Spanish-English websites that reach diverse audiences and expand your market.",
    features: [
      "Full Spanish & English versions",
      "Professional translation",
      "SEO for both languages",
      "Seamless language switching"
    ],
    image: "/images/services/bilingual-web-development.png",
    placeholderLabel: "Bilingual site preview coming soon",
    link: "/services/bilingual-web-development",
  },
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
    image: "/images/services/web-development.png",
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
    image: "/images/services/mobile-app-development.png",
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
    image: "/images/services/ui-ux-design.png",
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
    image: "/images/services/custom-solutions.png",
    placeholderLabel: "Custom integration preview coming soon",
  },
];

export default function Services() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black pt-8 md:pt-12 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto font-light">
            We provide comprehensive design and development services to bring your digital vision to life.
          </p>
          <ScheduleCallButton 
            onClick={() => setIsConsultationOpen(true)}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const cardContent = (
                <Card 
                  className={`group relative overflow-hidden border border-gray-200 dark:border-neutral-800 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 ease-out hover:-translate-y-2 bg-white dark:bg-neutral-950 h-full ${service.link ? "cursor-pointer" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/20 group-hover:border-orange-500/40 transition-all duration-300">
                      {service.image && !imageErrors.has(index) ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={() => {
                            setImageErrors(prev => new Set(prev).add(index));
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-sm font-semibold text-orange-600 dark:text-orange-300 text-center px-4">
                            {service.placeholderLabel}
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-orange-600 group-hover:rotate-3">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      {service.title}
                      {service.link && <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 dark:text-neutral-400">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <CheckCircle className="h-4 w-4 text-gray-400 dark:text-neutral-500 flex-shrink-0 group-hover:text-orange-500 transition-colors duration-300" />
                          <span className="text-sm text-gray-600 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {service.link && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                        <span className="text-sm font-semibold text-orange-500 group-hover:text-orange-600 flex items-center gap-1">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    )}
                  </CardContent>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                </Card>
              );

              return service.link ? (
                <Link key={index} href={service.link} className="block">
                  {cardContent}
                </Link>
              ) : (
                <div key={index}>{cardContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white dark:bg-black px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5">
            <div className="rounded-2xl p-8 lg:p-10 bg-gray-50 dark:bg-neutral-950">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                Let&apos;s discuss how we can help bring your digital vision to life with our expertise.
              </p>
              <ScheduleCallButton
                onClick={() => setIsConsultationOpen(true)}
                className="mx-auto"
              />
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
