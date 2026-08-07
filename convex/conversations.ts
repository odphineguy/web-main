import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new conversation session
export const createConversation = mutation({
  args: {
    sessionId: v.string(),
    userAgent: v.optional(v.string()),
    pageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!/^session_[0-9a-f-]{36}$/.test(args.sessionId)) throw new Error("Invalid session");
    const now = Date.now();
    const conversationId = await ctx.db.insert("conversations", {
      sessionId: args.sessionId,
      startedAt: now,
      lastMessageAt: now,
      userAgent: args.userAgent?.slice(0, 500),
      pageUrl: args.pageUrl?.slice(0, 240),
      status: "active",
    });
    return conversationId;
  },
});

// Add a message to a conversation
export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    sessionId: v.string(),
    role: v.string(),
    text: v.string(),
    hasImage: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (!/^session_[0-9a-f-]{36}$/.test(args.sessionId)) throw new Error("Invalid session");
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.sessionId !== args.sessionId) throw new Error("Unauthorized");
    if (!['user', 'model', 'error'].includes(args.role) || args.text.length > 8000) throw new Error("Invalid message");
    const now = Date.now();
    
    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: args.role,
      text: args.text,
      timestamp: now,
      hasImage: args.hasImage,
    });
    
    // Update conversation's lastMessageAt
    await ctx.db.patch(args.conversationId, {
      lastMessageAt: now,
    });
    
    return messageId;
  },
});

// Close a conversation
export const closeConversation = mutation({
  args: {
    conversationId: v.id("conversations"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.sessionId !== args.sessionId) throw new Error("Unauthorized");
    await ctx.db.patch(args.conversationId, {
      status: "closed",
    });
  },
});

// Get conversation by session ID
export const getConversationBySession = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    return conversation;
  },
});

// Get all messages for a conversation
export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.sessionId !== args.sessionId) throw new Error("Unauthorized");
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();
    return messages;
  },
});

// Get recent conversations (for admin dashboard - future feature)
export const getRecentConversations = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !process.env.ADMIN_EMAIL || identity.email !== process.env.ADMIN_EMAIL) throw new Error("Unauthorized");
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_lastMessage")
      .order("desc")
      .take(limit);
    return conversations;
  },
});

// Get conversation with messages (for admin view)
export const getConversationWithMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !process.env.ADMIN_EMAIL || identity.email !== process.env.ADMIN_EMAIL) throw new Error("Unauthorized");
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;
    
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();
    
    return {
      ...conversation,
      messages,
    };
  },
});
