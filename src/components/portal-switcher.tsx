import { localizedPath, type Locale } from "@/content/portfolio";
import { portalBannerVariants, type PortalVariant } from "./portal-variant";

const labels: Record<PortalVariant, string> = {
  video: "Video loop",
  still: "Layered still",
  pan: "Page pan",
  constellation: "1. Constellation",
  monogram: "2. Monogram",
  studio: "3. Studio",
};

/** Local comparison control; full reloads so the server renders each variant. */
export function PortalSwitcher({
  locale,
  active,
}: {
  locale: Locale;
  active?: PortalVariant;
}) {
  const home = localizedPath(locale, "/");
  return (
    <nav className="portal-switcher" aria-label="Portal direction (local experiment)">
      <span>Banner</span>
      <a href={`${home}?portal=still`} aria-current={active === "still" ? "true" : undefined}>
        ElsewhereCo
      </a>
      {portalBannerVariants.map((variant) => (
        <a
          key={variant}
          href={`${home}?portal=${variant}`}
          aria-current={variant === active ? "true" : undefined}
        >
          {labels[variant]}
        </a>
      ))}
    </nav>
  );
}
