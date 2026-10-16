"use client";

import { useI18n } from "@/lib/i18n";

const ACCENT = "#F97316";

/**
 * Deliberate abstract composition — geometric shapes in the brand palette.
 * Not a UI mock, not a client screenshot: an illustrative visual for a
 * section that must show no real client work.
 */
function AbstractComposition() {
  return (
    <svg
      viewBox="0 0 480 340"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Abstract geometric composition"
    >
      {/* large ring */}
      <circle
        cx="150"
        cy="150"
        r="112"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      {/* accent arc sweeping over the ring */}
      <path
        d="M 38 150 A 112 112 0 0 1 262 150"
        fill="none"
        stroke={ACCENT}
        strokeOpacity="0.75"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* inner ring */}
      <circle
        cx="150"
        cy="150"
        r="72"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      {/* orbiting dot cluster */}
      <circle cx="352" cy="86" r="11" fill={ACCENT} fillOpacity="0.85" />
      <circle cx="384" cy="118" r="5.5" fill={ACCENT} fillOpacity="0.5" />
      <circle cx="318" cy="128" r="6.5" fill="currentColor" fillOpacity="0.18" />
      {/* triangle */}
      <polygon
        points="352,236 402,306 302,306"
        fill="none"
        stroke={ACCENT}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* diagonal construction lines */}
      <line
        x1="52"
        y1="292"
        x2="196"
        y2="208"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      <line
        x1="220"
        y1="318"
        x2="300"
        y2="272"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      {/* accent bar cluster, asymmetric */}
      <rect x="330" y="180" width="64" height="8" rx="4" fill={ACCENT} fillOpacity="0.35" />
      <rect x="352" y="196" width="42" height="8" rx="4" fill="currentColor" fillOpacity="0.14" />
      <rect x="318" y="212" width="76" height="8" rx="4" fill={ACCENT} fillOpacity="0.6" />
      {/* small grid of squares */}
      {[
        [72, 52],
        [92, 52],
        [112, 52],
        [72, 72],
        [92, 72],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="14"
          height="14"
          rx="3"
          fill="currentColor"
          fillOpacity={i === 0 ? 0.3 : 0.08}
        />
      ))}
    </svg>
  );
}

/**
 * FeaturedProject — full-bleed plate + document ledger (round 3).
 * One engagement, given the room of a case-study plate: a wide surface
 * panel with the abstract composition, the outcome as the headline, and
 * a three-column definition ledger (outcome / scope / stack) below.
 * Badged EXAMPLE; the illustrative-mock caption stays attached.
 */
export function FeaturedProject() {
  const { t } = useI18n();
  const ledger = [
    { label: t("portfolio.work.outcomeLabel"), value: t("portfolio.work.1.outcome") },
    { label: t("portfolio.work.scopeLabel"), value: t("portfolio.work.1.scope") },
    { label: t("portfolio.featured.stackLabel"), value: t("portfolio.featured.stack") },
  ];

  return (
    <section data-anim-section="pf-03" className="mt-24 border-y border-hairline bg-surface md:mt-32">
      <div className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-anim="fp-text" className="max-w-2xl">
            <p className="eyebrow">{t("portfolio.featured.label")}</p>
            <h2 className="display mt-5 text-4xl text-foreground md:text-6xl">
              {t("portfolio.featured.title")}
            </h2>
          </div>
          <p className="text-lg font-medium text-muted">
            {t("portfolio.work.1.descriptor")}
          </p>
        </div>

        <div>
          <figure className="mt-12">
            <div data-anim="fp-visual" className="relative overflow-hidden rounded-2xl border border-hairline bg-card">
              <span className="absolute left-4 top-4 z-10 rounded-md border border-dashed border-faint/70 bg-background/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                Example
              </span>
              <div data-anim="fp-inner" className="mx-auto max-w-3xl px-8 py-10 md:px-12 md:py-14">
                <AbstractComposition />
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-faint">
              {t("portfolio.work.illustrative")}
            </figcaption>
          </figure>
        </div>

        <div>
          <dl className="mt-12 grid gap-8 border-t border-hairline pt-10 md:grid-cols-3 md:gap-12">
            {ledger.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                  {item.label}
                </dt>
                <dd className="mt-3 leading-relaxed text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
