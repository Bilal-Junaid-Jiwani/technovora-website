"use client";

/**
 * BlogAnimator — /blog (journal index) GSAP setups.
 * Registry: B-01 Masthead Bloom · B-02 Diagonal Panel Sweep ·
 * B-03 Date-First Rows · B-04 Tint Sweep Band.
 * Every mechanic is unique to its section; see ANIMATION-REGISTRY.md.
 */
import type { ReactNode } from "react";
import { Animator } from "@/components/motion/Animator";
import { gsap, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";

const blogSetup: AnimSetup = ({ scope, conditions }) => {
  const lat = (v: number) => (conditions.isMobile ? Math.round(v / 2) : v);
  const q = (sel: string) => scope.querySelector(sel) as HTMLElement | null;
  const qa = (sel: string) =>
    Array.from(scope.querySelectorAll(sel)) as HTMLElement[];

  /* ── B-01 BlogHero · Masthead Bloom (LOAD) ─────────────────── */
  const hero = q('[data-anim-section="b-01"]');
  if (hero) {
    const rule = hero.querySelector('[data-anim="rule"]') as HTMLElement | null;
    const titleInner = hero.querySelector(
      '[data-anim="title-inner"]',
    ) as HTMLElement | null;
    const eyebrow = hero.querySelector(
      '[data-anim="eyebrow"]',
    ) as HTMLElement | null;
    const lede = hero.querySelector('[data-anim="lede"]') as HTMLElement | null;
    const metaItems = Array.from(
      hero.querySelectorAll('[data-anim="meta-item"]'),
    ) as HTMLElement[];

    /* Hairlines bloom from the centre: the ledger rule above the meta
       line and the section's own bottom border (bottom rule). The real
       borders are faded out and the draw is carried by a background
       line growing 0%→100% at 50% origin, so the bloom is symmetric. */
    if (rule) {
      gsap.set(rule, {
        backgroundImage:
          "linear-gradient(var(--hairline), var(--hairline))",
        backgroundPosition: "50% 0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "0% 1px",
        borderTopColor: "transparent",
      });
    }
    gsap.set(hero, {
      backgroundImage: "linear-gradient(var(--hairline), var(--hairline))",
      backgroundPosition: "50% 100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 1px",
      borderBottomColor: "transparent",
    });

    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });
    if (rule)
      tl.to(rule, { backgroundSize: "100% 1px", duration: DUR.slow }, 0);
    tl.to(hero, { backgroundSize: "100% 1px", duration: DUR.slow }, 0);
    if (titleInner)
      tl.from(titleInner, { yPercent: 112, duration: DUR.hero }, 0.1);
    if (eyebrow) tl.from(eyebrow, { x: lat(12), duration: DUR.base }, 0.4);
    if (lede) tl.from(lede, { x: lat(12), duration: DUR.base }, "-=0.55");
    if (metaItems.length)
      tl.from(
        metaItems,
        { x: lat(12), duration: DUR.base, stagger: 0.09 },
        "-=0.5",
      );
  }

  /* ── B-02 FeaturedArticle · Diagonal Panel Sweep (PLAY) ───── */
  const featSec = q('[data-anim-section="b-02"]');
  const panel = q('[data-anim="panel"]');
  if (featSec && panel) {
    const featMeta = featSec.querySelector(
      '[data-anim="feat-meta"]',
    ) as HTMLElement | null;
    const featTitle = featSec.querySelector(
      '[data-anim="feat-title"]',
    ) as HTMLElement | null;
    const excerptItems = Array.from(
      featSec.querySelectorAll('[data-anim="feat-excerpt"]'),
    ) as HTMLElement[];

    gsap.set(panel, {
      clipPath: "polygon(0% 0%, 0% 0%, -10% 100%, 0% 100%)",
    });
    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: featSec,
        start: ENTER,
        once: true,
        refreshPriority: 2,
      },
    });
    tl.to(panel, {
      clipPath: "polygon(0% 0%, 112% 0%, 100% 100%, 0% 100%)",
      duration: DUR.slow,
      ease: EASE.inOut,
      onComplete: () => gsap.set(panel, { clearProps: "clipPath" }),
    });
    if (featMeta)
      tl.from(featMeta, { x: lat(-12), duration: DUR.base }, 0.15);
    if (featTitle)
      tl.from(
        featTitle,
        { xPercent: -112, duration: DUR.slow },
        "-=0.75",
      );
    if (excerptItems.length)
      tl.from(
        excerptItems,
        { x: lat(-14), duration: DUR.base, stagger: 0.08 },
        "-=0.55",
      );
  }

  /* ── B-03 ArticleGrid · Date-First Rows (PLAY) ─────────────── */
  const gridSec = q('[data-anim-section="b-03"]');
  if (gridSec) {
    const rows = qa('[data-anim="row"]');
    const bodies = qa('[data-anim="row-body"]');
    const dates = qa('[data-anim="date"]');
    if (rows.length) {
      /* Rows travel in; overflow is clipped on the section so the
         +40px start never widens the page. */
      gsap.set(gridSec, { overflow: "hidden" });
      const tl = gsap.timeline({
        defaults: { ease: EASE.settle },
        scrollTrigger: {
          trigger: gridSec,
          start: ENTER,
          once: true,
          refreshPriority: 3,
        },
      });
      tl.from(rows, { x: lat(40), duration: DUR.slow, stagger: 0.1 }, 0);
      if (bodies.length)
        tl.from(
          bodies,
          { x: lat(24), duration: DUR.slow, stagger: 0.1 },
          0.06,
        );
      if (dates.length)
        tl.fromTo(
          dates,
          { letterSpacing: "0.09em" },
          {
            letterSpacing: "0em",
            duration: DUR.slow,
            stagger: 0.1,
            ease: EASE.settle,
          },
          0,
        );
    }
  }

  /* ── B-04 BlogCta · Tint Sweep Band (PLAY) ─────────────────── */
  const ctaSec = q('[data-anim-section="b-04"]');
  if (ctaSec) {
    const head = ctaSec.querySelector(
      '[data-anim="cta-head"]',
    ) as HTMLElement | null;
    const action = ctaSec.querySelector(
      '[data-anim="cta-action"]',
    ) as HTMLElement | null;
    gsap.set(ctaSec, {
      backgroundImage:
        "linear-gradient(var(--accent-soft), var(--accent-soft))",
      backgroundPosition: "0 0",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 100%",
    });
    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: ctaSec,
        start: ENTER,
        once: true,
        refreshPriority: 4,
      },
    });
    tl.to(ctaSec, {
      backgroundSize: "100% 100%",
      duration: DUR.slow,
      ease: EASE.inOut,
    });
    if (head) tl.from(head, { x: lat(-14), duration: DUR.base }, "-=0.6");
    if (action) tl.from(action, { x: lat(14), duration: DUR.base }, "<");
  }
};

export function BlogAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={blogSetup}>{children}</Animator>;
}
