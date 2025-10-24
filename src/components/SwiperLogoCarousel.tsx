"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface SwiperLogoCarouselProps {
  images: CarouselImage[];
}

export default function SwiperLogoCarousel({ images }: SwiperLogoCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
      const swiperSlideElements = Array.from(
        document.querySelectorAll(".swiper-logo-carousel .swiper-slide")
      );
      if (!swiperSlideElements.length) return;
      const width = swiperSlideElements[0].getBoundingClientRect().width;
      // Changed from 16:9 to 4:3 for better logo display (more square)
      const height = Math.round(width / (4 / 3));
      swiperSlideElements.forEach((element) => {
        (element as HTMLElement).style.height = `${height}px`;
      });
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <div className="swiper-logo-carousel w-full h-full">
      <style jsx global>{`
        .swiper-logo-carousel .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-logo-carousel .swiper-wrapper {
          display: flex;
          align-items: center;
        }

        .swiper-logo-carousel .swiper-slide {
          scale: 1.25;
          transition: scale 250ms ease-in-out;
        }

        .swiper-logo-carousel .swiper-slide-active {
          scale: 2;
          z-index: 10;
        }

        .swiper-logo-carousel .swiper-slide-prev,
        .swiper-logo-carousel .swiper-slide-next {
          scale: 1.7;
          z-index: 5;
          transition-duration: 150ms;
        }

        .swiper-logo-carousel .swiper-slide-next + .swiper-slide {
          z-index: 2;
        }

        .swiper-logo-carousel .swiper-slide img {
          display: block;
          border-radius: 0.5rem;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          background: transparent;
        }

        .swiper-logo-carousel .swiper-button-prev,
        .swiper-logo-carousel .swiper-button-next {
          background-color: #f04e23;
          height: 3rem;
          width: 3rem;
          border-radius: 0.5rem;
        }

        .swiper-logo-carousel .swiper-button-prev {
          left: 17%;
        }

        .swiper-logo-carousel .swiper-button-next {
          right: 17%;
        }

        .swiper-logo-carousel .swiper-button-prev:hover,
        .swiper-logo-carousel .swiper-button-next:hover {
          background-color: #4a261f;
        }

        .swiper-logo-carousel .swiper-button-prev::after,
        .swiper-logo-carousel .swiper-button-next::after {
          font-size: 1.5rem;
          color: white;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .swiper-logo-carousel .swiper-button-prev {
            left: 5%;
          }

          .swiper-logo-carousel .swiper-button-next {
            right: 5%;
          }
        }

        @media (max-width: 768px) {
          .swiper-logo-carousel .swiper-button-prev,
          .swiper-logo-carousel .swiper-button-next {
            height: 2.5rem;
            width: 2.5rem;
          }

          .swiper-logo-carousel .swiper-button-prev::after,
          .swiper-logo-carousel .swiper-button-next::after {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        simulateTouch={typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)}
        navigation={{
          nextEl: ".swiper-logo-carousel .swiper-button-next",
          prevEl: ".swiper-logo-carousel .swiper-button-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
        <div className="swiper-button swiper-button-next"></div>
        <div className="swiper-button swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}

