"use client";

import { useState } from "react";
import { AppleCardsCarousel, AppleCardItem } from "@/components/AppleCardsCarousel";
import { WebsiteCarousel, WebsiteItem } from "@/components/WebsiteCarousel";
import { Button } from "@/components/ui/button";
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
      <div className="px-6 pt-8 md:pt-12 pb-16 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The <span className="text-orange-500">Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto font-light">
            Explore our collection of innovative projects and creative solutions that showcase our expertise in design and development.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsConsultationOpen(true)}
          >
            Book Consultation
          </Button>
        </div>
        <AppleCardsCarousel items={mobileAppItems} />
      </div>
      
      {/* Website Screenshots Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <WebsiteCarousel items={websiteItems} />
      </section>

      {/* Consultation Modal */}
      <ConsultationForm 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}


