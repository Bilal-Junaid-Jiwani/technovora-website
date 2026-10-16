"use client";

import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

/**
 * NextSteps - what happens after you write.
 * Three editorial rows divided by hairlines: you write, a 30-minute call,
 * a clear written estimate. Small tabular numerals; the words do the work.
 * Animation: CT-04 Connector Grow (see ContactAnimator).
 */
const STEP_KEYS = ["contact3.next.1", "contact3.next.2", "contact3.next.3"];

export function NextSteps() {
  const { t } = useI18n();

  return (
    <Section animSection="ct-04">
      <div data-anim="steps-head" className="max-w-3xl">
        <p className="eyebrow">{t("contact3.next.eyebrow")}</p>
        <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
          {t("contact3.next.title")}
        </h2>
      </div>
      <ol className="relative mt-6">
        <span
          data-anim="connector"
          aria-hidden="true"
          className="absolute bottom-12 left-[0.72rem] top-12 w-[2px] origin-top rounded-full bg-accent/40"
        />
        {STEP_KEYS.map((key, i) => (
            <li
              key={key}
              data-anim="step"
              className="rule grid gap-3 py-9 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 md:py-10"
            >
              <span
                data-anim="step-badge"
                aria-hidden
                className="stat-num inline-block pt-1 text-base text-accent"
              >
                0{i + 1}
              </span>
              <div data-anim="step-text">
                <h3 className="h3 text-xl text-foreground md:text-2xl">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">
                  {t(`${key}.desc`)}
                </p>
              </div>
            </li>
        ))}
      </ol>
    </Section>
  );
}
