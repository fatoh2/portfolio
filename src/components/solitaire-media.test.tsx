import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getProject, locales, solitaireMedia, t } from "@/content/portfolio";
import { PortfolioHome } from "./portfolio-home";
import { ProjectPage } from "./project-page";

vi.mock("./contact-form", () => ({ ContactForm: () => null }));

describe("SOLitaire screenshot presentation", () => {
  it.each(locales)("leads the %s homepage with the live suit hero over its still", (locale) => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<PortfolioHome locale={locale} />),
      "text/html",
    );
    const image = document.querySelector('[data-project="solitaire"] img');
    expect(image?.getAttribute("src")).toContain(encodeURIComponent(solitaireMedia.hero.src));
    expect(image?.getAttribute("alt")).toBe(t(solitaireMedia.hero.alt, locale));
    expect(document.querySelector('[data-project="solitaire"] .deck-desktop .live-embed')).not.toBeNull();
    expect(image?.classList.contains("contain")).toBe(true);
    const downloads = [...document.querySelectorAll('[data-project="solitaire"] a[download]')].map((a) => a.getAttribute("href"));
    expect(downloads).toEqual(["/downloads/SOLitaire.apk", "/downloads/SOLitaire-staging.apk", "/downloads/SOLitaire-admin-staging.apk"]);
  });

  it.each(locales)("shows the live hero, the phone hero, the table and the game home in %s", (locale) => {
    const project = getProject("solitaire");
    if (!project) throw new Error("Missing SOLitaire project");
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<ProjectPage project={project} locale={locale} />),
      "text/html",
    );
    const primary = document.querySelector(".project-hero-image");
    expect(primary?.getAttribute("src")).toContain(encodeURIComponent(solitaireMedia.hero.src));
    expect(document.querySelectorAll(".live-embed-host .live-embed")).toHaveLength(2);
    expect(primary?.classList.contains("contain")).toBe(true);
    const gallery = [...document.querySelectorAll(".project-gallery img")];
    expect(gallery.map((image) => image.getAttribute("alt"))).toEqual([
      t(solitaireMedia.mobileHero.alt, locale),
      t(solitaireMedia.gameplay.alt, locale),
      t(solitaireMedia.lobby.alt, locale),
    ]);
    expect(gallery.every((image) => image.classList.contains("contain"))).toBe(true);
    expect(document.querySelector('img[src*="solitaire-banner"]')).toBeNull();
  });
});
