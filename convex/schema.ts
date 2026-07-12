import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Conversations table to store chat sessions
  conversations: defineTable({
    sessionId: v.string(), // Unique identifier for each chat session
    startedAt: v.number(), // Timestamp when conversation started
    lastMessageAt: v.number(), // Timestamp of last message
    userAgent: v.optional(v.string()), // Browser/device info
    pageUrl: v.optional(v.string()), // Page where chat was initiated
    status: v.string(), // "active" | "closed"
  })
    .index("by_session", ["sessionId"])
    .index("by_status", ["status"])
    .index("by_lastMessage", ["lastMessageAt"]),

  // Messages table to store individual messages
  messages: defineTable({
    conversationId: v.id("conversations"), // Reference to parent conversation
    role: v.string(), // "user" | "model" | "error"
    text: v.string(), // Message content
    timestamp: v.number(), // When message was sent
    hasImage: v.optional(v.boolean()), // Whether message included an image
  })
    .index("by_conversation", ["conversationId"])
    .index("by_timestamp", ["timestamp"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    submittedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_submittedAt", ["submittedAt"]),

  // Demo-call CTA clicks ("Call Elena") for attribution
  demoCallClicks: defineTable({
    clickedAt: v.number(),
    locale: v.string(),
    source: v.optional(v.string()), // e.g. "hero" | "footer"
    userAgent: v.optional(v.string()),
  }).index("by_clickedAt", ["clickedAt"]),

  // Consultation form submissions
  consultationSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    description: v.string(),
    submittedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_submittedAt", ["submittedAt"]),
});
