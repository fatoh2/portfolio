import { StrictMode } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PortalMotion } from "./portal-motion";

const media = {
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};
const observers: { disconnect: ReturnType<typeof vi.fn> }[] = [];

function Scene() {
  return (
    <PortalMotion>
      <div data-portal-stage>
        <div data-portal-copy>
          <div data-portal-actions>
            <a href="#work">Work</a>
          </div>
        </div>
        <div data-portal-poster />
        {/* A fixture image lets the test exercise delayed and failed decoding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-portal-photo alt="Project" />
        <div data-portal-caption>
          <a href="#example">Project</a>
        </div>
        <svg>
          <path data-portal-mask />
          <g data-portal-mark />
        </svg>
      </div>
    </PortalMotion>
  );
}

beforeEach(() => {
  media.matches = false;
  media.addEventListener.mockClear();
  media.removeEventListener.mockClear();
  observers.length = 0;
  vi.stubGlobal("matchMedia", () => media);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      disconnect = vi.fn();
      observe = vi.fn();
      constructor() {
        observers.push(this);
      }
    },
  );
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn(() => 17),
  );
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: Promise.resolve() },
  });
  vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
  vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(
    1200,
  );
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
    function (this: HTMLElement) {
      return this.classList.contains("brand-portal") ? 1640 : 820;
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const poster = this.hasAttribute("data-portal-poster");
      return {
        x: poster ? 700 : 0,
        y: 80,
        left: poster ? 700 : 0,
        top: 80,
        right: 1440,
        bottom: 900,
        width: poster ? 600 : 1440,
        height: poster ? 440 : 820,
        toJSON() {},
      };
    },
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("portal progressive enhancement", () => {
  it("keeps the page unpinned before media loads and after a failure or motion preference change", async () => {
    const complete = vi
      .spyOn(HTMLImageElement.prototype, "complete", "get")
      .mockReturnValue(false);
    const { container } = render(<Scene />);
    const root = container.querySelector(".brand-portal")!;
    const photo = container.querySelector("img")!;
    expect(root.hasAttribute("data-motion")).toBe(false);
    complete.mockReturnValue(true);
    await act(async () => photo.dispatchEvent(new Event("load")));
    expect(root.getAttribute("data-motion")).toBe("ready");
    expect(
      container.querySelector("[data-portal-mask]")?.getAttribute("transform"),
    ).not.toMatch(/NaN|Infinity/);
    await act(async () => photo.dispatchEvent(new Event("error")));
    expect(root.hasAttribute("data-motion")).toBe(false);
    await act(async () => photo.dispatchEvent(new Event("load")));
    media.matches = true;
    await act(async () => media.addEventListener.mock.calls[0][1]());
    expect(root.hasAttribute("data-motion")).toBe(false);
    expect(photo.style.transform).toBe("");
    expect(
      container.querySelector<HTMLElement>("[data-portal-copy]")?.style.opacity,
    ).toBe("");
  });

  it("cleans up each Strict Mode mount and cancels pending frames on navigation", async () => {
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(
      <StrictMode>
        <Scene />
      </StrictMode>,
    );
    await act(async () => window.dispatchEvent(new Event("scroll")));
    unmount();
    for (const call of add.mock.calls.filter(([type]) =>
      ["scroll", "resize", "pageshow"].includes(type),
    )) {
      expect(
        remove.mock.calls.some(
          ([type, handler]) => type === call[0] && handler === call[1],
        ),
      ).toBe(true);
    }
    expect(observers.length).toBeGreaterThan(1);
    expect(
      observers.every(
        (observer) => observer.disconnect.mock.calls.length === 1,
      ),
    ).toBe(true);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(17);
    expect(media.removeEventListener.mock.calls).toHaveLength(2);
  });
});
