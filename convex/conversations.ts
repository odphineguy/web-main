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
    const now = Date.now();
    const conversationId = await ctx.db.insert("conversations", {
      sessionId: args.sessionId,
      startedAt: now,
      lastMessageAt: now,
      userAgent: args.userAgent,
      pageUrl: args.pageUrl,
      status: "active",
    });
    return conversationId;
  },
});

// Add a message to a conversation
export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    role: v.string(),
    text: v.string(),
    hasImage: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
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
  },
  handler: async (ctx, args) => {
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
  },
  handler: async (ctx, args) => {
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
    const limit = args.limit ?? 50;
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
