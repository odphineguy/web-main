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
        "relative rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700",
        "bg-white dark:bg-neutral-900",
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        className
      )}
    >
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
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-lg shadow-sm">
          {config.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {config.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-neutral-400">
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

      {/* Messages - lighter background for better contrast */}
      <div
        ref={messagesRef}
        className={cn(
          "px-4 py-3 overflow-y-auto flex flex-col gap-3",
          "bg-gray-50 dark:bg-neutral-800",
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
                  ? "bg-white dark:bg-neutral-700 text-gray-900 dark:text-white rounded-bl-sm shadow-sm"
                  : "bg-orange-500 text-white rounded-br-sm shadow-sm"
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
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-neutral-700 shadow-sm flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-neutral-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-neutral-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-neutral-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input (disabled, decorative) */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <input
          type="text"
          placeholder="Type a message..."
          disabled
          className="flex-1 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-600 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
        />
        <button
          disabled
          className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      {/* Powered by footer */}
      <div className="px-4 py-2 text-center border-t border-gray-100 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50">
        <span className="text-[10px] text-gray-400 dark:text-neutral-500">
          Powered by{" "}
          <span className="font-semibold text-orange-500">abemedia</span>
        </span>
      </div>
    </div>
  );
}
