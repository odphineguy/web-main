export type NeedAnswer = "phones" | "leads" | "operations" | "unsure";
export type SizeAnswer = "solo" | "team" | "fleet";
export type TimelineAnswer = "fast" | "medium" | "flexible";
export type ScopeId = "voice" | "pipeline" | "platform";

export interface Answers {
  need?: NeedAnswer;
  size?: SizeAnswer;
  timeline?: TimelineAnswer;
}
