"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/types";

export type { Locale };

type Dict = Record<string, string>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

// English ships in the main bundle: SSR and first paint always render real
// English strings (commit 26d591b). Other locales load on demand as separate
// chunks, so visitors only download the language they use.
async function loadDictionary(locale: Locale): Promise<Dict> {
  switch (locale) {
    case "ja":
      return (await import("@/lib/i18n/dictionaries/ja")).default;
    case "de":
      return (await import("@/lib/i18n/dictionaries/de")).default;
    case "nl":
      return (await import("@/lib/i18n/dictionaries/nl")).default;
    case "zh-CN":
      return (await import("@/lib/i18n/dictionaries/zh-CN")).default;
    default:
      return en;
  }
}

const NON_EN_LOCALES: Locale[] = ["zh-CN", "ja", "de", "nl"];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always render the provider (even during SSR) so prerendered HTML contains
  // real English strings instead of raw keys. The client first render also uses
  // "en", so hydration is consistent; a saved non-English locale is applied in
  // an effect right after mount.
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dicts, setDicts] = useState<Record<Locale, Dict | null>>({
    en,
    "zh-CN": null,
    ja: null,
    de: null,
    nl: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("app-locale") as Locale | null;
    if (saved && saved !== "en" && NON_EN_LOCALES.includes(saved)) {
      loadDictionary(saved).then((dict) => {
        setDicts((prev) => ({ ...prev, [saved]: dict }));
        setLocaleState(saved);
      });
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    localStorage.setItem("app-locale", newLocale);
    if (newLocale === "en") {
      setLocaleState("en");
      return;
    }
    // Keep rendering the current locale while the new dictionary loads:
    // no layout shift, no raw keys.
    loadDictionary(newLocale).then((dict) => {
      setDicts((prev) => ({ ...prev, [newLocale]: dict }));
      setLocaleState(newLocale);
    });
  };

  const t = (key: string) => {
    return dicts[locale]?.[key] ?? en[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
