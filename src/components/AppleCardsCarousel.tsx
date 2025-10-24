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

type CardItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
};

type AppleCardsCarouselProps = {
  items: CardItem[];
};

export function AppleCardsCarousel({ items }: AppleCardsCarouselProps) {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.article
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="rounded-xl border border-border bg-card text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden group"
              >
                <div className="relative aspect-[9/19] w-[85%] mx-auto">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
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

export type { CardItem as AppleCardItem };


