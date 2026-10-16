"use client";

import { useI18n } from "@/lib/i18n";

/**
 * BlogHero — studio journal masthead (round 3).
 * A journal, not a marketing hero: the wordmark-scale title sits left,
 * the meta line and a hairline index ledger (issue · author) sit below.
 * Quiet, typographic, unmistakably a different room from /portfolio.
 * Animation: B-01 Masthead Bloom (see BlogAnimator).
 */
export function BlogHero() {
  const { t } = useI18n();
  return (
    <section data-anim-section="b-01" className="border-b border-hairline bg-background">
      <div className="container-x pb-16 pt-20 md:pb-24 md:pt-32">
        <p data-anim="eyebrow" className="eyebrow">{t("nav.blog")}</p>
        <h1 className="display mt-6 text-6xl text-foreground md:text-8xl">
          <span className="block overflow-hidden">
            <span data-anim="title-inner" className="block">
              {t("blog3.hero.title")}
            </span>
          </span>
        </h1>
        <p data-anim="lede" className="lead mt-7 max-w-2xl">{t("blog3.hero.meta")}</p>
        <div
          data-anim="rule"
          className="rule mt-14 flex flex-wrap items-baseline justify-between gap-3 pt-6 text-sm"
        >
          <span data-anim="meta-item" className="font-medium text-foreground">
            {t("blog3.hero.index")}
          </span>
          <span data-anim="meta-item" className="text-muted">{t("blog3.article.author")}</span>
        </div>
      </div>
    </section>
  );
}
