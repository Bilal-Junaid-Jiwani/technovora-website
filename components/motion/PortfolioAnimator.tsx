"use client";

/**
 * PortfolioAnimator — /portfolio GSAP setup (registry PF-01..PF-06).
 *
 * Owns every portfolio mechanic; sections only carry data-anim hooks.
 * Wraps the page's sections in a display:contents scope via useAnimator —
 * zero layout change. Reduced motion: useAnimator creates nothing.
 */
import type { ReactNode } from "react";
import { useAnimator, type AnimSetup } from "@/lib/motion/useAnimator";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";

/**
 * PF-05 frame edges: drawn in reading order — top, right, bottom, left.
 * Edge elements are decorative; the note itself loses no border.
 */
function drawFrame(scope: HTMLElement) {
  const root = scope.querySelector<HTMLElement>('[data-anim-section="pf-05"]');
  if (!root) return;
  const edges = root.querySelectorAll<HTMLElement>('[data-anim="frame-edge"]');
  const text = root.querySelector<HTMLElement>('[data-anim="method-text"]');
  gsap.set(edges, { scaleX: 0, scaleY: 0 });
  edges.forEach((el) => {
    const edge = el.dataset.edge;
    el.style.transformOrigin =
      edge === "top"
        ? "left center"
        : edge === "right"
          ? "center top"
          : edge === "bottom"
            ? "right center"
            : "center bottom";
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: ENTER,
      once: true,
      refreshPriority: 5,
    },
  });
  tl.to('[data-anim="frame-edge"][data-edge="top"]', {
    scaleX: 1,
    duration: DUR.fast,
    ease: EASE.out,
  })
    .to(
      '[data-anim="frame-edge"][data-edge="right"]',
      { scaleY: 1, duration: DUR.fast, ease: EASE.out },
      ">-0.08",
    )
    .to(
      '[data-anim="frame-edge"][data-edge="bottom"]',
      { scaleX: 1, duration: DUR.fast, ease: EASE.out },
      ">-0.08",
    )
    .to(
      '[data-anim="frame-edge"][data-edge="left"]',
      { scaleY: 1, duration: DUR.fast, ease: EASE.out },
      ">-0.08",
    );
  if (text) {
    tl.fromTo(
      text,
      { y: 22, clipPath: "inset(0 0 100% 0)" },
      {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: DUR.base,
        ease: EASE.out,
        clearProps: "clipPath",
      },
      ">-0.15",
    );
  }
}

