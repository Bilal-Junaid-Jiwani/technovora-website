"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ACCENT = "#F97316";

/**
 * Six abstract geometric thumbnails — deliberate illustrative compositions in
 * the brand palette. Not UI mocks, not client screenshots: each figure is
 * badged EXAMPLE so the honesty is unmistakable.
 */
function Thumb({ variant }: { variant: number }) {
  const common = "h-auto w-full";
  const ring = "fill-none stroke-current";
  switch (variant) {
    case 0: // concentric rings + accent arc
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <circle cx="200" cy="150" r="110" className={ring} strokeOpacity="0.16" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="74" className={ring} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="5 7" />
          <path d="M 90 150 A 110 110 0 0 1 310 150" fill="none" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="150" r="10" fill={ACCENT} fillOpacity="0.85" />
        </svg>
      );
    case 1: // ascending bars
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          {[46, 84, 122, 160, 198].map((h, i) => (
            <rect key={i} x={86 + i * 52} y={220 - h} width="34" height={h} rx="7"
              fill={i === 4 ? ACCENT : "currentColor"} fillOpacity={i === 4 ? 0.85 : 0.14} />
          ))}
          <line x1="60" y1="228" x2="340" y2="228" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        </svg>
      );
    case 2: // device frame + orbit
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect x="150" y="50" width="100" height="200" rx="22" className={ring} strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="26" fill="none" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="2.5" />
          <circle cx="286" cy="96" r="7" fill={ACCENT} fillOpacity="0.85" />
          <circle cx="312" cy="132" r="4" fill={ACCENT} fillOpacity="0.45" />
          <line x1="286" y1="96" x2="252" y2="128" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        </svg>
      );
    case 3: // layered arcs
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          {[150, 112, 74].map((r, i) => (
            <path key={i} d={`M ${200 - r} 210 A ${r} ${r} 0 0 1 ${200 + r} 210`}
              fill="none" stroke={i === 1 ? ACCENT : "currentColor"}
              strokeOpacity={i === 1 ? 0.75 : 0.14} strokeWidth={i === 1 ? 2.5 : 1.5} strokeLinecap="round" />
          ))}
          <circle cx="200" cy="210" r="8" fill={ACCENT} fillOpacity="0.85" />
        </svg>
      );
    case 4: // design-system tile grid
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          {[
            [110, 70], [170, 70], [230, 70],
            [110, 130], [170, 130], [230, 130],
            [110, 190], [170, 190],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="44" height="44" rx="10"
              fill={i === 4 ? ACCENT : "currentColor"} fillOpacity={i === 4 ? 0.85 : 0.12} />
          ))}
        </svg>
      );
    default: // connected nodes
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <line x1="120" y1="110" x2="200" y2="170" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          <line x1="200" y1="170" x2="282" y2="110" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          <line x1="200" y1="170" x2="200" y2="238" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx="120" cy="110" r="16" className={ring} strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="282" cy="110" r="16" className={ring} strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="200" cy="170" r="20" fill={ACCENT} fillOpacity="0.85" />
          <circle cx="200" cy="238" r="12" className={ring} strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      );
  }
}

const ITEMS = [1, 2, 3, 4, 5, 6];

/**
 * WorkGallery — the discipline index (round 3).
 * Not a card grid: one registry figure per engagement, laid out as an
 * asymmetric editorial plate spread (wide opener, offset pair, full-bleed
 * close). Filter chips group the registry by discipline. Every figure is
 * an abstract illustrative composition badged EXAMPLE — never a client
 * screenshot, never a fake UI mock.
 */
export function WorkGallery() {
  const { t } = useI18n();
  const tags = Array.from(
    new Set(ITEMS.map((n) => t(`portfolio.list.${n}.tag`))),
  );
  const [active, setActive] = useState<string | null>(null);

  const visible = ITEMS.filter(
    (n) => !active || t(`portfolio.list.${n}.tag`) === active,
  );

  return (
    <section data-anim-section="pf-02" className="container-x pt-16 md:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="h2 max-w-xl text-4xl text-foreground md:text-5xl">
          {t("portfolio.gallery.title")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {[{ label: t("portfolio.gallery.all"), tag: null }, ...tags.map((tag) => ({ label: tag, tag }))].map(
            ({ label, tag }) => {
              const on = active === tag;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(tag)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    on
                      ? "border-foreground bg-foreground text-background shadow-sm"
                      : "border-hairline bg-card text-muted hover:border-faint hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20">
        {visible.map((n, i) => {
          const lead = i === 0;
          const offset = i % 2 === 1;
          return (
            <div
              key={n}
              data-anim="pf-tile"
              className={cn(
                lead && "md:col-span-2",
                offset && "md:translate-y-10",
              )}
            >
              <figure
                className={cn(
                  "group",
                  lead && "grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-14",
                )}
              >
                <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface text-foreground">
                  <span className="absolute left-4 top-4 z-10 rounded-md border border-dashed border-faint/70 bg-background/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    Example
                  </span>
                  <div
                    className={cn(
                      "transition-transform duration-500 ease-out group-hover:scale-[1.015]",
                      lead ? "px-10 py-8 md:px-16 md:py-10" : "px-8 py-6",
                    )}
                  >
                    <Thumb variant={n - 1} />
                  </div>
                </div>
                <figcaption className={cn(!lead && "mt-5")}>
                  <p
                    className={cn(
                      "font-medium leading-snug text-foreground",
                      lead ? "text-2xl md:text-[1.7rem]" : "text-lg",
                    )}
                  >
                    {t(`portfolio.list.${n}.descriptor`)}
                  </p>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-accent">
                      {t(`portfolio.list.${n}.tag`)}
                    </span>
                    <span className="text-faint">
                      {t(`portfolio.list.${n}.stack`)}
                    </span>
                  </p>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
      <div>
        <p className="mt-16 text-sm text-faint md:mt-24">
          {t("portfolio.work.illustrative")}
        </p>
      </div>
    </section>
  );
}
