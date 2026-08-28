import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getProject, locales, solitaireMedia, t } from "@/content/portfolio";
import { HeroCanvas } from "./hero-canvas";
import { ProjectPage } from "./project-page";

describe("SOLitaire screenshot presentation", () => {
  it.each(locales)("uses the current gameplay capture in the %s hero", (locale) => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<HeroCanvas locale={locale} />),
      "text/html",
    );
    const image = document.querySelector(".canvas-solitaire img");
    expect(image?.getAttribute("src")).toContain(encodeURIComponent(solitaireMedia.gameplay.src));
    expect(image?.getAttribute("alt")).toBe(t(solitaireMedia.gameplay.alt, locale));
    expect(image?.classList.contains("canvas-contain")).toBe(true);
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
