import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Standard page section: Stripe-clean vertical rhythm + container.
 * set `band` for a tinted hairline-bordered band, `id` for anchors.
 * `animSection` marks the section root for its page animator (see
 * ANIMATION-REGISTRY.md) — inert attribute, no visual effect.
 */
export function Section({
  children,
  className,
  band = false,
  id,
  animSection,
}: {
  children: ReactNode;
  className?: string;
  band?: boolean;
  id?: string;
  animSection?: string;
}) {
  return (
    <section
      id={id}
      data-anim-section={animSection}
      className={cn(band ? "band" : undefined, className)}
    >
      <div className="section container-x">{children}</div>
    </section>
  );
}

/**
 * Section header: eyebrow + headline + lede, centered or left.
 * The single consistent header pattern across the redesign.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      data-anim="section-header"
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        data-anim="eyebrow"
        className={cn("eyebrow", centered && "justify-center")}
      >
        {eyebrow}
      </p>
      <h2 data-anim="title" className="h2 mt-4 text-4xl md:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p data-anim="lede" className="lead mt-5">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
