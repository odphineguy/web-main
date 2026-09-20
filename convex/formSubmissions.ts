import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a contact form submission
export const saveContactSubmission = mutation({
  args: {
    serverSecret: v.string(),
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    referralSource: v.string(),
    landingPage: v.optional(v.string()),
    firstTouchSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!process.env.FORM_SUBMISSION_SECRET || args.serverSecret !== process.env.FORM_SUBMISSION_SECRET) {
      throw new Error("Unauthorized");
    }
    const id = await ctx.db.insert("contactSubmissions", {
      name: args.name.slice(0, 100),
      email: args.email.slice(0, 254),
      subject: args.subject?.slice(0, 80),
      message: args.message.slice(0, 5000),
      referralSource: args.referralSource.slice(0, 80),
      landingPage: args.landingPage?.slice(0, 240),
      firstTouchSource: args.firstTouchSource?.slice(0, 120),
      utmCampaign: args.utmCampaign?.slice(0, 120),
      submittedAt: Date.now(),
    });
    return id;
  },
});

// Save a consultation form submission
export const saveConsultationSubmission = mutation({
  args: {
    serverSecret: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    description: v.string(),
    referralSource: v.string(),
    landingPage: v.optional(v.string()),
    firstTouchSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const isChatGptPluginLead = args.referralSource === "chatgpt-app";
    const hasWebsiteAccess = Boolean(
      process.env.FORM_SUBMISSION_SECRET && args.serverSecret === process.env.FORM_SUBMISSION_SECRET,
    );
    const hasPluginAccess = Boolean(
      isChatGptPluginLead &&
      process.env.CHATGPT_PLUGIN_SUBMISSION_SECRET &&
      args.serverSecret === process.env.CHATGPT_PLUGIN_SUBMISSION_SECRET,
    );
    if (!hasWebsiteAccess && !hasPluginAccess) {
      throw new Error("Unauthorized");
    }

    const submittedAt = Date.now();
    const email = isChatGptPluginLead ? args.email.trim().toLowerCase() : args.email;

    if (isChatGptPluginLead) {
      const oneDayAgo = submittedAt - 24 * 60 * 60 * 1000;
      const duplicate = await ctx.db
        .query("consultationSubmissions")
        .withIndex("by_email", (q) => q.eq("email", email))
        .filter((q) =>
          q.and(
            q.eq(q.field("referralSource"), "chatgpt-app"),
            q.gte(q.field("submittedAt"), oneDayAgo),
          ),
        )
        .first();

      if (duplicate) {
        throw new Error("A follow-up request for this email was already received in the last 24 hours.");
      }

      const recentPluginLeads = await ctx.db
        .query("consultationSubmissions")
        .withIndex("by_submittedAt", (q) => q.gte("submittedAt", oneDayAgo))
        .order("desc")
        .filter((q) => q.eq(q.field("referralSource"), "chatgpt-app"))
        .take(25);

      if (recentPluginLeads.length >= 25) {
        throw new Error("The ChatGPT plugin follow-up limit has been reached. Please try again later.");
      }
    }

    const id = await ctx.db.insert("consultationSubmissions", {
      name: args.name.slice(0, 100),
      email: email.slice(0, 254),
      phone: args.phone?.slice(0, 40),
      company: args.company?.slice(0, 160),
      service: args.service?.slice(0, 80),
      description: args.description.slice(0, 6000),
      referralSource: args.referralSource.slice(0, 80),
      landingPage: args.landingPage?.slice(0, 240),
      firstTouchSource: args.firstTouchSource?.slice(0, 120),
      utmCampaign: args.utmCampaign?.slice(0, 120),
      submittedAt,
    });
    return id;
  },
});

// Get recent contact submissions (for admin)
export const getContactSubmissions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !process.env.ADMIN_EMAIL || identity.email !== process.env.ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }
    const submissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(Math.min(Math.max(args.limit ?? 50, 1), 100));
    return submissions;
  },
});

// Get recent consultation submissions (for admin)
export const getConsultationSubmissions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !process.env.ADMIN_EMAIL || identity.email !== process.env.ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }
    const submissions = await ctx.db
      .query("consultationSubmissions")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(Math.min(Math.max(args.limit ?? 50, 1), 100));
    return submissions;
  },
});
