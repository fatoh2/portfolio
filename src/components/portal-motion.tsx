"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

/** Progressive enhancement: the server HTML is a complete, unpinned page. */
export function PortalMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>("[data-portal-stage]")!;
    const poster = root.querySelector<HTMLElement>("[data-portal-poster]")!;
    const mask = root.querySelector<SVGPathElement>("[data-portal-mask]")!;
    const mark = root.querySelector<SVGGElement>("[data-portal-mark]")!;
    const copy = root.querySelector<HTMLElement>("[data-portal-copy]")!;
    const actions = root.querySelector<HTMLElement>("[data-portal-actions]")!;
    const photo = root.querySelector<HTMLImageElement>("[data-portal-photo]")!;
    const caption = root.querySelector<HTMLElement>("[data-portal-caption]")!;
    const header = document.querySelector<HTMLElement>(".site-header");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let enabled = false;
    let travel = 1;
    let headerHeight = 0;
    let width = 0;
    let height = 0;
    let initialScale = 1;
    let targetScale = 1;
    let centerX = 0;
    let centerY = 0;
    let lastProgress = -1;

    function reset() {
      enabled = false;
      root!.removeAttribute("data-motion");
      root!.style.removeProperty("--portal-header");
      copy.style.removeProperty("opacity");
      copy.style.removeProperty("transform");
      copy.style.removeProperty("pointer-events");
      photo.style.removeProperty("transform");
      caption.style.removeProperty("opacity");
    }

    function draw() {
      if (!enabled || disposed || document.hidden) return;
      const p = clamp(
        (headerHeight - root!.getBoundingClientRect().top) / travel,
      );
      if (p === lastProgress) return;
      lastProgress = p;
      // Exponential scaling keeps the aperture's growth perceptually even.
      // The final scale places the viewport within the counter's safe interior.
      const zoom = ease(p / 0.92);
      const scale = initialScale * Math.pow(targetScale / initialScale, zoom);
      const alignment = ease(p / 0.78);
      const cx = centerX + (width / 2 - centerX) * alignment;
      const cy = centerY + (height / 2 - centerY) * alignment;
      const matrix = `matrix(${scale} 0 0 ${scale} ${cx - 733 * scale} ${cy - 396 * scale})`;
      mask.setAttribute("transform", matrix);
      mark.setAttribute("transform", matrix);
      copy.style.opacity = String(1 - ease(p / 0.22));
      copy.style.transform = `translate3d(0,${-24 * ease(p / 0.3)}px,0)`;
      copy.style.pointerEvents = p > 0.22 ? "none" : "auto";
      photo.style.transform = `scale(${1.16 - 0.16 * ease(p)})`;
      caption.style.opacity = String(ease((p - 0.76) / 0.2));
    }

    function schedule() {
      if (!frame && enabled && !document.hidden)
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          draw();
        });
    }

    function measure() {
      if (disposed) return;
      if (reduced.matches || !photo.complete || !photo.naturalWidth) {
        reset();
        return;
      }
      headerHeight = header?.offsetHeight ?? 72;
      // Landscape phones and zoomed windows need ordinary flow so the opening
      // controls can be reached even when the complete stage cannot fit.
      if (window.innerHeight - headerHeight < 480) {
        reset();
        return;
      }
      // svh avoids jumps when mobile browser chrome opens and closes.
      root!.setAttribute("data-motion", "ready");
      root!.style.setProperty("--portal-header", `${headerHeight}px`);
      const box = stage.getBoundingClientRect();
      const logo = poster.getBoundingClientRect();
      width = box.width;
      height = box.height;
      initialScale = logo.width / 750;
      targetScale = Math.max(width / 44, height / 32) * 1.12;
      centerX = logo.left - box.left + (733 - 120) * initialScale;
      centerY = logo.top - box.top + (396 - 190) * initialScale;
      travel = Math.max(1, root!.offsetHeight - stage.offsetHeight);
      enabled = true;
      lastProgress = -1;
      draw();
    }

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    function resize() {
      // On phones, URL-bar-only changes must not rebase the scroll timeline.
      if (window.innerWidth === lastWidth && window.innerWidth < 760) return;
      if (
        window.innerWidth !== lastWidth ||
        window.innerHeight !== lastHeight
      ) {
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        measure();
      }
    }
    function focusOpening() {
      if (enabled && actions.contains(document.activeElement)) {
        window.scrollTo({
          top:
            root!.getBoundingClientRect().top + window.scrollY - headerHeight,
          behavior: "instant",
        });
        draw();
      }
    }
    function focusProject() {
      if (enabled && caption.contains(document.activeElement)) {
        window.scrollTo({
          top:
            root!.getBoundingClientRect().top +
            window.scrollY -
            headerHeight +
            travel,
          behavior: "instant",
        });
        draw();
      }
    }

    measure();
    photo.addEventListener("load", measure);
    photo.addEventListener("error", reset);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pageshow", measure);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", measure);
    actions.addEventListener("focusin", focusOpening);
    caption.addEventListener("focusin", focusProject);
    const observer = new ResizeObserver(measure);
    observer.observe(poster);
    if (header) observer.observe(header);
    document.fonts.ready.then(() => {
      if (!disposed) measure();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      photo.removeEventListener("load", measure);
      photo.removeEventListener("error", reset);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", measure);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", measure);
      actions.removeEventListener("focusin", focusOpening);
      caption.removeEventListener("focusin", focusProject);
      reset();
    };
  }, []);

  return (
    <div ref={rootRef} className="brand-portal">
      {children}
    </div>
  );
}
