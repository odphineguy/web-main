"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset form after 5 seconds on success
  const resetForm = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setStatus("sending");
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: unknown } = await res.json().catch(() => ({} as Record<string, unknown>));
      if (!res.ok || !data?.ok) {
        throw new Error(
          typeof data?.error === "string" ? data.error : JSON.stringify(data?.error || "Failed to send")
        );
      }
      setStatus("sent");
      setErrorMessage(null);
      form.reset();
      // Reset status after 5 seconds
      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
    }
  }

  return (
    <form className="grid gap-4 max-w-xl" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm">Name</label>
        <input id="name" name="name" type="text" required className="rounded-full border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" name="email" type="email" required className="rounded-full border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm">Message</label>
        <textarea id="message" name="message" rows={5} required className="rounded-3xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send"}
      </button>
      {status === "error" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 break-words">
            There was a problem sending your message. {errorMessage}
          </p>
        </div>
      )}
      {status === "sent" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ Your message has been sent successfully! We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}
    </form>
  );
}


