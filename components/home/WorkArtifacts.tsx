"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Miniature deliverable interfaces for the FeaturedWork rows: the kind of
// screen each engagement ships, drawn at thumbnail scale from the site's own
// tokens. They depict the craft, not a client screenshot; the section note
// ("Illustrative summaries, not client screenshots") labels them as such.
// Decorative for assistive tech: each row's title and description carry the
// meaning, so the artifacts are aria-hidden.

function OnboardingSteps() {
  const { t } = useI18n();
  const steps = [
    { label: t("home.work.1.ui.1"), state: "done" },
    { label: t("home.work.1.ui.2"), state: "done" },
    { label: t("home.work.1.ui.3"), state: "current" },
  ] as const;

  return (
    <div aria-hidden="true" className="card flex h-full flex-col justify-center p-5">
      <div>
        {steps.map((step, i) => (
          <div key={step.label} className="relative flex items-center gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 && (
              <span className="absolute left-[9px] top-5 h-[calc(100%-16px)] w-px bg-hairline" />
            )}
            {step.state === "done" ? (
              <span className="z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-accent">
                <Check className="h-3 w-3 text-accent-ink" strokeWidth={3} />
              </span>
            ) : (
              <span className="z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-card">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
              </span>
            )}
            <span className="text-[13px] font-medium text-foreground">{step.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full w-2/3 rounded-full bg-accent" />
      </div>
    </div>
  );
}

function TicketQueue() {
  const { t } = useI18n();
  const rows = [
    { label: t("home.work.2.ui.1"), dot: "bg-accent" },
    { label: t("home.work.2.ui.2"), dot: "bg-faint" },
    { label: t("home.work.2.ui.3"), dot: "bg-faint" },
  ];

  return (
    <div aria-hidden="true" className="card flex h-full flex-col justify-center px-5 py-2">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center gap-3 py-3.5 ${i > 0 ? "border-t border-hairline" : ""}`}
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${row.dot}`} />
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">
            {row.label}
          </span>
          <span className="h-2 w-10 shrink-0 rounded-full bg-surface-2" />
        </div>
      ))}
    </div>
  );
}

function FieldChecklist() {
  const { t } = useI18n();
  const items = [
    t("home.work.3.ui.1"),
    t("home.work.3.ui.2"),
    t("home.work.3.ui.3"),
  ];

  return (
    <div aria-hidden="true" className="card flex h-full items-center justify-center p-5">
      <div className="w-[168px] rounded-[1.15rem] border border-hairline bg-surface px-3.5 py-4">
        {items.map((label) => (
          <div key={label} className="flex items-center gap-2 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
            <span className="truncate text-[11px] font-medium text-foreground">{label}</span>
          </div>
        ))}
        <div className="mt-3 h-6 rounded-md bg-accent" />
      </div>
    </div>
  );
}

export function WorkArtifact({ n }: { n: 1 | 2 | 3 }) {
  if (n === 1) return <OnboardingSteps />;
  if (n === 2) return <TicketQueue />;
  return <FieldChecklist />;
}
