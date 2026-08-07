export type LeadAttribution = {
  landingPage?: string;
  firstTouchSource?: string;
  utmCampaign?: string;
};

const STORAGE_KEY = "abe-media-first-touch-v1";

function clean(value: string | null, max = 120) {
  return value?.trim().slice(0, max) || undefined;
}

function referrerSource(referrer: string) {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (/chatgpt\.com|openai\.com/.test(host)) return "ChatGPT";
    if (/claude\.ai|anthropic\.com/.test(host)) return "Claude";
    if (/perplexity\.ai/.test(host)) return "Perplexity";
    if (/bing\.com|copilot\.microsoft\.com/.test(host)) return "Bing or Copilot";
    if (/google\./.test(host)) return "Google";
    return host.slice(0, 120);
  } catch {
    return "referral";
  }
}

export function captureFirstTouch() {
  if (typeof window === "undefined" || window.localStorage.getItem(STORAGE_KEY)) return;
  const params = new URLSearchParams(window.location.search);
  const record: LeadAttribution = {
    // Keep the path, not the full URL, so unrelated or sensitive query-string
    // values are not retained in lead attribution.
    landingPage: clean(window.location.pathname, 240),
    firstTouchSource: clean(params.get("utm_source")) || referrerSource(document.referrer),
    utmCampaign: clean(params.get("utm_campaign")),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};
  captureFirstTouch();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as LeadAttribution;
    return {
      landingPage: clean(parsed.landingPage ?? null, 240),
      firstTouchSource: clean(parsed.firstTouchSource ?? null),
      utmCampaign: clean(parsed.utmCampaign ?? null),
    };
  } catch {
    return {};
  }
}
