import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildCards } from "@/lib/home-cards";
import { Fold } from "./fold";
import { Thread } from "./thread";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

const cards = buildCards("en");
const setup = () =>
  render(
    <>
      <Fold locale="en" cards={cards} />
      <Thread locale="en" />
    </>,
  );
const area = () => document.querySelector<HTMLElement>(".ask-answer")!;
const chips = () => document.querySelector<HTMLElement>("[data-ask-chips]")!;

afterEach(() => {
  cleanup();
  track.mockClear();
});

describe("the question box", () => {
  it("is plain links to the thread's answers before script runs", () => {
    const html = new DOMParser().parseFromString(renderToStaticMarkup(<Fold locale="en" cards={cards} />), "text/html");
    expect([...html.querySelectorAll("[data-ask-chip]")].map((chip) => chip.getAttribute("href"))).toEqual([
      "#q-live",
      "#q-install",
      "#q-services",
    ]);
    expect(html.querySelector("[data-ask-form]")?.hasAttribute("hidden")).toBe(true);
    expect(html.querySelector('[data-sheet="solitaire"]')?.getAttribute("href")).toBe("/work/solitaire");
  });

  it("replaces the chips with the chip's answer, focuses it and reports only intent and source", () => {
    setup();
    act(() => {
      fireEvent.click(document.querySelector("[data-ask-chip='live']")!);
    });
    expect(chips().hidden).toBe(true);
    expect(area().hidden).toBe(false);
    expect(area().querySelector("[data-answer='live']")).not.toBeNull();
    expect(area().querySelectorAll("[id]")).toHaveLength(0);
    expect(document.activeElement).toBe(area().querySelector("[data-answer-heading]"));
    expect(track).toHaveBeenCalledWith("ask", { intent: "live", source: "chip" });
    expect(area().querySelector("a[href='#portal']")).not.toBeNull();
  });

  it("brings the chips back on Ask another and focuses the first chip", () => {
    setup();
    act(() => {
      fireEvent.click(document.querySelector("[data-ask-chip='install']")!);
    });
    act(() => {
      fireEvent.click([...area().querySelectorAll("button")].at(-1)!);
    });
    expect(chips().hidden).toBe(false);
    expect(area().hidden).toBe(true);
    expect(document.activeElement).toBe(document.querySelector("[data-ask-chip='live']"));
  });

  it("sends an unknown question to WhatsApp with the visitor's words", () => {
    setup();
    const input = document.querySelector<HTMLInputElement>("#ask-input")!;
    const question = "Can you build a booking system for my clinic?";
    act(() => {
      fireEvent.change(input, { target: { value: question } });
      fireEvent.submit(input.form!);
    });
    expect(area().querySelector<HTMLAnchorElement>(".answer-whatsapp")?.getAttribute("href")).toBe(
      `https://wa.me/972545964855?text=${encodeURIComponent(question)}`,
    );
    expect(track).toHaveBeenCalledWith("ask", { intent: "unknown", source: "typed" });
  });

  it("answers a typed question in the page's language and reports the language it was asked in", () => {
    render(
      <>
        <Fold locale="ar" cards={buildCards("ar")} />
        <Thread locale="ar" />
      </>,
    );
    const input = document.querySelector<HTMLInputElement>("#ask-input")!;
    act(() => {
      fireEvent.change(input, { target: { value: "How much does it cost?" } });
      fireEvent.submit(input.form!);
    });
    expect(area().querySelector("[data-answer='price']")).not.toBeNull();
    expect(area().querySelector("[data-field='language']")?.textContent).toBe("الإنجليزية");
  });

  it("does nothing for empty input", () => {
    setup();
    const input = document.querySelector<HTMLInputElement>("#ask-input")!;
    act(() => {
      fireEvent.submit(input.form!);
    });
    expect(area().hidden).toBe(true);
    expect(track).not.toHaveBeenCalled();
  });
});
