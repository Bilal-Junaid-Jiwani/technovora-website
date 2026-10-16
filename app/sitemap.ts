import type { MetadataRoute } from "next";

const BASE_URL = "https://technovora.com";

const routes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/ai-automation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/web-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/mobile-apps", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/cloud-devops", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/smm", changeFrequency: "monthly", priority: 0.7 },
  { path: "/packages", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog/ship-production-software-three-weeks", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog/ai-agents-operations-what-works", changeFrequency: "yearly", priority: 0.6 },
  { path: "/blog/website-performance-revenue-feature", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
