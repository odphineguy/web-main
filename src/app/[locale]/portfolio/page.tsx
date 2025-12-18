"use client";

import { useState } from "react";
import { AppleCardsCarousel, AppleCardItem } from "@/components/AppleCardsCarousel";
import { WebsiteCarousel, WebsiteItem } from "@/components/WebsiteCarousel";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";
import { Awards } from "@/components/ui/award";
import ConsultationForm from "@/components/ConsultationForm";

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

      {/* Consultation Modal */}
      <ConsultationForm 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}
