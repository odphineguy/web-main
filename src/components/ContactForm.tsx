"use client";

import { useState, type FormEvent } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Reset form after 5 seconds on success
  const resetForm = () => {
    setStatus("idle");
    setErrorMessage(null);
    setTurnstileToken(null);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!turnstileToken) {
      setErrorMessage("Please complete the verification check.");
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
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

  const inputStyles = "w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all";

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm text-white font-medium">Name</label>
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
        <label htmlFor="email" className="text-sm text-white font-medium">Email Address</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="you@example.com"
          required 
          className={inputStyles} 
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm text-white font-medium">Subject</label>
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
        <label htmlFor="message" className="text-sm text-white font-medium">Message</label>
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
        className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "SEND MESSAGE"}
      </button>
      {status === "error" && errorMessage && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-sm text-red-400 break-words">
            {errorMessage.includes("Verification") ? errorMessage : `There was a problem sending your message. ${errorMessage}`}
          </p>
        </div>
      )}
      {status === "sent" && (
        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
          <p className="text-sm text-green-400 font-medium">
            Your message has been sent successfully! We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}
    </form>
  );
}
