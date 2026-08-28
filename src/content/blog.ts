// Blog roster — the AEO content program (see AEO content brief, Aug 2026).
// Every post is English-only until a native Spanish review exists, per the
// standing rule. Add new posts here; the index, sitemap, and internal links
// all read from this list.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "thumbtack-lead-automation",
    title: "AI That Answers Your Thumbtack Leads in Under a Minute",
    description:
      "How an official Thumbtack Pro API integration reads the job, quotes from your own rates, follows up, and books — with real numbers from a live deployment.",
    category: "Lead automation",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    readMinutes: 7,
  },
];
