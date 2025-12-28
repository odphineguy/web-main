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
      {/* Demo window */}
      <ChatDemoWindow
        config={localizedConfig}
        messages={bilingualConversations[language]}
        height="h-[300px] md:h-[340px]"
      />

      {/* Language toggle */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handleLanguageChange("es")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
            language === "es"
              ? "bg-orange-500 border-orange-500 text-white shadow-sm"
              : "bg-transparent border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-neutral-400 hover:border-orange-500 hover:text-orange-500"
          )}
        >
          Español
        </button>
        <button
          onClick={() => handleLanguageChange("en")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
            language === "en"
              ? "bg-orange-500 border-orange-500 text-white shadow-sm"
              : "bg-transparent border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-neutral-400 hover:border-orange-500 hover:text-orange-500"
          )}
        >
          English
        </button>
      </div>
    </div>
  );
}
