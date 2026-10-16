"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { ServiceBreadcrumb, CalendlyButton } from "./shared";

/* ── Sections ────────────────────────────────────────────────────────── */

/** Hero: headline, CTAs, and the task to result spine. */
export function SmmHero() {
  const { t } = useI18n();
  const spine = ["task", "solution", "result"].map((kind) => ({
    label: t(`svc2.smm.hero.spine.${kind}.label`),
    text: t(`svc2.smm.hero.spine.${kind}.text`),
  }));
  return (
    <section data-anim-section="sm-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="crumb">
          <ServiceBreadcrumb />
        </div>
        <div>
          <p data-anim="eyebrow" className="eyebrow mt-10">
            {t("svc2.smm.hero.eyebrow")}
          </p>
          <h1
            data-anim="title"
            className="display mt-5 max-w-3xl text-5xl text-foreground md:text-7xl"
          >
            {t("svc2.smm.hero.title")}
          </h1>
          <p data-anim="lede" className="lead mt-6 max-w-2xl">
            {t("svc2.smm.hero.sub")}
          </p>
          <div data-anim="actions" className="mt-9 flex flex-wrap gap-3">
            <CalendlyButton label={t("svc2.smm.hero.cta1")} />
            <Link href="/packages" className="btn-secondary">
              {t("svc2.smm.hero.cta2")}
            </Link>
          </div>
        </div>
        <div
          data-anim="spine"
          className="relative mt-14 grid border-t border-hairline md:grid-cols-3 md:divide-x md:divide-hairline"
        >
          <span
            data-anim="spine-line"
            aria-hidden="true"
            className="absolute left-0 top-0 h-[2px] w-full origin-left bg-accent"
          />
          {spine.map((s, i) => (
            <div
              key={s.label}
              data-anim="chip"
              className={
                "py-7 md:px-8 " +
                (i === 0 ? "md:pl-0 " : "") +
                (i === spine.length - 1 ? "md:pr-0" : "") +
                (i > 0 ? "border-t border-hairline md:border-t-0" : "")
              }
            >
              <p className="flex items-baseline gap-3">
                <span className="stat-num text-sm text-accent">{`0${i + 1}`}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {s.label}
                </span>
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The task: a brief document, observations numbered inside it. */
export function SmmTask() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5].map((i) => t(`svc2.smm.task.${i}`));
  return (
    <section data-anim-section="sm-02" className="bg-background">
      <div className="section container-x">
        <div className="card max-w-3xl overflow-hidden">
          <div className="px-6 pt-8 sm:px-9 sm:pt-9">
            <p data-anim="eyebrow" className="eyebrow">
              {t("svc2.smm.task.eyebrow")}
            </p>
            <h2 data-anim="title" className="h2 mt-4 text-3xl text-foreground md:text-4xl">
              {t("svc2.smm.task.title")}
            </h2>
          </div>
          <ol className="mt-8 px-6 sm:px-9">
            {items.map((item, i) => (
              <li
                key={item}
                data-anim="brief-line"
                className="grid gap-2 border-t border-hairline py-5 sm:grid-cols-[48px_1fr] sm:gap-4"
              >
                <span className="stat-num text-sm text-faint">{`0${i + 1}`}</span>
                <p className="text-[16px] leading-[1.65] text-foreground">{item}</p>
              </li>
            ))}
          </ol>
          <p
            data-anim="note"
            className="border-t border-hairline bg-surface px-6 py-5 text-sm text-muted sm:px-9"
          >
            {t("svc2.smm.task.note")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** The solution: deliverable rows with their cadence. */
export function SmmSolution() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`svc2.smm.solution.${i}.title`),
    cadence: t(`svc2.smm.solution.${i}.cadence`),
    desc: t(`svc2.smm.solution.${i}.desc`),
  }));
  return (
    <section data-anim-section="sm-03" className="band">
      <div className="section container-x">
        <div data-anim="head" className="max-w-2xl">
          <h2 className="h2 text-4xl text-foreground md:text-5xl">
            {t("svc2.smm.solution.title")}
          </h2>
          <p className="lead mt-5">{t("svc2.smm.solution.desc")}</p>
        </div>
        <div className="mt-12 border-t border-hairline">
          {items.map((item) => (
            <div
              data-anim="row"
              key={item.title}
              className="grid grid-cols-[1fr_auto] items-start gap-3 border-b border-hairline py-6 md:gap-10"
            >
              <div className="min-w-0 overflow-hidden">
                <div data-anim="row-content">
                  <h3 className="h3 text-lg text-foreground">{item.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
              <span
                data-anim="cadence"
                className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
              >
                {item.cadence}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The improvement cycle: loop diagram over the three moves. */
export function SmmCycle() {
  const { t } = useI18n();
  const steps = [1, 2, 3].map((i) => ({
    title: t(`svc2.smm.cycle.${i}.title`),
    desc: t(`svc2.smm.cycle.${i}.desc`),
  }));
  const centers = [110, 360, 610];
  return (
    <section data-anim-section="sm-04" className="bg-background">
      <div className="section container-x">
        <div data-anim="head" className="max-w-2xl">
          <h2 className="h2 text-4xl text-foreground md:text-5xl">
            {t("svc2.smm.cycle.title")}
          </h2>
          <p className="lead mt-5">{t("svc2.smm.cycle.desc")}</p>
        </div>
        <div
          data-anim="diagram"
          className="mt-12 rounded-2xl border border-hairline bg-surface px-4 py-7 sm:px-8"
        >
          <svg viewBox="0 0 720 176" className="w-full" aria-hidden="true">
            {[0, 1].map((i) => (
              <line
                key={i}
                data-anim="cycle-arrow-line"
                x1={centers[i] + 36}
                y1="58"
                x2={centers[i + 1] - 40}
                y2="58"
                className="stroke-faint"
                strokeWidth="1.5"
              />
            ))}
            <path
              data-anim="cycle-arrow-return"
              d="M610,88 C610,148 110,148 110,92"
              fill="none"
              className="stroke-accent"
              strokeWidth="1.75"
            />
            <polygon
              data-anim="cycle-arrow-head"
              points="320,58 307,51.5 307,64.5"
              className="fill-faint"
            />
            <polygon
              data-anim="cycle-arrow-head"
              points="570,58 557,51.5 557,64.5"
              className="fill-faint"
            />
            <polygon
              data-anim="cycle-arrow-head"
              points="110,90 103.5,103 116.5,103"
              className="fill-accent"
            />
            {centers.map((cx, i) => (
              <g key={steps[i].title} data-anim="cycle-node">
                <circle
                  cx={cx}
                  cy="58"
                  r="30"
                  className="fill-card stroke-muted"
                  strokeWidth="1.25"
                />
                <text
                  x={cx}
                  y="63"
                  textAnchor="middle"
                  className="fill-foreground text-[13px] font-semibold"
                >
                  {`0${i + 1}`}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-anim="cycle-step"
              className="border-t-2 border-foreground pt-5"
            >
              <p data-anim="cycle-num" className="stat-num text-sm text-accent">{`0${i + 1}`}</p>
              <h3 className="h3 mt-2 text-xl text-foreground">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
        <p data-anim="note" className="mt-10 text-sm text-muted">
          {t("svc2.smm.cycle.note")}
        </p>
      </div>
    </section>
  );
}

/** Retainers: a compact three-row table. */
export function SmmTiers() {
  const { t } = useI18n();
  const tiers = [1, 2, 3].map((i) => ({
    tier: t(`svc2.smm.tiers.${i}.tier`),
    includes: t(`svc2.smm.tiers.${i}.includes`),
    fit: t(`svc2.smm.tiers.${i}.fit`),
  }));
  return (
    <section data-anim-section="sm-05" className="bg-background">
      <div className="section container-x pt-0!">
        <div data-anim="head" className="max-w-2xl">
          <h2 className="h2 text-4xl text-foreground md:text-5xl">
            {t("svc2.smm.tiers.title")}
          </h2>
          <p className="lead mt-5">{t("svc2.smm.tiers.desc")}</p>
        </div>
        <div
          data-anim="tier-table"
          className="relative mt-12 overflow-hidden rounded-2xl border border-hairline"
        >
          <span
            data-anim="tier-rule"
            aria-hidden="true"
            className="absolute left-0 top-0 z-10 h-[3px] w-full origin-left bg-accent"
          />
          <div className="hidden grid-cols-[170px_1fr_1fr] gap-8 bg-surface px-8 py-4 md:grid">
            <p
              data-anim="tier-cell"
              data-col="1"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {t("svc2.smm.tiers.col.tier")}
            </p>
            <p
              data-anim="tier-cell"
              data-col="2"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {t("svc2.smm.tiers.col.includes")}
            </p>
            <p
              data-anim="tier-cell"
              data-col="3"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {t("svc2.smm.tiers.col.fit")}
            </p>
          </div>
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              className="grid gap-1.5 border-t border-hairline bg-card px-6 py-5 sm:px-8 md:grid-cols-[170px_1fr_1fr] md:gap-8"
            >
              <p data-anim="tier-cell" data-col="1" className="h3 text-lg text-foreground">
                {tier.tier}
              </p>
              <p
                data-anim="tier-cell"
                data-col="2"
                className="text-[15px] leading-relaxed text-foreground"
              >
                {tier.includes}
              </p>
              <p data-anim="tier-cell" data-col="3" className="text-[15px] leading-relaxed text-muted">
                {tier.fit}
              </p>
            </div>
          ))}
        </div>
        <p data-anim="note" className="mt-6 text-sm text-muted">
          {t("svc2.smm.tiers.note")}{" "}
          <Link href="/packages" className="font-medium text-accent hover:underline">
            {t("svc2.smm.tiers.cta")}
          </Link>
        </p>
      </div>
    </section>
  );
}

/** CTA: request a sample content calendar by email. */
export function SmmCta() {
  const { t } = useI18n();
  const email = t("common.email.info");
  const cells = Array.from({ length: 28 });
  return (
    <section data-anim-section="sm-06" className="bg-background">
      <div className="section container-x">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-14">
          <div data-anim="calendar" className="shrink-0">
            <div className="grid grid-cols-7 gap-1.5" aria-hidden="true">
              {cells.map((_, i) => (
                <span
                  key={i}
                  className="relative block h-7 w-7 overflow-hidden rounded-[6px] border border-hairline bg-surface sm:h-8 sm:w-8"
                >
                  <span data-anim="cal-fill" className="absolute inset-0 bg-accent-soft" />
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0 text-center md:text-left">
            <h2 data-anim="title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc2.smm.cta.title")}
            </h2>
            <p data-anim="lede" className="lead mt-5">
              {t("svc2.smm.cta.desc")}
            </p>
            <div data-anim="actions" className="mt-9">
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Sample content calendar request")}`}
                className="btn-primary"
              >
                {t("svc2.smm.cta.button")}
              </a>
            </div>
            <p data-anim="fine" className="mt-5 text-sm text-muted">
              {t("svc2.smm.cta.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
