"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type WebsiteItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
};

type WebsiteCarouselProps = {
  items: WebsiteItem[];
};

export function WebsiteCarousel({ items }: WebsiteCarouselProps) {
  return (
    <section className="w-full max-w-6xl mx-auto">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id} className="basis-full">
              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="rounded-xl border border-border bg-card text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden group"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-2 text-base text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export type { WebsiteItem };

