"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Pencil } from "lucide-react";
import { packages as copy } from "@/lib/i18n/en/packages";
import { gsap, SplitText, EASE, DUR } from "@/lib/motion";
import { useAnimator } from "@/lib/motion/useAnimator";
import { cn } from "@/lib/utils";

const SALES_EMAIL = "sales@technovora.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ServiceKey = "ai" | "web" | "mobile" | "cloud" | "design" | "smm";

interface QuestionDef {
  id: string;
  titleKey: string;
  optionKeys: string[];
}

/** Build a service's question list from per-question option counts. */
function makeQuestions(
  prefix: string,
  optionCounts: number[],
): QuestionDef[] {
  return optionCounts.map((count, i) => ({
    id: `${prefix}-q${i + 1}`,
    titleKey: `packages.quiz.${prefix}.q${i + 1}.title`,
    optionKeys: Array.from(
      { length: count },
      (_, j) => `packages.quiz.${prefix}.q${i + 1}.o${j + 1}`,
    ),
  }));
}

const SERVICE_ORDER: { key: ServiceKey; labelKey: string }[] = [
  { key: "ai", labelKey: "packages.quiz.service.ai" },
  { key: "web", labelKey: "packages.quiz.service.web" },
  { key: "mobile", labelKey: "packages.quiz.service.mobile" },
  { key: "cloud", labelKey: "packages.quiz.service.cloud" },
  { key: "design", labelKey: "packages.quiz.service.design" },
  { key: "smm", labelKey: "packages.quiz.service.smm" },
];

const SERVICE_QUESTION: QuestionDef = {
  id: "service",
  titleKey: "packages.quiz.service.title",
  optionKeys: SERVICE_ORDER.map((s) => s.labelKey),
};

const TIMELINE_QUESTION: QuestionDef = {
  id: "timeline",
  titleKey: "packages.quiz.timeline.title",
  optionKeys: [
    "packages.quiz.timeline.o1",
    "packages.quiz.timeline.o2",
    "packages.quiz.timeline.o3",
  ],
};

/**
 * Per-service question banks: 6–9 targeted questions each.
 * ai: 7 · web: 9 · mobile: 7 · cloud: 7 · design: 6 · smm: 6
 */
const SERVICE_QUESTIONS: Record<ServiceKey, QuestionDef[]> = {
  ai: makeQuestions("ai", [6, 6, 5, 4, 5, 4, 5]),
  web: makeQuestions("web", [5, 6, 4, 3, 4, 3, 3, 6, 3]),
  mobile: makeQuestions("mobile", [3, 6, 7, 3, 3, 3, 3]),
  cloud: makeQuestions("cloud", [6, 6, 4, 3, 3, 5, 4]),
  design: makeQuestions("design", [5, 5, 3, 5, 3, 4]),
  smm: makeQuestions("smm", [6, 5, 4, 3, 3, 3]),
};

type Stage =
  | { kind: "question"; question: QuestionDef }
  | { kind: "contact" }
  | { kind: "review" };

type Phase = "quiz" | "confirm" | "done";

/**
 * EstimationQuiz — deep service-specific estimation questionnaire.
 *
 * Step 1 offers all six services; the quiz then branches into 6–9
 * service-specific questions, followed by common timeline, contact-details,
 * and review stages. Submitting opens the visitor's mail app with a
 * prefilled mailto to sales@technovora.com AND shows a copy-to-clipboard
 * fallback carrying the full request text before the success state.
 * No prices anywhere: the scoped estimation is delivered by email.
 *
 * NOTE: the state machine below is sacred — redesign the visuals only.
 */
