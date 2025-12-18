"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";
import { useTheme } from "next-themes";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: (error?: any) => void;
  onExpire?: () => void;
}

export default function TurnstileWidget({ onVerify, onError, onExpire }: TurnstileWidgetProps) {
  const ref = useRef<TurnstileInstance>(null);
  const { theme } = useTheme();

  return (
    <div className="flex justify-center my-4">
      <Turnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
        options={{
          theme: theme === "dark" ? "dark" : "light",
          action: "submit-form",
        }}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
      />
    </div>
  );
}
