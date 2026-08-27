import { ArrowUpRight, Menu } from "lucide-react";
import { getDictionary } from "@/content/ui";
import {
  localizedPath,
  type Locale,
} from "@/content/portfolio";
import { TrackedLink } from "./tracked-link";

const languageNames: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
  he: "ע",
};

export function SiteHeader({
  locale,
  currentPath = "/",
}: {
  locale: Locale;
  currentPath?: string;
}) {
  const dictionary = getDictionary(locale);
  const nav = [
    { label: dictionary.nav.services, href: localizedPath(locale, "/#services") },
    { label: dictionary.nav.work, href: localizedPath(locale, "/#work") },
    { label: dictionary.nav.process, href: localizedPath(locale, "/#process") },
    { label: dictionary.nav.contact, href: localizedPath(locale, "/#contact") },
  ];

  const languages = (["en", "ar", "he"] as Locale[]).map((target) => ({
    locale: target,
    label: languageNames[target],
    href: localizedPath(target, currentPath),
  }));

  return (
    <header className="site-header">
      <div className="header-inner">
        <TrackedLink
          href={localizedPath(locale)}
          className="brand-link"
          eventName="navigation"
          eventData={{ target: "home", locale }}
          aria-label="Fathallah Haj"
        >
          <span className="brand-mark" aria-hidden="true">FH</span>
          <span className="brand-copy">
            <strong>Fathallah Haj</strong>
            <small>Product · AI · DevOps</small>
          </span>
        </TrackedLink>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              eventName="navigation"
              eventData={{ target: item.label, locale }}
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            {languages.map((item) => (
              <TrackedLink
                key={item.locale}
                href={item.href}
                hrefLang={item.locale}
                lang={item.locale}
                aria-current={locale === item.locale ? "page" : undefined}
                eventName="language_switch"
                eventData={{ from: locale, to: item.locale }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>
          <TrackedLink
            href={localizedPath(locale, "/#contact")}
            className="header-cta"
            eventName="cta_click"
            eventData={{ placement: "header", locale }}
          >
            {dictionary.nav.start}
            <ArrowUpRight aria-hidden="true" size={16} />
          </TrackedLink>
          <details className="mobile-menu">
            <summary title={dictionary.nav.menu} aria-label={dictionary.nav.menu}>
              <Menu aria-hidden="true" size={20} />
            </summary>
            <nav aria-label="Mobile navigation">
              {nav.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="navigation"
                  eventData={{ target: item.label, locale }}
                >
                  {item.label}
                </TrackedLink>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
