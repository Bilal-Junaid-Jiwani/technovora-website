import type { ReactNode } from "react";

export interface ArticleMeta {
  slug: string;
  titleKey: string;
  descKey: string;
  topicKey: string;
  readKey: string;
  seasonKey: string;
  metaTitle: string;
  metaDescription: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "ship-production-software-three-weeks",
    titleKey: "blog3.post.1.title",
    descKey: "blog3.post.1.desc",
    topicKey: "blog3.topic.process",
    readKey: "blog3.post.1.read",
    seasonKey: "blog3.post.1.season",
    metaTitle: "Ship production software in three weeks",
    metaDescription:
      "What a three-week build actually is: ruthless scoping, weekly demos, and a handover you can own.",
  },
  {
    slug: "ai-agents-operations-what-works",
    titleKey: "blog3.post.2.title",
    descKey: "blog3.post.2.desc",
    topicKey: "blog3.topic.ai",
    readKey: "blog3.post.2.read",
    seasonKey: "blog3.post.2.season",
    metaTitle: "AI agents for operations: what actually works",
    metaDescription:
      "Where AI agents genuinely help in operations, where they quietly fail, and the three rules that keep them running.",
  },
  {
    slug: "website-performance-revenue-feature",
    titleKey: "blog3.post.3.title",
    descKey: "blog3.post.3.desc",
    topicKey: "blog3.topic.engineering",
    readKey: "blog3.post.3.read",
    seasonKey: "blog3.post.3.season",
    metaTitle: "Website performance as a revenue feature",
    metaDescription:
      "Core Web Vitals in plain English, what to measure before you optimize, and what a rebuild actually changes.",
  },
];

export function ArticleTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted">
      <span className="h-[2px] w-5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
