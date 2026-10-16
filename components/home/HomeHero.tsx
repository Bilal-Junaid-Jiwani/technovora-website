"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { HeroProofCard } from "./HeroProofCard";

// The hero globe is the restored pre-rebuild Three.js earth (react-globe.gl:
// dotted landmasses from real geo data, atmosphere, slow auto-rotation). It is
// heavy, so it loads in a separate chunk after the first paint instead of
// blocking it. Decorative only; the copy carries the meaning.
const RealGlobe = dynamic(() => import("@/components/three/RealGlobe"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="mx-auto aspect-square w-full max-w-[520px] animate-pulse rounded-full border border-hairline bg-surface"
    />
  ),
});

// Hero: oversized typographic statement on the left, the restored globe with
// the engagement snapshot anchored over its lower edge on the right, and a
// full-width hairline meta-bar closing the section. One bold move (the globe
// composition); everything else stays quiet type and hairlines.
export function HomeHero() {
  const { t } = useI18n();
  const [globeSize, setGlobeSize] = useState(520);

  useEffect(() => {
    const update = () =>
      setGlobeSize(
        window.innerWidth < 640 ? 330 : window.innerWidth < 1024 ? 430 : 520,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const meta = [
    {
      label: t("home.hero.meta.location.label"),
      value: t("home.hero.meta.location.value"),
    },
    {
      label: t("home.hero.meta.availability.label"),
      value: t("home.hero.meta.availability.value"),
    },
    {
      label: t("home.hero.meta.response.label"),
      value: t("home.hero.meta.response.value"),
    },
  ];

  return (
    <section data-anim-section="h-01" className="bg-background">
      <div className="container-x pb-14 pt-14 md:pb-20 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          {/* Copy column */}
          <div className="min-w-0">
            <div>
              <p data-anim="eyebrow" className="eyebrow">
                {t("home.hero.eyebrow")}
              </p>
            </div>
            <div>
              <h1
                data-anim="headline"
                className="display mt-6 text-4xl text-foreground sm:text-6xl lg:text-[4.35rem]"
              >
                {t("home.hero.heading")}
              </h1>
            </div>
            <div>
              <p data-anim="sub" className="lead mt-7 max-w-[34rem]">
                {t("home.hero.sub")}
              </p>
            </div>
            <div>
              <div data-anim="ctas" className="mt-9 flex flex-wrap gap-3">
                <a
                  href={t("common.calendly")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t("home.hero.cta.primary")}
                </a>
                <Link href="/packages" className="btn-secondary">
                  {t("home.hero.cta.secondary")}
                </Link>
              </div>
            </div>
          </div>

          {/* Visual column: the restored globe with the snapshot card anchored
              over its lower edge on desktop; stacked below it on mobile. */}
          <div
            data-anim="visual-col"
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div>
              <div
                data-anim="globe"
                className="flex justify-center overflow-x-clip lg:justify-end"
              >
                <RealGlobe size={globeSize} />
              </div>
            </div>
            <div className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-20 lg:max-w-[400px]">
              <HeroProofCard />
            </div>
          </div>
        </div>

        {/* Meta-bar: three facts divided by hairlines, closing the hero. */}
        <div className="relative">
          <span
            aria-hidden="true"
            data-anim="meta-line"
            className="pointer-events-none absolute -top-px left-0 h-px w-full origin-left bg-hairline"
          />
          <dl
            data-anim="meta-bar"
            className="mt-16 grid border-t border-hairline sm:grid-cols-3 md:mt-20"
          >
            {meta.map((item, i) => (
              <div
                data-anim="meta-item"
                key={item.label}
                className={`py-6 sm:py-7 ${
                  i > 0
                    ? "border-t border-hairline sm:border-l sm:border-t-0 sm:pl-8"
                    : ""
                }`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[15px] font-medium text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
