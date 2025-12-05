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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 pt-8 md:pt-12 pb-16 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-3xl mx-auto font-light">
            Explore our collection of innovative projects and creative solutions that showcase our expertise in design and development.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
            onClick={() => setIsConsultationOpen(true)}
          >
            Book Consultation
          </Button>
        </div>
        <AppleCardsCarousel items={mobileAppItems} />
      </div>
      
      {/* Website Screenshots Section */}
      <section className="relative z-10 py-16 px-6">
        <WebsiteCarousel items={websiteItems} />
      </section>

      {/* Bottom CTA Section */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto mt-4 text-center">
          <div className="rounded-2xl p-px bg-gradient-to-b from-white/10 to-white/5">
            <div className="rounded-2xl p-8 lg:p-10 bg-black">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Like What You See?
              </h2>
              <p className="text-neutral-400 mb-6">
                Let&apos;s create something amazing together. Book a consultation to discuss your project.
              </p>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                Start Your Project
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


