"use client";

/**
 * ContactAnimator — /contact GSAP setups.
 * Registry: CT-01 X-Axis Char Cascade · CT-02 Field Underline Cascade ·
 * CT-03 Matcher Unfold · CT-04 Connector Grow · CT-05 Horizon Parting.
 * Form, mailto and matcher logic are untouched — wrappers, labels,
 * borders and panels only. See ANIMATION-REGISTRY.md.
 */
import type { ReactNode } from "react";
import { Animator } from "@/components/motion/Animator";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";

const contactSetup: AnimSetup = ({ scope, conditions }) => {
  const lat = (v: number) => (conditions.isMobile ? Math.round(v / 2) : v);
  const q = (sel: string) => scope.querySelector(sel) as HTMLElement | null;
  const qa = (sel: string) =>
    Array.from(scope.querySelectorAll(sel)) as HTMLElement[];

  /* ── CT-01 ContactHero · X-Axis Char Cascade (LOAD) ───────── */
  const heroSec = q('[data-anim-section="ct-01"]');
  if (heroSec) {
    const eyebrow = heroSec.querySelector(
      '[data-anim="hero-eyebrow"]',
    ) as HTMLElement | null;
    const title = heroSec.querySelector(
      '[data-anim="hero-title"]',
    ) as HTMLElement | null;
    const lede = heroSec.querySelector(
      '[data-anim="hero-lede"]',
    ) as HTMLElement | null;

    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });
    if (eyebrow) tl.from(eyebrow, { x: lat(-12), duration: DUR.fast }, 0);
    if (title) {
      /* Horizontal counterpart to Home's vertical char rise: chars
         slide x −110%→0 inside their masks on the X axis only. */
      const split = SplitText.create(title, { type: "chars", mask: "chars" });
      if (split.chars && split.chars.length) {
        tl.from(
          split.chars,
          {
            xPercent: -115,
            duration: DUR.base,
            ease: EASE.out,
            stagger: 0.014,
            onComplete: () => split.revert(),
          },
          0.1,
        );
      }
    }
    if (lede) tl.from(lede, { x: lat(24), duration: DUR.base }, "-=0.4");
  }

  /* ── CT-02 ContactMain · Field Underline Cascade (PLAY) ───── */
  const mainSec = q('[data-anim-section="ct-02"]');
  if (mainSec) {
    const formTitle = mainSec.querySelector(
      '[data-anim="form-title"]',
    ) as HTMLElement | null;
    const formDesc = mainSec.querySelector(
      '[data-anim="form-desc"]',
    ) as HTMLElement | null;
    const labels = qa('[data-anim="field-label"]');
    const underlines = qa('[data-anim="underline"]');
    const infoItems = qa('[data-anim="info-item"]');
    gsap.set(mainSec, { overflow: "hidden" });

    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: mainSec,
        start: ENTER,
        once: true,
        refreshPriority: 2,
      },
    });
    if (formTitle) tl.from(formTitle, { x: lat(-14), duration: DUR.base }, 0);
    if (formDesc)
      tl.from(formDesc, { x: lat(-14), duration: DUR.base }, "-=0.6");
    if (labels.length)
      tl.fromTo(
        labels,
        { clipPath: "inset(0% 0% 100% 0%)", y: 10 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: DUR.base,
          stagger: 0.09,
        },
        "-=0.35",
      );
    if (underlines.length)
      tl.from(
        underlines,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: DUR.base,
          stagger: 0.09,
        },
        "-=0.55",
      );
    if (infoItems.length)
      tl.from(
        infoItems,
        { x: lat(18), duration: DUR.base, stagger: 0.1 },
        "-=0.5",
      );
  }

  /* ── CT-03 NeedsMatcher · Matcher Unfold (PLAY + INTERACT) ── */
  const matcherSec = q('[data-anim-section="ct-03"]');
  if (matcherSec) {
    const intro = matcherSec.querySelector(
      '[data-anim="matcher-intro"]',
    ) as HTMLElement | null;
    const questions = qa('[data-anim="question"]');
    gsap.set(matcherSec, { overflow: "hidden" });

    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: matcherSec,
        start: ENTER,
        once: true,
        refreshPriority: 3,
      },
    });
    if (intro) tl.from(intro, { x: lat(-18), duration: DUR.base }, 0);
    if (questions.length)
      tl.fromTo(
        questions,
        { clipPath: "inset(0% 0% 100% 0%)", y: 22 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: DUR.slow,
          stagger: 0.1,
        },
        "-=0.4",
      );

    /* INTERACT: the recommendation panel is state-inserted after
       setup. Watch for it and unfold each fresh instance (clip +
       wrapper transform; the mailto CTA slides up inside). Matcher
       state and mailto composition are never touched. */
    const animateResult = (wrap: HTMLElement) => {
      const card = wrap.querySelector(
        '[data-anim="result-card"]',
      ) as HTMLElement | null;
      const cta = wrap.querySelector(
        '[data-anim="result-cta"]',
      ) as HTMLElement | null;
      const rtl = gsap.timeline({ defaults: { ease: EASE.settle } });
      rtl.fromTo(
        wrap,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.slow,
          ease: EASE.inOut,
        },
      );
      if (card) rtl.from(card, { y: 26, duration: DUR.slow }, "-=0.6");
      if (cta) rtl.from(cta, { y: 18, duration: DUR.base }, "-=0.55");
    };
    const observer = new MutationObserver(() => {
      if (!document.contains(scope)) {
        observer.disconnect();
        return;
      }
      const wrap = matcherSec.querySelector(
        '[data-anim="result-wrap"]',
      ) as HTMLElement | null;
      if (wrap && !wrap.dataset.animPlayed) {
        wrap.dataset.animPlayed = "1";
        animateResult(wrap);
      }
    });
    observer.observe(matcherSec, { childList: true, subtree: true });
  }

  /* ── CT-04 NextSteps · Connector Grow (SCRUB) ─────────────── */
  const stepsSec = q('[data-anim-section="ct-04"]');
  if (stepsSec) {
    const head = stepsSec.querySelector(
      '[data-anim="steps-head"]',
    ) as HTMLElement | null;
    const connector = stepsSec.querySelector(
      '[data-anim="connector"]',
    ) as HTMLElement | null;
    const list = stepsSec.querySelector("ol") as HTMLElement | null;
    const steps = qa('[data-anim="step"]');
    gsap.set(stepsSec, { overflow: "hidden" });

    if (head) {
      gsap.from(head, {
        x: lat(-16),
        duration: DUR.base,
        ease: EASE.settle,
        scrollTrigger: {
          trigger: stepsSec,
          start: ENTER,
          once: true,
          refreshPriority: 4,
        },
      });
    }
    if (connector && list) {
      gsap.fromTo(
        connector,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.6,
            refreshPriority: 4,
          },
        },
      );
    }
    steps.forEach((step, i) => {
      const badge = step.querySelector(
        '[data-anim="step-badge"]',
      ) as HTMLElement | null;
      const text = step.querySelector(
        '[data-anim="step-text"]',
      ) as HTMLElement | null;
      const stl = gsap.timeline({
        defaults: { ease: EASE.settle },
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          once: true,
          refreshPriority: 5 + i,
        },
      });
      if (badge)
        stl.from(badge, { rotation: -90, duration: DUR.base }, 0);
      if (text) stl.from(text, { x: lat(16), duration: DUR.base }, 0.08);
    });
  }

  /* ── CT-05 BookingBand · Horizon Parting (PLAY) ───────────── */
  const bookSec = q('[data-anim-section="ct-05"]');
  if (bookSec) {
    const head = bookSec.querySelector(
      '[data-anim="book-head"]',
    ) as HTMLElement | null;
    const action = bookSec.querySelector(
      '[data-anim="book-action"]',
    ) as HTMLElement | null;
    /* Top rule draws via a background line; the band's real top
       border is faded so only the draw shows. */
    gsap.set(bookSec, {
      overflow: "hidden",
      backgroundImage: "linear-gradient(var(--hairline), var(--hairline))",
      backgroundPosition: "0 0",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 1px",
      borderTopColor: "transparent",
    });
    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: bookSec,
        start: ENTER,
        once: true,
        refreshPriority: 9,
      },
    });
    tl.to(bookSec, { backgroundSize: "100% 1px", duration: DUR.slow }, 0);
    if (head) tl.from(head, { x: lat(-16), duration: DUR.base }, "-=0.6");
    if (action) tl.from(action, { x: lat(16), duration: DUR.base }, "<");
  }
};

export function ContactAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={contactSetup}>{children}</Animator>;
}
