"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationForm({ isOpen, onClose }: ConsultationFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setStatus("sending");
    const payload = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch("/api/consultation", {
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
      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Book Your Free Consultation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name *
              </label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address *
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input 
                id="phone" 
                name="phone" 
                type="tel" 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input 
                id="company" 
                name="company" 
                type="text" 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Interest
              </label>
              <select 
                id="service" 
                name="service" 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              >
                <option value="">Select a service</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="custom-solutions">Custom Solutions</option>
                <option value="performance-optimization">Performance Optimization</option>
                <option value="logo-design">Logo Design</option>
                <option value="marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Description *
              </label>
              <textarea 
                id="description" 
                name="description" 
                rows={4} 
                required 
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white resize-none" 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Budget Range
              </label>
              <select 
                id="budget" 
                name="budget" 
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="discuss">Prefer to discuss</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 mt-4"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "✓ Request Sent!" : "Book Consultation"}
            </button>
            
            {status === "error" && (
              <div className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 break-words">
                  There was a problem sending your request. {errorMessage}
                </p>
              </div>
            )}
            
            {status === "sent" && (
              <div className="mt-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  ✓ Thank you! Your consultation request has been sent. We&apos;ll contact you within 24 hours.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
