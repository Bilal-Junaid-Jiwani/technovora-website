"use client";

import { useState } from "react";
import { AlertCircle, Check, Copy, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ContactForm - a real, honest contact form without a backend.
 * Name + work email + message, validated inline. Submitting opens the
 * visitor's own email app with a prefilled mailto to sales@technovora.com,
 * then shows a copy-to-clipboard fallback with the full text. The note
 * under the button says plainly that nothing is sent until they press send.
 * Behavior is frozen; only presentation was refined for Round 3.
 * Contrast: labels are foreground, placeholders and errors use the muted
 * token (AA on both themes), errors pair an accent icon with readable text.
 */
export function ContactForm() {
  const { t } = useI18n();
  const sales = t("common.email.sales");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullText = () =>
    `${t("packages.quiz.mailto.name")}: ${name.trim()}\n` +
    `${t("packages.quiz.mailto.email")}: ${email.trim()}\n\n${message.trim()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = t("contact3.form.nameInvalid");
    if (!EMAIL_RE.test(email.trim())) next.email = t("contact3.form.emailInvalid");
    if (message.trim().length < 10) next.message = t("contact3.form.messageInvalid");
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(t("contact3.form.mailtoSubject"));
    const body = encodeURIComponent(fullText());
    window.location.href = `mailto:${sales}?subject=${subject}&body=${body}`;
    setReady(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText());
    } catch {
      /* clipboard unavailable - user can select the text manually */
    }
    setCopied(true);
  };

  const inputClass = (invalid: boolean) =>
    cn(
      "w-full rounded-[10px] border bg-surface px-4 py-3 text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-4 focus:ring-accent/15",
      invalid ? "border-accent focus:border-accent" : "border-hairline focus:border-accent",
    );

  const errorLine = (message?: string) =>
    message ? (
      <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-muted">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
        {message}
      </p>
    ) : null;

  if (ready) {
    return (
      <div>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
          <Check className="h-6 w-6 text-accent" strokeWidth={2.5} aria-hidden />
        </span>
        <h3 className="h3 mt-5 text-2xl text-foreground">
          {t("contact3.form.sentTitle")}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          {t("contact3.form.sentDesc")}{" "}
          <a
            href={`mailto:${sales}`}
            className="font-semibold text-foreground underline decoration-hairline underline-offset-4 transition-colors hover:text-accent"
          >
            {sales}
          </a>
        </p>
        <label
          htmlFor="contact-full-text"
          className="mb-2 mt-6 block text-sm font-semibold text-foreground"
        >
          {t("contact3.form.copy")}
        </label>
        <textarea
          id="contact-full-text"
          readOnly
          value={fullText()}
          rows={8}
          className="w-full resize-y rounded-xl border border-hairline bg-surface px-4 py-3 text-sm leading-relaxed text-muted focus:border-accent focus:outline-none"
        />
        <button type="button" onClick={handleCopy} className="btn-secondary mt-5">
          <Copy className="h-4 w-4" aria-hidden />
          {copied ? t("contact3.form.copied") : t("contact3.form.copy")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 data-anim="form-title" className="h3 text-2xl text-foreground">{t("contact3.form.title")}</h3>
      <p data-anim="form-desc" className="mt-2 leading-relaxed text-muted">{t("contact3.form.desc")}</p>

      <div className="mt-7 grid gap-5">
        <div data-anim="field">
          <label data-anim="field-label" htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-foreground">
            {t("contact3.form.name")}
          </label>
          <div className="relative">
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder={t("packages.quiz.form.namePlaceholder")}
              aria-invalid={errors.name ? true : undefined}
              className={inputClass(!!errors.name)}
            />
            <span
              data-anim="underline"
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
            />
          </div>
          {errorLine(errors.name)}
        </div>
        <div data-anim="field">
          <label data-anim="field-label" htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-foreground">
            {t("contact3.form.email")}
          </label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder={t("packages.quiz.form.emailPlaceholder")}
              aria-invalid={errors.email ? true : undefined}
              className={inputClass(!!errors.email)}
            />
            <span
              data-anim="underline"
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
            />
          </div>
          {errorLine(errors.email)}
        </div>
        <div data-anim="field">
          <label data-anim="field-label" htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-foreground">
            {t("contact3.form.message")}
          </label>
          <div className="relative">
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
              }}
              placeholder={t("contact3.form.messagePlaceholder")}
              rows={5}
              aria-invalid={errors.message ? true : undefined}
              className={cn(inputClass(!!errors.message), "resize-y leading-relaxed")}
            />
            <span
              data-anim="underline"
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
            />
          </div>
          {errorLine(errors.message)}
        </div>
      </div>

      <div className="mt-7">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Send className="h-4 w-4" aria-hidden />
          {t("contact3.form.submit")}
        </button>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {t("contact3.form.note")}
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">
          {t("contact3.form.promise")}
        </p>
      </div>
    </form>
  );
}
