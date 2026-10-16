"use client";

/**
 * DesignAnimator — GSAP setup for /services/design.
 *
 * Registry rows D-01..D-06 (ANIMATION-REGISTRY.md). One unique mechanic per
 * section; nothing here is reused on any other page. All tweens are created
 * inside the shared useAnimator lifecycle (reduced-motion => setup never
 * runs, SSR markup is the final state).
 */
import type { ReactNode } from "react";
import { Animator } from "@/components/motion/Animator";
import type { AnimSetup } from "@/lib/motion/useAnimator";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";

const setup: AnimSetup = ({ scope, conditions }) => {
  const lat = conditions.isMobile ? 0.5 : 1;
  const section = (id: string) =>
    scope.querySelector<HTMLElement>(`[data-anim-section="${id}"]`);
  const one = (root: HTMLElement, sel: string) =>
    root.querySelector<HTMLElement>(`[data-anim="${sel}"]`);
  const all = (root: HTMLElement, sel: string) =>
    gsap.utils.toArray<HTMLElement>(`[data-anim="${sel}"]`, root);

  /* ── D-01 · DesignHero — Circle Unveil (LOAD) ───────────────────────── */
  const hero = section("d-01");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    const crumb = one(hero, "crumb");
    if (crumb) tl.from(crumb, { x: -14 * lat, duration: DUR.fast }, 0);
    const eyebrow = one(hero, "eyebrow");
    if (eyebrow) tl.from(eyebrow, { x: -16 * lat, duration: DUR.fast }, 0.06);

    const title = one(hero, "title");
    if (title) {
      const split = SplitText.create(title, { type: "lines", mask: "lines" });
      tl.from(
        split.lines,
        {
          xPercent: (i: number) => (i % 2 === 0 ? -4 : 4),
          duration: DUR.hero,
          stagger: 0.09,
          onComplete: () => split.revert(),
        },
        0.12,
      );
    }
    const lede = one(hero, "lede");
    if (lede) tl.from(lede, { x: 24 * lat, duration: DUR.base }, 0.45);
    const actions = one(hero, "actions");
    if (actions) {
      tl.from(
        actions,
        { scale: 0.92, transformOrigin: "left center", duration: DUR.fast, ease: EASE.pop },
        0.6,
      );
    }
    const specimen = one(hero, "specimen");
    if (specimen) {
      tl.fromTo(
        specimen,
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: DUR.hero, ease: EASE.out },
        0.55,
      );
      const parts = ["specimen-bar", "specimen-row", "specimen-note"]
        .map((name) => one(hero, name))
        .filter((el): el is HTMLElement => el !== null);
      if (parts.length > 0) {
        tl.from(parts, { x: 20 * lat, duration: DUR.base, stagger: 0.08 }, 0.75);
      }
    }
  }

  /* ── D-02 · DesignDebt — Annotation Reach (PLAY) ────────────────────── */
  const debt = section("d-02");
  if (debt) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: debt, start: ENTER, once: true, refreshPriority: 2 },
    });
    const head = one(debt, "head");
    if (head) tl.from(head, { x: -24 * lat, duration: DUR.base }, 0);
    all(debt, "row").forEach((row, i) => {
      const at = 0.15 + i * 0.42;
      const symptom = one(row, "symptom");
      if (symptom) tl.from(symptom, { x: 20 * lat, duration: 0.65 }, at);
      const leader = one(row, "leader");
      if (leader) {
        tl.from(leader, { scaleX: 0, duration: DUR.fast, ease: EASE.inOut }, at + 0.25);
      }
      const note = one(row, "note");
      if (note) tl.from(note, { x: 28 * lat, duration: 0.65 }, at + 0.32);
    });
  }

  /* ── D-03 · DesignVerbs — Arrow Precede (PLAY) ──────────────────────── */
  const verbs = section("d-03");
  if (verbs) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: verbs, start: ENTER, once: true, refreshPriority: 3 },
    });
    const title = one(verbs, "title");
    if (title) tl.from(title, { x: -22 * lat, duration: DUR.base }, 0);
    all(verbs, "row").forEach((row, i) => {
      const at = 0.1 + i * 0.5;
      const verb = one(row, "verb");
      if (verb) tl.from(verb, { x: -14 * lat, duration: DUR.fast }, at);
      const arrow = one(row, "arrow");
      if (arrow) {
        tl.from(
          arrow,
          { scaleX: 0, transformOrigin: "0% 50%", duration: 0.35, ease: EASE.inOut },
          at + 0.14,
        );
      }
      const outcome = one(row, "outcome");
      if (outcome) tl.from(outcome, { x: -26 * lat, duration: 0.6 }, at + 0.3);
    });
  }

  /* ── D-04 · DesignCritLoop — Path Traveller (SCRUB) ─────────────────── */
  const crit = section("d-04");
  if (crit) {
    const headTl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: crit, start: ENTER, once: true, refreshPriority: 4 },
    });
    const eyebrow = one(crit, "eyebrow");
    if (eyebrow) headTl.from(eyebrow, { x: -14 * lat, duration: DUR.fast }, 0);
    const title = one(crit, "title");
    if (title) headTl.from(title, { x: -22 * lat, duration: DUR.base }, 0.06);
    const lede = one(crit, "lede");
    if (lede) headTl.from(lede, { x: 22 * lat, duration: DUR.base }, 0.14);
    const panel = one(crit, "panel");
    if (panel) {
      headTl.from(panel, { scale: 0.97, transformOrigin: "50% 50%", duration: DUR.base }, 0.12);
    }
    const note = one(crit, "note");
    if (note) headTl.from(note, { x: 14 * lat, duration: DUR.base }, 0.3);

    const loopPath = crit.querySelector<SVGPathElement>('[data-anim="loop-path"]');
    const dot = crit.querySelector<SVGElement>('[data-anim="traveller"]');
    if (loopPath && dot) {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: crit,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.8,
          refreshPriority: 4,
        },
      });
      const arc = crit.querySelector<SVGPathElement>('[data-anim="arc"]');
      if (arc) {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        scrubTl.to(arc, { strokeDashoffset: 0, duration: 0.25, ease: "none" }, 0);
      }
      scrubTl.to(
        dot,
        {
          motionPath: { path: loopPath, align: loopPath, alignOrigin: [0.5, 0.5] },
          duration: 1,
          ease: "none",
        },
        0,
      );
      const stages = all(crit, "crit-stage");
      const nodes = gsap.utils.toArray<SVGElement>('[data-anim="node"]', crit);
      stages.forEach((stage, i) => {
        const at = i * 0.25;
        scrubTl.fromTo(
          stage,
          { opacity: 0.4 },
          { opacity: 1, duration: 0.16, ease: "none", immediateRender: false },
          at,
        );
        const num = one(stage, "crit-num");
        if (num) {
          scrubTl.fromTo(
            num,
            { scale: 0.55 },
            { scale: 1, duration: 0.14, ease: EASE.pop, immediateRender: false },
            at,
          );
        }
        const node = nodes[i];
        if (node) {
          scrubTl.fromTo(
            node,
            { scale: 0.85 },
            {
              scale: 1,
              duration: 0.14,
              ease: EASE.pop,
              immediateRender: false,
              transformOrigin: "50% 50%",
            },
            at,
          );
        }
      });
    }
  }

  /* ── D-05 · DesignToolbox — Lone Marquee (LOAD loop) ────────────────── */
  const toolbox = section("d-05");
  if (toolbox) {
    const enterTl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: toolbox, start: ENTER, once: true, refreshPriority: 5 },
    });
    const toolsTitle = one(toolbox, "tools-title");
    if (toolsTitle) enterTl.from(toolsTitle, { x: -16 * lat, duration: DUR.fast }, 0);
    const toolsNote = one(toolbox, "tools-note");
    if (toolsNote) enterTl.from(toolsNote, { x: 16 * lat, duration: DUR.base }, 0.15);

    const track = one(toolbox, "marquee-track");
    const line = one(toolbox, "tools-line");
    if (track && line) {
      // Duplicate the existing tools line for a seamless loop (implementation
      // detail — same text node, no new copy). Reduced motion never reaches
      // here: the hook skips setup entirely, so the static line stands.
      track.classList.add("flex", "w-max");
      line.classList.add("shrink-0", "whitespace-nowrap");
      line.style.maxWidth = "none";
      line.style.paddingRight = "4rem";
      const copy = line.cloneNode(true) as HTMLElement;
      copy.setAttribute("aria-hidden", "true");
      copy.removeAttribute("data-anim");
      track.appendChild(copy);
      gsap.to(track, {
        xPercent: -50,
        duration: 36,
        ease: "none",
        repeat: -1,
      });
    }
  }

  /* ── D-06 · DesignCta — Mega-Link Scale (SCRUB) ─────────────────────── */
  const cta = section("d-06");
  if (cta) {
    const title = one(cta, "title");
    const lede = one(cta, "lede");
    const note = one(cta, "note");
    const enterTl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: cta, start: ENTER, once: true, refreshPriority: 6 },
    });
    if (title) {
      enterTl.fromTo(
        title,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
        0,
      );
    }
    if (lede) enterTl.from(lede, { x: 18 * lat, duration: 0.6 }, 0.12);
    if (note) enterTl.from(note, { x: -14 * lat, duration: 0.6 }, 0.2);

    const link = one(cta, "maillink");
    if (link) {
      gsap.set(link, {
        textDecoration: "none",
        backgroundImage: "linear-gradient(var(--accent), var(--accent))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: "0% 3px",
        scale: 0.92,
        transformOrigin: "50% 50%",
      });
      gsap.to(link, {
        scale: 1,
        backgroundSize: "100% 3px",
        ease: "none",
        scrollTrigger: {
          trigger: cta,
          start: "top 92%",
          end: "top 38%",
          scrub: 0.7,
          refreshPriority: 6,
        },
      });
    }
  }
};

export function DesignAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={setup}>{children}</Animator>;
}
