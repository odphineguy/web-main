import type { Answers, ScopeId } from "./pricingData";

export type RationaleKey =
  | "voiceFast"
  | "voiceDefault"
  | "pipelineDefault"
  | "platformFleet"
  | "platformDefault";

export interface Recommendation {
  /** The suggested scope, or null if we should route to a consultation instead. */
  scopeId: ScopeId | null;
  /** One alternate scope to show inline on "See alternate". */
  altId: ScopeId | null;
  /** Translation key for the "because…" sentence under the scope card. */
  rationaleKey: RationaleKey | null;
  /** When true, the flow should route to a consultation call instead of showing a scope. */
  needsConsult: boolean;
}

const consultResult: Recommendation = {
  scopeId: null,
  altId: null,
  rationaleKey: null,
  needsConsult: true,
};

export function recommend(answers: Answers): Recommendation {
  const { need, size, timeline } = answers;

  if (need === "unsure") return consultResult;

  if (!need || !size || !timeline) {
    return { ...consultResult, needsConsult: false };
  }

  if (need === "phones") {
    return {
      scopeId: "voice",
      altId: "pipeline",
      rationaleKey: timeline === "fast" ? "voiceFast" : "voiceDefault",
      needsConsult: false,
    };
  }

  if (need === "leads") {
    return {
      scopeId: "pipeline",
      altId: "voice",
      rationaleKey: "pipelineDefault",
      needsConsult: false,
    };
  }

  // operations
  return {
    scopeId: "platform",
    altId: "pipeline",
    rationaleKey: size === "fleet" ? "platformFleet" : "platformDefault",
    needsConsult: false,
  };
}
