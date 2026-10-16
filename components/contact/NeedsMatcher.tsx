"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * NeedsMatcher - 3-question needs-matcher.
 * Three light questions (need, timeline, budget) → a recommended service
 * plus a pre-filled mailto CTA. Every action is real; the matcher is
 * a guide, not a verdict. Logic unchanged; Round 3 sets the questions as
 * quiet hairline rows with a small radio tick, not gamified cards.
 */

const NEEDS: { key: string; service: string }[] = [
  { key: "contact3.matcher.q1.a", service: "web-development" },
  { key: "contact3.matcher.q1.b", service: "web-development" },
  { key: "contact3.matcher.q1.c", service: "mobile-apps" },
  { key: "contact3.matcher.q1.d", service: "ai-automation" },
  { key: "contact3.matcher.q1.e", service: "design" },
  { key: "contact3.matcher.q1.f", service: "cloud-devops" },
  { key: "contact3.matcher.q1.g", service: "smm" },
];

const TIMELINES = [
  "contact3.matcher.q2.a",
  "contact3.matcher.q2.b",
  "contact3.matcher.q2.c",
  "contact3.matcher.q2.d",
];

const BUDGETS = [
  "contact3.matcher.q3.a",
  "contact3.matcher.q3.b",
  "contact3.matcher.q3.c",
  "contact3.matcher.q3.d",
];

function Question({
  n,
  title,
  options,
  selected,
  onSelect,
}: {
  n: string;
  title: string;
  options: string[];
  selected: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <div data-anim="question">
      <p className="flex items-baseline gap-4">
        <span className="stat-num shrink-0 text-sm text-accent" aria-hidden="true">
          {n}
        </span>
        <span className="h3 text-lg text-foreground">{title}</span>
      </p>
      <div
        className="mt-4 divide-y divide-hairline border-y border-hairline"
        role="group"
        aria-label={title}
      >
        {options.map((label, i) => {
          const active = selected === i;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(i)}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-1 py-3 text-left text-[0.95rem] transition-colors",
                active ? "text-foreground" : "text-muted hover:bg-card hover:text-foreground",
              )}
            >
              <span className={active ? "font-medium" : undefined}>{label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors",
                  active ? "border-accent" : "border-faint",
                )}
              >
                {active && <span className="h-2 w-2 rounded-full bg-accent" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NeedsMatcher() {
  const { t } = useI18n();
  const [need, setNeed] = useState<number | null>(null);
  const [timeline, setTimeline] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);

  const done = need !== null && timeline !== null && budget !== null;

  const reset = () => {
    setNeed(null);
    setTimeline(null);
    setBudget(null);
  };

  const result = done
    ? (() => {
        const needDef = NEEDS[need];
        const serviceName = t(`svc.${needDef.service}.hero.eyebrow`);
        const reason = t(`contact3.matcher.svc.${needDef.service}.reason`);
        const sales = t("common.email.sales");
        const subject = `Project inquiry: ${serviceName}`;
        const body = [
          "Hi,",
          "",
          `What I need: ${t(needDef.key)}`,
          `Timeline: ${t(TIMELINES[timeline])}`,
          `Rough budget: ${t(BUDGETS[budget])}`,
          "",
          `I used your needs matcher and it recommended ${serviceName}.`,
          "",
          "Thanks!",
        ].join("\n");
        const href = `mailto:${sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return { service: needDef.service, serviceName, reason, href };
      })()
    : null;

  return (
    <Section band animSection="ct-03">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div data-anim="matcher-intro">
          <p className="eyebrow">{t("contact3.matcher.eyebrow")}</p>
          <h2 className="h2 mt-4 text-3xl text-foreground md:text-4xl">
            {t("contact3.matcher.title")}
          </h2>
          <p className="lead mt-4 max-w-[52ch] text-[1.05rem]">{t("contact3.matcher.desc")}</p>
        </div>

        <div className="grid gap-10">
            <Question
              n="01"
              title={t("contact3.matcher.q1")}
              options={NEEDS.map((n) => t(n.key))}
              selected={need}
              onSelect={setNeed}
            />
            <Question
              n="02"
              title={t("contact3.matcher.q2")}
              options={TIMELINES.map((k) => t(k))}
              selected={timeline}
              onSelect={setTimeline}
            />
            <Question
              n="03"
              title={t("contact3.matcher.q3")}
              options={BUDGETS.map((k) => t(k))}
              selected={budget}
              onSelect={setBudget}
            />
        </div>
      </div>

      {result && (
        <div data-anim="result-wrap" className="mt-14">
          <div
            data-anim="result-card"
            className="rounded-2xl border border-hairline bg-surface p-8 md:p-10"
          >
            <p className="eyebrow">{t("contact3.matcher.result.label")}</p>
            <h3 className="display mt-3 text-3xl text-foreground md:text-4xl">
              {result.serviceName}
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              {t("contact3.matcher.result.lead")} {result.reason}
            </p>
            <div data-anim="result-cta" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={result.href} className="btn-primary">
                {t("contact3.matcher.result.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href={`/services/${result.service}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
              >
                {t("contact3.matcher.result.service")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                {t("contact3.matcher.reset")}
              </button>
            </div>
            <p className="mt-6 text-sm text-muted">{t("contact3.matcher.note")}</p>
          </div>
        </div>
      )}
    </Section>
  );
}
