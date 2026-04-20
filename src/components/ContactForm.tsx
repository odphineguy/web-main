"use client";

import { useState, type FormEvent } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { humanizeError, isValidEmail } from "@/lib/humanizeError";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Reset form after 5 seconds on success
  const resetForm = () => {
    setStatus("idle");
    setErrorMessage(null);
    setEmailError(null);
    setTurnstileToken(null);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    // Client-side validation catches obvious typos before hitting Turnstile.
    if (!isValidEmail(email)) {
      setEmailError("Double-check this address. Looks like an @ or domain is missing.");
      const input = form.querySelector<HTMLInputElement>('input[name="email"]');
      input?.focus();
      return;
    }
    setEmailError(null);

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Complete the verification check above before sending.");
      return;
    }

    setStatus("sending");

    const payload = {
      ...Object.fromEntries(formData.entries()),
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: unknown } = await res.json().catch(() => ({} as Record<string, unknown>));
      if (!res.ok || !data?.ok) {
        throw new Error(
          typeof data?.error === "string" ? data.error : `HTTP ${res.status}`,
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
      setErrorMessage(humanizeError(err));
    }
  }

  const inputStyles = "w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground placeholder-gray-400 dark:placeholder-neutral-500 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all";

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm text-foreground font-medium">Name</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="Your Full Name"
          required 
          className={inputStyles} 
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm text-foreground font-medium">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby={emailError ? "email-error" : undefined}
          onChange={() => {
            if (emailError) setEmailError(null);
          }}
          className={inputStyles}
        />
        {emailError && (
          <p id="email-error" className="text-xs text-red-600 dark:text-red-400">
            {emailError}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm text-foreground font-medium">Subject</label>
        <select
          id="subject"
          name="subject"
          required
          className={`${inputStyles} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10`}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Project Proposal">Project Proposal</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-foreground font-medium">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          placeholder="How can we assist you?"
          required 
          className={`${inputStyles} resize-none`} 
        />
      </div>

      <TurnstileWidget 
        onVerify={(token) => {
          setTurnstileToken(token);
          setErrorMessage(null);
        }} 
        onError={() => setErrorMessage("Verification failed. Please try again.")}
        onExpire={() => setTurnstileToken(null)}
      />

      <button
        type="submit"
        disabled={status === "sending" || status === "sent" || !turnstileToken}
        className="w-full inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "SEND MESSAGE"}
      </button>
      {status === "error" && errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg"
        >
          <p className="text-sm text-red-600 dark:text-red-400 break-words">
            {errorMessage}
          </p>
          <p className="mt-2 text-xs text-red-600/80 dark:text-red-400/80">
            Still stuck? Email{" "}
            <a href="mailto:abe@abemedia.online" className="underline underline-offset-2 hover:no-underline">
              abe@abemedia.online
            </a>{" "}
            directly.
          </p>
        </div>
      )}
      {status === "sent" && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg"
        >
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Message sent. We&apos;ll reply within one business day.
          </p>
        </div>
      )}
    </form>
  );
}
