"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { WorkArtifact } from "./WorkArtifacts";
import { Section } from "@/components/ui/Section";

// Featured work as an editorial index on the page's single tinted band:
// hairline rows with the engagement kind set as a small accent label, a large
// title, and the summary held in its own column. Each row carries a miniature
// of the deliverable interface (WorkArtifacts). Anonymized engagement
// summaries only: no client names, no metrics, no screenshots.
const ITEMS = [
  { n: 1, num: "01" },
  { n: 2, num: "02" },
  { n: 3, num: "03" },
];

export function FeaturedWork() {
  const { t } = useI18n();

  return (
    <Section band animSection="h-03">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div data-anim="work-block" className="max-w-2xl">
          <p className="eyebrow">{t("home.work.eyebrow")}</p>
          <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
            {t("home.work.title")}
          </h2>
          <p className="lead mt-5">{t("home.work.sub")}</p>
        </div>
        <div data-anim="work-block">
          <Link href="/portfolio" className="btn-secondary">
            {t("home.work.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-14 border-b border-hairline">
        {ITEMS.map((item) => (
          <div key={item.n}>
            <article
              data-anim="work-block"
              className="grid gap-5 border-t border-hairline py-9 md:grid-cols-12 md:gap-8 md:py-11"
            >
              <p className="stat-num text-sm text-faint md:col-span-1 md:pt-2.5">
                {item.num}
              </p>
              <div
                data-anim="work-visual"
                className="min-w-0 md:col-span-4"
              >
                <WorkArtifact n={item.n as 1 | 2 | 3} />
              </div>
              <div className="min-w-0 md:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {t(`home.work.${item.n}.kind`)}
                </p>
                <h3 className="h3 mt-3 text-[1.7rem] text-foreground md:text-[2rem]">
                  {t(`home.work.${item.n}.title`)}
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-muted md:col-span-3 md:pt-9">
                {t(`home.work.${item.n}.desc`)}
              </p>
            </article>
          </div>
        ))}
      </div>

      <div data-anim="work-block">
        <p className="mt-8 text-sm text-faint">{t("home.work.note")}</p>
      </div>
    </Section>
  );
}
