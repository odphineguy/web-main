export class LeadValidationError extends Error {}

type Input = Record<string, unknown>;

export function asInput(value: unknown): Input {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new LeadValidationError("Invalid request body");
  }
  return value as Input;
}

export function requiredString(input: Input, key: string, max: number) {
  const value = input[key];
  if (typeof value !== "string") throw new LeadValidationError(`Invalid ${key}`);
  const normalized = value.trim();
  if (!normalized || normalized.length > max) throw new LeadValidationError(`Invalid ${key}`);
  return normalized;
}

export function optionalString(input: Input, key: string, max: number) {
  const value = input[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") throw new LeadValidationError(`Invalid ${key}`);
  const normalized = value.trim();
  if (normalized.length > max) throw new LeadValidationError(`Invalid ${key}`);
  return normalized || undefined;
}

export function validatedEmail(input: Input) {
  const email = requiredString(input, "email", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new LeadValidationError("Invalid email");
  }
  return email;
}

export function rejectOversizedRequest(contentLength: string | null, maxBytes = 25_000) {
  const bytes = Number(contentLength || 0);
  if (Number.isFinite(bytes) && bytes > maxBytes) {
    throw new LeadValidationError("Request body is too large");
  }
}
