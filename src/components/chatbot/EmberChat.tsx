"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { ArrowUpRight, CalendarDays, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";

const CALENDAR_URL = "https://cal.com/abe-p-698781/talk-with-abe";

/**
 * Ember chat - the rebuilt site assistant, styled on the chat-ember /
 * chat-demo-cream custom-property themes in globals.css (dark glass, orange
 * aurora, typing indicator, suggestion chips). Backend: /api/chat
 * (claude-haiku-4-5 with booking + lead-capture tools).
 */

const COPY = {
  en: {
    title: "Abe Media Assistant",
    subtitle: "Usually replies in seconds",
    greeting:
      "Hi, I'm the Abe Media assistant. I can explain what we build, answer questions in English or Spanish, and book you a free call with Abe.",
    placeholder: "Type a message...",
    send: "Send",
    open: "Open chat",
    close: "Close chat",
    book: "Book a 30-minute call",
    error: "Something went wrong. Try again, or email abe@abemedia.online.",
    disclosure: "AI assistant. Answers are informational; bookings are subject to confirmation.",
    chips: ["What does the AI call agent do?", "¿Hablan español?"],
  },
  es: {
    title: "Asistente de Abe Media",
    subtitle: "Responde en segundos",
    greeting:
      "Hola, soy el asistente de Abe Media. Puedo explicarte lo que construimos, responder en español o inglés, y agendarte una llamada gratis con Abe.",
    placeholder: "Escribe un mensaje...",
    send: "Enviar",
    open: "Abrir chat",
    close: "Cerrar chat",
    book: "Agenda una llamada de 30 minutos",
    error: "Algo salió mal. Intenta de nuevo o escribe a abe@abemedia.online.",
    disclosure: "Asistente de IA. Las respuestas son informativas; las citas están sujetas a confirmación.",
    chips: ["¿Qué hace el agente de llamadas?", "Do you speak English?"],
  },
} as const;

