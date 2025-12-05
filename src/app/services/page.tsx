"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Palette, Smartphone, Globe, Zap, Bot } from "lucide-react";
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
    image: "/images/services/performance-optimization.png",
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
    image: "/images/services/ai-chatbots-agents.png",
    placeholderLabel: "AI assistant preview coming soon",
  }
];

export default function Services() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 md:pt-12 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-3xl mx-auto font-light">
            We provide comprehensive design and development services to bring your digital vision to life.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
            onClick={() => setIsConsultationOpen(true)}
          >
            Book Consultation
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border border-neutral-800 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 ease-out hover:-translate-y-2 bg-neutral-900/50 backdrop-blur-sm"
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
                  <CardTitle className="text-xl group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">
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
                        <CheckCircle className="h-4 w-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0 group-hover:text-orange-500 transition-colors duration-300" />
                        <span className="text-sm group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <div className="rounded-2xl p-px bg-gradient-to-r from-white/10 via-white/5 to-white/10">
            <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-neutral-900/50">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Start Your Project?
              </h2>
              <p className="text-neutral-400 mb-6">
                Let&apos;s discuss how we can help bring your digital vision to life with our expertise.
              </p>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                Book a Consultation
              </button>
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
