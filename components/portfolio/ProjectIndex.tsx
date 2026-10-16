"use client";

import { useI18n } from "@/lib/i18n";

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * ProjectIndex — the outcome-first registry (round 3).
 * No section card, no band: the page's own hairlines carry the index.
 * Each row leads with the outcome, then the anonymized engagement name
 * and its stack. Rows brighten on hover; nothing here invents a client
 * or a metric (see MethodNote).
 */
export function ProjectIndex() {
  const { t } = useI18n();
  return (
    <section data-anim-section="pf-04" className="container-x py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="eyebrow">{t("portfolio.index.eyebrow")}</p>
        <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
          {t("portfolio.index.title")}
        </h2>
      </div>
      <div className="mt-14 border-t border-hairline">
        {ROWS.map((n) => (
          <div key={n}>
            <div data-anim="pf-row" className="relative grid gap-2 border-b border-hairline py-7 transition-colors hover:bg-surface md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:gap-8 md:px-4">
              <span aria-hidden data-anim="pf-spine" className="absolute inset-y-0 left-0 w-[2px] origin-top bg-accent" />
              <span className="stat-num display text-sm text-faint">
                {String(n).padStart(2, "0")}
              </span>
              <div>
                <p data-anim="pf-outcome" className="text-lg font-medium leading-snug text-foreground">
                  {t(`portfolio.index.${n}.outcome`)}
                </p>
                <p data-anim="pf-name" className="mt-1.5 text-sm text-faint">
                  {t(`portfolio.index.${n}.name`)}
                </p>
              </div>
              <p className="stat-num text-xs font-medium uppercase tracking-wider text-faint md:text-right">
                {t(`portfolio.index.${n}.stack`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