function TypingDots() {
  return (
    <div className="self-start">
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
        style={{ background: "var(--chat-bot-bubble)", border: "1px solid var(--chat-bot-border)" }}
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--chat-typing-dot)", animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function EmberChatPanel({
  heightClass = "h-[380px]",
  onClose,
}: {
  heightClass?: string;
  onClose?: () => void;
}) {
  const locale = useLocale();
  const lang: "en" | "es" = locale === "es" ? "es" : "en";
  const copy = COPY[lang];

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const themeClass = isDark ? "chat-ember" : "chat-demo-cream";

  const [messages, setMessages] = useState<Message[]>([{ role: "model", text: copy.greeting }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Message[]>(messages);

  useEffect(() => {
    historyRef.current = messages;
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;
      setInput("");
      setIsLoading(true);

      const withUser: Message[] = [...historyRef.current, { role: "user", text: trimmed }];
      const modelIndex = withUser.length;
      setMessages([...withUser, { role: "model", text: "" }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // The greeting is client-side flavor, not model history.
            messages: withUser.slice(1),
            lang,
          }),
        });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const current = acc;
          setMessages((prev) => {
            const next = [...prev];
            if (next[modelIndex]?.role === "model") next[modelIndex] = { role: "model", text: current };
            return next;
          });
        }
        if (!acc.trim()) throw new Error("Empty response");
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) => {
          const next = [...prev];
          next[modelIndex] = { role: "error", text: copy.error };
          return next;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [copy.error, isLoading, lang],
  );

  const showChips = messages.length === 1 && !isLoading;
  const awaitingFirstToken = isLoading && messages[messages.length - 1]?.role === "model" && messages[messages.length - 1].text === "";

  return (
    <div
      className={cn("relative flex flex-col overflow-hidden rounded-3xl backdrop-blur-[14px]", themeClass)}
      style={{
        background: "var(--chat-surface)",
        border: "1px solid var(--chat-border)",
        boxShadow: "var(--chat-shadow)",
      }}
    >
      {/* Orange aurora (dark mode) */}
      {isDark && (
        <div
          className="absolute inset-[-40px] pointer-events-none z-0 animate-aurora"
          style={{
            background: `
              radial-gradient(500px 240px at 20% 10%, rgba(227,79,11,0.32), transparent 60%),
              radial-gradient(520px 260px at 85% 20%, rgba(227,79,11,0.24), transparent 62%),
              radial-gradient(540px 260px at 55% 110%, rgba(227,79,11,0.20), transparent 65%)
            `,
            filter: "blur(18px)",
            opacity: 0.9,
          }}
        />
      )}

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b relative z-10"
        style={{ borderColor: "var(--chat-header-border)" }}
      >
        <Image
          src="/images/portfolio/a-icon-small.svg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-2xl"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--chat-text)" }}>
            {copy.title}
          </p>
          <p className="text-xs" style={{ color: "var(--chat-muted)" }}>
            {copy.subtitle}
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            style={{
              borderColor: "var(--chat-border)",
              background: "var(--chat-bot-bubble)",
              color: "var(--chat-text)",
            }}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>

      {/* Messages */}
      <div ref={messagesRef} className={cn("px-4 py-3 overflow-y-auto flex flex-col gap-3 relative z-10", heightClass)}>
        {messages.map((msg, index) =>
          msg.role === "model" && msg.text === "" ? null : (
            <div key={index} className={cn("max-w-[85%]", msg.role === "user" ? "self-end" : "self-start")}>
              <div
                className={cn(
                  "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                  msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm",
                )}
                style={
                  msg.role === "user"
                    ? { background: "var(--chat-user-bubble)", color: "var(--chat-user-text)" }
                    : {
                        background: "var(--chat-bot-bubble)",
                        border: "1px solid var(--chat-bot-border)",
                        color: msg.role === "error" ? "rgb(248,113,113)" : "var(--chat-text)",
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ),
        )}
        {awaitingFirstToken && <TypingDots />}
      </div>

      {/* Suggestion chips */}
      {showChips && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 relative z-10">
          {copy.chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => sendMessage(chip)}
              className="px-3 py-1.5 rounded-[var(--radius-action)] text-xs transition-transform hover:scale-[1.03]"
              style={{
                border: "1px solid var(--chat-bot-border)",
                background: "var(--chat-bot-bubble)",
                color: "var(--chat-text)",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Direct booking action */}
      <div className="relative z-10 px-4 pb-2">
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-11 w-full items-center justify-between rounded-[var(--radius-action)] bg-[#E34F0B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {copy.book}
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>

      {/* Input */}
      <div className="px-4 py-3 relative z-10">
        <div
          className="p-2 rounded-2xl flex items-end gap-2"
          style={{ background: "var(--chat-input-bg)", border: "1px solid var(--chat-border)" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder={copy.placeholder}
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm py-1.5 px-2"
            style={{ color: "var(--chat-text)" }}
            aria-label={copy.placeholder}
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="px-3.5 py-2 rounded-[var(--radius-action)] text-sm font-medium shrink-0 disabled:opacity-50 inline-flex items-center gap-1.5"
            style={{ background: "var(--chat-user-bubble)", color: "var(--chat-user-text)" }}
            aria-label={copy.send}
          >
            {copy.send}
            <Send className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 text-center border-t relative z-10"
        style={{ borderColor: "var(--chat-footer-border)" }}
      >
        <p className="text-[10px]" style={{ color: "var(--chat-muted)" }}>
          Powered by{" "}
          <span className="font-semibold">
            <span className="text-[rgb(227,79,11)]">abe</span>
            <span style={{ color: "var(--chat-muted)" }}>media</span>
          </span>
        </p>
        <p className="mt-1 text-[9px] leading-3" style={{ color: "var(--chat-muted)" }}>
          {copy.disclosure}
        </p>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const locale = useLocale();
  const copy = COPY[locale === "es" ? "es" : "en"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={copy.open}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full grid place-items-center text-white transition-transform duration-300 hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #E34F0B, #E34F0B)",
            boxShadow: "0 8px 30px rgba(227,79,11,0.35), 0 0 0 3px rgba(227,79,11,0.1)",
          }}
        >
          <MessageCircle className="w-6 h-6" aria-hidden />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[min(380px,calc(100vw-2rem))]">
          <EmberChatPanel
            heightClass="h-[min(340px,calc(100vh-23rem))] min-h-32"
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}
