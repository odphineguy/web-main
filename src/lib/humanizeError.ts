/**
 * Maps raw server error messages to user-friendly strings.
 * Keep messages specific enough to hint at a fix, short enough to fit in a banner.
 */
export function humanizeError(raw: unknown): string {
  const message = typeof raw === "string"
    ? raw
    : raw instanceof Error
      ? raw.message
      : "";

  const lower = message.toLowerCase();

  if (!message || lower.includes("failed to fetch") || lower.includes("networkerror")) {
    return "Couldn't reach the server. Check your internet connection and try again.";
  }
  if (lower.includes("timeout")) {
    return "The request took too long. Try again in a moment.";
  }
  if (lower.includes("turnstile") || lower.includes("verification")) {
    return "The verification check didn't pass. Refresh the page and try again.";
  }
  if (lower.includes("rate") && lower.includes("limit")) {
    return "Too many requests. Wait a minute and try again.";
  }
  if (lower.includes("email")) {
    return "Something's off with the email field. Double-check the address and try again.";
  }

  // Guard against raw JSON.stringify output reaching the user.
  if (message.startsWith("{") || message.startsWith("[")) {
    return "Something went wrong on our end. Please try again, or email abe@abemedia.online.";
  }

  // Reasonable server messages pass through unchanged; otherwise fall back.
  if (message.length > 140) {
    return "Something went wrong on our end. Please try again, or email abe@abemedia.online.";
  }
  return message;
}

export function isValidEmail(value: string): boolean {
  // Simple, forgiving check — actual verification happens server-side.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
