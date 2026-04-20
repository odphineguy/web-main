import type { Answers, TierId } from "./pricingData";

export type RationaleKey =
  | "starterFast"
  | "starterChatbotFast"
  | "businessBilingualFast"
  | "businessBoth"
  | "businessMedium"
  | "professionalComplex"
  | "professionalFlexible";

export interface Recommendation {
  /** The suggested tier, or null if we should route to consultation instead. */
  tierId: TierId | null;
  /** One alternate tier to show inline on "See alternate". */
  altId: TierId | null;
  /** Translation key for the "because…" sentence under the tier card. */
  rationaleKey: RationaleKey | null;
  /** When true, the flow should route to a consultation call instead of showing a tier. */
  needsConsult: boolean;
}

const consultResult: Recommendation = {
  tierId: null,
  altId: null,
  rationaleKey: null,
  needsConsult: true,
};

export function recommend(answers: Answers): Recommendation {
  const { product, bilingual, timeline } = answers;

  if (!product || !bilingual || !timeline) {
    return { ...consultResult, needsConsult: false };
  }

  if (product === "other") return consultResult;

  const wantsBilingual = bilingual === "yes";
  const building = product;

  // Both product lines → Business by default; Professional when bilingual + longer timeline.
  if (building === "both") {
    if (timeline === "medium" && wantsBilingual) {
      return {
        tierId: "professional",
        altId: "business",
        rationaleKey: "professionalComplex",
        needsConsult: false,
      };
    }
    return {
      tierId: "business",
      altId: "professional",
      rationaleKey: "businessBoth",
      needsConsult: false,
    };
  }

  // Single product line (website or chatbot).
  if (timeline === "fast") {
    if (wantsBilingual) {
      return {
        tierId: "business",
        altId: "starter",
        rationaleKey: "businessBilingualFast",
        needsConsult: false,
      };
    }
    return {
      tierId: "starter",
      altId: "business",
      rationaleKey: building === "chatbot" ? "starterChatbotFast" : "starterFast",
      needsConsult: false,
    };
  }

  if (timeline === "medium") {
    return {
      tierId: "business",
      altId: "professional",
      rationaleKey: "businessMedium",
      needsConsult: false,
    };
  }

  // flexible
  if (wantsBilingual) {
    return {
      tierId: "professional",
      altId: "business",
      rationaleKey: "professionalFlexible",
      needsConsult: false,
    };
  }
  return {
    tierId: "starter",
    altId: "business",
    rationaleKey: building === "chatbot" ? "starterChatbotFast" : "starterFast",
    needsConsult: false,
  };
}
