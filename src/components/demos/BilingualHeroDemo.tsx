"use client";

import { useState } from "react";
import ChatDemoWindow from "./ChatDemoWindow";
import { bilingualDemo, bilingualConversations } from "./chatDemoData";
import { cn } from "@/lib/utils";

export default function BilingualHeroDemo() {
  const [language, setLanguage] = useState<"es" | "en">("es");

  const handleLanguageChange = (lang: "es" | "en") => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  // Update config subtitle based on language
  const localizedConfig = {
    ...bilingualDemo,
    subtitle: language === "es" ? "Reservaciones y menú" : "Reservations & menu",
  };

  return (
    <div className="group relative w-full max-w-md mx-auto lg:mx-0">
      {/* Language toggle at top */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex rounded-full border border-gray-300 dark:border-neutral-600 overflow-hidden">
          <button
            onClick={() => handleLanguageChange("es")}
            className={cn(
              "px-4 py-1.5 text-xs font-medium transition-all duration-200",
              language === "es"
                ? "bg-orange-500 text-white"
                : "bg-transparent text-gray-500 dark:text-neutral-400 hover:text-orange-500"
            )}
          >
            Español
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={cn(
              "px-4 py-1.5 text-xs font-medium transition-all duration-200 border-l border-gray-300 dark:border-neutral-600",
              language === "en"
                ? "bg-orange-500 text-white"
                : "bg-transparent text-gray-500 dark:text-neutral-400 hover:text-orange-500"
            )}
          >
            English
          </button>
        </div>
      </div>

      {/* Demo window with glow */}
      <div className="animate-pulse-glow rounded-2xl">
        <ChatDemoWindow
          config={localizedConfig}
          messages={bilingualConversations[language]}
          height="h-[300px] md:h-[340px]"
        />
      </div>
    </div>
  );
}
