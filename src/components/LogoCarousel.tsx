"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface LogoCarouselProps {
  images: CarouselImage[];
}

export default function LogoCarousel({ images }: LogoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.scrollWidth / images.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.scrollWidth / images.length;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollPrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const scrollNext = () => {
    if (currentIndex < images.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      <button
        onClick={scrollNext}
        disabled={currentIndex === images.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="group relative flex-shrink-0 w-96 h-80 overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-4"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay with text - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:translate-y-0 translate-y-4 transition-transform duration-300 delay-100">
                    {image.title}
                  </h3>
                  <p className="text-sm opacity-90 group-hover:translate-y-0 translate-y-4 transition-transform duration-300 delay-200">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Subtle border effect on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      {/* Thin Slider Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            onClick={() => {
              if (carouselRef.current) {
                const cardWidth = carouselRef.current.scrollWidth / images.length;
                carouselRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
