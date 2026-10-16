"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ServiceBreadcrumb() {
  const { t } = useI18n();
  return (
    <Link
      href="/services"
      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {t("svc.shared.allServices")}
    </Link>
  );
}

export function CalendlyButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "secondary";
}) {
  const { t } = useI18n();
  return (
    <a
      href={t("common.calendly")}
      target="_blank"
      rel="noopener noreferrer"
      className={variant === "primary" ? "btn-primary" : "btn-secondary"}
    >
      {label}
    </a>
  );
}

/** Page top: breadcrumb + eyebrow + display headline + lede + CTAs. */
export function ServiceHeroTop({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  actions?: ReactNode;
}) {
  return (
    <section data-anim="svc-hero" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="breadcrumb">
          <ServiceBreadcrumb />
        </div>
        <div>
          <p data-anim="eyebrow" className="eyebrow mt-10">
            {eyebrow}
          </p>
          <h1
            data-anim="title"
            className="display mt-5 max-w-3xl text-5xl text-foreground md:text-7xl"
          >
            {title}
          </h1>
          <p data-anim="lede" className="lead mt-6 max-w-2xl">
            {lede}
          </p>
          {actions ? (
            <div data-anim="actions" className="mt-9 flex flex-wrap gap-3">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Closing CTA band — one shared pattern, varied per page through props. */
export function ServiceCtaBand({
  eyebrow,
  headline,
  sub,
  checklist,
  buttonLabel,
  buttonHref,
  fine,
  tone = "band",
}: {
  eyebrow?: string;
  headline: string;
  sub?: string;
  checklist?: string[];
  buttonLabel: string;
  /** "calendly" opens the booking link; otherwise treated as an href/mailto. */
  buttonHref: "calendly" | string;
  fine?: string;
  tone?: "band" | "plain";
}) {
  const { t } = useI18n();
  const href = buttonHref === "calendly" ? t("common.calendly") : buttonHref;
  const external = buttonHref === "calendly";
  return (
    <section
      data-anim="svc-cta"
      className={cn(tone === "band" ? "band" : "bg-background")}
    >
      <div className="section container-x">
        <div>
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
              <p data-anim="eyebrow" className="eyebrow justify-center">
                {eyebrow}
              </p>
            ) : null}
            <h2
              data-anim="title"
              className="h2 mt-4 text-4xl text-foreground md:text-5xl"
            >
              {headline}
            </h2>
            {sub ? (
              <p data-anim="lede" className="lead mt-5">
                {sub}
              </p>
            ) : null}
            {checklist && checklist.length > 0 ? (
              <ul
                data-anim="checklist"
                className="mx-auto mt-8 max-w-md space-y-3 text-left"
              >
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-foreground"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      <Check
                        className="h-3.5 w-3.5 text-accent"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <div data-anim="actions" className="mt-9">
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn-primary"
              >
                {buttonLabel}
              </a>
            </div>
            {fine ? (
              <p data-anim="fine" className="mt-5 text-sm text-muted">
                {fine}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Accessible FAQ accordion (no animation library, reduced-motion safe). */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="h3 text-lg text-foreground md:text-xl">{item.q}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-muted transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              >
                <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </button>
            {isOpen ? (
              <p className="max-w-3xl pb-7 text-[17px] leading-[1.65] text-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Two-column email CTA — used where the page's CTA is a mailto. */
export function ServiceMailCta({
  title,
  sub,
  note,
  subject,
}: {
  title: string;
  sub: string;
  note: string;
  subject?: string;
}) {
  const { t } = useI18n();
  const email = t("common.email.info");
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  return (
    <section data-anim="svc-mailcta" className="bg-background">
      <div className="section container-x">
        <div>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              data-anim="title"
              className="h2 text-4xl text-foreground md:text-5xl"
            >
              {title}
            </h2>
            <p data-anim="lede" className="lead mx-auto mt-5 max-w-xl">
              {sub}
            </p>
            <a
              data-anim="maillink"
              href={href}
              className="display mt-10 inline-block break-all text-3xl text-foreground underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-4xl md:text-5xl"
            >
              {email}
            </a>
            <p
              data-anim="note"
              className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
