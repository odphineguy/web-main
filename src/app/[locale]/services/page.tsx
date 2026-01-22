"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Palette, Smartphone, Globe, Bot, Languages, ArrowRight } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import { FooterCTA } from "@/components/ui/footer-cta";

import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('Services');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const services = [
    {
      id: "aiChatbots",
      icon: <Bot className="h-8 w-8" />,
      image: "/images/services/ai-chatbots-agents.png",
      link: "/services/ai-chatbots",
    },
    {
      id: "bilingualWeb",
      icon: <Languages className="h-8 w-8" />,
      image: "/images/services/bilingual-web-development.png",
      link: "/services/bilingual-web-development",
    },
    {
      id: "webDev",
      icon: <Globe className="h-8 w-8" />,
      image: "/images/services/web-development.png",
    },
    {
      id: "mobileApp",
      icon: <Smartphone className="h-8 w-8" />,
      image: "/images/services/mobile-app-development.png",
    },
    {
      id: "uiUx",
      icon: <Palette className="h-8 w-8" />,
      image: "/images/services/ui-ux-design.png",
    },
    {
      id: "brandIdentity",
      icon: <Palette className="h-8 w-8" />,
      image: "/images/services/brand-identity.png",
      link: "/services/brand-identity",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black pt-8 md:pt-12 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-medium tracking-[-0.02em] mb-6 text-gray-900 dark:text-white">
            {t('Hero.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{t('Hero.highlight')}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('Hero.subtitle')}
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
                          alt={t(`Cards.${service.id}.title`)}
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
                            {t(`Cards.${service.id}.placeholder`)}
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-orange-600 group-hover:rotate-3">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg md:text-xl font-medium tracking-[-0.02em] text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      {t(`Cards.${service.id}.title`)}
                      {service.link && <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                      {t(`Cards.${service.id}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['f1', 'f2', 'f3', 'f4'].map((featureKey, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <CheckCircle className="h-4 w-4 text-gray-400 dark:text-neutral-500 flex-shrink-0 group-hover:text-orange-500 transition-colors duration-300" />
                          <span className="text-sm leading-relaxed text-gray-600 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                            {t(`Cards.${service.id}.features.${featureKey}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {service.link && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                        <span className="text-sm font-medium text-orange-500 group-hover:text-orange-600 flex items-center gap-1">
                          {t('CTA.link')} <ArrowRight className="h-3 w-3" />
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
      <section className="bg-gray-100 dark:bg-neutral-900 px-6 py-20">
        <FooterCTA
          heading={t('CTA.title')}
          subtext={t('CTA.description')}
          buttonText="SCHEDULE A CALL"
          onButtonClick={() => setIsConsultationOpen(true)}
          metaPill="No obligation"
          metaText="Replies within 1 business day"
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
