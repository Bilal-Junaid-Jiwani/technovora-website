"use client";

/**
 * ServicesIndexAnimator — GSAP setup for the /services index page.
 * Registry: ANIMATION-REGISTRY.md, /services S-01..S-05.
 *
 * One unique mechanic per section, never repeated anywhere on the site:
 *   S-01 Horizontal Line Sweep · S-02 Alternating Edge Panels
 *   S-03 Convergence Columns   · S-04 Statement Settle (scrub)
 *   S-05 Hinge Unfold
 * No plain fade / fade-up / flip anywhere. Reduced-motion: the useAnimator
 * hook creates nothing, so SSR markup stands as the final state.
 */
import type { ReactNode } from "react";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";
import { Animator } from "@/components/motion/Animator";

/** Client wrapper so the server page can hand its sections to the animator. */
export function ServicesIndexAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={servicesIndexSetup}>{children}</Animator>;
}

export const servicesIndexSetup: AnimSetup = ({ scope, conditions }) => {
  const { isDesktop } = conditions;
  const root = gsap.utils.selector(scope);
  const section = (id: string): HTMLElement | null =>
    (root(`[data-anim-section="${id}"]`)[0] as HTMLElement | undefined) ?? null;

  /* ── S-01 ServicesHero — Horizontal Line Sweep (LOAD) ──────────────────
     Title lines slide x −6%→0 inside SplitText line masks; the facts
     column travels in from the right against them. X-axis only. */
  const hero = section("s-01");
  if (hero) {
    const hq = gsap.utils.selector(hero);
    const eyebrow = hq('[data-anim="eyebrow"]')[0] as HTMLElement | undefined;
    const title = hq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = hq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const facts = hq('[data-anim="fact"]') as HTMLElement[];
    const factX = isDesktop ? 24 : 12;

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    if (eyebrow) {
      tl.from(eyebrow, { x: -24, duration: DUR.base }, 0);
    }
    if (title) {
      const split = new SplitText(title, { type: "lines", mask: "lines" });
      tl.from(
        split.lines,
        {
          xPercent: -6,
          duration: DUR.hero,
          ease: EASE.settle,
          stagger: 0.09,
          onComplete: () => split.revert(),
        },
        0.05,
      );
    }
    if (lede) {
      tl.from(lede, { x: factX, duration: DUR.base }, 0.4);
    }
    if (facts.length) {
      tl.from(
        facts,
        { x: factX, duration: DUR.base, stagger: 0.08 },
        0.48,
      );
    }
  }

  /* ── S-02 ServiceDirectory — Alternating Edge Panels (PLAY) ────────────
     Bands arrive from alternating edges (odd −56, even +56 desktop; capped
     on mobile so nothing ever overflows), inner content settles
     scale 1.06→1, and each band's hairline draws on arrival. */
  const directory = section("s-02");
  if (directory) {
    const dq = gsap.utils.selector(directory);
    const heading = dq('[data-anim="heading"]')[0] as HTMLElement | undefined;
    const bands = dq('[data-anim="band"]') as HTMLElement[];
    const edge = isDesktop ? 56 : 24;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: directory,
        start: ENTER,
        once: true,
        refreshPriority: 1,
      },
    });
    if (heading) {
      tl.from(heading, { x: isDesktop ? -32 : -16, duration: DUR.base }, 0);
    }
    bands.forEach((band, i) => {
      const fromLeft = i % 2 === 0;
      const at = 0.12 + i * 0.1;
      tl.from(
        band,
        { x: (fromLeft ? -1 : 1) * edge, duration: DUR.slow, ease: EASE.settle },
        at,
      );
      const inner = band.querySelectorAll('[data-anim="band-inner"]');
      if (inner.length) {
        tl.from(
          inner,
          { scale: 1.06, duration: DUR.slow, ease: EASE.settle },
          at,
        );
      }
      const hairline = band.querySelector('[data-anim="hairline"]');
      if (hairline) {
        gsap.set(hairline, {
          transformOrigin: fromLeft ? "left center" : "right center",
        });
        tl.from(hairline, { scaleX: 0, duration: DUR.base }, at + 0.18);
      }
    });
  }

  /* ── S-03 FitGuide — Convergence Columns (PLAY) ────────────────────────
     Good-fit column travels in from the left, not-a-fit from the right;
     the centre divider grows scaleY as they meet. Items stagger inside
     each travelling column. */
  const fit = section("s-03");
  if (fit) {
    const fq = gsap.utils.selector(fit);
    const header = fq('[data-anim="header"]')[0] as HTMLElement | undefined;
    const good = fq('[data-anim="good"]')[0] as HTMLElement | undefined;
    const bad = fq('[data-anim="bad"]')[0] as HTMLElement | undefined;
    const divider = fq('[data-anim="divider"]')[0] as HTMLElement | undefined;
    const travel = isDesktop ? 40 : 20;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: fit,
        start: ENTER,
        once: true,
        refreshPriority: 2,
      },
    });
    if (header) {
      tl.from(header, { x: isDesktop ? -28 : -16, duration: DUR.base }, 0);
    }
    if (good) {
      tl.from(good, { x: -travel, duration: DUR.slow, ease: EASE.settle }, 0.1);
    }
    if (bad) {
      tl.from(bad, { x: travel, duration: DUR.slow, ease: EASE.settle }, 0.1);
    }
    if (divider) {
      gsap.set(divider, { transformOrigin: "center top" });
      tl.from(
        divider,
        { scaleY: 0, duration: DUR.slow, ease: EASE.settle },
        0.1,
      );
    }
    const goodItems = good?.querySelectorAll('[data-anim="item"]');
    if (goodItems?.length) {
      tl.from(
        goodItems,
        { x: -16, duration: DUR.base, stagger: 0.06 },
        0.3,
      );
    }
    const badItems = bad?.querySelectorAll('[data-anim="item"]');
    if (badItems?.length) {
      tl.from(
        badItems,
        { x: 16, duration: DUR.base, stagger: 0.06 },
        0.3,
      );
    }
  }

  /* ── S-04 PrinciplesStrip — Statement Settle (SCRUB) ───────────────────
     Each statement settles typographically as it crosses viewport centre:
     scale 1.05→1 and letter-spacing 0.02em→−0.03em, scrub-linked.
     No translation, no opacity — the type itself is the motion. */
  const strip = section("s-04");
  if (strip) {
    const pq = gsap.utils.selector(strip);
    const heading = pq('[data-anim="heading"]')[0] as HTMLElement | undefined;
    const statements = pq('[data-anim="statement"]') as HTMLElement[];

    if (heading) {
      gsap.from(heading, {
        scale: 1.03,
        letterSpacing: "0.04em",
        transformOrigin: "left center",
        duration: DUR.base,
        ease: EASE.out,
        scrollTrigger: {
          trigger: strip,
          start: ENTER,
          once: true,
          refreshPriority: 3,
        },
      });
    }
    statements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { scale: 1.05, letterSpacing: "0.02em" },
        {
          scale: 1,
          letterSpacing: "-0.03em",
          transformOrigin: "left center",
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "center center",
            scrub: 0.8,
            refreshPriority: 4 + i,
          },
        },
      );
    });
  }

  /* ── S-05 ServicesCta — Hinge Unfold (PLAY) ────────────────────────────
     The contact card unfolds rotationX −18°→0 from its top edge under a
     perspective parent; the statement beside it rises in a bottom mask. */
  const cta = section("s-05");
  if (cta) {
    const cq = gsap.utils.selector(cta);
    const statement = cq('[data-anim="statement"]')[0] as
      | HTMLElement
      | undefined;
    const cardParent = cq('[data-anim="card-perspective"]')[0] as
      | HTMLElement
      | undefined;
    const card = cq('[data-anim="card"]')[0] as HTMLElement | undefined;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: cta,
        start: ENTER,
        once: true,
        refreshPriority: 7,
      },
    });
    if (statement) {
      tl.from(
        statement,
        { yPercent: 110, duration: DUR.slow, ease: EASE.settle },
        0,
      );
    }
    if (card) {
      if (cardParent) gsap.set(cardParent, { perspective: 1200 });
      tl.from(
        card,
        {
          rotationX: -18,
          transformOrigin: "50% 0%",
          duration: DUR.slow,
          ease: EASE.settle,
        },
        0.15,
      );
    }
  }
};
