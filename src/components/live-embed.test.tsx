import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgentDemo } from "./agent-demo";
import { getDictionary } from "@/content/ui";
import { EMBED_READY_MESSAGE, LiveEmbed } from "./live-embed";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  track.mockClear();
});

describe("LiveEmbed", () => {
  it("calls onReady once, however many ready messages arrive", () => {
    let near: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
          near = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
    const onReady = vi.fn();
    render(<LiveEmbed src="https://example.test/embed" title="Table" width={393} height={874} onReady={onReady} />);
    act(() => near!([{ isIntersecting: true }]));
    const frame = document.querySelector("iframe")!;
    for (let i = 0; i < 3; i++) {
      act(() => {
        window.dispatchEvent(new MessageEvent("message", { source: frame.contentWindow, data: { type: EMBED_READY_MESSAGE } }));
      });
    }
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(document.querySelector(".live-embed")?.hasAttribute("data-ready")).toBe(true);
  });
});

describe("AgentDemo", () => {
  it("reports each sent message with the locale only, never the text", () => {
    vi.useFakeTimers();
    render(<AgentDemo locale="en" copy={getDictionary("en").home.agentDemo} />);
    const input = document.querySelector<HTMLInputElement>(".agent-demo-compose input")!;
    fireEvent.change(input, { target: { value: "How much is the knafeh?" } });
    fireEvent.submit(input.form!);
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("demo_send", { locale: "en" });
  });
});
