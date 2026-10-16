"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

// Objection-handling FAQ: sticky header on the left, hairline accordion on
// the right, the plus held in a hairline ring. Accordion behavior unchanged
// (aria wiring kept exactly as before).
const ITEMS = [1, 2, 3, 4, 5];

export function FaqAccordion() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (n: number) => setOpen((prev) => (prev === n ? null : n));

  return (
    <Section className="rule" id="faq" animSection="h-07">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky header */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-anim="faq-header">
            <p className="eyebrow">{t("home.faq.meta.label")}</p>
            <h2 className="h2 mt-4 text-4xl text-foreground md:text-5xl">
              {t("home.faq.meta.value")}
            </h2>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-b border-hairline">
          {ITEMS.map((n) => {
            const isOpen = open === n;
            return (
              <div key={n}>
                <div
                  data-anim="faq-row"
                  className="relative border-t border-hairline"
                >
                  <span
                    aria-hidden="true"
                    data-anim="faq-line"
                    className="pointer-events-none absolute -top-px left-0 z-10 h-px w-full origin-left bg-hairline"
                  />
                  <button
                    data-anim="faq-button"
                    type="button"
                    onClick={() => toggle(n)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${n}`}
                    id={`faq-button-${n}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span
                      data-anim="faq-question"
                      className="text-lg font-medium tracking-tight text-foreground md:text-xl"
                    >
                      {t(`home.faq.${n}.q`)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-accent text-accent"
                          : "border-hairline text-muted"
                      }`}
                    >
                      <Plus
                        className={`h-4.5 w-4.5 transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${n}`}
                    role="region"
                    aria-labelledby={`faq-button-${n}`}
                    hidden={!isOpen}
                  >
                    <div data-anim="faq-answer">
                      <p className="max-w-3xl pb-7 text-[15px] leading-relaxed text-muted md:pb-8">
                        {t(`home.faq.${n}.a`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
