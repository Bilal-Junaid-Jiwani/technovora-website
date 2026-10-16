"use client";

import { useI18n } from "@/lib/i18n";

const FACTS = [1, 2, 3];

/**
 * Split editorial header (registry /services #1): the title owns the left
 * column; the right column carries the lede and a stacked facts list ruled
 * off by hairlines. No stat band, no centred hero.
 * Animated by ServicesIndexAnimator (S-01 Horizontal Line Sweep).
 */
export function ServicesHero() {
  const { t } = useI18n();

  return (
    <section data-anim-section="s-01" className="bg-background">
      <div className="container-x pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-7">
            <p data-anim="eyebrow" className="eyebrow">
              {t("servicesidx.hero.eyebrow")}
            </p>
            <h1
              data-anim="title"
              className="display mt-6 text-5xl text-foreground md:text-6xl lg:text-7xl"
            >
              {t("servicesidx.hero.title")}
            </h1>
          </div>

          <div className="md:col-span-5 md:pt-14">
            <div>
              <p data-anim="lede" className="lead max-w-[46ch]">
                {t("servicesidx.hero.lede")}
              </p>
            </div>
            <div>
              <dl className="mt-10">
                {FACTS.map((n) => (
                  <div
                    data-anim="fact"
                    key={n}
                    className="grid grid-cols-[7.5rem_minmax(0,1fr)] md:grid-cols-[9.5rem_minmax(0,1fr)] items-baseline gap-5 border-t border-hairline py-5 last:border-b"
                  >
                    <dt className="stat-num text-xl text-foreground">
                      {t(`servicesidx.hero.fact${n}.value`)}
                    </dt>
                    <dd className="text-[15px] leading-relaxed text-muted">
                      {t(`servicesidx.hero.fact${n}.label`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
