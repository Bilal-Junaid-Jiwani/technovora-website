"use client";

/**
 * WebAnimator — GSAP setup for /services/web-development (registry W-01..W-06).
 * One unique mechanic per section; see ANIMATION-REGISTRY.md. Setup runs
 * inside useAnimator (reduced-motion safe, scoped cleanup).
 */
import type { ReactNode } from "react";
import { Animator } from "./Animator";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";

const setup: AnimSetup = ({ scope, conditions }) => {
  const q = gsap.utils.selector(scope);
  const lat = (v: number) => (conditions.isMobile ? Math.round(v / 2) : v);

  /* ── W-01 · WebHero — Stroke-to-Fill Chapter (LOAD + SCRUB) ─────────── */
  const heroSection = q('[data-anim-section="w-01"]')[0];
  const heroFill = q('[data-anim="hero-fill"]')[0] as HTMLElement | undefined;
  if (heroSection && heroFill) {
    // Scrub layer first so it renders its from-state (42%) underneath the
    // load sweep; scrolling then inks the remainder in.
    gsap.fromTo(
      heroFill,
      { clipPath: "inset(0 42% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "+=45%",
          scrub: 0.9,
          refreshPriority: 1,
        },
      },
    );

    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });
    tl.from(q('[data-anim="hero-breadcrumb"]'), {
      x: lat(-12),
      duration: DUR.fast,
    })
      .from(
        q('[data-anim="hero-rule"]'),
        { scaleX: 0, duration: DUR.base, ease: EASE.inOut, stagger: 0.08 },
        "-=0.2",
      )
      .from(
        q('[data-anim="hero-numeral"]'),
        { scale: 0.6, duration: DUR.fast, ease: EASE.pop },
        "<",
      )
      .from(
        q('[data-anim="hero-eyebrow"]'),
        { x: lat(-12), duration: DUR.fast },
        "-=0.3",
      )
      .fromTo(
        heroFill,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 42% 0 0)",
          duration: DUR.hero * 0.85,
          ease: EASE.inOut,
        },
        "-=0.25",
      )
      .from(
        q('[data-anim="hero-lede"]'),
        { x: lat(14), duration: DUR.base },
        "-=0.6",
      )
      .from(
        q('[data-anim="hero-actions"]'),
        { y: 14, duration: DUR.base },
        "-=0.65",
      );
  }

  /* ── W-02 · WebBeforeAfter — Compare Wipe (SCRUB per row) ───────────── */
  const baSection = q('[data-anim-section="w-02"]')[0];
  if (baSection) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: baSection,
        start: ENTER,
        once: true,
        refreshPriority: 10,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(q('[data-anim="ba-title"]'), {
      x: lat(-24),
      duration: DUR.base,
    }).from(
      q('[data-anim="ba-intro"]'),
      { x: lat(16), duration: DUR.base },
      "-=0.6",
    );

    q('[data-anim="ba-row"]').forEach((row, i) => {
      const after = row.querySelector('[data-anim="ba-after"]');
      if (!after) return;
      gsap.fromTo(
        after,
        { clipPath: "inset(0 0 0 100%)" },
        {
          clipPath: "inset(0 0 0 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.8,
            refreshPriority: 11 + i,
          },
        },
      );
    });
  }

  /* ── W-03 · WebChapters — Chapter Marker Slide (PLAY) ───────────────── */
  const chSection = q('[data-anim-section="w-03"]')[0];
  if (chSection) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chSection,
        start: ENTER,
        once: true,
        refreshPriority: 20,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(q('[data-anim="ch-head"]'), {
      x: lat(-20),
      duration: DUR.base,
    });
    q('[data-anim="ch-row"]').forEach((row, i) => {
      const at = i === 0 ? "-=0.45" : "-=0.55";
      tl.from(
        row.querySelector('[data-anim="ch-num"]'),
        { x: lat(-20), duration: DUR.base },
        at,
      )
        .from(
          row.querySelector('[data-anim="ch-title"]'),
          { x: lat(-12), duration: DUR.base },
          "<0.08",
        )
        .from(
          row.querySelector('[data-anim="ch-rule"]'),
          { scaleX: 0, duration: DUR.slow * 0.7, ease: EASE.inOut },
          "<0.05",
        )
        .from(
          row.querySelector('[data-anim="ch-body"]'),
          { y: 18, duration: DUR.base },
          "<0.1",
        );
    });
  }

  /* ── W-04 · WebStackTable — Cross-Slide Definitions (PLAY) ─────────── */
  const stSection = q('[data-anim-section="w-04"]')[0];
  if (stSection) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stSection,
        start: ENTER,
        once: true,
        refreshPriority: 30,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(q('[data-anim="st-head"]'), {
      x: lat(-20),
      duration: DUR.base,
    });
    q('[data-anim="st-row"]').forEach((row, i) => {
      const at = i === 0 ? "-=0.5" : "-=0.6";
      tl.from(
        row.querySelector('[data-anim="st-term"]'),
        { x: lat(-20), duration: DUR.base },
        at,
      )
        .from(
          row.querySelector('[data-anim="st-desc"]'),
          { x: lat(20), duration: DUR.base },
          "<",
        )
        .from(
          row.querySelector('[data-anim="st-rule"]'),
          { scaleX: 0, duration: DUR.slow * 0.7, ease: EASE.inOut },
          "<",
        );
    });
  }

  /* ── W-05 · WebPriceFactors — Indent Cascade (PLAY) ─────────────────── */
  const pfSection = q('[data-anim-section="w-05"]')[0];
  const pfTitle = q('[data-anim="pf-title"]')[0] as HTMLElement | undefined;
  const pfLead = q('[data-anim="pf-lead"]')[0] as HTMLElement | undefined;
  if (pfSection && pfTitle && pfLead) {
    const titleSplit = new SplitText(pfTitle, {
      type: "lines",
      mask: "lines",
    });
    const leadSplit = new SplitText(pfLead, { type: "lines", mask: "lines" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pfSection,
        start: ENTER,
        once: true,
        refreshPriority: 40,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(titleSplit.lines, {
      yPercent: 110,
      duration: DUR.base,
      stagger: 0.09,
      onComplete: () => titleSplit.revert(),
    })
      .from(
        leadSplit.lines,
        {
          yPercent: 110,
          duration: DUR.base,
          stagger: 0.07,
          onComplete: () => leadSplit.revert(),
        },
        "-=0.55",
      )
      .from(
        q('[data-anim="pf-note"]'),
        { x: lat(-14), duration: DUR.base },
        "-=0.5",
      )
      .from(
        q('[data-anim="pf-link"]'),
        { y: 12, duration: DUR.base },
        "-=0.65",
      )
      .from(
        q('[data-anim="pf-text"]'),
        { x: lat(36), duration: DUR.base, stagger: 0.08 },
        "-=0.45",
      )
      .from(
        q('[data-anim="pf-num"]'),
        {
          scale: 0,
          duration: DUR.fast,
          ease: EASE.pop,
          stagger: 0.08,
        },
        "<",
      );
  }

  /* ── W-06 · WebCta — Word Blur Settle (PLAY) ────────────────────────── */
  const ctaSection = q('[data-anim-section="w-06"]')[0];
  const statement = q('[data-anim="cta-statement"]')[0] as
    | HTMLElement
    | undefined;
  if (ctaSection && statement) {
    const split = new SplitText(statement, { type: "words" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: ENTER,
        once: true,
        refreshPriority: 50,
      },
      defaults: { ease: EASE.settle },
    });
    tl.fromTo(
      split.words,
      { filter: "blur(8px)", y: 6 },
      {
        filter: "blur(0px)",
        y: 0,
        duration: DUR.base * 0.75,
        stagger: 0.045,
        onComplete: () => split.revert(),
      },
    )
      .from(
        q('[data-anim="cta-fine"]'),
        { x: lat(14), duration: DUR.base },
        "-=0.45",
      )
      .from(
        q('[data-anim="cta-actions"]'),
        { y: 12, duration: DUR.base },
        "-=0.65",
      );
  }
};

export function WebAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={setup}>{children}</Animator>;
}
