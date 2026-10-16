"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Engagement snapshot card: an honest, obviously illustrative anchor that sits
// over the hero globe. Document-style definition rows (label left, value
// right) divided by hairlines. Fully static: no animation, no banned effects.
export function HeroProofCard() {
  const { t } = useI18n();

  const rows = [
    { label: t("home.hero.proof.scope.label"), value: t("home.hero.proof.scope.value") },
    { label: t("home.hero.proof.stack.label"), value: t("home.hero.proof.stack.value") },
    { label: t("home.hero.proof.timeline.label"), value: t("home.hero.proof.timeline.value") },
  ];

  return (
    <aside
      aria-label={t("home.hero.proof.label")}
      className="card w-full p-6 text-left shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {t("home.hero.proof.label")}
        </p>
      </div>
      <dl className="mt-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 border-t border-hairline py-3.5"
          >
            <dt className="shrink-0 text-[13px] text-muted">{row.label}</dt>
            <dd className="text-right text-sm font-medium text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-hairline pt-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
        >
          {t("home.hero.proof.link")}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
