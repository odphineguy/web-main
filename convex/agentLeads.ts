import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a lead captured by an AI agent (site chatbot or phone agent).
export const saveAgentLead = mutation({
  args: {
    serverSecret: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    notes: v.optional(v.string()),
    language: v.optional(v.string()),
    referralSource: v.string(),
    transcript: v.optional(v.string()),
    bookingUid: v.optional(v.string()),
    bookingStart: v.optional(v.string()),
    callerNumber: v.optional(v.string()),
    conversationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!process.env.FORM_SUBMISSION_SECRET || args.serverSecret !== process.env.FORM_SUBMISSION_SECRET) {
      throw new Error("Unauthorized");
    }
    const id = await ctx.db.insert("agentLeads", {
      name: args.name?.slice(0, 100),
      email: args.email?.slice(0, 254),
      phone: args.phone?.slice(0, 40),
      company: args.company?.slice(0, 160),
      notes: args.notes?.slice(0, 6000),
      language: args.language?.slice(0, 5),
      referralSource: args.referralSource.slice(0, 80),
      transcript: args.transcript?.slice(0, 100_000),
      bookingUid: args.bookingUid?.slice(0, 120),
      bookingStart: args.bookingStart?.slice(0, 40),
      callerNumber: args.callerNumber?.slice(0, 40),
      conversationId: args.conversationId?.slice(0, 120),
      submittedAt: Date.now(),
    });
    return id;
  },
});

// Get recent agent leads (for admin)
export const getAgentLeads = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !process.env.ADMIN_EMAIL || identity.email !== process.env.ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("agentLeads")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(Math.min(Math.max(args.limit ?? 50, 1), 100));
  },
});
