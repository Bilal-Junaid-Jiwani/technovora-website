/**
 * Motion foundation — the single shared layer for all GSAP animation on the
 * site (see ~/workspace/your_files/technovora-round3/ANIMATION-REGISTRY.md).
 *
 * Only easings, durations, trigger presets and plugin registration live here.
 * Every section's mechanic is implemented in that page's own animator —
 * mechanics never repeat across sections.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let registered = false;

/** Register GSAP plugins exactly once (client-side only). Idempotent. */
export function ensureMotionRegistered(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, MotionPathPlugin);
  CustomEase.create("technovora.settle", "M0,0 C0.16,1 0.3,1 1,1");
  gsap.defaults({ duration: 0.8, ease: "expo.out" });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin };

/** Shared easing vocabulary. No linear ease is used for reveals, ever. */
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  settle: "technovora.settle",
  pop: "back.out(1.7)",
  drift: "sine.inOut",
} as const;

/** Shared duration scale (seconds). */
export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 1.15,
  hero: 1.3,
} as const;

/** Standard enter-play trigger (top of section reaches 86% of viewport). */
export const ENTER = "top 86%";
