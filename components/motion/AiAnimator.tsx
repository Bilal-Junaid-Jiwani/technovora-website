"use client";

/**
 * AiAnimator — GSAP setup for /services/ai-automation (registry A-01..A-07).
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

  /* ── A-01 · AiHero — Roadmap Strip Draw (LOAD) ───────────────────────── */
  const heroTitle = q('[data-anim="hero-title"]')[0] as HTMLElement | undefined;
  if (heroTitle) {
    const split = new SplitText(heroTitle, { type: "words", mask: "words" });
    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });
    tl.from(q('[data-anim="hero-breadcrumb"]'), {
      x: lat(-12),
      duration: DUR.fast,
    })
      .from(
        q('[data-anim="hero-eyebrow"]'),
        { x: lat(-12), duration: DUR.fast },
        "-=0.25",
      )
      .from(
        split.words,
        {
          yPercent: 110,
          duration: DUR.hero * 0.7,
          stagger: 0.045,
          onComplete: () => split.revert(),
        },
        "-=0.2",
      )
      .from(
        q('[data-anim="hero-lede"]'),
        { x: lat(16), duration: DUR.base },
        "-=0.55",
      )
      .from(
        q('[data-anim="hero-actions"]'),
        { x: lat(-16), duration: DUR.base },
        "-=0.65",
      )
      .from(
        q('[data-anim="week-spine"]'),
        {
          scaleX: 0,
          duration: DUR.slow,
          ease: EASE.inOut,
        },
        "-=0.4",
      )
      .from(
        q('[data-anim="week-node"]'),
        {
          scale: 0,
          duration: DUR.fast,
          ease: EASE.pop,
          stagger: 0.14,
        },
        "-=0.55",
      )
      .from(
        q('[data-anim="week-tick"]'),
        {
          scaleX: 0,
          duration: DUR.fast,
          ease: EASE.inOut,
          stagger: 0.14,
        },
        "<",
      )
      .from(
        q('[data-anim="week-title"], [data-anim="week-desc"]'),
        {
          x: lat(14),
          duration: DUR.base,
          stagger: 0.05,
        },
        "-=0.3",
      );
  }

  /* ── A-02 · AiRailNav — Rail Tick Slide (LOAD) ───────────────────────── */
  gsap.from(q('[data-anim="rail-link"]'), {
    x: -12,
    duration: DUR.base,
    ease: EASE.settle,
    stagger: 0.07,
    delay: 0.35,
  });

  /* ── A-03 · AiSymptoms — Check-Draw Checklist (PLAY) ────────────────── */
  const sympSection = q('[data-anim-section="a-03"]')[0];
  if (sympSection) {
    const checkPaths = q('[data-anim="symp-check"] svg path');
    checkPaths.forEach((path) => {
      const el = path as unknown as SVGPathElement;
      if (typeof el.getTotalLength === "function") {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      }
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sympSection,
        start: ENTER,
        once: true,
        refreshPriority: 10,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(q('[data-anim="symp-title"]'), { x: lat(-20), duration: DUR.base })
      .from(
        q('[data-anim="symp-intro"]'),
        { x: lat(-14), duration: DUR.base },
        "-=0.6",
      )
      .from(
        q('[data-anim="symp-line"]'),
        { scaleX: 0, duration: DUR.fast, ease: EASE.inOut, stagger: 0.09 },
        "-=0.45",
      )
      .to(
        checkPaths,
        {
          strokeDashoffset: 0,
          duration: DUR.fast,
          ease: EASE.inOut,
          stagger: 0.09,
        },
        "<",
      )
      .from(
        q('[data-anim="symp-text"]'),
        { x: lat(16), duration: DUR.base, stagger: 0.09 },
        "<0.1",
      );
  }

  /* ── A-04 · AiRoadmap — Phase Rail Scrub (SCRUB) ────────────────────── */
  const roadmapSection = q('[data-anim-section="a-04"]')[0];
  const fill = q('[data-anim="roadmap-fill"]')[0] as HTMLElement | undefined;
  const phases = q('[data-anim="phase"]');
  if (roadmapSection && fill && phases.length > 0) {
    gsap.from(q('[data-anim="roadmap-title"]'), {
      x: lat(-20),
      duration: DUR.base,
      ease: EASE.settle,
      scrollTrigger: {
        trigger: roadmapSection,
        start: ENTER,
        once: true,
        refreshPriority: 19,
      },
    });
    gsap.from(q('[data-anim="roadmap-intro"]'), {
      x: lat(-14),
      duration: DUR.base,
      ease: EASE.settle,
      scrollTrigger: {
        trigger: roadmapSection,
        start: ENTER,
        once: true,
        refreshPriority: 19,
      },
    });

    const applyPhase = (phase: Element, on: boolean) => {
      const el = phase as HTMLElement;
      const title = phase.querySelector('[data-anim="phase-title"]') as
        | HTMLElement
        | null;
      const desc = phase.querySelector('[data-anim="phase-desc"]') as
        | HTMLElement
        | null;
      el.style.borderTopColor = on ? "var(--accent)" : "";
      if (title) title.style.color = on ? "var(--accent)" : "";
      if (desc) desc.style.color = on ? "var(--text)" : "";
    };

    gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: roadmapSection,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.8,
          refreshPriority: 20,
          onUpdate: (self) => {
            const activeCount =
              self.progress <= 0
                ? 0
                : Math.min(
                    phases.length,
                    Math.ceil(self.progress * phases.length),
                  );
            phases.forEach((phase, i) => applyPhase(phase, i < activeCount));
          },
        },
      },
    );
  }

  /* ── A-05 · AiStack — Chip Constellation (PLAY) ──────────────────────── */
  const stackSection = q('[data-anim-section="a-05"]')[0];
  const prose = q('[data-anim="stack-prose"]')[0] as HTMLElement | undefined;
  if (stackSection && prose) {
    const split = new SplitText(prose, { type: "lines", mask: "lines" });
    const chipX = (i: number) => ((i * 37) % 41) - 20;
    const chipY = (i: number) => ((i * 53) % 31) - 14;
    const chipR = (i: number) => ((i * 29) % 15) - 7;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackSection,
        start: ENTER,
        once: true,
        refreshPriority: 30,
      },
      defaults: { ease: EASE.settle },
    });
    tl.from(q('[data-anim="stack-title"]'), {
      x: lat(-20),
      duration: DUR.base,
    })
      .from(
        split.lines,
        {
          yPercent: 110,
          duration: DUR.base,
          stagger: 0.09,
          onComplete: () => split.revert(),
        },
        "-=0.5",
      )
      .from(
        q('[data-anim="stack-label"]'),
        { x: lat(-12), duration: DUR.fast, stagger: 0.08 },
        "-=0.4",
      )
      .from(
        q('[data-anim="chip"]'),
        {
          x: (i: number) => lat(chipX(i)),
          y: (i: number) => chipY(i),
          rotation: (i: number) => chipR(i),
          duration: DUR.slow,
          stagger: { each: 0.035, from: "random" },
        },
        "-=0.35",
      );
  }

  /* ── A-06 · AiScoping — Travelling Edge Card (PLAY) ─────────────────── */
  const scopeSection = q('[data-anim-section="a-06"]')[0];
  const scopeCard = q('[data-anim="scope-card"]')[0];
  const scopeEdge = q('[data-anim="scope-edge"]')[0];
  if (scopeSection && scopeCard && scopeEdge) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeSection,
        start: ENTER,
        once: true,
        refreshPriority: 40,
      },
      defaults: { ease: EASE.settle },
    });
    tl.set(scopeEdge, { transformOrigin: "left center" })
      .to(scopeEdge, {
        scaleX: 1,
        duration: DUR.fast + 0.15,
        ease: EASE.inOut,
      })
      .set(scopeEdge, { transformOrigin: "right center" })
      .to(scopeEdge, {
        scaleX: 0,
        duration: DUR.fast + 0.15,
        ease: EASE.inOut,
      })
      .fromTo(
        q(
          '[data-anim="scope-title"], [data-anim="scope-desc"], [data-anim="scope-link"]',
        ),
        { clipPath: "inset(100% 0 0 0)", y: 16 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: DUR.base,
          stagger: 0.08,
        },
        "-=0.25",
      );
  }

  /* ── A-07 · AiCta — Bottom-Up Curtain (PLAY) ────────────────────────── */
  const ctaSection = q('[data-anim-section="a-07"]')[0];
  const ctaCard = q('[data-anim="cta-card"]')[0];
  if (ctaSection && ctaCard) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: ENTER,
        once: true,
        refreshPriority: 50,
      },
    });
    tl.fromTo(
      ctaCard,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: DUR.slow,
        ease: EASE.inOut,
      },
    ).from(
      q('[data-anim="cta-actions"]'),
      {
        x: lat(-16),
        duration: DUR.base,
        ease: EASE.settle,
      },
      "-=0.4",
    );
  }
};

export function AiAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={setup}>{children}</Animator>;
}
