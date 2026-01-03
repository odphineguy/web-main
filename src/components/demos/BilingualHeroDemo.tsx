"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ChatDemoWindow from "./ChatDemoWindow";
import { bilingualDemo, bilingualConversations } from "./chatDemoData";
import { cn } from "@/lib/utils";

export default function BilingualHeroDemo() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div
          className="inline-flex rounded-full border overflow-hidden"
          style={{
            borderColor: mounted && isDark ? "rgba(115, 115, 115, 0.4)" : "rgba(209, 213, 219, 1)",
          }}
        >
          <button
            onClick={() => handleLanguageChange("es")}
            className={cn(
              "px-4 py-1.5 text-xs font-medium transition-all duration-200",
              language === "es"
                ? "bg-orange-500 text-white"
                : "bg-transparent hover:text-orange-500"
            )}
            style={{
              color: language === "es" ? undefined : (mounted && isDark ? "rgba(163, 163, 163, 1)" : "rgba(107, 114, 128, 1)"),
            }}
          >
            Español
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={cn(
              "px-4 py-1.5 text-xs font-medium transition-all duration-200 border-l",
              language === "en"
                ? "bg-orange-500 text-white"
                : "bg-transparent hover:text-orange-500"
            )}
            style={{
              borderColor: mounted && isDark ? "rgba(115, 115, 115, 0.4)" : "rgba(209, 213, 219, 1)",
              color: language === "en" ? undefined : (mounted && isDark ? "rgba(163, 163, 163, 1)" : "rgba(107, 114, 128, 1)"),
            }}
          >
            English
          </button>
        </div>
      </div>

      {/* Demo window with glow - pulse animation in dark mode, soft glow in light */}
      <div
        className={cn(
          "rounded-3xl",
          mounted && isDark && "animate-pulse-glow"
        )}
        style={{
          boxShadow: mounted && !isDark ? "0 0 40px rgba(249,115,22,0.3)" : undefined,
        }}
      >
        <ChatDemoWindow
          config={localizedConfig}
          messages={bilingualConversations[language]}
          height="h-[300px] md:h-[340px]"
        />
      </div>
    </div>
  );
}
