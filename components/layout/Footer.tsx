"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const SERVICE_LINKS = [
  { href: "/services/ai-automation", label: "AI automation" },
  { href: "/services/web-development", label: "Web development" },
  { href: "/services/mobile-apps", label: "Mobile apps" },
  { href: "/services/cloud-devops", label: "Cloud & DevOps" },
  { href: "/services/design", label: "Design" },
  { href: "/services/smm", label: "Social media management" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const RESOURCE_LINKS = [
  { href: "/packages", label: "Pricing" },
  { href: "/services", label: "Services" },
];

export function Footer() {
  const { t } = useI18n();
  const pathname = usePathname();

  const footerLinkClass = (href: string) =>
    pathname === href
      ? "text-sm font-medium text-foreground transition-colors"
      : "text-sm text-muted transition-colors hover:text-foreground";
  const legalLinkClass = (href: string) =>
    pathname === href
      ? "text-xs font-medium text-foreground transition-colors"
      : "text-xs text-muted transition-colors hover:text-foreground";

  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Technovora — home" className="inline-flex items-center">
              <Image
                src="/images/logo-wordmark.webp"
                alt="Technovora"
                width={168}
                height={30}
                className="h-[34px] w-auto dark:invert dark:hue-rotate-180"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={`mailto:${t("common.email.sales")}`} className="block text-muted transition-colors hover:text-foreground">
                {t("common.email.sales")}
              </a>
              <a
                href="https://github.com/Technovora"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </div>
            <p className="mt-5 text-xs text-muted">
              Sheridan, WY · Hong Kong
            </p>
          </div>

          <div>
            <p className="eyebrow">{t("footer.company")}</p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={footerLinkClass(l.href)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">{t("footer.services")}</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={footerLinkClass(l.href)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">{t("footer.resources")}</p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={footerLinkClass(l.href)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Technovora. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              aria-current={pathname === "/privacy" ? "page" : undefined}
              className={legalLinkClass("/privacy")}
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              aria-current={pathname === "/terms" ? "page" : undefined}
              className={legalLinkClass("/terms")}
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
