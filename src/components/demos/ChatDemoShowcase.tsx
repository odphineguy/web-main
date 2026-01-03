"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ChatDemoWindow from "./ChatDemoWindow";
import { industryDemos, industryConversations } from "./chatDemoData";
import { cn } from "@/lib/utils";

interface ChatDemoShowcaseProps {
  onCtaClick?: () => void;
}

export default function ChatDemoShowcase({ onCtaClick }: ChatDemoShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState(industryDemos[0].id);
  const [key, setKey] = useState(0);

  const handleDemoChange = useCallback((demoId: string) => {
    if (demoId !== activeDemo) {
      setActiveDemo(demoId);
      setKey((k) => k + 1);
    }
  }, [activeDemo]);

  const currentDemo = industryDemos.find((d) => d.id === activeDemo) || industryDemos[0];
  const currentMessages = industryConversations[activeDemo];

  return (
    <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-4">
            See It In Action
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            AI Chatbots for Every Industry
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 max-w-xl mx-auto">
            Watch how our chatbots handle real conversations for different businesses
          </p>
        </motion.div>

        {/* Industry tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {industryDemos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleDemoChange(demo.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                activeDemo === demo.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-white dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 border border-gray-200 dark:border-neutral-700 hover:border-orange-500/50 hover:text-orange-500"
              )}
            >
              <span>{demo.avatar}</span>
              <span className="hidden sm:inline">{demo.name}</span>
              <span className="sm:hidden">
                {demo.id === "afterhours" ? "After-Hours" :
                 demo.id === "legal" ? "Legal" :
                 demo.id === "dental" ? "Dental" : "Sales"}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className={cn(
            "max-w-md mx-auto group rounded-3xl",
            // Light mode - Saffron glow
            "shadow-[0_0_40px_rgba(249,115,22,0.3)]",
            // Dark mode - pulsing aurora glow
            "dark:animate-pulse-glow dark:shadow-none"
          )}
        >
          <ChatDemoWindow
            key={key}
            config={currentDemo}
            messages={currentMessages}
            height="h-[320px] md:h-[360px]"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
          >
            Get a Chatbot Like This
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