const setup: AnimSetup = ({ scope }) => {
  // PF-01 — Differential Parallax Head (SCRUB). The site's only text
  // parallax: title and meta line drift at two different speeds.
  const hero = scope.querySelector<HTMLElement>('[data-anim-section="pf-01"]');
  if (hero) {
    const title = hero.querySelector('[data-anim="pf-title"]');
    const meta = hero.querySelector('[data-anim="pf-meta"]');
    if (title) {
      gsap.to(title, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          refreshPriority: 1,
        },
      });
    }
    if (meta) {
      gsap.to(meta, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          refreshPriority: 1,
        },
      });
    }
  }

  // PF-02 — Corner-Origin Tiles (PLAY): tiles scale in from alternating
  // corner transform-origins, grid-staggered.
  const gallery = scope.querySelector<HTMLElement>('[data-anim-section="pf-02"]');
  if (gallery) {
    const tiles = gallery.querySelectorAll<HTMLElement>('[data-anim="pf-tile"]');
    if (tiles.length) {
      const origins = ["0% 0%", "100% 0%", "100% 100%", "0% 100%"];
      tiles.forEach((tile, i) => {
        tile.style.transformOrigin = origins[i % origins.length];
      });
      gsap.fromTo(
        tiles,
        { scale: 0.85 },
        {
          scale: 1,
          duration: DUR.base,
          ease: EASE.out,
          stagger: { each: 0.07, grid: "auto", from: "start" },
          scrollTrigger: {
            trigger: gallery,
            start: ENTER,
            once: true,
            refreshPriority: 2,
          },
        },
      );
    }
  }

  // PF-03 — Counter-Motion Split (PLAY): visual panel travels left while
  // its inner composition counter-scales; the text column meets it.
  const featured = scope.querySelector<HTMLElement>('[data-anim-section="pf-03"]');
  if (featured) {
    const visual = featured.querySelector('[data-anim="fp-visual"]');
    const inner = featured.querySelector('[data-anim="fp-inner"]');
    const text = featured.querySelector('[data-anim="fp-text"]');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featured,
        start: ENTER,
        once: true,
        refreshPriority: 3,
      },
    });
    if (visual) {
      tl.fromTo(
        visual,
        { x: -24 },
        { x: 0, duration: DUR.base, ease: EASE.out },
        0,
      );
    }
    if (inner) {
      tl.fromTo(
        inner,
        { scale: 1.15 },
        { scale: 1, duration: DUR.base, ease: EASE.out },
        0,
      );
    }
    if (text) {
      tl.fromTo(
        text,
        { x: 24 },
        { x: 0, duration: DUR.base, ease: EASE.out },
        0,
      );
    }
  }

  // PF-04 — Accent Spine Rows (PLAY): left spine grows scaleY per row,
  // outcome text slides in behind it, name follows.
  const index = scope.querySelector<HTMLElement>('[data-anim-section="pf-04"]');
  if (index) {
    const rows = index.querySelectorAll<HTMLElement>('[data-anim="pf-row"]');
    rows.forEach((row, i) => {
      const spine = row.querySelector('[data-anim="pf-spine"]');
      const outcome = row.querySelector('[data-anim="pf-outcome"]');
      const name = row.querySelector('[data-anim="pf-name"]');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: ENTER,
          once: true,
          refreshPriority: 4,
        },
        delay: Math.min(i * 0.03, 0.18),
      });
      if (spine) gsap.set(spine, { scaleY: 0 });
      if (outcome) gsap.set(outcome, { x: 20 });
      if (name) gsap.set(name, { x: 20 });
      if (spine) {
        tl.fromTo(
          spine,
          { scaleY: 0 },
          { scaleY: 1, duration: DUR.fast, ease: EASE.out },
          0,
        );
      }
      if (outcome) {
        tl.fromTo(
          outcome,
          { x: 20 },
          { x: 0, duration: DUR.fast, ease: EASE.out },
          0.05,
        );
      }
      if (name) {
        tl.fromTo(
          name,
          { x: 20 },
          { x: 0, duration: DUR.fast, ease: EASE.out },
          0.12,
        );
      }
    });
  }

  // PF-05 — Frame Draw (PLAY).
  drawFrame(scope);

  // PF-06 — Cross-Mask Invitation (PLAY): headline words cross in masks
  // (odd from left, even from right); button rises in a bottom mask.
  const cta = scope.querySelector<HTMLElement>('[data-anim-section="pf-06"]');
  if (cta) {
    const headline = cta.querySelector<HTMLElement>('[data-anim="cta-title"]');
    const button = cta.querySelector('[data-anim="cta-button"]');
    const note = cta.querySelector('[data-anim="cta-note"]');
    let split: SplitText | null = null;
    if (headline) {
      split = new SplitText(headline, { type: "words", mask: "words" });
      const words = split.words ?? [];
      words.forEach((w, i) => {
        gsap.set(w, { xPercent: i % 2 === 0 ? -110 : 110 });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cta,
          start: ENTER,
          once: true,
          refreshPriority: 6,
        },
      });
      tl.to(words, {
        xPercent: 0,
        duration: DUR.base,
        ease: EASE.out,
        stagger: 0.05,
        onComplete: () => split?.revert(),
      });
      if (button) {
        tl.fromTo(
          button,
          { y: 18, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: DUR.fast,
            ease: EASE.out,
            clearProps: "clipPath",
          },
          ">-0.3",
        );
      }
      if (note) {
        tl.fromTo(
          note,
          { y: 12 },
          { y: 0, duration: DUR.fast, ease: EASE.out },
          "<0.1",
        );
      }
    }
  }
};

export function PortfolioAnimator({ children }: { children: ReactNode }) {
  const ref = useAnimator(setup);
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
