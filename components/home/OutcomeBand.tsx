"use client";

import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

// Outcome band (the registry's outcome-numerals composition): four honest,
// modest numbers the studio can be held to, set as oversized tabular numerals
// over one result sentence each. Hairline columns on desktop, a two-by-two
// grid on small screens. No other section on the page uses this shape.
const ITEMS = [1, 2, 3, 4];

export function OutcomeBand() {
  const { t } = useI18n();

  return (
    <Section className="rule" animSection="h-06">
      <div className="max-w-2xl">
        <p data-anim="outcome-eyebrow" className="eyebrow">
          {t("home.outcome.meta.label")}
        </p>
        <h2
          data-anim="outcome-title"
          className="h2 mt-4 text-4xl text-foreground md:text-5xl"
        >
          {t("home.outcome.meta.value")}
        </h2>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {ITEMS.map((n, i) => (
          <div key={n} className="h-full">
            <div
              data-anim="stat"
              className={`h-full border-hairline lg:border-l lg:pl-8 ${
                i === 0 ? "lg:border-l-0 lg:pl-0" : ""
              }`}
            >
              <p
                data-anim="stat-num"
                className="stat-num text-6xl leading-none text-foreground md:text-7xl"
              >
                {t(`home.outcome.${n}.num`)}
              </p>
              <p
                data-anim="stat-label"
                className="mt-5 max-w-[16rem] text-[15px] leading-relaxed text-muted"
              >
                {t(`home.outcome.${n}.text`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
