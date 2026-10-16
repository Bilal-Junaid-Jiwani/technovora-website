"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ServiceBreadcrumb, CalendlyButton, ServiceMailCta } from "./shared";

/* ── Sections ────────────────────────────────────────────────────────── */

/** Hero: story statement with a type and color specimen panel below. */
export function DesignHero() {
  const { t } = useI18n();
  const email = t("common.email.info");
  return (
    <section data-anim-section="d-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="crumb">
          <ServiceBreadcrumb />
        </div>
        <div>
          <p data-anim="eyebrow" className="eyebrow mt-10">
            {t("servicesidx.bands.design.title")}
          </p>
          <h1
            data-anim="title"
            className="display mt-5 max-w-4xl text-5xl text-foreground md:text-7xl"
          >
            {t("svc2.design.hero.statement")}
          </h1>
          <p data-anim="lede" className="lead mt-6 max-w-2xl">
            {t("svc2.design.hero.sub")}
          </p>
          <div data-anim="actions" className="mt-9 flex flex-wrap gap-3">
            <CalendlyButton label={t("svc2.design.hero.cta1")} />
            <a href={`mailto:${email}`} className="btn-secondary">
              {t("svc2.design.hero.cta2")}
            </a>
          </div>
        </div>
        <div data-anim="specimen" className="card mt-14 overflow-hidden">
          <div
            data-anim="specimen-bar"
            className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-4 sm:px-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {t("svc2.design.hero.specimenTitle")}
            </p>
            <p className="hidden text-xs text-faint sm:block">Inter</p>
          </div>
          <div
            data-anim="specimen-row"
            className="grid items-center gap-8 px-6 py-8 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-10"
          >
            <p className="display text-8xl leading-none text-foreground md:text-9xl">Aa</p>
            <div className="min-w-0">
              <p className="h3 text-2xl text-foreground">
                {t("servicesidx.bands.design.specimen.line1")}
              </p>
              <p className="mt-3 border-t border-hairline pt-3 text-[15px] leading-relaxed text-muted">
                {t("servicesidx.bands.design.specimen.line2")}
              </p>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <span className="h-12 w-12 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">#F97316</p>
                <p className="mt-0.5 max-w-[180px] text-xs leading-relaxed text-muted">
                  {t("servicesidx.bands.design.specimen.note")}
                </p>
              </div>
            </div>
          </div>
          <p
            data-anim="specimen-note"
            className="border-t border-hairline bg-surface px-6 py-4 text-xs leading-relaxed text-muted sm:px-8"
          >
            {t("svc2.design.hero.specimenNote")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Design debt: symptoms with margin annotations. */
export function DesignDebt() {
  const { t } = useI18n();
  const debt = [1, 2, 3, 4].map((i) => ({
    symptom: t(`svc2.design.debt.${i}.symptom`),
    note: t(`svc2.design.debt.${i}.note`),
  }));
  return (
    <section data-anim-section="d-02" className="bg-background">
      <div className="section container-x">
        <div data-anim="head" className="max-w-2xl">
          <h2 className="h2 text-4xl text-foreground md:text-5xl">
            {t("svc2.design.debt.title")}
          </h2>
          <p className="lead mt-5">{t("svc2.design.debt.desc")}</p>
        </div>
        <div className="mt-12 border-t border-hairline">
          {debt.map((d) => (
            <div
              data-anim="row"
              key={d.symptom}
              className="grid gap-3 border-b border-hairline py-7 md:grid-cols-[1.15fr_0.85fr] md:gap-12"
            >
              <p
                data-anim="symptom"
                className="text-xl font-medium leading-snug text-foreground"
              >
                {d.symptom}
              </p>
              <p
                data-anim="note"
                className="relative text-[15px] leading-relaxed text-muted md:border-l md:border-hairline md:pl-8"
              >
                <span
                  data-anim="leader"
                  aria-hidden="true"
                  className="absolute -left-12 top-[0.85em] hidden h-px w-12 origin-left bg-accent md:block"
                />
                {d.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** How we work: verb rows that land on an outcome. */
export function DesignVerbs() {
  const { t } = useI18n();
  const verbs = [1, 2, 3, 4, 5].map((i) => ({
    verb: t(`svc2.design.verbs.${i}.verb`),
    outcome: t(`svc2.design.verbs.${i}.outcome`),
  }));
  return (
    <section data-anim-section="d-03" className="band">
      <div className="section container-x">
        <h2 data-anim="title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc2.design.verbs.title")}
        </h2>
        <div className="mt-12 border-t border-hairline">
          {verbs.map((v) => (
            <div
              data-anim="row"
              key={v.verb}
              className="grid items-baseline gap-2 border-b border-hairline py-6 md:grid-cols-[240px_32px_1fr] md:gap-4"
            >
              <p data-anim="verb" className="text-2xl font-semibold tracking-tight text-foreground">
                {v.verb}
              </p>
              <ArrowRight
                data-anim="arrow"
                className="hidden h-5 w-5 translate-y-0.5 text-accent md:block"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <p data-anim="outcome" className="text-xl leading-snug text-muted">
                {v.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Crit loop: circular diagram with the four moves listed beside it. */
export function DesignCritLoop() {
  const { t } = useI18n();
  const crit = [1, 2, 3, 4].map((i) => ({
    title: t(`svc2.design.crit.${i}.title`),
    desc: t(`svc2.design.crit.${i}.desc`),
  }));
  const nodes = [
    { cx: 160, cy: 50 },
    { cx: 270, cy: 160 },
    { cx: 160, cy: 270 },
    { cx: 50, cy: 160 },
  ];
  return (
    <section data-anim-section="d-04" className="bg-background">
      <div className="section container-x">
        <div>
          <p data-anim="eyebrow" className="eyebrow">
            {t("svc2.design.crit.eyebrow")}
          </p>
          <h2 data-anim="title" className="h2 mt-4 max-w-2xl text-4xl text-foreground md:text-5xl">
            {t("svc2.design.crit.title")}
          </h2>
          <p data-anim="lede" className="lead mt-5 max-w-2xl">
            {t("svc2.design.crit.desc")}
          </p>
        </div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
          <div
            data-anim="panel"
            className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
          >
            <svg viewBox="0 0 320 320" className="mx-auto w-full max-w-[360px]" aria-hidden="true">
              <circle
                cx="160"
                cy="160"
                r="110"
                fill="none"
                className="stroke-hairline"
                strokeWidth="1.5"
                strokeDasharray="3 6"
              />
              <path
                data-anim="arc"
                d="M160,50 A110,110 0 0 1 270,160"
                fill="none"
                className="stroke-accent"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M262,148 L272,162 L256,166 z" className="fill-accent" />
              <path
                data-anim="loop-path"
                d="M160,50 A110,110 0 1 1 160,270 A110,110 0 1 1 160,50"
                fill="none"
                stroke="none"
              />
              {nodes.map((node, i) => (
                <g data-anim="node" key={crit[i].title}>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="27"
                    className="fill-card stroke-muted"
                    strokeWidth="1.25"
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 5}
                    textAnchor="middle"
                    className="fill-foreground text-[13px] font-semibold"
                  >
                    {`0${i + 1}`}
                  </text>
                </g>
              ))}
              <circle
                data-anim="traveller"
                cx="160"
                cy="50"
                r="6"
                className="fill-accent stroke-card"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <ol className="border-t border-hairline">
              {crit.map((c, i) => (
                <li
                  data-anim="crit-stage"
                  key={c.title}
                  className="grid gap-2 border-b border-hairline py-6 sm:grid-cols-[56px_160px_1fr] sm:gap-6"
                >
                  <span data-anim="crit-num" className="stat-num text-sm text-accent">{`0${i + 1}`}</span>
                  <h3 className="h3 text-lg text-foreground">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{c.desc}</p>
                </li>
              ))}
            </ol>
            <p data-anim="note" className="mt-6 text-sm text-muted">
              {t("svc2.design.crit.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Toolbox: one line, no cards. */
export function DesignToolbox() {
  const { t } = useI18n();
  return (
    <section data-anim-section="d-05" className="bg-background">
      <div className="section container-x pt-0!">
        <div className="border-t border-hairline pt-12">
          <h2
            data-anim="tools-title"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
          >
            {t("svc2.design.toolbox.title")}
          </h2>
          <div data-anim="marquee" className="overflow-hidden">
            <div data-anim="marquee-track">
              <p
                data-anim="tools-line"
                className="mt-5 max-w-4xl text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[28px]"
              >
                {t("svc2.design.toolbox.line")}
              </p>
            </div>
          </div>
          <p data-anim="tools-note" className="mt-4 text-sm text-muted">
            {t("svc2.design.toolbox.note")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** CTA: the giant email link stays the call to action. */
export function DesignCta() {
  const { t } = useI18n();
  return (
    <div data-anim-section="d-06">
      <ServiceMailCta
        title={t("svc2.design.cta.title")}
        sub={t("svc2.design.cta.sub")}
        note={t("svc2.design.cta.note")}
      />
    </div>
  );
}
