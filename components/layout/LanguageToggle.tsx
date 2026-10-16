"use client";

import { useI18n } from "./I18nProvider";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh-CN", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "de", name: "German" },
  { code: "nl", name: "Dutch" },
];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted">
      {!compact && <span>{t("lang.label")}</span>}
      <select
        className="cursor-pointer rounded-full border border-hairline bg-background px-3 py-1.5 text-sm text-foreground outline-none transition-colors hover:border-muted"
        value={locale}
        onChange={(e) => setLocale(e.target.value as "en" | "zh-CN" | "ja" | "de" | "nl")}
        aria-label={t("lang.label")}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {compact ? lang.code : lang.name}
          </option>
        ))}
      </select>
    </label>
  );
}
