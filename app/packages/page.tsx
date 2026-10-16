import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { packages as copy } from "@/lib/i18n/en/packages";
import { EstimationQuiz } from "@/components/packages/EstimationQuiz";

export const metadata: Metadata = buildMetadata({
  title: "Project estimation",
  description: copy["packages.hero.sub"],
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <div className="bg-background text-foreground">
      <EstimationQuiz />
    </div>
  );
}
