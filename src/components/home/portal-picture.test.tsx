import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PortalPicture, type PortalShot } from "./portal-picture";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

const shot = (slug: string): PortalShot => ({
  slug,
  title: slug.toUpperCase(),
  caption: `${slug} caption`,
  src: `/work/${slug}/still.png`,
  width: 1600,
  height: 1000,
  alt: `${slug} picture`,
  casePath: `/work/${slug}`,
});
let arrive: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
let decode: () => Promise<void>;

function Stage({ motion }: { motion: boolean }) {
  return (
    <div className="brand-portal" data-motion={motion ? "ready" : undefined}>
      <div data-portal-stage="">
        <p data-portal-title="">A</p>
        <a href={shot("a").casePath!} data-portal-case="">
          Read
        </a>
        <span data-portal-caption-text="">a caption</span>
        <PortalPicture shots={[shot("a"), shot("b")]} />
      </div>
    </div>
  );
}

beforeEach(() => {
  decode = () => Promise.resolve();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        arrive = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "Image",
    class {
      srcset = "";
      sizes = "";
      src = "";
      decode() {
        return decode();
      }
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  track.mockClear();
});

const see = (slug: string) =>
  act(async () => {
    document.dispatchEvent(new CustomEvent("home:see", { detail: { slug } }));
  });

describe("the picture through the opening", () => {
  it("swaps the source on the same element after decoding, and updates the copy", async () => {
    render(<Stage motion />);
    const image = document.querySelector<HTMLImageElement>("[data-portal-photo]")!;
    await see("b");
    expect(document.querySelector("[data-portal-photo]")).toBe(image);
    expect(image.getAttribute("src")).toContain(encodeURIComponent("/work/b/still.png"));
    expect(document.querySelector("[data-portal-title]")?.textContent).toBe("B");
    expect(document.querySelector("[data-portal-case]")?.getAttribute("href")).toBe("/work/b");
  });

  it("keeps the old picture when the new one fails to decode", async () => {
    render(<Stage motion />);
    decode = () => Promise.reject(new Error("broken"));
    await see("b");
    expect(document.querySelector("[data-portal-photo]")?.getAttribute("src")).toContain(encodeURIComponent("/work/a/still.png"));
  });

  it("reports zoom_play once per picture: on arrival when motion is off, with the trigger", async () => {
    render(<Stage motion={false} />);
    act(() => arrive!([{ isIntersecting: true }]));
    act(() => arrive!([{ isIntersecting: true }]));
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("zoom_play", { slug: "a", trigger: "scroll" });
    await see("b");
    expect(track).toHaveBeenLastCalledWith("zoom_play", { slug: "b", trigger: "tap" });
    expect(track).toHaveBeenCalledTimes(2);
  });

  it("reports zoom_play when the opening is half open while motion runs", async () => {
    // Frames run later, as in a browser.
    const frames: (() => void)[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: () => void) => frames.push(callback));
    const scroll = () =>
      act(() => {
        window.dispatchEvent(new Event("scroll"));
        frames.splice(0).forEach((frame) => frame());
      });
    render(<Stage motion />);
    const root = document.querySelector<HTMLElement>(".brand-portal")!;
    root.style.setProperty("--portal-settle", "0.8");
    scroll();
    expect(track).not.toHaveBeenCalled();
    root.style.setProperty("--portal-settle", "0.4");
    scroll();
    expect(track).toHaveBeenCalledWith("zoom_play", { slug: "a", trigger: "scroll" });
  });
});
