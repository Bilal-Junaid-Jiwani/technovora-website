"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";
import { LanguageToggle } from "./LanguageToggle";

const LINKS = [
  { key: "nav.services", href: "/services" },
  { key: "nav.work", href: "/portfolio" },
  { key: "nav.pricing", href: "/packages" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
];

export function Navbar() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Technovora — home" className="flex items-center">
          <Image
            src="/images/logo-wordmark.webp"
            alt="Technovora"
            width={221}
            height={100}
            priority
            className="h-[44px] w-auto dark:hidden"
          />
          <Image
            src="/images/logo-wordmark-dark.webp"
            alt="Technovora"
            width={221}
            height={100}
            priority
            className="hidden h-[44px] w-auto dark:block"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-sm font-medium text-foreground transition-colors"
                    : "text-sm text-muted transition-colors hover:text-foreground"
                }
              >
                {t(l.key)}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle compact />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("theme.toggle")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {theme === "dark" ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a
            href={t("common.calendly")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            {t("nav.book")}
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? t("nav.close") : t("nav.menu")}
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "rounded-lg px-3 py-3 text-[15px] font-medium text-foreground transition-colors"
                      : "rounded-lg px-3 py-3 text-[15px] text-foreground transition-colors hover:bg-surface"
                  }
                >
                  {t(l.key)}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center gap-3 border-t border-hairline pt-4">
              <a
                href={t("common.calendly")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-sm"
              >
                {t("nav.book")}
              </a>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={t("theme.toggle")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-muted"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {theme === "dark" ? (
                    <>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </>
                  ) : (
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                  )}
                </svg>
              </button>
            </div>
            <div className="mt-3">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
