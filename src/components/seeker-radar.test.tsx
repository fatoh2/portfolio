import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getProject, locales, localizedPath, t } from "@/content/portfolio";
import { PortfolioHome } from "./portfolio-home";
import { ProjectPage } from "./project-page";

vi.mock("./contact-form", () => ({ ContactForm: () => null }));

describe("Seeker Radar portfolio presentation", () => {
  it.each(locales)("keeps Go To Nature first and Seeker Radar second in %s", (locale) => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<PortfolioHome locale={locale} />),
      "text/html",
    );
    const featured = [...document.querySelectorAll(".feature-row")];
    expect(featured.slice(0, 2).map((row) => row.querySelector("h3")?.textContent)).toEqual([
      "Go To Nature", "Seeker Radar",
    ]);
    expect(featured[1].querySelector(`a[href="${localizedPath(locale, "/work/seeker-radar")}"]`)).not.toBeNull();
  });

  it.each(locales)("renders the complete uncropped case study in %s", (locale) => {
    const project = getProject("seeker-radar");
    if (!project) throw new Error("Missing Seeker Radar project");
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<ProjectPage project={project} locale={locale} />),
      "text/html",
    );
    const images = [...document.querySelectorAll(".project-hero-image, .project-gallery img")];
    expect(images).toHaveLength(3);
    images.forEach((image, index) => {
      const media = project.media[index];
      expect(image.getAttribute("src")).toContain(encodeURIComponent(media.src));
      expect(image.getAttribute("alt")).toBe(t(media.alt, locale));
      expect(image.classList.contains("contain")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", media.src))).toBe(true);
    });
    expect(document.querySelector('a[href="https://seeker-radar.app"]')).not.toBeNull();
    expect(document.querySelector('a[href*="github.com/fatoh2/seeker"]')).toBeNull();
  });
});
