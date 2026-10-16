import { buildMetadata } from "@/lib/metadata";
import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { BlogCta } from "@/components/blog/BlogCta";
import { BlogAnimator } from "@/components/motion/BlogAnimator";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical notes on shipping software, using AI agents well, and treating performance as a product decision.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="bg-background">
      <BlogAnimator>
        <BlogHero />
        <FeaturedArticle />
        <ArticleGrid />
        <BlogCta />
      </BlogAnimator>
    </div>
  );
}
