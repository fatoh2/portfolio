import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { locales, localizedPath } from "@/content/portfolio";
import { SiteHeader } from "./site-header";

describe("site header branding", () => {
  it.each(locales)("uses the vector mark and accessible home link in %s", (locale) => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<SiteHeader locale={locale} />),
      "text/html",
    );
    const home = document.querySelector(".brand-link");
    const image = home?.querySelector("img.brand-mark");
    expect(home?.getAttribute("href")).toBe(localizedPath(locale));
    expect(home?.getAttribute("aria-label")).toBe("Fathallah Haj");
    expect(image?.getAttribute("src")).toBe("/brand/fh-monogram-acid.svg");
    expect(image?.getAttribute("loading")).toBe("eager");
    expect(image?.getAttribute("width")).toBe("750");
    expect(image?.getAttribute("height")).toBe("550");
    expect(image?.getAttribute("alt")).toBe("");
    expect(image?.getAttribute("aria-hidden")).toBe("true");
    expect(home?.querySelector("span.brand-mark")).toBeNull();
  });

  it("keeps language navigation on the current case study", () => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<SiteHeader locale="ar" currentPath="/work/go-to-nature" />),
      "text/html",
    );
    const links = [...document.querySelectorAll(".language-switch a")];
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      locales.map((locale) => localizedPath(locale, "/work/go-to-nature")),
    );
    expect(links.find((link) => link.getAttribute("aria-current") === "page")?.getAttribute("lang")).toBe("ar");
  });
});
