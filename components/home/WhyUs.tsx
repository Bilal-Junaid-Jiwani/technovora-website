"use client";

import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

// Negation block (the registry's anti-positioning composition): three
// struck-through statements set as large editorial rows, closed by the plain
// "what we are" statement behind a single accent rule. Left-aligned
// throughout; no alternating zigzag.
const NEGATIONS = [1, 2, 3];

export function WhyUs() {
  const { t } = useI18n();

  return (
    <Section className="rule" animSection="h-04">
      <div className="max-w-2xl">
        <p data-anim="why-eyebrow" className="eyebrow">
          {t("home.anti.meta.label")}
        </p>
        <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
          {t("home.anti.meta.value")}
        </h2>
      </div>

      <div className="mt-12 border-b border-hairline md:mt-14">
        {NEGATIONS.map((n) => (
          <div key={n}>
            <p
              data-anim="neg-line"
              className="border-t border-hairline py-8 text-[1.6rem] font-semibold leading-[1.18] tracking-[-0.03em] text-muted line-through decoration-foreground/25 decoration-2 md:py-10 md:text-[2.6rem]"
            >
              {t(`home.anti.${n}`)}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="mt-14 flex max-w-4xl gap-6 md:mt-16 md:gap-8">
          <span
            aria-hidden="true"
            className="w-[3px] shrink-0 rounded-full bg-accent"
          />
          <p
            data-anim="statement"
            className="display text-[1.55rem] leading-[1.25] text-foreground md:text-[2.35rem] md:leading-[1.2]"
          >
            {t("home.anti.statement")}
          </p>
        </div>
      </div>
    </Section>
  );
}
