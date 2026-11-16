import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { labels } from "@/content/home";
import { locales, type Locale } from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { getCard } from "@/lib/home-cards";
import { ProjectSheet } from "./project-sheet";
import { WorkTable } from "./work-table";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

const agentDemoCopy = Object.fromEntries(locales.map((l) => [l, getDictionary(l).home.agentDemo])) as Record<Locale, ReturnType<typeof getDictionary>["home"]["agentDemo"]>;
const props = { locale: "en" as const, labels: labels.sheet, agentDemoCopy, statusLabels };

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
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
});

describe("the project sheet", () => {
  it("goes back one step on Escape, and closes on popstate without a second step", () => {
    window.history.replaceState(null, "", "/");
    const cards = [getCard("bab", "en")!];
    render(
      <section id="work">
        <WorkTable cards={cards} callLabels={{ all: "", live: "", install: "", again: "" }} sheetLabels={labels.sheet} agentDemoCopy={agentDemoCopy} statusLabels={statusLabels} locale="en" />
        <a href={cards[0].casePath!} data-sheet="bab">
          Bab
        </a>
      </section>,
    );
    act(() => {
      fireEvent.click(document.querySelector("[data-sheet]")!);
    });
    const dialog = document.querySelector("dialog")!;
    expect(dialog.hasAttribute("open")).toBe(true);
    const back = vi.spyOn(window.history, "back").mockImplementation(() => {});
    const cancel = new Event("cancel", { cancelable: true });
    dialog.dispatchEvent(cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(back).toHaveBeenCalledTimes(1);
    act(() => {
      window.history.replaceState(null, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
    });
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("turns the text, lang and dir without changing the address", () => {
    window.history.replaceState(null, "", "/work/bab");
    const card = getCard("bab", "en")!;
    render(<ProjectSheet card={card} {...props} />);
    act(() => {
      fireEvent.click(document.querySelector(".sheet-languages button[lang='ar']")!);
    });
    const body = document.querySelector<HTMLElement>(".sheet-body")!;
    expect(body.lang).toBe("ar");
    expect(body.dir).toBe("rtl");
    expect(body.querySelector(".sheet-summary")?.textContent).toBe(card.summary.ar);
    expect(window.location.pathname).toBe("/work/bab");
    expect(track).toHaveBeenCalledWith("sheet_language", { slug: "bab", language: "ar" });
  });

  it("shows SOLitaire's two live frames and the agent demo on the WhatsApp agent", () => {
    const { unmount } = render(<ProjectSheet card={getCard("solitaire", "en")!} {...props} />);
    expect(document.querySelectorAll("dialog .live-embed")).toHaveLength(2);
    unmount();
    render(<ProjectSheet card={getCard("whatsapp-ai-sales-agent", "en")!} {...props} />);
    expect(document.querySelector("dialog [data-agent-demo]")).not.toBeNull();
  });
});