export function EstimationQuiz() {
  // P-01 — Skew Settle Headline (LOAD): headline chars un-skew while rising
  // in masks; the delivery note slides in. Chrome only — no quiz logic here.
  const wrapRef = useAnimator(({ scope }) => {
    const title = scope.querySelector<HTMLElement>('[data-anim="quiz-title"]');
    const note = scope.querySelector<HTMLElement>('[data-anim="quiz-note"]');
    if (title) {
      const split = new SplitText(title, { type: "chars", mask: "chars" });
      const chars = split.chars ?? [];
      if (chars.length) {
        gsap.set(chars, { skewX: 12, yPercent: 110 });
        gsap.to(chars, {
          skewX: 0,
          yPercent: 0,
          duration: DUR.hero,
          ease: EASE.out,
          stagger: 0.012,
          delay: 0.05,
          onComplete: () => split.revert(),
        });
      } else {
        split.revert();
      }
    }
    if (note) {
      gsap.fromTo(
        note,
        { x: 16 },
        { x: 0, duration: DUR.base, ease: EASE.out, delay: 0.15 },
      );
    }
  });

  const [service, setService] = useState<ServiceKey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stageIndex, setStageIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [copied, setCopied] = useState(false);

  const stages: Stage[] = useMemo(() => {
    const questions = service
      ? [SERVICE_QUESTION, ...SERVICE_QUESTIONS[service], TIMELINE_QUESTION]
      : [SERVICE_QUESTION];
    return [
      ...questions.map(
        (question): Stage => ({ kind: "question", question }),
      ),
      { kind: "contact" } as Stage,
      { kind: "review" } as Stage,
    ];
  }, [service]);

  // Keep the stage index valid when the branch changes the stage count.
  useEffect(() => {
    setStageIndex((i) => Math.min(i, stages.length - 1));
  }, [stages.length]);

  const stage = stages[stageIndex];
  const totalStages = stages.length;
  const questionStages = stages.filter(
    (s): s is { kind: "question"; question: QuestionDef } =>
      s.kind === "question",
  );
  const contactStageIndex = stages.findIndex((s) => s.kind === "contact");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const mountedRef = useRef(false);
  // Move focus to the step heading on step changes (screen readers +
  // keyboard) — but never on the initial mount, so no focus-ring box
  // renders around the question on page load.
  useEffect(() => {
    if (mountedRef.current) {
      headingRef.current?.focus();
    } else {
      mountedRef.current = true;
    }
  }, [stageIndex, phase]);

  // P-02/P-03 — interaction chrome (transforms only; state machine above
  // and the focus effect are untouched). Reduced motion: nothing tweens —
  // the React-rendered progress style already shows the true fraction.
  const progressFillRef = useRef<HTMLDivElement>(null);
  const stepDigitRef = useRef<HTMLSpanElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const prevStageRef = useRef(stageIndex);
  const prevPhaseRef = useRef(phase);
  const prevProgressRef = useRef(((stageIndex + 1) / stages.length) * 100);

  useEffect(() => {
    const dir =
      stageIndex > prevStageRef.current
        ? 1
        : stageIndex < prevStageRef.current
          ? -1
          : phase !== prevPhaseRef.current
            ? 1
            : 0;
    prevStageRef.current = stageIndex;
    prevPhaseRef.current = phase;
    const fraction = ((stageIndex + 1) / stages.length) * 100;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prevProgressRef.current = fraction;
      return;
    }
    const fill = progressFillRef.current;
    if (fill) {
      gsap.fromTo(
        fill,
        { scaleX: prevProgressRef.current / 100 },
        {
          scaleX: fraction / 100,
          duration: DUR.fast,
          ease: EASE.out,
          overwrite: "auto",
        },
      );
    }
    prevProgressRef.current = fraction;
    if (dir !== 0) {
      const digit = stepDigitRef.current;
      if (digit) {
        gsap.fromTo(
          digit,
          { rotationX: -90 },
          {
            rotationX: 0,
            duration: DUR.fast,
            ease: EASE.out,
            overwrite: "auto",
            transformOrigin: "center center",
          },
        );
      }
      const wrap = stageWrapRef.current;
      if (wrap) {
        gsap.fromTo(
          wrap,
          { x: 28 * dir },
          { x: 0, duration: DUR.fast, ease: EASE.settle, overwrite: "auto" },
        );
      }
    }
  }, [stageIndex, phase, stages.length]);

  const selectOption = (questionId: string, optionKey: string) => {
    if (questionId === SERVICE_QUESTION.id) {
      const next =
        SERVICE_ORDER.find((s) => s.labelKey === optionKey)?.key ?? null;
      if (next !== service) {
        setService(next);
        // Branch changed: drop answers that belong to the old branch.
        setAnswers((prev) => {
          const keep = new Set<string>([
            SERVICE_QUESTION.id,
            TIMELINE_QUESTION.id,
          ]);
          if (next) {
            for (const q of SERVICE_QUESTIONS[next]) keep.add(q.id);
          }
          return Object.fromEntries(
            Object.entries(prev).filter(([k]) => keep.has(k)),
          );
        });
      }
    }
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const goNext = () => {
    if (stage.kind === "contact") {
      const nameOk = name.trim().length > 0;
      const emailOk = EMAIL_RE.test(email.trim());
      setNameError(nameOk ? null : copy["packages.quiz.form.nameInvalid"]);
      setEmailError(
        emailOk ? null : copy["packages.quiz.form.emailInvalid"],
      );
      if (!nameOk || !emailOk) return;
    }
    if (stageIndex < stages.length - 1) setStageIndex(stageIndex + 1);
  };

  const goBack = () => {
    if (stageIndex > 0) setStageIndex(stageIndex - 1);
  };

  const requestText = useMemo(() => {
    const lines = questionStages.map((s) => {
      const answerKey = answers[s.question.id];
      return `${copy[s.question.titleKey]}\n${answerKey ? copy[answerKey] : "—"}`;
    });
    return (
      `${copy["packages.quiz.mailto.name"]}: ${name.trim()}\n` +
      `${copy["packages.quiz.mailto.email"]}: ${email.trim()}\n\n` +
      lines.join("\n\n")
    );
  }, [questionStages, answers, name, email]);

  const handleSubmit = () => {
    const subject = encodeURIComponent(copy["packages.quiz.mailto.subject"]);
    const body = encodeURIComponent(requestText);
    // Open the visitor's mail app with the request prefilled…
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
    // …and offer a copy-to-clipboard fallback before the success state.
    setPhase("confirm");
  };

  const progress = ((stageIndex + 1) / totalStages) * 100;
  const progressLabel = `${copy["packages.quiz.progress.step"]} ${stageIndex + 1} ${copy["packages.quiz.progress.of"]} ${totalStages}`;

  return (
    <div ref={wrapRef} className="section container-x">
      <div data-anim="quiz-header" className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">{copy["packages.hero.eyebrow"]}</p>
        <h1 data-anim="quiz-title" className="display mt-6 text-[2.6rem] text-foreground sm:text-5xl md:text-6xl">
          {copy["packages.hero.title"]}
        </h1>
        <p data-anim="quiz-note" className="lead mx-auto mt-6 max-w-[36rem]">
          {copy["packages.hero.sub"]}
        </p>
      </div>

      <div data-anim="quiz-card" className="mx-auto mt-12 max-w-2xl md:mt-16">
        <div className="card p-6 sm:p-10 md:p-12">
          {phase === "done" ? (
            <SuccessState />
          ) : phase === "confirm" ? (
            <ConfirmSendState
              requestText={requestText}
              copied={copied}
              onCopy={async () => {
                try {
                  await navigator.clipboard.writeText(requestText);
                } catch {
                  /* clipboard unavailable — user can select the text manually */
                }
                setCopied(true);
              }}
              onDone={() => setPhase("done")}
              headingRef={headingRef}
            />
          ) : (
            <>
              {/* Progress — one unified "Step X of Y" scheme */}
              <div className="mb-9 md:mb-11">
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-foreground">
                    {stage.kind === "review" ? (
                      <>
                        {copy["packages.quiz.progress.review"]} ·{" "}
                        {copy["packages.quiz.progress.step"]}{" "}
                        <span ref={stepDigitRef} className="inline-block">
                          {stageIndex + 1}
                        </span>{" "}
                        {copy["packages.quiz.progress.of"]} {totalStages}
                      </>
                    ) : (
                      <>
                        {copy["packages.quiz.progress.step"]}{" "}
                        <span ref={stepDigitRef} className="inline-block">
                          {stageIndex + 1}
                        </span>{" "}
                        {copy["packages.quiz.progress.of"]} {totalStages}
                      </>
                    )}
                  </span>
                  <span className="stat-num text-[13px] text-muted">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={stageIndex + 1}
                  aria-valuemin={1}
                  aria-valuemax={totalStages}
                  aria-label={progressLabel}
                  className="h-1 overflow-hidden rounded-full bg-surface-2"
                >
                  <div
                    ref={progressFillRef}
                    data-anim="progress-fill"
                    className="h-full w-full rounded-full bg-accent"
                    style={{
                      transform: `scaleX(${progress / 100})`,
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              </div>

              <div ref={stageWrapRef} data-anim="quiz-stage">
              {stage.kind === "question" && (
                <StepQuestion
                  question={stage.question}
                  stepNumber={stageIndex + 1}
                  headingRef={headingRef}
                  selected={answers[stage.question.id] ?? null}
                  onSelect={(optionKey) =>
                    selectOption(stage.question.id, optionKey)
                  }
                />
              )}

              {stage.kind === "contact" && (
                <ContactStep
                  headingRef={headingRef}
                  name={name}
                  email={email}
                  nameError={nameError}
                  emailError={emailError}
                  onNameChange={(v) => {
                    setName(v);
                    if (nameError) setNameError(null);
                  }}
                  onEmailChange={(v) => {
                    setEmail(v);
                    if (emailError) setEmailError(null);
                  }}
                />
              )}

              {stage.kind === "review" && (
                <ReviewScreen
                  questionStages={questionStages}
                  answers={answers}
                  name={name.trim()}
                  email={email.trim()}
                  headingRef={headingRef}
                  onEditQuestion={(questionId) => {
                    const i = stages.findIndex(
                      (s) =>
                        s.kind === "question" && s.question.id === questionId,
                    );
                    if (i >= 0) setStageIndex(i);
                  }}
                  onEditContact={() => setStageIndex(contactStageIndex)}
                />
              )}
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-hairline pt-6 sm:pt-7">
                {stageIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn-secondary"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    {copy["packages.quiz.back"]}
                  </button>
                ) : (
                  <span aria-hidden />
                )}
                {stage.kind === "review" ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-primary"
                  >
                    {copy["packages.quiz.form.submit"]}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={
                      stage.kind === "question" &&
                      answers[stage.question.id] == null
                    }
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    {copy["packages.quiz.continue"]}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Honest footnote under the card */}
        {phase === "quiz" && (
          <p className="mt-6 text-center text-sm text-muted">
            {copy["packages.quiz.success.promise"]}
          </p>
        )}
      </div>
    </div>
  );
}

function StepQuestion({
  question,
  stepNumber,
  headingRef,
  selected,
  onSelect,
}: {
  question: QuestionDef;
  stepNumber: number;
  headingRef: React.Ref<HTMLHeadingElement>;
  selected: string | null;
  onSelect: (optionKey: string) => void;
}) {
  const groupName = `quiz-${question.id}`;

  // P-04 — Option Rise & Trace: options rise in masks when the stage
  // appears; the chosen card's top edge traces and its dot pops. Radio
  // input, checked state and onSelect are untouched.
  const rootRef = useRef<HTMLFieldSetElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const labels = root.querySelectorAll("label");
    if (!labels.length) return;
    const tween = gsap.fromTo(
      labels,
      { y: 16, clipPath: "inset(0 0 100% 0)" },
      {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: DUR.fast,
        ease: EASE.out,
        stagger: 0.05,
        clearProps: "clipPath",
        overwrite: "auto",
      },
    );
    return () => {
      tween.kill();
    };
  }, [question.id]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const edges = root.querySelectorAll<HTMLElement>('[data-anim="opt-edge"]');
    edges.forEach((edge) => {
      gsap.to(edge, {
        scaleX: 0,
        duration: DUR.fast,
        ease: EASE.out,
        overwrite: "auto",
      });
    });
    const checkedInput = root.querySelector<HTMLInputElement>(
      "input:checked",
    );
    const label = checkedInput?.closest("label");
    if (!label) return;
    const edge = label.querySelector<HTMLElement>('[data-anim="opt-edge"]');
    if (edge) {
      gsap.to(edge, {
        scaleX: 1,
        duration: DUR.fast,
        ease: EASE.out,
        overwrite: "auto",
      });
    }
    const dot = label.querySelector<HTMLElement>('[data-anim="opt-dot"]');
    if (dot) {
      gsap.fromTo(
        dot,
        { scale: 0.55 },
        { scale: 1, duration: 0.3, ease: EASE.pop, overwrite: "auto" },
      );
    }
  }, [selected, question.id]);

  return (
    <fieldset ref={rootRef}>
      <legend className="sr-only">
        {copy[question.titleKey]} ({stepNumber})
      </legend>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="h3 text-2xl text-foreground focus:outline-none md:text-[1.65rem]"
      >
        {copy[question.titleKey]}
      </h2>
      <div className="mt-7 grid gap-2.5 sm:gap-3">
        {question.optionKeys.map((optionKey) => {
          const checked = selected === optionKey;
          return (
            <label
              key={optionKey}
              className={cn(
                "group relative flex cursor-pointer items-center gap-3.5 overflow-hidden rounded-xl border px-4 py-4 transition-[border-color,background-color] duration-200 sm:px-5",
                checked
                  ? "border-accent bg-surface"
                  : "border-hairline bg-background hover:border-faint hover:bg-surface",
              )}
            >
              <span
                aria-hidden
                data-anim="opt-edge"
                className="absolute inset-x-0 top-0 h-[2px] bg-accent"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
              <input
                type="radio"
                name={groupName}
                value={optionKey}
                checked={checked}
                onChange={() => onSelect(optionKey)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                data-anim="opt-dot"
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:border-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20",
                  checked
                    ? "border-accent bg-background text-accent"
                    : "border-hairline bg-background text-transparent group-hover:border-faint",
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              <span
                className={cn(
                  "text-[15px] leading-snug sm:text-base",
                  checked
                    ? "font-medium text-foreground"
                    : "text-muted group-hover:text-foreground",
                )}
              >
                {copy[optionKey]}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ContactStep({
  headingRef,
  name,
  email,
  nameError,
  emailError,
  onNameChange,
  onEmailChange,
}: {
  headingRef: React.Ref<HTMLHeadingElement>;
  name: string;
  email: string;
  nameError: string | null;
  emailError: string | null;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}) {
  // P-06 (fields) — masked rise, staggered. Inputs, validation display and
  // change handlers are untouched.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const fields = root.querySelectorAll('[data-anim="quiz-field"]');
    if (!fields.length) return;
    const tween = gsap.fromTo(
      fields,
      { y: 18, clipPath: "inset(0 0 100% 0)" },
      {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: DUR.fast,
        ease: EASE.out,
        stagger: 0.07,
        clearProps: "clipPath",
        overwrite: "auto",
      },
    );
    return () => {
      tween.kill();
    };
  }, []);

  const inputClass = (invalid: boolean) =>
    cn(
      "w-full rounded-[10px] border bg-background px-4 py-3.5 text-[15px] text-foreground placeholder:text-faint transition-colors focus:outline-none focus:ring-4 focus:ring-accent/15",
      invalid
        ? "border-accent focus:border-accent"
        : "border-hairline focus:border-accent",
    );
  return (
    <div ref={rootRef}>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="h3 text-2xl text-foreground focus:outline-none md:text-[1.65rem]"
      >
        {copy["packages.quiz.form.title"]}
      </h2>
      <div className="mt-8 grid gap-6">
        <div data-anim="quiz-field">
          <label
            htmlFor="quiz-name"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {copy["packages.quiz.form.name"]}
          </label>
          <input
            id="quiz-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={copy["packages.quiz.form.namePlaceholder"]}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? "quiz-name-error" : undefined}
            className={inputClass(!!nameError)}
          />
          {nameError && (
            <p
              id="quiz-name-error"
              role="alert"
              className="mt-2 text-sm font-medium text-[#C2410C] dark:text-accent"
            >
              {nameError}
            </p>
          )}
        </div>
        <div data-anim="quiz-field">
          <label
            htmlFor="quiz-email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            {copy["packages.quiz.form.email"]}
          </label>
          <input
            id="quiz-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={copy["packages.quiz.form.emailPlaceholder"]}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "quiz-email-error" : undefined}
            className={inputClass(!!emailError)}
          />
          {emailError && (
            <p
              id="quiz-email-error"
              role="alert"
              className="mt-2 text-sm font-medium text-[#C2410C] dark:text-accent"
            >
              {emailError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({
  questionStages,
  answers,
  name,
  email,
  headingRef,
  onEditQuestion,
  onEditContact,
}: {
  questionStages: { kind: "question"; question: QuestionDef }[];
  answers: Record<string, string>;
  name: string;
  email: string;
  headingRef: React.Ref<HTMLHeadingElement>;
  onEditQuestion: (questionId: string) => void;
  onEditContact: () => void;
}) {
  // P-05 — Review Unfold: rows unfold via clip + wrapper transform (no
  // layout-height tween), edit buttons slide from the right. The row
  // buttons and their onEdit handlers are untouched.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const rows = root.querySelectorAll('[data-anim="review-row"]');
    const edits = root.querySelectorAll('[data-anim="review-edit"]');
    const tweens: gsap.core.Tween[] = [];
    if (rows.length) {
      tweens.push(
        gsap.fromTo(
          rows,
          { y: 14, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: DUR.fast,
            ease: EASE.out,
            stagger: 0.05,
            clearProps: "clipPath",
            overwrite: "auto",
          },
        ),
      );
    }
    if (edits.length) {
      tweens.push(
        gsap.fromTo(
          edits,
          { x: 14 },
          {
            x: 0,
            duration: DUR.fast,
            ease: EASE.out,
            stagger: 0.05,
            delay: 0.08,
            overwrite: "auto",
          },
        ),
      );
    }
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  const rowClass =
    "group flex w-full items-center justify-between gap-4 rounded-lg px-3 py-[1.125rem] text-left transition-colors hover:bg-surface";
  const editClass =
    "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors group-hover:text-foreground hover:bg-surface-2";
  return (
    <div ref={rootRef}>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="h3 text-2xl text-foreground focus:outline-none md:text-[1.65rem]"
      >
        {copy["packages.quiz.review.title"]}
      </h2>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
        {copy["packages.quiz.review.sub"]}
      </p>
      <ul className="mt-7 divide-y divide-hairline border-y border-hairline">
        {questionStages.map(({ question }) => {
          const answerKey = answers[question.id];
          return (
            <li key={question.id}>
              <button
                type="button"
                data-anim="review-row"
                onClick={() => onEditQuestion(question.id)}
                aria-label={`${copy["packages.quiz.review.edit"]}: ${copy[question.titleKey]}`}
                className={rowClass}
              >
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium leading-snug text-muted">
                    {copy[question.titleKey]}
                  </span>
                  <span className="mt-1 block text-[15px] font-medium leading-snug text-foreground">
                    {answerKey ? copy[answerKey] : "—"}
                  </span>
                </span>
                <span data-anim="review-edit" className={editClass}>
                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                  {copy["packages.quiz.review.edit"]}
                </span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            data-anim="review-row"
            onClick={onEditContact}
            aria-label={`${copy["packages.quiz.review.edit"]}: ${copy["packages.quiz.review.contactName"]}`}
            className={rowClass}
          >
            <span className="min-w-0">
              <span className="block text-[13px] font-medium leading-snug text-muted">
                {copy["packages.quiz.review.contactName"]}
              </span>
              <span className="mt-1 block text-[15px] font-medium leading-snug text-foreground">
                {name || "—"}
              </span>
            </span>
            <span data-anim="review-edit" className={editClass}>
              <Pencil className="h-3.5 w-3.5" aria-hidden />
              {copy["packages.quiz.review.edit"]}
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            data-anim="review-row"
            onClick={onEditContact}
            aria-label={`${copy["packages.quiz.review.edit"]}: ${copy["packages.quiz.review.contactEmail"]}`}
            className={rowClass}
          >
            <span className="min-w-0">
              <span className="block text-[13px] font-medium leading-snug text-muted">
                {copy["packages.quiz.review.contactEmail"]}
              </span>
              <span className="mt-1 block text-[15px] font-medium leading-snug text-foreground">
                {email || "—"}
              </span>
            </span>
            <span data-anim="review-edit" className={editClass}>
              <Pencil className="h-3.5 w-3.5" aria-hidden />
              {copy["packages.quiz.review.edit"]}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}

function ConfirmSendState({
  requestText,
  copied,
  onCopy,
  onDone,
  headingRef,
}: {
  requestText: string;
  copied: boolean;
  onCopy: () => void;
  onDone: () => void;
  headingRef: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="h3 text-2xl text-foreground focus:outline-none md:text-[1.65rem]"
      >
        {copy["packages.quiz.confirm.title"]}
      </h2>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
        {copy["packages.quiz.confirm.desc"]}
      </p>
      <label
        htmlFor="quiz-request-text"
        className="mb-2 mt-7 block text-sm font-semibold text-foreground"
      >
        {copy["packages.quiz.mailto.subject"]}
      </label>
      <textarea
        id="quiz-request-text"
        readOnly
        value={requestText}
        rows={10}
        className="w-full resize-y rounded-xl border border-hairline bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
      />
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onCopy} className="btn-secondary">
          <Copy className="h-4 w-4" aria-hidden />
          {copied
            ? copy["packages.quiz.confirm.copied"]
            : copy["packages.quiz.confirm.copy"]}
        </button>
        <button type="button" onClick={onDone} className="btn-primary">
          {copy["packages.quiz.confirm.done"]}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function SuccessState() {
  // P-06 (success) — Seal & Fields: the confirmation check draws (SVG
  // circle + tick stroke) with a soft ring settle. Decorative only.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const circle = root.querySelector<SVGCircleElement>(
      '[data-anim="seal-circle"]',
    );
    const tick = root.querySelector<SVGPathElement>('[data-anim="seal-tick"]');
    const ring = root.querySelector<HTMLElement>('[data-anim="seal-ring"]');
    const tweens: gsap.core.Tween[] = [];
    if (ring) {
      tweens.push(
        gsap.fromTo(
          ring,
          { scale: 0.82 },
          { scale: 1, duration: DUR.fast, ease: EASE.pop, overwrite: "auto" },
        ),
      );
    }
    if (circle) {
      const len = 2 * Math.PI * 26;
      tweens.push(
        gsap.fromTo(
          circle,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: EASE.out,
            overwrite: "auto",
          },
        ),
      );
    }
    if (tick) {
      const len = tick.getTotalLength();
      tweens.push(
        gsap.fromTo(
          tick,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: DUR.fast,
            ease: EASE.out,
            delay: 0.35,
            overwrite: "auto",
          },
        ),
      );
    }
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="py-10 text-center">
      <span
        data-anim="seal-ring"
        className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent ring-1 ring-inset ring-accent/25"
      >
        <Check className="h-7 w-7 text-accent" strokeWidth={2.5} aria-hidden />
        <svg
          aria-hidden
          viewBox="0 0 56 56"
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        >
          <circle
            data-anim="seal-circle"
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            data-anim="seal-tick"
            d="M18 29.5 L25 36 L38.5 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="rotate(90 28 28)"
          />
        </svg>
      </span>
      <h2 className="h2 mt-6 text-3xl text-foreground">
        {copy["packages.quiz.success.title"]}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        {copy["packages.quiz.success.message"]}
      </p>
      <div className="rule mx-auto mt-8 max-w-md pt-6">
        <p className="text-sm text-muted">
          {copy["packages.quiz.success.fallback"]}{" "}
          <a
            href={`mailto:${SALES_EMAIL}`}
            className="font-semibold text-foreground underline decoration-hairline underline-offset-4 transition-colors hover:text-accent"
          >
            {SALES_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}
