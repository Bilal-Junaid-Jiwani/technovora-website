import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { ProjectIndex } from "@/components/portfolio/ProjectIndex";
import { MethodNote } from "@/components/portfolio/MethodNote";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { PortfolioAnimator } from "@/components/motion/PortfolioAnimator";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Selected work: SaaS onboarding flows, internal dashboards, AI assistants, and storefront rebuilds. Real engagements, anonymized where under NDA.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-background text-foreground">
      <PortfolioAnimator>
        <PortfolioHero />
        <WorkGallery />
        <FeaturedProject />
        <ProjectIndex />
        <MethodNote />
        <PortfolioCta />
      </PortfolioAnimator>
    </div>
  );
}
