"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Connect data & tools",
    description: "Give Agents the right sources, apps and APIs for their tasks.",
    image: "/images/home/step1.png",
  },
  {
    id: 2,
    title: "Test and Validate",
    description: "Agents do end-to-end tests so you can trust their work.",
    image: "/images/home/step2.png",
  },
  {
    id: 3,
    title: "Rollout",
    description: "Deploy agents to your customers or internal teams.",
    image: "/images/home/step3.png",
  },
  {
    id: 4,
    title: "Monitor & Improve",
    description: "Monitor and improve agents with intelligent reporting.",
    image: "/images/home/step4.png",
  },
];

export default function PartnerSteps() {
  return (
    <section className="bg-white dark:bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              ENTERPRISE SOLUTIONS FOR SMALL BUSINESS
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            How Abe Media{" "}
            <span className="text-orange-500">partners</span> with you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            We provide ready-to-deploy AI Agents that integrate with your existing tools to automate workflows and drive growth for your business.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line - Desktop (LG screens only) */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] w-[75%] h-6 z-0 -translate-y-1/2">
             <div className="flex justify-between items-center w-full h-full">
                 <Image src="/images/home/line-orange.svg" alt="" width={200} height={6} className="w-full opacity-60" />
                 <Image src="/images/home/line-orange.svg" alt="" width={200} height={6} className="w-full opacity-60" />
                 <Image src="/images/home/line-orange.svg" alt="" width={200} height={6} className="w-full opacity-60" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6 w-fit mx-auto">
                  {/* Image Container with light blue/gray background shape */}
                  <div className="w-48 h-40 bg-orange-50 dark:bg-orange-900/10 rounded-[2rem] flex items-center justify-center p-6 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={96}
                      height={96}
                      className="object-contain relative z-10"
                    />
                    {/* Decorative blurred background blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-200/50 dark:bg-orange-500/20 rounded-full blur-2xl" />
                  </div>
                  
                  {/* Number Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                    className="absolute bottom-3 left-8 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-4 ring-white dark:ring-black z-20 transition-colors duration-300"
                  >
                    {step.id}
                  </motion.div>
                </div>

                <div className="mt-4 px-2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
