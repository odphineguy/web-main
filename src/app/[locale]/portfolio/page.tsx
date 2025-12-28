"use client";

import { useState } from "react";
import Link from "next/link";
import { AppleCardsCarousel, AppleCardItem } from "@/components/AppleCardsCarousel";
import { WebsiteCarousel, WebsiteItem } from "@/components/WebsiteCarousel";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import { Awards } from "@/components/ui/award";
import ConsultationForm from "@/components/ConsultationForm";
import { ArrowRight } from "lucide-react";

const mobileAppItems: AppleCardItem[] = [
  {
    id: "1",
    title: "Agua App",
    description: "Hydration and heath tracker",
    imageSrc: "/images/portfolio/agua-app-carousel.png",
    imageAlt: "Agua app screenshot",
  },
  {
    id: "2",
    title: "Booker App",
    description: "Haircut booking app",
    imageSrc: "/images/portfolio/booker-app-carousel.png",
    imageAlt: "Booker app screenshot",
  },
  {
    id: "3",
    title: "Tacos and Slopes",
    description: "Restaurant ordering app",
    imageSrc: "/images/portfolio/tacos-slopes-carousel.png",
    imageAlt: "Tacos and Slopes app screenshot",
  },
  {
    id: "4",
    title: "Mi Sueno App",
    description: "A dream interpretation app",
    imageSrc: "/images/portfolio/mi-sueno-carousel.png",
    imageAlt: "Mi Sueno app screenshot",
  },
];

const websiteItems: WebsiteItem[] = [
  {
    id: "web-1",
    title: "Barbershop Website",
    description: "Modern barbershop website design",
    imageSrc: "/images/portfolio/barbershop-website.png",
    imageAlt: "Barbershop website screenshot",
  },
  {
    id: "web-2",
    title: "Green Website",
    description: "Eco-friendly website design",
    imageSrc: "/images/portfolio/green-website.png",
    imageAlt: "Green website screenshot",
  },
  {
    id: "web-3",
    title: "InAction Website",
    description: "Professional business website",
    imageSrc: "/images/portfolio/inaction-website-hero.png",
    imageAlt: "InAction website screenshot",
  },
  {
    id: "web-4",
    title: "Paisanos Website",
    description: "Restaurant website design",
    imageSrc: "/images/portfolio/paisanos-website.png",
    imageAlt: "Paisanos website screenshot",
  },
  {
    id: "web-5",
    title: "Smart Website",
    description: "Innovative smart solutions website",
    imageSrc: "/images/portfolio/smart-website.png",
    imageAlt: "Smart website screenshot",
  },
  {
    id: "web-6",
    title: "Solar Website",
    description: "Solar energy company website",
    imageSrc: "/images/portfolio/solar-website.png",
    imageAlt: "Solar website screenshot",
  },
  {
    id: "web-7",
    title: "Yummy Website",
    description: "Food & restaurant website",
    imageSrc: "/images/portfolio/yummy-website.png",
    imageAlt: "Yummy website screenshot",
  },
];

export default function PortfolioPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-white dark:bg-black px-6 pt-8 md:pt-12 pb-16 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto font-light">
            Explore our collection of innovative projects and creative solutions that showcase our expertise in design and development.
          </p>
          <ScheduleCallButton
            onClick={() => setIsConsultationOpen(true)}
            className="mx-auto"
          />
        </div>
        <AppleCardsCarousel items={mobileAppItems} />
      </section>
      
      {/* Website Screenshots Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <WebsiteCarousel items={websiteItems} />
      </section>

      {/* Award Section */}
      <section className="bg-white dark:bg-black px-6 py-16">
        <div className="flex justify-center">
          <Awards
            variant="award"
            title="WINNER"
            subtitle="A Design Award & Competition"
            recipient="AbeMedia"
            date="June 2025"
            level="gold"
          />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Case{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Studies
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* myLabCompliance Case Study */}
            <Link
              href="/portfolio/mylabcompliance"
              className="group block p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                B2B SaaS
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                myLabCompliance.io
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mb-4">
                From critical SEO failures to excellent performance. 95% bug reduction, 500 SEO pages, and 981ms load time.
              </p>
              <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                Read Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
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
