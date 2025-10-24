"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroParallax() {
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 400], [0, -40]);
  const ySubtitle = useTransform(scrollY, [0, 400], [0, -80]);
  const yCardsBack = useTransform(scrollY, [0, 400], [0, -120]);
  const yCardsFront = useTransform(scrollY, [0, 400], [0, -200]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <motion.h1 style={{ y: yTitle, opacity: opacityFade }} className="text-5xl font-bold tracking-tight">
          Designing delightful mobile experiences
        </motion.h1>
        <motion.p style={{ y: ySubtitle, opacity: opacityFade }} className="mt-4 text-lg text-white/70 max-w-2xl">
          Product design, interaction, and prototypes. Selected work below.
        </motion.p>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        <motion.div style={{ y: yCardsBack }} className="absolute left-10 top-24 hidden md:block">
          <div className="h-40 w-72 rounded-xl bg-white/10" />
        </motion.div>
        <motion.div style={{ y: yCardsFront }} className="absolute right-16 top-12 hidden lg:block">
          <div className="h-56 w-96 rounded-xl bg-white/10" />
        </motion.div>
        <motion.div style={{ y: yCardsBack }} className="absolute left-1/2 top-48 -translate-x-1/2 hidden sm:block">
          <div className="h-32 w-80 rounded-xl bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}


