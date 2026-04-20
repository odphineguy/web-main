export type ProductAnswer = "website" | "chatbot" | "both" | "other";
export type BilingualAnswer = "yes" | "english" | "unsure";
export type TimelineAnswer = "fast" | "medium" | "flexible";
export type TierId = "starter" | "business" | "professional";
export type AddOnId = "bilingual" | "seo" | "social" | "care";

export interface Answers {
  product?: ProductAnswer;
  bilingual?: BilingualAnswer;
  timeline?: TimelineAnswer;
}

export interface Tier {
  id: TierId;
  price: string; // display price, e.g. "$1,499"
}

export interface AddOn {
  id: AddOnId;
  price: string; // display price
  isMonthly: boolean;
  /** Bilingual add-on is only offered if the user picked English-only or unsure. */
  conditional?: (answers: Answers) => boolean;
}

export const tiers: Record<TierId, Tier> = {
  starter: { id: "starter", price: "$499" },
  business: { id: "business", price: "$1,499" },
  professional: { id: "professional", price: "$3,500" },
};

export const addOns: AddOn[] = [
  {
    id: "bilingual",
    price: "+$500",
    isMonthly: false,
    conditional: (a) => a.bilingual !== "yes",
  },
  { id: "seo", price: "$99", isMonthly: true },
  { id: "social", price: "$99", isMonthly: true },
  { id: "care", price: "$99", isMonthly: true },
];
