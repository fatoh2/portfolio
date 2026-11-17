import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { labels } from "@/content/home";
import { locales, type Locale } from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { buildCards, cardTilt } from "@/lib/home-cards";
import { HomeCard } from "./home-card";
import { WorkTable } from "./work-table";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

const cards = buildCards("en");
const agentDemoCopy = Object.fromEntries(locales.map((l) => [l, getDictionary(l).home.agentDemo])) as Record<Locale, ReturnType<typeof getDictionary>["home"]["agentDemo"]>;
let observed: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
let reduced = false;
let onScreen = false;
const animate = vi.fn(() => ({ finished: Promise.resolve() }));

function Table() {
  return (
    <section id="work">
      <WorkTable
        cards={cards}
        locale="en"
        callLabels={{ all: "All", live: "Live", install: "Install", again: "Again" }}
        sheetLabels={labels.sheet}
        agentDemoCopy={agentDemoCopy}
        statusLabels={statusLabels}
      />
      {cards.map((card, index) => (
        <HomeCard key={card.slug} card={card} index={index} locale="en" />
      ))}
    </section>
  );
}

beforeEach(() => {
  reduced = false;
  onScreen = false;
  observed = null;
  window.history.replaceState(null, "", "/");
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce") && reduced, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        observed = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
    () => ({ top: onScreen ? 100 : 5000, bottom: onScreen ? 900 : 6000 }) as DOMRect,
  );
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  track.mockClear();
  animate.mockClear();
});

const work = () => document.getElementById("work")!;

describe("the work table", () => {
  it("deals once, when the table first comes into view", () => {
    render(<Table />);
    expect(work().getAttribute("data-deal")).toBe("down");
    act(() => observed!([{ isIntersecting: true }]));
    expect(work().hasAttribute("data-deal")).toBe(false);
    expect(animate).toHaveBeenCalledTimes(12);
  });

  it.each([
    ["the table is already on screen", () => (onScreen = true)],
    ["motion is reduced", () => (reduced = true)],
    ["the page loaded on #work", () => window.history.replaceState(null, "", "/#work")],
  ])("does not deal when %s", (_, arrange) => {
    arrange();
    render(<Table />);
    expect(work().hasAttribute("data-deal")).toBe(false);
    expect(observed).toBeNull();
  });

  it("tilts each card by its position, the same in server HTML", () => {
    const html = new DOMParser().parseFromString(renderToStaticMarkup(<Table />), "text/html");
    [...html.querySelectorAll<HTMLElement>("article[data-slug]")].forEach((card, index) => {
      expect(card.getAttribute("style")).toContain(`--tilt:${cardTilt(index)}deg`);
    });
  });

  it("filters on status and downloads, and reports the call", () => {
    render(<Table />);
    const shown = () => [...document.querySelectorAll<HTMLElement>("article[data-slug]")].filter((card) => !card.hidden);
    fireEvent.click(document.querySelector(".work-calls button:nth-child(2)")!);
    expect(shown().every((card) => card.dataset.status === "live-product")).toBe(true);
    expect(shown().length).toBe(cards.filter((card) => card.status === "live-product").length);
    fireEvent.click(document.querySelector(".work-calls button:nth-child(3)")!);
    expect(shown().every((card) => card.dataset.hasDownload === "true")).toBe(true);
    expect(track).toHaveBeenLastCalledWith("deal", { call: "install" });
  });

  it("opens the sheet on a plain click with the case-page address, and leaves a Ctrl-click to the browser", () => {
    render(<Table />);
    const push = vi.spyOn(window.history, "pushState");
    const link = document.querySelector<HTMLAnchorElement>('[data-slug="bab"] .home-card-title a')!;
    const ctrl = fireEvent.click(link, { ctrlKey: true });
    expect(ctrl).toBe(true);
    expect(push).not.toHaveBeenCalled();
    act(() => {
      fireEvent.click(link);
    });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({ sheet: "bab" }, "", "/work/bab");
    expect(document.querySelector("dialog")?.hasAttribute("open")).toBe(true);
    expect(track).toHaveBeenCalledWith("sheet_open", { slug: "bab", from: "card" });
  });

  it("pushes #nuqta-kids for the card without a case page", () => {
    render(<Table />);
    const push = vi.spyOn(window.history, "pushState");
    act(() => {
      fireEvent.click(document.querySelector('[data-slug="nuqta-kids"] .home-card-title a')!);
    });
    expect(push).toHaveBeenCalledWith({ sheet: "nuqta-kids" }, "", "#nuqta-kids");
  });
});
