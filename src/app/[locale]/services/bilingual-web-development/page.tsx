"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";
import {
  Globe,
  Smartphone,
  Search,
  Scale,
  Heart,
  Home,
  ShoppingCart,
  Briefcase,
  MessageSquare,
  Palette,
  Code,
  TestTube,
  Rocket,
  Check,
  Quote,
  Users,
  Shield,
  Clock,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "True Bilingual Websites",
    items: [
      "Full Spanish and English versions of your site",
      "Professional translation that sounds natural, not robotic",
      "Seamless language switching for visitors",
      "Proper hreflang implementation for SEO in both languages",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized Design",
    description:
      "Your bilingual site works perfectly on phones, tablets, and desktops. Spanish and English versions both load fast and look great on any device.",
  },
  {
    icon: Search,
    title: "SEO-Ready for Both Languages",
    description:
      "We optimize your site to rank in both English and Spanish search results, helping you attract customers searching in either language.",
  },
];

const industries = [
  {
    icon: Scale,
    name: "Law Firms",
    description: "Legal terminology translated accurately for Spanish-speaking clients",
  },
  {
    icon: Heart,
    name: "Healthcare Practices",
    description: "Medical information accessible in both languages",
  },
  {
    icon: Home,
    name: "Real Estate",
    description: "Property listings that reach bilingual home buyers",
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-commerce",
    description: "Online stores that serve diverse communities",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    description: "Accounting, insurance, and consulting sites",
  },
];

const processSteps = [
  { icon: MessageSquare, title: "Discovery", description: "We learn about your business and target audience" },
  { icon: Palette, title: "Design", description: "Create a modern website design that reflects your brand" },
  { icon: Code, title: "Development", description: "Build your site with clean code and bilingual functionality" },
  { icon: Globe, title: "Translation", description: "Professional translation of all content" },
  { icon: TestTube, title: "Testing", description: "Verify everything works in both languages" },
  { icon: Rocket, title: "Launch", description: "Get your bilingual site live and ranking" },
];

const technologies = [
  "Modern HTML5, CSS3, and JavaScript",
  "Responsive frameworks for mobile optimization",
  "Schema markup for better search visibility",
  "SSL security and fast hosting",
];

const whyChooseUs = [
  { icon: Users, text: "Native Spanish speakers on our team ensure accurate translations" },
  { icon: HeartHandshake, text: "We understand the cultural nuances of bilingual marketing" },
  { icon: Shield, text: "Small business focus means affordable pricing" },
  { icon: Clock, text: "Local service with personal attention" },
  { icon: Check, text: "Ongoing support available" },
];

export default function BilingualWebDevelopment() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

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
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-6">
              <Globe className="h-3.5 w-3.5" />
              Bilingual Solutions
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-6 leading-tight">
              Bilingual Web Development{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Services
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 mb-4">
              Reach More Customers with Spanish-English Websites
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Expand your business reach with a professionally designed bilingual website that speaks directly to both English and Spanish-speaking customers. Our multilingual web solutions help small businesses tap into new markets and build stronger connections with diverse audiences.
            </p>
            <Button
              size="lg"
              className="text-sm px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              onClick={() => setIsConsultationOpen(true)}
            >
              Get Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What We Build Section */}
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
              What We Build
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-2xl p-px transition-all duration-300 bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5 hover:from-orange-500/30 hover:to-orange-600/10">
                  <div className="h-full rounded-2xl p-6 lg:p-8 bg-white dark:bg-neutral-950">
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                      <feature.icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    {feature.items ? (
                      <ul className="space-y-3">
                        {feature.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
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
              Industries We Serve
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center mb-4 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                  <industry.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
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
              Our Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4 text-white font-medium">
                    {index + 1}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-orange-500/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
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
              Technologies We Use
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-px bg-gradient-to-b from-gray-200 dark:from-white/10 to-gray-100 dark:to-white/5"
          >
            <div className="rounded-2xl p-8 bg-gray-50 dark:bg-neutral-900">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Abe Media?
            </h2>
          </motion.div>

          <div className="space-y-4">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white mb-4">
              Real Results
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-px bg-gradient-to-b from-orange-500/30 to-orange-600/10"
          >
            <div className="rounded-2xl p-8 lg:p-10 bg-white dark:bg-neutral-950 text-center">
              <Quote className="w-10 h-10 text-orange-500/40 mx-auto mb-6" />
              <blockquote className="text-base md:text-lg text-gray-700 dark:text-neutral-300 mb-6 italic leading-relaxed">
                &ldquo;Their bilingual marketing strategy helped us connect with Spanish-speaking customers we&apos;d never been able to reach. Our client base has grown significantly.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="/images/testimonials/maria-b.png"
                  alt="Maria B."
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Maria B.</p>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">Real Estate Agency</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-20 px-6">
        <FooterCTA
          heading="Ready to Expand Your Reach?"
          subtext="Contact us today for a free consultation. We'll discuss your goals and show you how a bilingual website can grow your business."
          buttonText="GET FREE CONSULTATION"
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="Free consult"
          metaText="Grow your business"
        />
      </section>

      {/* Consultation Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

