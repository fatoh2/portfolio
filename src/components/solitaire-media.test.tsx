import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getProject, locales, solitaireMedia, t } from "@/content/portfolio";
import { PortfolioHome } from "./portfolio-home";
import { ProjectPage } from "./project-page";

vi.mock("./contact-form", () => ({ ContactForm: () => null }));

describe("SOLitaire screenshot presentation", () => {
  it.each(locales)("uses the complete current lobby in the %s homepage", (locale) => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<PortfolioHome locale={locale} />),
      "text/html",
    );
    const image = document.querySelector('[data-project="solitaire"] img');
    expect(image?.getAttribute("src")).toContain(encodeURIComponent(solitaireMedia.lobby.src));
    expect(image?.getAttribute("alt")).toBe(t(solitaireMedia.lobby.alt, locale));
    expect(image?.classList.contains("contain")).toBe(true);
  });

  it.each(locales)("shows the uncropped lobby and both mobile screens in %s", (locale) => {
    const project = getProject("solitaire");
    if (!project) throw new Error("Missing SOLitaire project");
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<ProjectPage project={project} locale={locale} />),
      "text/html",
    );
    const primary = document.querySelector(".project-hero-image");
    expect(primary?.getAttribute("src")).toContain(encodeURIComponent(solitaireMedia.lobby.src));
    expect(primary?.classList.contains("contain")).toBe(true);
    const gallery = [...document.querySelectorAll(".project-gallery img")];
    expect(gallery.map((image) => image.getAttribute("alt"))).toEqual([
      t(solitaireMedia.mobileLobby.alt, locale),
      t(solitaireMedia.gameplay.alt, locale),
    ]);
    expect(gallery.every((image) => image.classList.contains("contain"))).toBe(true);
    expect(document.querySelector('img[src*="solitaire-banner"]')).toBeNull();
  });
});
