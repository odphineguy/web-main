"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SwiperLogoCarousel from "@/components/SwiperLogoCarousel";
import { 
  CheckCircle, 
  Play,
  Sparkles
} from "lucide-react";
import { useState } from "react";

export default function LogoMaker() {
  const [brandName, setBrandName] = useState("");

  const carouselImages = [
    {
      src: "/images/logo-maker/bloos.png",
      alt: "Bloos Logo Design",
      title: "Bloos Brand Identity",
      description: "Modern logo design with custom typography and color palette"
    },
    {
      src: "/images/logo-maker/chico.png",
      alt: "Chico Logo Design", 
      title: "Chico Brand Kit",
      description: "Complete brand identity with logo, colors, and typography"
    },
    {
      src: "/images/logo-maker/magnet.png",
      alt: "Magnet Logo Design",
      title: "Magnet Brand Identity", 
      description: "Professional logo with unique visual elements and modern styling"
    },
    {
      src: "/images/logo-maker/wav.jpeg",
      alt: "Wav Logo Design",
      title: "Wav Brand Identity",
      description: "Creative logo design with wave-inspired elements and modern aesthetics"
    }
  ];

  const sliderImages = [
    {
      src: "/images/slider/avanti.png",
      alt: "Avanti Logo Design",
      title: "Avanti Brand Identity",
      description: "Professional logo design with clean typography and modern styling"
    },
    {
      src: "/images/slider/paranoid.png",
      alt: "Paranoid Logo Design",
      title: "Paranoid Brand Kit",
      description: "Bold logo design with striking visual elements and contemporary feel"
    },
    {
      src: "/images/slider/prolinea.jpeg",
      alt: "Prolinea Logo Design",
      title: "Prolinea Brand Identity",
      description: "Corporate logo design with professional typography and clean aesthetics"
    },
    {
      src: "/images/slider/sunshine.png",
      alt: "Sunshine Logo Design",
      title: "Sunshine Brand Kit",
      description: "Bright and energetic logo design with vibrant colors and modern styling"
    },
    {
      src: "/images/slider/tebinork.png",
      alt: "Tebinork Logo Design",
      title: "Tebinork Brand Identity",
      description: "Tech-focused logo design with innovative visual elements and modern appeal"
    },
    {
      src: "/images/slider/volkga.png",
      alt: "Volkga Logo Design",
      title: "Volkga Brand Kit",
      description: "Strong logo design with bold typography and distinctive visual identity"
    },
    {
      src: "/images/slider/zain.png",
      alt: "Zain Logo Design",
      title: "Zain Brand Identity",
      description: "Elegant logo design with sophisticated typography and refined aesthetics"
    },
    {
      src: "/images/slider/zunga.png",
      alt: "Zunga Logo Design",
      title: "Zunga Brand Kit",
      description: "Creative logo design with unique visual elements and modern styling"
    }
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="pt-8 md:pt-12 pb-8 md:pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mt-2 pb-3 leading-tight tracking-tighter text-left" style={{ fontWeight: 900 }}>
            Logo Maker by <span className="text-orange-500">Abe Media</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 font-light text-left">
            Comes with a real Brand Kit inspired by AI.
          </p>
          
          {/* Mojomox-style 3D Search Bar - Full Width */}
          <div className="relative mb-16 max-w-7xl mx-auto px-6 mt-12">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-full shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] p-3 md:p-2 border border-gray-200 dark:border-neutral-700 transform hover:scale-[1.005] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.9)] transition-all duration-300">
              <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white dark:bg-neutral-900 rounded-3xl md:rounded-full overflow-hidden gap-3 md:gap-0">
                <div className="flex-1 px-6 md:px-8 py-4 md:py-5 border-2 md:border-0 border-gray-200 dark:border-neutral-700 rounded-full md:rounded-none">
                  <input
                    type="text"
                    id="brandname"
                    name="brand"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    autoComplete="off"
                    maxLength={40}
                    autoFocus
                    className="w-full bg-transparent border-0 outline-none text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Type a brand name. Coming soon..."
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 md:px-10 lg:px-14 py-6 md:py-7 lg:py-8 rounded-full shadow-[0_8px_25px_rgba(250,129,48,0.4)] hover:shadow-[0_12px_35px_rgba(250,129,48,0.5)] transform hover:scale-105 transition-all duration-300 text-lg md:text-xl lg:text-2xl whitespace-nowrap md:mr-2 mx-3 md:mx-0"
                >
                  Show Me Logo Ideas →
                  <Sparkles className="ml-2 h-5 w-5 md:h-6 w-6 lg:h-7 w-7" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What is Logo Maker */}
      <section className="py-12 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What it is</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A modern logo maker for startups and small businesses. Type your brand name and see unique logos with custom fonts, colors, and icons.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Who it&apos;s for</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                DIY creators and designers who need fast results. Great for new brands, rebrands, or quick prototypes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why it&apos;s different</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Exclusive in-house typefaces and icons. Unlimited edits included so your logo can evolve with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Examples Carousel */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto text-center px-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Fonts That Don&apos;t Look Like It&apos;s 2015
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
            See real examples of professional fonts created with our logo maker.
          </p>
        </div>
        <div className="w-full">
          <SwiperLogoCarousel images={carouselImages} />
        </div>
      </section>

      {/* Second Carousel - Slider Images */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto text-center px-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            More Font Examples
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
            Additional professional font designs showcasing our logo maker capabilities
          </p>
        </div>
        <div className="w-full">
          <SwiperLogoCarousel images={sliderImages} />
        </div>
      </section>


      {/* Screen Recording Demo */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              See it in action
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
              Watch how easy it is to create a professional logo in minutes
            </p>
          </div>
          
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="h-8 w-8 text-neutral-700 dark:text-neutral-200" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Logo Maker Demo</h3>
                <p className="text-gray-400">Click to watch the full demo</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light mb-12">
            One price, everything included. No subscriptions, no hidden fees.
          </p>
          
          <Card className="max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-3xl">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-4">$49</div>
              <CardTitle className="text-xl mb-4">Complete Logo Package</CardTitle>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited logo variations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>High-res PNG, SVG, PDF files</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Complete brand kit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited edits forever</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Commercial usage rights</span>
                </li>
              </ul>
              <Button size="lg" className="w-full text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Big Text Bubble with Orange Button */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight tracking-tight">
            Design Your Brand Like You Really Want
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto font-light">
            Create professional logos with custom fonts, colors, and icons. 
            Get a complete brand kit that makes your business look amazing.
          </p>
          <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-neutral-900 rounded-full p-1.5 mb-8 flex items-center">
            <input
              type="text"
              placeholder="Type Something Cool"
              className="flex-1 px-6 py-4 bg-transparent text-lg outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <Button 
              size="lg" 
              className="text-base px-8 py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Show Me Logo Ideas →
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          {/* Empty placeholder section */}
        </div>
      </section>
    </div>
  );
}
