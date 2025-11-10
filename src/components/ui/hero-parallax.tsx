"use client";
import React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { Button } from "@/components/ui/button";


export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  // Separate rows by filename convention: "-carousel" (tall apps) vs "-website" (wide)
  const firstRow = products.filter((p) => p.thumbnail.includes("-carousel"));
  const secondRow = products.filter((p) => p.thumbnail.includes("-website"));
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              size="tall"
              key={`${product.title}-${index}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              size="wide"
              key={`${product.title}-${index}`}
            />
          ))}
        </motion.div>
        {/* Third row removed intentionally for a 2-row layout */}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold dark:text-white">
        Big business <span className="text-orange-500">tools</span> <br /> built for your small <span className="text-orange-500">business</span>.
      </h1>
      <p className="max-w-2xl text-lg md:text-2xl mt-8 dark:text-neutral-200">
        You deserve tools that make your business look professional — without paying “big agency” prices.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/contact">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base md:text-lg">
            Let&apos;s Talk
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  size = "wide",
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  size?: "tall" | "wide";
}) => {
  const containerClass = size === "tall" ? "h-96 w-48" : "h-96 w-[28rem]";
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className={`group/product ${containerClass} relative shrink-0`}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-contain bg-black/20 absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-0 bg-transparent pointer-events-none"></div>
    </motion.div>
  );
};
