"use client";

import { useEffect, useState } from "react";
import { DUR, EASE, ENTER, gsap, SplitText } from "@/lib/motion";
import { useAnimator } from "@/lib/motion/useAnimator";
import { legal } from "@/lib/i18n/en/legal";
import { cn } from "@/lib/utils";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalTemplateProps {
  title: string;
  updated: string;
  sections: LegalSection[];
  variant: "privacy" | "terms";
}

/**
 * Calm editorial legal layout: a sticky table of contents on the left
 * rail (a plain list on mobile), a ~70ch reading measure, hairline
 * section rhythm. The current section is marked with an accent tick,
 * tracked by a small IntersectionObserver (no scrollspy library).
 * Presentation only - the legal copy itself is frozen.
 *
 * Round 3 animation: quiet, text-grade GSAP mechanics, one distinct
 * mechanic per unit (registry PR-00..PR-08 / TR-00..TR-08). Small
 * amplitudes only; no plain fade anywhere. Scrollspy logic untouched.
 */
export function LegalTemplate({
  title,
  updated,
  sections,
  variant,
}: LegalTemplateProps) {
  const tocLabel = legal["legal.toc"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections
      .map((_, i) => document.getElementById(`section-${i + 1}`))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.id.replace("section-", "")) - 1;
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-96px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const rootRef = useAnimator(({ scope, conditions }) => {
    const m = conditions.isMobile ? 0.6 : 1;
    const titleEl = scope.querySelector<HTMLElement>('[data-anim="title"]');
    const updatedEl = scope.querySelector<HTMLElement>('[data-anim="updated"]');
    const tickEl = scope.querySelector<HTMLElement>('[data-anim="tick"]');
    const underlineEl = scope.querySelector<HTMLElement>(
      '[data-anim="updated-underline"]',
    );
    const tocLinks = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-anim="toc-link"]'),
    );
    const tocNums = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-anim="toc-num"]'),
    );

    /* ── Header + TOC (LOAD) ─────────────────────────────────────── */
    if (variant === "privacy") {
      // PR-00 Tick Masthead · PR-01 Rail Link Slide
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      if (titleEl) tl.from(titleEl, { x: -24 * m, duration: DUR.slow }, 0);
      if (tickEl)
        tl.from(
          tickEl,
          {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: DUR.fast,
            ease: EASE.settle,
          },
          0.35,
        );
      if (updatedEl)
        tl.fromTo(
          updatedEl,
          { y: 12, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: DUR.base,
          },
          0.45,
        );
      if (tocLinks.length)
        tl.from(
          tocLinks,
          { x: -14 * m, duration: DUR.base, stagger: 0.05 },
          0.55,
        );
    } else {
      // TR-00 Date Stamp Head · TR-01 Rail Number Roll
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      if (titleEl)
        tl.fromTo(
          titleEl,
          { y: 18, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: DUR.slow,
          },
          0,
        );
      if (underlineEl)
        tl.from(
          underlineEl,
          { scaleX: 0, duration: DUR.base, ease: EASE.settle },
          0.5,
        );
      if (tocNums.length)
        tl.from(
          tocNums,
          {
            yPercent: 115,
            duration: DUR.fast,
            ease: EASE.settle,
            stagger: 0.05,
          },
          0.35,
        );
      if (tocLinks.length)
        tl.from(
          tocLinks,
          { y: 10, duration: DUR.base, stagger: 0.05 },
          0.35,
        );
    }

    /* ── Sections (PLAY once at top 86%, DOM order) ──────────────── */
    const sectionEls = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-anim="section"]'),
    );
    sectionEls.forEach((el, i) => {
      const badge = el.querySelector<HTMLElement>('[data-anim="badge"]');
      const heading = el.querySelector<HTMLElement>('[data-anim="heading"]');
      const paras = Array.from(
        el.querySelectorAll<HTMLElement>('[data-anim="para"]'),
      );
      const ruleEl = el.querySelector<HTMLElement>('[data-anim="rule"]');
      const spineEl = el.querySelector<HTMLElement>('[data-anim="spine"]');
      const st = () => ({
        trigger: el,
        start: ENTER,
        once: true,
        refreshPriority: i + 1,
      });

      if (variant === "privacy") {
        switch (i) {
          case 0: {
            // PR-02 Ruled Rise: top hairline draws, block bottom-mask rise
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (ruleEl) tl.from(ruleEl, { scaleX: 0, duration: DUR.slow }, 0);
            const rise = [heading, ...paras].filter(
              (n): n is HTMLElement => n !== null,
            );
            if (rise.length)
              tl.fromTo(
                rise,
                { y: 18, clipPath: "inset(0 0 100% 0)" },
                {
                  y: 0,
                  clipPath: "inset(0 0 0% 0)",
                  duration: DUR.base,
                  stagger: 0.09,
                },
                0.15,
              );
            break;
          }
          case 1: {
            // PR-03 Ink-Fill Block (finisher fix — replaces the original
            // "Tracking Block" letter-spacing settle, whose headliner
            // duplicated S-04's Statement Settle): the heading's ink
            // fills left→right through the glyphs themselves
            // (background-clip:text sweep, a channel used nowhere else),
            // then plain text colour is restored. Paras x settle.
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (heading) {
              gsap.set(heading, {
                color: "transparent",
                backgroundImage:
                  "linear-gradient(90deg, var(--text) 50%, var(--faint) 50%)",
                backgroundSize: "220% 100%",
                backgroundPosition: "100% 0",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              });
              tl.to(
                heading,
                {
                  backgroundPosition: "0% 0",
                  duration: DUR.slow,
                  ease: EASE.settle,
                  onComplete: () =>
                    gsap.set(heading, { clearProps: "all" }),
                },
                0,
              );
            }
            if (paras.length)
              tl.from(
                paras,
                { x: 14 * m, duration: DUR.base, stagger: 0.07 },
                0.1,
              );
            break;
          }
          case 2: {
            // PR-04 Badge Pop Block
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (badge)
              tl.from(
                badge,
                { scale: 0.5, duration: DUR.fast, ease: EASE.pop },
                0,
              );
            if (heading)
              tl.from(heading, { x: 14 * m, duration: DUR.base }, 0.08);
            if (paras.length)
              tl.from(
                paras,
                { y: 16, duration: DUR.base, stagger: 0.07 },
                0.16,
              );
            break;
          }
          case 3: {
            // PR-05 Indent Block: rule extends, paras release indent
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (ruleEl) tl.from(ruleEl, { scaleX: 0, duration: DUR.slow }, 0);
            if (paras.length)
              tl.from(
                paras,
                { x: 24 * m, duration: DUR.base, stagger: 0.09 },
                0.2,
              );
            break;
          }
          case 4: {
            // PR-06 Spine Block: accent spine grows, text settles x
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (spineEl)
              tl.from(
                spineEl,
                { scaleY: 0, duration: DUR.slow, ease: EASE.settle },
                0,
              );
            const settleEls = [heading, ...paras].filter(
              (n): n is HTMLElement => n !== null,
            );
            if (settleEls.length)
              tl.from(
                settleEls,
                { x: 12 * m, duration: DUR.base, stagger: 0.07 },
                0.15,
              );
            break;
          }
          case 5: {
            // PR-07 Skew Block: whole block un-skews into the grid
            gsap.fromTo(
              el,
              { skewY: 1.2 },
              {
                skewY: 0,
                duration: DUR.slow,
                ease: EASE.settle,
                scrollTrigger: st(),
              },
            );
            break;
          }
          case 6: {
            // PR-08 Closing Rule Block: top-mask descent, closing rule draws
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            const drop = [heading, ...paras].filter(
              (n): n is HTMLElement => n !== null,
            );
            if (drop.length)
              tl.fromTo(
                drop,
                { y: -14, clipPath: "inset(100% 0 0 0)" },
                {
                  y: 0,
                  clipPath: "inset(0% 0 0 0)",
                  duration: DUR.base,
                  stagger: 0.08,
                },
                0,
              );
            if (ruleEl)
              tl.from(ruleEl, { scaleX: 0, duration: DUR.slow }, 0.35);
            break;
          }
          default:
            break;
        }
      } else {
        switch (i) {
          case 0: {
            // TR-02 Badge Drop Block
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (badge)
              tl.from(
                badge,
                { y: -14, duration: DUR.base, ease: EASE.settle },
                0,
              );
            if (heading)
              tl.from(heading, { x: 12 * m, duration: DUR.base }, 0.12);
            break;
          }
          case 1: {
            // TR-03 Word Rise Block: heading words masked rise, paras release
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (heading) {
              const split = new SplitText(heading, {
                type: "words",
                mask: "words",
              });
              tl.from(
                split.words,
                {
                  yPercent: 115,
                  duration: DUR.base,
                  stagger: 0.05,
                  onComplete: () => split.revert(),
                },
                0,
              );
            }
            if (paras.length)
              tl.from(
                paras,
                { x: 18 * m, duration: DUR.base, stagger: 0.07 },
                0.15,
              );
            break;
          }
          case 2: {
            // TR-04 Char Rise Block: heading chars masked rise, paras settle
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (heading) {
              const split = new SplitText(heading, {
                type: "chars",
                mask: "chars",
              });
              tl.from(
                split.chars,
                {
                  yPercent: 115,
                  duration: DUR.fast,
                  stagger: 0.014,
                  onComplete: () => split.revert(),
                },
                0,
              );
            }
            if (paras.length)
              tl.from(
                paras,
                { y: 14, duration: DUR.base, stagger: 0.07 },
                0.15,
              );
            break;
          }
          case 3: {
            // TR-05 Ink Block (SCRUB): paragraph ink deepens faint → muted
            if (paras.length) {
              const probe = document.createElement("span");
              probe.className = "text-faint";
              probe.style.position = "absolute";
              probe.style.visibility = "hidden";
              scope.appendChild(probe);
              const faint = window.getComputedStyle(probe).color;
              probe.className = "text-muted";
              const muted = window.getComputedStyle(probe).color;
              probe.remove();
              gsap.fromTo(
                paras,
                { color: faint },
                {
                  color: muted,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "bottom 55%",
                    scrub: 0.8,
                    refreshPriority: i + 1,
                  },
                },
              );
            }
            break;
          }
          case 4: {
            // TR-06 Scale Block: block scales from left origin, rule draws
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            tl.fromTo(
              el,
              { scale: 0.985, transformOrigin: "0% 50%" },
              { scale: 1, duration: DUR.slow, ease: EASE.settle },
              0,
            );
            if (ruleEl)
              tl.from(ruleEl, { scaleX: 0, duration: DUR.slow }, 0.1);
            break;
          }
          case 5: {
            // TR-07 Centre Rule Block: hairline blooms from centre; heading wipes open from centre
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (ruleEl) tl.from(ruleEl, { scaleX: 0, duration: DUR.slow }, 0);
            if (heading)
              tl.fromTo(
                heading,
                { clipPath: "inset(0 50% 0 50%)" },
                {
                  clipPath: "inset(0 0% 0 0%)",
                  duration: DUR.slow,
                  clearProps: "clipPath",
                },
                0.1,
              );
            break;
          }
          case 6: {
            // TR-08 Final Stamp Block: badge rotates in with a pop
            const tl = gsap.timeline({
              scrollTrigger: st(),
              defaults: { ease: EASE.out },
            });
            if (badge)
              tl.fromTo(
                badge,
                { rotation: -12, scale: 0.6 },
                {
                  rotation: 0,
                  scale: 1,
                  duration: DUR.base,
                  ease: EASE.pop,
                },
                0,
              );
            if (heading)
              tl.from(heading, { x: 14 * m, duration: DUR.base }, 0.25);
            break;
          }
          default:
            break;
        }
      }
    });
  });

  const toc = (
    <nav
      aria-label={tocLabel}
      data-anim-section={variant === "privacy" ? "pr-01" : "tr-01"}
    >
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted">
        {tocLabel}
      </p>
      <ol className="mt-4 border-l border-hairline">
        {sections.map((section, i) => {
          const isActive = active === i;
          return (
            <li key={section.heading}>
              <a
                href={`#section-${i + 1}`}
                data-anim="toc-link"
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px flex items-baseline gap-3 border-l-2 py-2 pl-4 pr-2 text-sm transition-colors",
                  isActive
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "stat-num inline-block overflow-hidden text-xs",
                    isActive ? "text-accent" : "text-faint",
                  )}
                  aria-hidden="true"
                >
                  <span className="inline-block" data-anim="toc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className={isActive ? "font-medium" : undefined}>
                  {section.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <div ref={rootRef} className="bg-background">
      <section className="container-x pb-24 pt-24 md:pb-32 md:pt-32">
        <div data-anim-section={variant === "privacy" ? "pr-00" : "tr-00"}>
          <h1
            data-anim="title"
            className="display max-w-3xl text-4xl text-foreground md:text-6xl"
          >
            {title}
          </h1>
          <p
            data-anim="updated"
            className="mt-6 flex items-center gap-3 text-sm text-muted"
          >
            <span
              aria-hidden="true"
              data-anim="tick"
              className="h-[2px] w-5 rounded bg-accent"
            />
            {updated}
          </p>
          {variant === "terms" && (
            <span
              aria-hidden="true"
              data-anim="updated-underline"
              className="mt-2 block h-[2px] w-44 max-w-full origin-left bg-accent"
            />
          )}
        </div>

        {/* Mobile TOC: plain list above the reading column */}
        <div className="mt-10 lg:hidden">
          <div className="border-y border-hairline py-6">{toc}</div>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
          {/* Desktop sticky TOC rail */}
          <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
            {toc}
          </aside>

          <div className="min-w-0 max-w-[70ch]">
            {sections.map((section, i) => {
              const showTopRule =
                variant === "privacy" ? i === 0 || i === 3 : i === 4 || i === 5;
              const showBottomRule = variant === "privacy" && i === 6;
              const showSpine = variant === "privacy" && i === 4;
              return (
                <div key={section.heading}>
                  <div
                    id={`section-${i + 1}`}
                    data-anim="section"
                    data-anim-section={
                      variant === "privacy" ? `pr-0${i + 2}` : `tr-0${i + 2}`
                    }
                    className="rule relative scroll-mt-28 py-10 first:border-t-0 first:pt-0 md:py-12"
                  >
                    {(showTopRule || showBottomRule) && (
                      <span
                        aria-hidden="true"
                        data-anim="rule"
                        className={cn(
                          "pointer-events-none absolute inset-x-0 h-px bg-hairline",
                          showBottomRule ? "bottom-0" : "top-0",
                          variant === "terms" && i === 5
                            ? "origin-center"
                            : "origin-left",
                        )}
                      />
                    )}
                    {showSpine && (
                      <span
                        aria-hidden="true"
                        data-anim="spine"
                        className="pointer-events-none absolute -left-4 bottom-2 top-2 w-[2px] origin-top bg-accent md:-left-6"
                      />
                    )}
                    <div className="flex items-baseline gap-4">
                      <span
                        data-anim="badge"
                        className="stat-num text-sm text-faint"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`section-${i + 1}-heading`}
                        data-anim="heading"
                        className="h2 text-[1.375rem] text-foreground md:text-2xl"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph, j) => (
                        <p
                          key={j}
                          data-anim="para"
                          className="text-[1.0625rem] leading-[1.8] text-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
