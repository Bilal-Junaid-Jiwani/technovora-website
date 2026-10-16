"use client";

import { Check, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * Good-fit / not-a-fit (registry /services #3): two plain columns on the
 * tinted band, separated by a single vertical hairline. No cards, no
 * icon chips. The not-a-fit column is set in muted type on purpose:
 * the honesty is the point.
 * Animated by ServicesIndexAnimator (S-03 Convergence Columns); the centre
 * divider is an animatable element that grows as the columns meet.
 */
export function FitGuide() {
  const { t } = useI18n();
  const good = [1, 2, 3, 4].map((i) => t(`servicesidx.fit.good.${i}`));
  const bad = [1, 2, 3, 4].map((i) => t(`servicesidx.fit.bad.${i}`));

  return (
    <section data-anim-section="s-03" className="band">
      <div className="section container-x">
        <div data-anim="header" className="max-w-2xl">
          <p className="eyebrow">{t("servicesidx.fit.eyebrow")}</p>
          <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
            {t("servicesidx.fit.title")}
          </h2>
        </div>

        <div className="relative mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-0">
          <div data-anim="good" className="md:pr-12 lg:pr-16">
            <h3 className="h3 text-xl text-foreground">
              {t("servicesidx.fit.good.title")}
            </h3>
            <ul className="mt-7 space-y-5">
              {good.map((item) => (
                <li
                  data-anim="item"
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-foreground"
                >
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-anim="bad"
            className="border-t border-hairline pt-12 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16"
          >
            <h3 className="h3 text-xl text-foreground">
              {t("servicesidx.fit.bad.title")}
            </h3>
            <ul className="mt-7 space-y-5">
              {bad.map((item) => (
                <li
                  data-anim="item"
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-muted"
                >
                  <X
                    className="mt-1 h-5 w-5 shrink-0 text-faint"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-anim="divider"
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-px bg-hairline md:block"
          />
        </div>
      </div>
    </section>
  );
}
