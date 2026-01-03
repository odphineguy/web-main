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
        // Light mode - Saffron Studio style
        "bg-gradient-to-b from-white/[0.78] to-white/[0.58]",
        "border border-slate-900/10",
        "shadow-[0_18px_50px_rgba(2,6,23,0.20),0_2px_0_rgba(255,255,255,0.55)_inset,0_-1px_0_rgba(2,6,23,0.08)_inset]",
        "backdrop-blur-[16px]",
        // Dark mode - Charcoal style (exact match)
        "dark:bg-[rgba(38,38,38,0.75)]",
        "dark:border-[rgba(115,115,115,0.20)]",
        "dark:shadow-[0_24px_70px_rgba(0,0,0,0.48)]",
        "dark:backdrop-blur-[14px]",
        className
      )}
    >
      {/* Aurora effect for dark mode - ::before pseudo-element equivalent */}
      <div
        className="absolute inset-[-40px] pointer-events-none opacity-0 dark:opacity-90 z-0 animate-aurora"
        style={{
          background: `
            radial-gradient(500px 240px at 20% 10%, rgba(249,115,22,0.30), transparent 60%),
            radial-gradient(520px 260px at 85% 20%, rgba(251,146,60,0.25), transparent 62%),
            radial-gradient(540px 260px at 55% 110%, rgba(234,88,12,0.18), transparent 65%)
          `,
          filter: 'blur(18px)'
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
        // Light - Saffron
        "border-slate-900/10 bg-white/55",
        // Dark - Charcoal (transparent to show aurora behind)
        "dark:border-[rgba(115,115,115,0.20)] dark:bg-transparent"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center text-lg",
          // Light mode
          "bg-gradient-to-br from-orange-500 to-orange-600 shadow-sm",
          // Dark - Charcoal avatar style
          "dark:bg-[radial-gradient(circle_at_35%_30%,rgba(251,146,60,0.35),rgba(38,38,38,0.88))]",
          "dark:shadow-[0_0_0_1px_rgba(115,115,115,0.16),0_16px_40px_rgba(0,0,0,0.42)]"
        )}>
          <span className="dark:text-orange-200">{config.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-[rgba(250,250,250,0.92)] truncate">
            {config.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-[rgba(212,212,212,0.58)]">
            {config.subtitle}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-600 dark:text-green-400">
            Online
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesRef}
        className={cn(
          "px-4 py-3 overflow-y-auto flex flex-col gap-3 relative z-10",
          // Light
          "bg-white/55",
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
                      // Light - Saffron style
                      "bg-gradient-to-b from-white/[0.86] to-slate-100/[0.78] border border-slate-900/[0.08] text-slate-900",
                      "shadow-[0_14px_32px_rgba(0,0,0,0.12)]",
                      // Dark - Charcoal style: dark glass bubble
                      "dark:from-transparent dark:to-transparent dark:bg-[rgba(64,64,64,0.55)]",
                      "dark:border-[rgba(115,115,115,0.25)] dark:text-[rgba(250,250,250,0.92)] dark:shadow-none"
                    )
                  : cn(
                      "rounded-br-sm",
                      // Light mode - orange gradient
                      "bg-gradient-to-b from-orange-500/95 to-orange-600/[0.92] text-white",
                      "shadow-[0_18px_40px_rgba(249,115,22,0.25)]",
                      // Dark mode - Charcoal user bubble gradient
                      "dark:from-transparent dark:to-transparent",
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
              // Light - Saffron style
              "bg-gradient-to-b from-white/[0.86] to-slate-100/[0.78] border border-slate-900/[0.08]",
              "shadow-[0_14px_32px_rgba(0,0,0,0.12)]",
              // Dark - Charcoal style: dark glass bubble
              "dark:from-transparent dark:to-transparent dark:bg-[rgba(64,64,64,0.55)]",
              "dark:border-[rgba(115,115,115,0.25)] dark:shadow-none"
            )}>
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-[rgba(212,212,212,0.62)] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input area - Charcoal style: input + button inside wrapper */}
      <div className={cn(
        "px-4 py-3 relative z-10",
        // Light - Saffron
        "bg-white/70",
        // Dark - transparent to keep aurora visible
        "dark:bg-transparent"
      )}>
        <div className={cn(
          "p-2 rounded-2xl border",
          // Light - Saffron style
          "bg-white/70 border-slate-900/10",
          // Dark - Charcoal style (exact match)
          "dark:bg-[rgba(38,38,38,0.42)] dark:border-[rgba(115,115,115,0.20)]"
        )}>
          <div className="flex items-end gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              disabled
              className={cn(
                "flex-1 bg-transparent outline-none text-sm py-1.5 px-2",
                // Light
                "text-slate-900 placeholder-slate-500",
                // Dark - Charcoal style
                "dark:text-[rgba(250,250,250,0.92)] dark:placeholder-[rgba(212,212,212,0.60)]"
              )}
            />
            <button
              disabled
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium shrink-0",
                // Light - Saffron style
                "bg-gradient-to-b from-orange-500 to-orange-600 text-white",
                // Dark - Charcoal send button (exact match)
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
        // Light
        "border-slate-900/10 bg-white/55",
        // Dark - Charcoal style
        "dark:border-[rgba(115,115,115,0.20)] dark:bg-[rgba(38,38,38,0.35)]"
      )}>
        <span className="text-[10px] text-slate-500 dark:text-[rgba(212,212,212,0.58)]">
          Powered by{" "}
          <span className="font-semibold">
            <span className="text-orange-500 dark:text-[rgb(251,146,60)]">abe</span>
            <span className="text-slate-500 dark:text-[rgba(212,212,212,0.58)]">media</span>
          </span>
        </span>
      </div>
    </div>
  );
}
