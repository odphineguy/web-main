"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
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
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const hasStartedRef = useRef(false);

  // Theme detection using next-themes
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Use a neutral default during SSR to avoid hydration mismatch
  const themeClass = mounted ? (isDark ? "chat-demo-charcoal" : "chat-demo-cream") : "chat-demo-cream";

  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden",
        themeClass,
        "backdrop-blur-[14px]",
        className
      )}
      style={{
        background: "var(--chat-surface)",
        border: "1px solid var(--chat-border)",
        boxShadow: "var(--chat-shadow)",
      }}
    >
      {/* Dot pattern overlay for light mode - Cream style */}
      {mounted && !isDark && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 12px 12px, rgba(23,23,23,0.04) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            opacity: 0.25,
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))',
            WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))'
          }}
        />
      )}

      {/* Aurora effect for dark mode - Charcoal style */}
      {mounted && isDark && (
        <div
          className="absolute inset-[-40px] pointer-events-none z-0 animate-aurora"
          style={{
            background: `
              radial-gradient(500px 240px at 20% 10%, rgba(249,115,22,0.30), transparent 60%),
              radial-gradient(520px 260px at 85% 20%, rgba(251,146,60,0.25), transparent 62%),
              radial-gradient(540px 260px at 55% 110%, rgba(234,88,12,0.18), transparent 65%)
            `,
            filter: 'blur(18px)',
            opacity: 0.90
          }}
        />
      )}

      {/* Replay button */}
      <button
        onClick={handleReplay}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
          isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
        )}
        title="Replay"
      >
        <svg
          viewBox="0 0 24 24"
          className={cn("w-4 h-4", isDark ? "fill-neutral-400" : "fill-gray-500")}
        >
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
        </svg>
      </button>

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b relative z-10 bg-transparent"
        style={{ borderColor: "var(--chat-header-border)" }}
      >
        {/* Avatar with favicon */}
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{
            background: "#f17523",
            boxShadow: isDark
              ? "0 0 0 1px rgba(115,115,115,0.16), 0 16px 40px rgba(0,0,0,0.42)"
              : "0 14px 30px rgba(249,115,22,0.28)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.ico"
            alt={config.name}
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0 text-center">
          <h3
            className="text-sm font-semibold truncate"
            style={{
              fontFamily: "var(--font-pacifico), cursive",
              color: "var(--chat-text)",
            }}
          >
            {config.name}
          </h3>
          <span
            className="text-xs"
            style={{ color: "var(--chat-muted)" }}
          >
            {config.subtitle}
          </span>
        </div>
        {/* Minimize/Expand button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-9 w-9 rounded-2xl grid place-items-center border transition-all hover:scale-105 active:scale-95"
          style={{
            borderColor: "var(--chat-border)",
            color: "var(--chat-muted)",
          }}
          aria-label={isCollapsed ? "Expand chat" : "Minimize chat"}
          aria-expanded={!isCollapsed}
        >
          <span
            className="text-sm transition-transform duration-200"
            style={{
              display: "inline-block",
              transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        </button>
      </div>

      {/* Collapsible body */}
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isCollapsed ? "0px" : "520px",
          opacity: isCollapsed ? 0 : 1,
          transform: isCollapsed ? "translateY(-8px)" : "translateY(0)",
          pointerEvents: isCollapsed ? "none" : "auto",
        }}
      >
        {/* Messages area */}
        <div
          ref={messagesRef}
          className={cn(
            "px-4 py-3 overflow-y-auto flex flex-col gap-3 relative z-10 bg-transparent",
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
                msg.type === "bot" ? "rounded-bl-sm" : "rounded-br-sm"
              )}
              style={
                msg.type === "bot"
                  ? {
                      background: "var(--chat-bot-bubble)",
                      border: "1px solid var(--chat-bot-border)",
                      color: "var(--chat-text)",
                    }
                  : {
                      background: "var(--chat-user-bubble)",
                      color: "var(--chat-user-text)",
                    }
              }
            >
              {msg.text}
            </div>
            <div
              className={cn(
                "text-[10px] mt-1 font-mono",
                msg.type === "user" && "text-right"
              )}
              style={{ color: "var(--chat-muted)" }}
            >
              {formatTime()}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="self-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
              style={{
                background: "var(--chat-bot-bubble)",
                border: "1px solid var(--chat-bot-border)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-bounce [animation-delay:0ms]"
                style={{ background: "var(--chat-typing-dot)" }}
              />
              <span
                className="w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]"
                style={{ background: "var(--chat-typing-dot)" }}
              />
              <span
                className="w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]"
                style={{ background: "var(--chat-typing-dot)" }}
              />
            </div>
          </div>
          )}
        </div>

        {/* Input area */}
        <div className="px-4 py-3 relative z-10 bg-transparent">
          <div
            className="p-2 rounded-2xl"
            style={{
              background: "var(--chat-input-bg)",
              border: "1px solid var(--chat-border)",
            }}
          >
            <div className="flex items-end gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                disabled
                className="flex-1 bg-transparent outline-none text-sm py-1.5 px-2"
                style={{
                  color: "var(--chat-text)",
                }}
              />
              <button
                className="px-3.5 py-2 rounded-xl text-sm font-medium shrink-0"
                style={{
                  background: "var(--chat-user-bubble)",
                  color: "var(--chat-user-text)",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Powered by footer */}
        <div
          className="px-4 py-2 text-center border-t relative z-10 bg-transparent"
          style={{ borderColor: "var(--chat-footer-border)" }}
        >
          <span
            className="text-[10px]"
            style={{ color: "var(--chat-muted)" }}
          >
            Powered by{" "}
            <span className="font-semibold">
              <span className="text-[rgb(251,146,60)]">abe</span>
              <span style={{ color: "var(--chat-muted)" }}>media</span>
            </span>
          </span>
        </div>
      </div>{/* End collapsible body */}
    </div>
  );
}
