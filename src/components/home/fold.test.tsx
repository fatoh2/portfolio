import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { headline } from "@/content/home";
import { buildCards } from "@/lib/home-cards";
import { Fold } from "./fold";

const fold = (locale: "en" | "ar") =>
  new DOMParser().parseFromString(
    `<div dir="${locale === "ar" ? "rtl" : "ltr"}">${renderToStaticMarkup(<Fold locale={locale} cards={buildCards(locale)} />)}</div>`,
    "text/html",
  );

describe("the fold", () => {
  it("puts the main leaf first in reading order on /ar, with the Arabic headline", () => {
    const html = fold("ar");
    const leaves = [...html.querySelectorAll(".leaf")];
    expect(leaves[0].classList.contains("leaf-main")).toBe(true);
    expect(html.querySelector("h1")?.textContent).toBe(headline.ar);
    expect([...html.querySelectorAll(".leaf-other [lang]")].map((p) => p.getAttribute("lang"))).toEqual(["en", "he"]);
    expect(html.querySelector(".leaf-other [lang='en']")?.getAttribute("dir")).toBe("ltr");
  });

  it("keeps the felt's pictures hidden from assistive tech and out of the tab order", () => {
    const html = fold("en");
    const felt = html.querySelector(".felt")!;
    expect(felt.getAttribute("aria-hidden")).toBe("true");
    expect(felt.querySelectorAll("img")).toHaveLength(8);
    expect(felt.querySelectorAll("a, button, [tabindex]")).toHaveLength(0);
    expect([...felt.querySelectorAll("img")].every((img) => img.getAttribute("alt") === "")).toBe(true);
  });
});
