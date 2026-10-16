// Re-export everything from the canonical provider so all imports resolve correctly
export { I18nProvider, useI18n } from "@/components/layout/I18nProvider";

// Keep useTranslation as an alias for backward compat
export { useI18n as useTranslation } from "@/components/layout/I18nProvider";
