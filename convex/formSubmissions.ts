import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a contact form submission
export const saveContactSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      submittedAt: Date.now(),
    });
    return id;
  },
});

// Save a consultation form submission
export const saveConsultationSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("consultationSubmissions", {
      ...args,
      submittedAt: Date.now(),
    });
    return id;
  },
});

// Get recent contact submissions (for admin)
export const getContactSubmissions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(args.limit ?? 50);
    return submissions;
  },
});

// Get recent consultation submissions (for admin)
export const getConsultationSubmissions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("consultationSubmissions")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(args.limit ?? 50);
    return submissions;
  },
});
