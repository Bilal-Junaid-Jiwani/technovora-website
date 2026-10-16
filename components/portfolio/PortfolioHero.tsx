"use client";

import { useI18n } from "@/lib/i18n";

/**
 * PortfolioHero — registry / index header (round 3).
 * Oversized display statement, then an index ledger strip: the engagement
 * count, the "on this page" label, and the anonymization method line.
 * Left-aligned on desktop, stacks cleanly on mobile. The count and method
 * line keep the page's honesty visible from the first screen.
 */
export function PortfolioHero() {
  const { t } = useI18n();
  return (
    <section data-anim-section="pf-01" className="container-x pt-16 md:pt-24">
      <div>
        <p className="eyebrow">{t("portfolio.hero.eyebrow")}</p>
        <h1 data-anim="pf-title" className="display mt-6 max-w-4xl text-6xl text-foreground md:text-8xl">
          {t("portfolio.hero.title")}
        </h1>
        <p className="lead mt-7 max-w-2xl">{t("portfolio.hero.sub")}</p>
      </div>
      <div>
        <div data-anim="pf-meta" className="rule mt-14 grid gap-6 py-7 sm:grid-cols-3 sm:items-end md:mt-20">
          <p className="flex items-baseline gap-3">
            <span className="stat-num display text-5xl text-foreground">
              9
            </span>
            <span className="text-sm font-medium text-muted">
              {t("portfolio.hero.count")}
            </span>
          </p>
          <p className="text-sm font-medium text-faint">
            {t("portfolio.hero.indexLabel")}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            {t("portfolio.hero.method")}
          </p>
        </div>
      </div>
    </section>
  );
}
