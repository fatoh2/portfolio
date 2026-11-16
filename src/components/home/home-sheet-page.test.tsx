import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { headline } from "@/content/home";
import now from "@/content/now.json";
import { getProject, locales, localizedPath, type Locale } from "@/content/portfolio";
import { answersFor } from "@/lib/home-answers";
import { PortfolioHome } from "../portfolio-home";
import { ProjectPage } from "../project-page";
import { SiteHeader } from "../site-header";
import { HomeSheetPage } from "./home-sheet-page";

vi.mock("../contact-form", () => ({ ContactForm: () => <form className="brief-form" /> }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
const page = (locale: Locale) => parse(renderToStaticMarkup(<HomeSheetPage locale={locale} />));
const oldPage = (locale: Locale) => parse(renderToStaticMarkup(<PortfolioHome locale={locale} />));

/** Links on the old page that the new one drops on purpose, each signed off on 2026-11-15. */
const signedRemovals = (locale: Locale) => [
  // E3: the #agent section is gone; the demo lives in the WhatsApp agent's sheet.
  localizedPath(locale, "/#agent"),
  "#agent",
];

function visible(element: Element) {
  for (let node: Element | null = element; node; node = node.parentElement) {
    if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true" || node.classList.contains("sr-only")) return false;
    if (node.tagName === "DETAILS" && !node.hasAttribute("open") && node !== element.closest("details > summary")) return false;
  }
  return true;
}

describe("the rebuilt homepage loses nothing the old one had", () => {
  it.each(locales)("keeps every link and download from the old page, visibly, in %s", (locale) => {
    const before = oldPage(locale);
    const after = page(locale);
    const removed = signedRemovals(locale);
    expect(before.querySelectorAll("a[download]").length).toBeGreaterThan(5);
    expect(before.querySelector(`a[href="${localizedPath(locale, "/work/bab")}"]`)).not.toBeNull();
    const shown = new Set([...after.querySelectorAll("a[href]")].filter(visible).map((a) => a.getAttribute("href")));
    const missing = [...new Set([...before.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")!))].filter(
      (href) => !removed.includes(href) && !shown.has(href),
    );
    expect(missing).toEqual([]);
    const downloads = [...before.querySelectorAll("a[download]")].map((a) => a.getAttribute("href"));
    const shownDownloads = new Set([...after.querySelectorAll("a[download]")].filter(visible).map((a) => a.getAttribute("href")));
    expect(downloads.filter((href) => !shownDownloads.has(href))).toEqual([]);
  });

  it.each(locales)("keeps the linked ids, and every hash link in the header and case pages resolves, in %s", (locale) => {
    const after = page(locale);
    for (const id of ["top", "work", "services", "process", "contact", "saqroon"]) expect(after.getElementById(id), id).not.toBeNull();
    const project = getProject("bab")!;
    const hashes = [SiteHeader({ locale }), ProjectPage({ project, locale })]
      .flatMap((element) => [...parse(renderToStaticMarkup(element)).querySelectorAll("a[href*='#']")])
      .map((a) => a.getAttribute("href")!.split("#")[1])
      .filter((hash) => hash && hash !== "main");
    for (const hash of new Set(hashes)) expect(after.getElementById(hash), hash).not.toBeNull();
  });

  it.each(locales)("keeps the signed content blocks in %s", (locale) => {
    const after = page(locale);
    expect(after.querySelector("h1")?.textContent).toBe(headline[locale]);
    const services = after.getElementById("services")!.textContent!;
    for (const tool of ["Kubernetes", "Terraform", "ArgoCD"]) expect(services).toContain(tool);
    expect(after.querySelectorAll("#process ol > li")).toHaveLength(4);
    expect(after.querySelector("#contact form.brief-form")).not.toBeNull();
    expect(after.querySelector("footer.site-footer")).not.toBeNull();
    for (const entry of now) {
      const phase = after.querySelector(`[data-slug="${entry.slug}"] .home-card-phase`);
      expect(phase?.textContent, entry.slug).toContain(entry.phase);
    }
  });

  it.each(locales)("follows the markup rules in %s", (locale) => {
    const after = page(locale);
    expect(after.querySelectorAll("a a")).toHaveLength(0);
    expect(after.querySelectorAll("h1")).toHaveLength(1);
    const order = (a: Element, b: Element) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING;
    const box = after.querySelector("[data-ask]")!;
    for (const button of after.querySelectorAll(".fold-actions a")) expect(order(button, box)).toBeTruthy();
    expect(after.querySelectorAll(".fold-actions a")).toHaveLength(2);
  });

  it.each(locales)("renders twelve cards with title links, SOLitaire's three APKs and every answer in %s", (locale) => {
    const after = page(locale);
    const cards = [...after.querySelectorAll("article[data-slug]")];
    expect(cards).toHaveLength(12);
    for (const card of cards) expect(card.querySelector(".home-card-title a[href][data-sheet]"), card.getAttribute("data-slug")!).not.toBeNull();
    expect([...after.querySelectorAll('[data-slug="solitaire"] a[download]')].map((a) => a.getAttribute("href"))).toEqual([
      "/downloads/SOLitaire.apk",
      "/downloads/SOLitaire-staging.apk",
      "/downloads/SOLitaire-admin-staging.apk",
    ]);
    for (const answer of answersFor(locale)) expect(after.getElementById(answer.id), answer.id).not.toBeNull();
  });
});
