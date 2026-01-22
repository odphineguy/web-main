"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FooterCTAProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  metaPill?: string;
  metaText?: string;
  className?: string;
}

interface FooterCTANewsletterProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

const FooterCTA = React.forwardRef<HTMLElement, FooterCTAProps>(
  (
    {
      eyebrow = "Next step",
      heading,
      subtext,
      buttonText,
      buttonHref,
      onButtonClick,
      metaPill,
      metaText,
      className,
    },
    ref
  ) => {
    const ButtonElement = buttonHref ? "a" : "button";

    return (
      <section
        ref={ref}
        className={cn("w-full max-w-[960px] mx-auto", className)}
        aria-labelledby="footer-cta-heading"
      >
        <div
          className="relative overflow-hidden rounded-[18px] p-px"
          style={{ background: "var(--footer-cta-outer-bg)" }}
        >
          {/* Glow effect layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              opacity: "var(--footer-cta-glow-opacity)",
              background: `
                radial-gradient(circle at 10% 0%, oklch(0.70 0.18 47.64 / 0.75) 0, transparent 55%),
                radial-gradient(circle at 100% 80%, oklch(0.70 0.18 47.64 / 0.4) 0, transparent 60%)
              `,
            }}
            aria-hidden="true"
          />

          {/* Inner card */}
          <div
            className="relative flex flex-col gap-5 p-7 md:p-8 md:flex-row md:justify-between md:items-center md:gap-7 rounded-[17px] border backdrop-blur-[12px]"
            style={{
              background: "var(--footer-cta-inner-bg)",
              borderColor: "var(--footer-cta-border-color)",
              boxShadow: "var(--footer-cta-shadow)",
            }}
          >
            {/* Content section */}
            <div className="relative z-10 flex flex-col items-start gap-3 md:max-w-[60%]">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em]"
                style={{ color: "var(--footer-cta-text-secondary)" }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.70 0.18 47.64) 0, oklch(0.50 0.15 47.64) 100%)",
                    boxShadow: "var(--footer-cta-dot-glow)",
                  }}
                  aria-hidden="true"
                />
                <span>{eyebrow}</span>
              </div>

              {/* Heading */}
              <h2
                id="footer-cta-heading"
                className="text-[clamp(1.5rem,4vw,2.1rem)] font-semibold tracking-[0.01em]"
                style={{
                  color: "var(--footer-cta-text-primary)",
                  textShadow: "0 8px 22px rgba(0, 0, 0, 0.1)",
                }}
              >
                {heading}
              </h2>

              {/* Subtext */}
              {subtext && (
                <p
                  className="text-[0.9rem] max-w-[32rem]"
                  style={{ color: "var(--footer-cta-text-secondary)" }}
                >
                  {subtext}
                </p>
              )}
            </div>

            {/* Actions section */}
            <div className="relative z-10 flex flex-wrap gap-4 items-center mt-1 md:items-end md:justify-end">
              <ButtonElement
                href={buttonHref}
                onClick={onButtonClick}
                type={buttonHref ? undefined : "button"}
                className="relative overflow-hidden rounded-full border border-white/10 px-8 h-11 bg-gradient-to-br from-white to-gray-50 dark:from-white dark:to-gray-100 text-orange-500 text-[0.8rem] font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center cursor-pointer outline-none transition-all duration-150 hover:translate-y-[-1px] hover:shadow-[0_18px_38px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_18px_38px_rgba(0,0,0,0.8)] active:translate-y-0"
                style={{
                  boxShadow:
                    "0 14px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)",
                }}
              >
                <span className="relative z-10">{buttonText}</span>
              </ButtonElement>

              {/* Meta info */}
              {(metaPill || metaText) && (
                <div
                  className="text-[0.75rem] ml-1 flex items-baseline gap-2"
                  style={{ color: "var(--footer-cta-text-secondary)" }}
                >
                  {metaPill && (
                    <span className="rounded-full px-2.5 py-0.5 border border-white/5 dark:border-white/10 bg-black/5 dark:bg-black/55 text-[0.68rem] uppercase tracking-[0.12em]">
                      {metaPill}
                    </span>
                  )}
                  {metaText && <span>{metaText}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
FooterCTA.displayName = "FooterCTA";

const FooterCTANewsletter = React.forwardRef<
  HTMLElement,
  FooterCTANewsletterProps
>(
  (
    {
      eyebrow = "Stay connected",
      heading,
      subtext,
      inputPlaceholder = "my@email.com",
      buttonText = "JOIN NEWSLETTER",
      onSubmit,
      className,
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit && email) {
        onSubmit(email);
      }
    };

    return (
      <section
        ref={ref}
        className={cn("w-full max-w-[960px] mx-auto", className)}
        aria-labelledby="footer-newsletter-heading"
      >
        <div
          className="relative overflow-hidden rounded-[18px] p-px"
          style={{ background: "var(--footer-cta-outer-bg)" }}
        >
          {/* Glow effect layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              opacity: "var(--footer-cta-glow-opacity)",
              background: `
                radial-gradient(circle at 10% 0%, oklch(0.70 0.18 47.64 / 0.75) 0, transparent 55%),
                radial-gradient(circle at 100% 80%, oklch(0.70 0.18 47.64 / 0.4) 0, transparent 60%)
              `,
            }}
            aria-hidden="true"
          />

          {/* Inner card */}
          <div
            className="relative flex flex-col gap-5 p-7 md:p-8 rounded-[17px] border backdrop-blur-[12px] text-center"
            style={{
              background: "var(--footer-cta-inner-bg)",
              borderColor: "var(--footer-cta-border-color)",
              boxShadow: "var(--footer-cta-shadow)",
            }}
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] mx-auto"
              style={{ color: "var(--footer-cta-text-secondary)" }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.70 0.18 47.64) 0, oklch(0.50 0.15 47.64) 100%)",
                  boxShadow: "var(--footer-cta-dot-glow)",
                }}
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
            </div>

            {/* Heading */}
            <h2
              id="footer-newsletter-heading"
              className="text-[clamp(1.5rem,4vw,2.1rem)] font-semibold tracking-[0.01em]"
              style={{
                color: "var(--footer-cta-text-primary)",
                textShadow: "0 8px 22px rgba(0, 0, 0, 0.1)",
              }}
            >
              {heading}
            </h2>

            {/* Subtext */}
            {subtext && (
              <p
                className="text-[0.9rem] max-w-[32rem] mx-auto"
                style={{ color: "var(--footer-cta-text-secondary)" }}
              >
                {subtext}
              </p>
            )}

            {/* Newsletter form */}
            <form
              onSubmit={handleSubmit}
              className="relative max-w-lg mx-auto w-full mt-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full pl-6 pr-44 py-4 rounded-full border-0 bg-white dark:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-lg"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-orange-500 text-white text-sm font-medium uppercase hover:bg-orange-600 transition-colors shadow-md"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
);
FooterCTANewsletter.displayName = "FooterCTANewsletter";

export { FooterCTA, FooterCTANewsletter };
