"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage, DemoConfig } from "./chatDemoData";

interface ChatDemoWindowProps {
  config: DemoConfig;
  messages: ChatMessage[];
  className?: string;
  height?: string;
  onReplay?: () => void;
}

export default function ChatDemoWindow({
  config,
  messages,
  className,
  height = "h-[320px] md:h-[360px]",
}: ChatDemoWindowProps) {
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const hasStartedRef = useRef(false);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const playConversation = async () => {
    // Prevent duplicate runs
    if (playingRef.current) return;
    playingRef.current = true;

    setDisplayedMessages([]);
    setIsTyping(false);

    for (let i = 0; i < messages.length; i++) {
      if (!playingRef.current) break;

      const msg = messages[i];

      // Show typing indicator for bot messages (slower)
      if (msg.type === "bot") {
        setIsTyping(true);
        setTimeout(scrollToBottom, 50);
        await sleep(1200 + Math.random() * 600); // Slower typing
        if (!playingRef.current) break;
        setIsTyping(false);
      }

      // Add the message
      setDisplayedMessages((prev) => [...prev, msg]);
      setTimeout(scrollToBottom, 50);

      // Wait before next message (use the delay from data, which is already reasonable)
      await sleep(msg.delay * 1.3); // 30% slower overall
    }

    playingRef.current = false;
  };

  const handleReplay = () => {
    playingRef.current = false;
    setDisplayedMessages([]);
    setIsTyping(false);
    setTimeout(() => {
      playConversation();
    }, 150);
  };

  // Start conversation only once on mount
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Small delay before starting
    const timer = setTimeout(() => {
      playConversation();
    }, 500);

    return () => {
      clearTimeout(timer);
      playingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset when messages change (language switch)
  useEffect(() => {
    if (!hasStartedRef.current) return;

    playingRef.current = false;
    setDisplayedMessages([]);
    setIsTyping(false);

    const timer = setTimeout(() => {
      playConversation();
    }, 200);

    return () => {
      clearTimeout(timer);
      playingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden",
        // Light mode - Cream style (warm white + peach accents)
        "border border-[rgba(23,23,23,0.08)]",
        "shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
        "backdrop-blur-[14px]",
        // Dark mode - Charcoal style
        "dark:border-[rgba(115,115,115,0.20)]",
        "dark:shadow-[0_24px_70px_rgba(0,0,0,0.48)]",
        className
      )}
      style={{
        background: `
          radial-gradient(900px 380px at 20% 0%, rgba(251,146,60,0.12), transparent 60%),
          radial-gradient(780px 360px at 90% 15%, rgba(253,186,116,0.10), transparent 58%),
          radial-gradient(700px 330px at 50% 110%, rgba(249,115,22,0.08), transparent 56%),
          linear-gradient(180deg, rgba(255,253,250,0.92), rgba(255,253,250,0.78))
        `
      }}
    >
      {/* Dot pattern overlay for light mode - Cream style */}
      <div
        className="absolute inset-0 pointer-events-none z-0 dark:hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 12px 12px, rgba(23,23,23,0.04) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.25,
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))'
        }}
      />
      {/* Aurora effect for dark mode */}
      <div
        className="absolute inset-[-40px] pointer-events-none hidden dark:block z-0 animate-aurora"
        style={{
          background: `
            radial-gradient(500px 240px at 20% 10%, rgba(249,115,22,0.35), transparent 60%),
            radial-gradient(520px 260px at 85% 20%, rgba(251,146,60,0.30), transparent 62%),
            radial-gradient(540px 260px at 55% 110%, rgba(234,88,12,0.25), transparent 65%)
          `,
          filter: 'blur(18px)',
          opacity: 0.95
        }}
      />
      {/* Replay button */}
      <button
        onClick={handleReplay}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Replay"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-gray-500 dark:fill-neutral-400"
        >
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
        </svg>
      </button>

      {/* Header */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 border-b relative z-10",
        // Light - Cream (transparent to show warm gradient)
        "border-[rgba(23,23,23,0.07)] bg-transparent",
        // Dark - Charcoal (transparent to show aurora behind)
        "dark:border-[rgba(115,115,115,0.20)] dark:bg-transparent"
      )}>
        {/* Avatar with favicon */}
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden",
          // Light mode - matches favicon color #f17523
          "bg-[#f17523]",
          "shadow-[0_18px_44px_rgba(241,117,35,0.25)]",
          // Dark mode - same color with subtle inner glow
          "dark:bg-[#f17523]",
          "dark:shadow-[0_0_0_1px_rgba(241,117,35,0.30),0_16px_40px_rgba(0,0,0,0.42)]"
        )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.ico"
            alt={config.name}
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-[rgba(250,250,250,0.92)] truncate">
            {config.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-[rgba(212,212,212,0.58)]">
            {config.subtitle}
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesRef}
        className={cn(
          "px-4 py-3 overflow-y-auto flex flex-col gap-3 relative z-10",
          // Light - Cream (transparent to show warm gradient)
          "bg-transparent",
          // Dark - transparent to show aurora
          "dark:bg-transparent",
          height
        )}
      >
        {displayedMessages.map((msg, index) => (
          <div
            key={`${index}-${msg.text.slice(0, 10)}`}
            className={cn(
              "max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.type === "bot" ? "self-start" : "self-end"
            )}
          >
            <div
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                msg.type === "bot"
                  ? cn(
                      "rounded-bl-sm",
                      // Light - Cream style: subtle warm background
                      "bg-[rgba(38,38,38,0.04)] border border-[rgba(23,23,23,0.07)] text-[rgb(38,38,38)]",
                      // Dark - Charcoal style: dark glass bubble
                      "dark:bg-[rgba(115,115,115,0.10)]",
                      "dark:border-[rgba(115,115,115,0.18)] dark:text-[rgba(250,250,250,0.92)]"
                    )
                  : cn(
                      "rounded-br-sm",
                      // Light mode - Cream style: peach gradient
                      "bg-[linear-gradient(135deg,rgba(251,146,60,0.94),rgba(253,186,116,0.80))] text-white",
                      // Dark mode - Charcoal user bubble gradient
                      "dark:bg-[linear-gradient(135deg,rgba(251,146,60,0.92),rgba(234,88,12,0.75))]",
                      "dark:text-[rgba(10,10,10,0.92)]"
                    )
              )}
            >
              {msg.text}
            </div>
            <div
              className={cn(
                "text-[10px] mt-1 text-gray-400 dark:text-neutral-500 font-mono",
                msg.type === "user" && "text-right"
              )}
            >
              {formatTime()}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="self-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={cn(
              "px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5",
              // Light - Cream style
              "bg-[rgba(38,38,38,0.04)] border border-[rgba(23,23,23,0.07)]",
              // Dark - Charcoal style: dark glass bubble
              "dark:bg-[rgba(115,115,115,0.10)]",
              "dark:border-[rgba(115,115,115,0.18)]"
            )}>
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className={cn(
        "px-4 py-3 relative z-10",
        // Light - Cream (transparent)
        "bg-transparent",
        // Dark - transparent to keep aurora visible
        "dark:bg-transparent"
      )}>
        <div className={cn(
          "p-2 rounded-2xl border",
          // Light - Cream style
          "bg-[rgba(255,253,250,0.65)] border-[rgba(23,23,23,0.10)]",
          // Dark - Charcoal style
          "dark:bg-[rgba(38,38,38,0.42)] dark:border-[rgba(115,115,115,0.20)]"
        )}>
          <div className="flex items-end gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              disabled
              className={cn(
                "flex-1 bg-transparent outline-none text-sm py-1.5 px-2",
                // Light - Cream style
                "text-[rgb(38,38,38)] placeholder-[rgba(64,64,64,0.58)]",
                // Dark - Charcoal style
                "dark:text-[rgba(250,250,250,0.92)] dark:placeholder-[rgba(212,212,212,0.60)]"
              )}
            />
            <button
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium shrink-0",
                // Light - Cream style (peach gradient)
                "bg-[linear-gradient(135deg,rgba(251,146,60,0.94),rgba(253,186,116,0.82))] text-white",
                // Dark - Charcoal send button
                "dark:bg-[linear-gradient(135deg,rgba(251,146,60,0.94),rgba(234,88,12,0.78))]",
                "dark:text-[rgba(10,10,10,0.92)]"
              )}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Powered by footer */}
      <div className={cn(
        "px-4 py-2 text-center border-t relative z-10",
        // Light - Cream
        "border-[rgba(23,23,23,0.07)] bg-transparent",
        // Dark - Charcoal style
        "dark:border-[rgba(115,115,115,0.20)] dark:bg-transparent"
      )}>
        <span className="text-[10px] text-[rgba(64,64,64,0.58)] dark:text-[rgba(212,212,212,0.58)]">
          Powered by{" "}
          <span className="font-semibold">
            <span className="text-[rgb(251,146,60)] dark:text-[rgb(251,146,60)]">abe</span>
            <span className="text-[rgba(64,64,64,0.58)] dark:text-[rgba(212,212,212,0.58)]">media</span>
          </span>
        </span>
      </div>
    </div>
  );
}
