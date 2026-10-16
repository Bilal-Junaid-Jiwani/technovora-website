"use client";

/**
 * HomeAnimator — the home page's single GSAP setup (registry H-01..H-08).
 *
 * One module-level setup function; each section owns ONE mechanic that
 * appears nowhere else on the site. No plain fades, no fade-up reveals,
 * no uniform card staggers. Under prefers-reduced-motion the animator
 * hook never calls this setup, so SSR markup is the final state.
 */
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";

export const homeSetup: AnimSetup = ({ scope, conditions }) => {
  const all = <T extends Element = HTMLElement>(
    sel: string,
    root: ParentNode = scope,
  ): T[] => Array.from(root.querySelectorAll<T>(sel));
  const one = <T extends Element = HTMLElement>(
    sel: string,
    root: ParentNode = scope,
  ): T | null => root.querySelector<T>(sel);

  // Lateral travel: ≤40px on desktop, halved on mobile (registry foundation).
  const lat = (px: number) => (conditions.isMobile ? px / 2 : px);

  // ScrollTriggers are created in DOM order with ascending refreshPriority.
  let priority = 0;
  const nextPriority = () => ++priority;

  /* ── H-01 HomeHero — Herald Char Cascade (LOAD) ─────────────────────── */
  const hero = one("[data-anim-section='h-01']");
  if (hero) {
    const headline = one("[data-anim='headline']", hero);
    const eyebrow = one("[data-anim='eyebrow']", hero);
    const sub = one("[data-anim='sub']", hero);
    const ctas = one("[data-anim='ctas']", hero);
    const visualCol = one("[data-anim='visual-col']", hero);
    const globe = one("[data-anim='globe']", hero);
    const metaBar = one("[data-anim='meta-bar']", hero);
    const metaLine = one("[data-anim='meta-line']", hero);
    const metaItems = all("[data-anim='meta-item']", hero);

    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });

    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { y: 12, clipPath: "inset(0 0 100% 0)" },
        { y: 0, clipPath: "inset(0 0 0% 0)", duration: DUR.fast },
        0,
      );
    }

    // Headline chars rise 110% → 0 inside line masks with a 4° rotation
    // settle; the split reverts to plain text when the cascade lands.
    let split: InstanceType<typeof SplitText> | null = null;
    if (headline) {
      split = new SplitText(headline, {
        type: "chars, lines",
        mask: "lines",
      });
      gsap.set(split.chars, {
        yPercent: 110,
        rotation: 4,
        transformOrigin: "0% 100%",
      });
      tl.to(
        split.chars,
        {
          yPercent: 0,
          rotation: 0,
          duration: 1.05,
          ease: EASE.out,
          stagger: 0.018,
          onComplete: () => split?.revert(),
        },
        0.1,
      );
    }

    if (sub) {
      tl.fromTo(
        sub,
        { y: 22, clipPath: "inset(0 0 100% 0)" },
        { y: 0, clipPath: "inset(0 0 0% 0)", duration: DUR.base, ease: EASE.out },
        "-=0.55",
      );
    }
    if (ctas) {
      tl.fromTo(
        ctas,
        { y: 20, clipPath: "inset(0 0 100% 0)" },
        { y: 0, clipPath: "inset(0 0 0% 0)", duration: DUR.base, ease: EASE.out },
        "-=0.6",
      );
    }

    // Visual column travels in against the copy; the proof card rides it.
    if (visualCol) {
      tl.fromTo(
        visualCol,
        { x: lat(40) },
        { x: 0, duration: DUR.slow, ease: EASE.out },
        0.3,
      );
    }

    // Meta-bar hairline draws left → right, then the three facts settle.
    if (metaBar && metaLine) {
      gsap.set(metaBar, { borderTopColor: "transparent" });
      tl.fromTo(
        metaLine,
        { scaleX: 0, transformOrigin: "0% 50%" },
        {
          scaleX: 1,
          duration: DUR.slow,
          ease: EASE.inOut,
          onComplete: () => gsap.set(metaBar, { clearProps: "borderTopColor" }),
        },
        "-=0.45",
      );
    }
    if (metaItems.length) {
      tl.fromTo(
        metaItems,
        { y: 14, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: DUR.base,
          ease: EASE.out,
          stagger: 0.07,
        },
        "-=0.85",
      );
    }

    // The globe CONTAINER counter-drifts ±6 yPercent on scroll; the WebGL
    // globe itself is untouched and gets no second orbital element.
    if (globe) {
      gsap.fromTo(
        globe,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            refreshPriority: nextPriority(),
          },
        },
      );
    }
  }

  /* ── H-02 ServicesIndex — Index Row Lateral Wipe (PLAY) ────────────── */
  const services = one("[data-anim-section='h-02']");
  if (services) {
    const headerParts = all(
      "[data-anim='eyebrow'], [data-anim='title']",
      services,
    );
    const rows = all("[data-anim='row']", services);

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: services,
        start: ENTER,
        once: true,
        refreshPriority: nextPriority(),
      },
    });

    if (headerParts.length) {
      tl.fromTo(
        headerParts,
        { x: lat(-24) },
        { x: 0, duration: DUR.base, stagger: 0.08 },
        0,
      );
    }

    rows.forEach((row, i) => {
      const line = one("[data-anim='row-line']", row);
      const content = one("[data-anim='row-content']", row);
      const num = one("[data-anim='row-num']", row);
      const at = 0.15 + i * 0.09;
      if (line) {
        gsap.set(row, { borderTopColor: "transparent" });
        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: "0% 50%" },
          {
            scaleX: 1,
            duration: 0.7,
            ease: EASE.inOut,
            onComplete: () => gsap.set(row, { clearProps: "borderTopColor" }),
          },
          at,
        );
      }
      if (content) {
        tl.fromTo(
          content,
          { x: lat(-32) },
          { x: 0, duration: DUR.base },
          at + 0.08,
        );
      }
      if (num) {
        tl.fromTo(
          num,
          { letterSpacing: "0.05em" },
          {
            letterSpacing: "-0.02em",
            duration: DUR.base,
            clearProps: "letterSpacing",
          },
          at + 0.08,
        );
      }
    });
  }

  /* ── H-03 FeaturedWork — Curtain Block Unveil (PLAY) ───────────────── */
  const work = one("[data-anim-section='h-03']");
  if (work) {
    const blocks = all("[data-anim='work-block']", work);
    const tl = gsap.timeline({
      defaults: { ease: EASE.inOut },
      scrollTrigger: {
        trigger: work,
        start: ENTER,
        once: true,
        refreshPriority: nextPriority(),
      },
    });
    blocks.forEach((block, i) => {
      const at = i * 0.22;
      tl.fromTo(
        block,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.95 },
        at,
      );
      // Inner deliverable visuals counter-scale 1.18 → 1 as the curtain opens.
      const visual = one("[data-anim='work-visual']", block);
      const inner = visual?.firstElementChild as HTMLElement | null;
      if (visual && inner) {
        gsap.set(visual, { overflow: "hidden" });
        tl.fromTo(
          inner,
          { scale: 1.18 },
          { scale: 1, duration: 0.95, ease: EASE.out },
          at,
        );
      }
    });
  }

  /* ── H-04 WhyUs — Highlight Sweep (SCRUB) ──────────────────────────── */
  const why = one("[data-anim-section='h-04']");
  if (why) {
    const negLines = all("[data-anim='neg-line']", why);
    const statement = one("[data-anim='statement']", why);
    const whyEyebrow = one("[data-anim='why-eyebrow']", why);

    // Supporting lines' ink deepens faint → foreground via a live
    // color-mix driven by a scrubbed custom property (theme-safe).
    const deepen = (els: HTMLElement[]) => {
      els.forEach((el) => {
        el.style.color =
          "color-mix(in srgb, var(--text) var(--inkp, 0%), var(--faint))";
        gsap.set(el, { "--inkp": "0%" } as gsap.TweenVars);
      });
    };
    if (whyEyebrow) deepen([whyEyebrow]);
    deepen(negLines);

    if (statement) {
      gsap.set(statement, {
        backgroundImage:
          "linear-gradient(var(--accent-soft), var(--accent-soft))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 0%",
        backgroundSize: "0% 100%",
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: why,
        start: "top 80%",
        end: "bottom 55%",
        scrub: 0.8,
        refreshPriority: nextPriority(),
      },
    });
    if (whyEyebrow) {
      tl.to(whyEyebrow, { "--inkp": "100%", duration: 0.6 } as gsap.TweenVars, 0);
    }
    if (negLines.length) {
      tl.to(
        negLines,
        { "--inkp": "100%", duration: 1, stagger: 0.3 } as gsap.TweenVars,
        0.2,
      );
    }
    // No <strong> phrases exist in the shipped markup (copy/i18n are
    // frozen), so the accent-soft sweep lands on the closing statement.
    if (statement) {
      tl.to(statement, { backgroundSize: "100% 100%", duration: 1.2 }, 0.9);
    }
  }

  /* ── H-05 Process — Scale-Pan & Stamp (SCRUB + PLAY) ──────────────── */
  const process = one("[data-anim-section='h-05']");
  if (process) {
    const headerParts = all(
      "[data-anim='process-eyebrow'], [data-anim='process-title'], [data-anim='process-lede']",
      process,
    );
    if (headerParts.length) {
      gsap.fromTo(
        headerParts,
        { x: lat(16) },
        {
          x: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: 0.07,
          scrollTrigger: {
            trigger: process,
            start: ENTER,
            once: true,
            refreshPriority: nextPriority(),
          },
        },
      );
    }

    // Studio photo: scale 1.25 → 1 with a yPercent pan across the section.
    const frame = one("[data-anim='photo-frame']", process);
    const img = frame?.querySelector("img");
    if (frame && img) {
      gsap.fromTo(
        img,
        { scale: 1.25, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: process,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            refreshPriority: nextPriority(),
          },
        },
      );
    }

    // Week-log rows: date stamps pop (back.out), row text settles x 16 → 0.
    const logRows = all("[data-anim='process-row']", process);
    if (logRows.length) {
      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: {
          trigger: logRows[0],
          start: ENTER,
          once: true,
          refreshPriority: nextPriority(),
        },
      });
      logRows.forEach((row, i) => {
        const stamp = one("[data-anim='stamp']", row);
        const texts = all("[data-anim='row-text']", row);
        const at = i * 0.09;
        if (stamp) {
          tl.fromTo(
            stamp,
            { scale: 0.6, transformOrigin: "0% 50%" },
            { scale: 1, duration: DUR.fast, ease: EASE.pop },
            at,
          );
        }
        if (texts.length) {
          tl.fromTo(
            texts,
            { x: lat(16) },
            { x: 0, duration: DUR.base, stagger: 0.05 },
            at + 0.05,
          );
        }
      });
    }
  }

  /* ── H-06 OutcomeBand — Odometer Numerals (PLAY) ──────────────────── */
  const outcome = one("[data-anim-section='h-06']");
  if (outcome) {
    const headerParts = all(
      "[data-anim='outcome-eyebrow'], [data-anim='outcome-title']",
      outcome,
    );
    const stats = all("[data-anim='stat']", outcome);

    interface Roll {
      strip: HTMLElement;
      digit: number;
    }
    interface Built {
      num: HTMLElement;
      overlay: HTMLElement;
      rolls: Roll[];
      label: HTMLElement | null;
    }
    const built: Built[] = [];

    // Each numeral gets an absolutely-positioned digit-column overlay;
    // the real text node is only colour-masked, never restructured, and
    // the overlay is removed on complete (plain text restored, i18n-safe).
    stats.forEach((stat) => {
      const num = one("[data-anim='stat-num']", stat);
      const label = one("[data-anim='stat-label']", stat);
      if (!num) return;
      const text = (num.textContent ?? "").trim();
      gsap.set(num, { position: "relative", color: "transparent" });
      const overlay = document.createElement("span");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.cssText =
        "position:absolute;inset:0;display:flex;align-items:flex-start;justify-content:flex-start;color:var(--text);pointer-events:none;";
      const rolls: Roll[] = [];
      Array.from(text).forEach((ch) => {
        if (/\d/.test(ch)) {
          const col = document.createElement("span");
          col.style.cssText =
            "display:inline-block;overflow:hidden;height:1em;line-height:1;flex:none;";
          const strip = document.createElement("span");
          strip.style.cssText =
            "display:flex;flex-direction:column;line-height:1;";
          for (let d = 0; d <= 9; d++) {
            const cell = document.createElement("span");
            cell.style.cssText =
              "display:block;height:1em;line-height:1;flex:none;";
            cell.textContent = String(d);
            strip.appendChild(cell);
          }
          col.appendChild(strip);
          overlay.appendChild(col);
          rolls.push({ strip, digit: Number(ch) });
        } else {
          // Non-digit glyphs stay fixed in place.
          const fixed = document.createElement("span");
          fixed.style.cssText =
            "display:inline-block;height:1em;line-height:1;flex:none;";
          fixed.textContent = ch;
          overlay.appendChild(fixed);
        }
      });
      num.appendChild(overlay);
      built.push({ num, overlay, rolls, label });
    });

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: outcome,
        start: ENTER,
        once: true,
        refreshPriority: nextPriority(),
      },
    });
    if (headerParts.length) {
      tl.fromTo(
        headerParts,
        { y: 18, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: DUR.base,
          stagger: 0.08,
        },
        0,
      );
    }
    built.forEach((b, i) => {
      const at = 0.3 + i * 0.12;
      b.rolls.forEach((r, j) => {
        tl.to(
          r.strip,
          { yPercent: -r.digit * 10, duration: 1.15, ease: EASE.inOut },
          at + j * 0.09,
        );
      });
      if (b.label) {
        tl.fromTo(
          b.label,
          { y: 16, clipPath: "inset(0 0 100% 0)" },
          { y: 0, clipPath: "inset(0 0 0% 0)", duration: DUR.base },
          at + 0.55,
        );
      }
    });
    tl.eventCallback("onComplete", () => {
      built.forEach((b) => {
        b.overlay.remove();
        gsap.set(b.num, { clearProps: "all" });
      });
    });
  }

  /* ── H-07 FaqAccordion — Accordion Draw (PLAY + INTERACT) ─────────── */
  const faq = one("[data-anim-section='h-07']");
  if (faq) {
    const faqHeader = one("[data-anim='faq-header']", faq);
    const faqRows = all("[data-anim='faq-row']", faq);

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: faq,
        start: ENTER,
        once: true,
        refreshPriority: nextPriority(),
      },
    });
    if (faqHeader) {
      tl.fromTo(
        faqHeader,
        { x: lat(12) },
        { x: 0, duration: DUR.base },
        0,
      );
    }
    faqRows.forEach((row, i) => {
      const line = one("[data-anim='faq-line']", row);
      const question = one("[data-anim='faq-question']", row);
      const at = 0.1 + i * 0.07;
      if (line) {
        gsap.set(row, { borderTopColor: "transparent" });
        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: "0% 50%" },
          {
            scaleX: 1,
            duration: 0.7,
            ease: EASE.inOut,
            onComplete: () => gsap.set(row, { clearProps: "borderTopColor" }),
          },
          at,
        );
      }
      if (question) {
        tl.fromTo(question, { x: lat(12) }, { x: 0, duration: DUR.base }, at);
      }
    });

    // Open/close: GSAP clips an inner answer wrapper while the existing
    // button / aria-expanded / hidden semantics stay exactly as shipped.
    // The plus marker keeps its existing CSS 45° rotation.
    all("[data-anim='faq-button']", faq).forEach((btn) => {
      btn.addEventListener("click", () => {
        requestAnimationFrame(() => {
          const controls = btn.getAttribute("aria-controls");
          const panel = controls ? document.getElementById(controls) : null;
          const wrap = panel
            ? one("[data-anim='faq-answer']", panel)
            : null;
          if (!panel || !wrap) return;
          const expanded = btn.getAttribute("aria-expanded") === "true";
          if (expanded) {
            gsap.fromTo(
              wrap,
              { clipPath: "inset(0 0 100% 0)", y: -6 },
              {
                clipPath: "inset(0 0 0% 0)",
                y: 0,
                duration: DUR.base,
                ease: EASE.out,
                overwrite: "auto",
                onComplete: () => gsap.set(wrap, { clearProps: "all" }),
              },
            );
          } else if (panel.hidden) {
            // React has already hidden the panel; show it briefly so the
            // close can draw, then restore the hidden state it expects.
            panel.hidden = false;
            gsap.fromTo(
              wrap,
              { clipPath: "inset(0 0 0% 0)", y: 0 },
              {
                clipPath: "inset(0 0 100% 0)",
                y: -6,
                duration: DUR.fast,
                ease: EASE.inOut,
                overwrite: "auto",
                onComplete: () => {
                  panel.hidden = true;
                  gsap.set(wrap, { clearProps: "all" });
                },
              },
            );
          }
        });
      });
    });
  }

  /* ── H-08 FinalCta — Magnetic Close (PLAY + INTERACT) ─────────────── */
  const finalCta = one("[data-anim-section='h-08']");
  if (finalCta) {
    const headline = one("[data-anim='cta-headline']", finalCta);
    const sub = one("[data-anim='cta-sub']", finalCta);
    const actions = one("[data-anim='cta-actions']", finalCta);
    const primary = one("[data-anim='cta-primary']", finalCta);

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: finalCta,
        start: ENTER,
        once: true,
        refreshPriority: nextPriority(),
      },
    });

    // Headline words pop 0.85 → 1 (back.out, stagger from centre).
    let wordSplit: InstanceType<typeof SplitText> | null = null;
    if (headline) {
      wordSplit = new SplitText(headline, { type: "words" });
      gsap.set(wordSplit.words, { scale: 0.85, transformOrigin: "50% 50%" });
      tl.to(
        wordSplit.words,
        {
          scale: 1,
          duration: DUR.base,
          ease: EASE.pop,
          stagger: { each: 0.055, from: "center" },
          onComplete: () => wordSplit?.revert(),
        },
        0,
      );
    }
    if (sub) {
      tl.fromTo(
        sub,
        { y: 16, clipPath: "inset(0 0 100% 0)" },
        { y: 0, clipPath: "inset(0 0 0% 0)", duration: DUR.base },
        "-=0.35",
      );
    }
    if (actions) {
      const btns = Array.from(actions.children) as HTMLElement[];
      tl.fromTo(
        btns,
        { scale: 0.9 },
        {
          scale: 1,
          duration: DUR.base,
          ease: EASE.pop,
          stagger: 0.08,
          clearProps: "scale",
        },
        "-=0.45",
      );
    }

    // The site's only magnetic element: the primary CTA pulls toward the
    // cursor (≤0.35) via quickTo and releases elastically.
    if (
      primary &&
      conditions.isDesktop &&
      window.matchMedia("(pointer: fine)").matches
    ) {
      const xTo = gsap.quickTo(primary, "x", {
        duration: 0.4,
        ease: EASE.settle,
      });
      const yTo = gsap.quickTo(primary, "y", {
        duration: 0.4,
        ease: EASE.settle,
      });
      primary.addEventListener("mousemove", (e: MouseEvent) => {
        const r = primary.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      primary.addEventListener("mouseleave", () => {
        gsap.to(primary, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.35)",
          overwrite: "auto",
        });
      });
    }
  }
};
