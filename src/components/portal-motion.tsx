"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

/**
 * Progressive enhancement: the server HTML is a complete, unpinned page.
 * Two acts while the stage is pinned: the counter opens onto the scene
 * (`--portal-open` viewports of scroll), then the scene travels up and the
 * caption arrives (`--portal-pan` viewports). Elements carrying
 * `data-portal-depth` move at their own rate in both acts, nearer ones more.
 */
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
    const media = root.querySelector<HTMLElement>("[data-portal-media]") ?? photo;
    const layers = [...root.querySelectorAll<HTMLElement>("[data-portal-depth]")].map((element) => ({
      element,
      depth: parseFloat(element.dataset.portalDepth ?? "1") || 0,
    }));
    const header = document.querySelector<HTMLElement>(".site-header");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let enabled = false;
    let travel = 1;
    let openTravel = 1;
    let panTravel = 0;
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
      media.style.removeProperty("transform");
      for (const layer of layers) layer.element.style.removeProperty("transform");
      caption.style.removeProperty("opacity");
    }

    function draw() {
      if (!enabled || disposed || document.hidden) return;
      const scrolled = headerHeight - root!.getBoundingClientRect().top;
      const p = clamp(scrolled / openTravel);
      // Once the reveal finishes, the scene moves with continued scrolling.
      const q = panTravel > 0 ? clamp((scrolled - openTravel) / panTravel) : 1;
      if (p + q === lastProgress) return;
      lastProgress = p + q;
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
      const settle = 1 - ease(p);
      const frameHeight = media.parentElement?.clientHeight ?? height;
      const panProgress = panTravel > 0 ? 1 - (1 - q) ** 2 : 0;
      if (layers.length) {
        // The whole scene settles from a slight zoom; each layer also drifts by its depth,
        // so nearer screens arrive later and leave faster than the backdrop.
        media.style.transform = `scale(${1 + 0.06 * settle})`;
        for (const { element, depth } of layers) {
          const arrive = 40 * depth * settle;
          // A portrait frame already holds the scene high, so it leaves less far.
          const portrait = Math.min(1, (media.parentElement?.clientWidth ?? width) / frameHeight);
          const leave = frameHeight * portrait * (0.3 + 0.12 * depth) * panProgress;
          element.style.transform = `translate3d(0,${arrive - leave}px,0)`;
        }
      } else {
        const mediaScale = 1.16 - 0.16 * ease(p);
        media.style.transform = `translate3d(0,${-frameHeight * 0.6 * panProgress}px,0) scale(${mediaScale})`;
      }
      caption.style.opacity = String(panTravel > 0 ? ease(q / 0.25) : ease((p - 0.76) / 0.2));
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
      // Resolve a directly opened section again after the static hero becomes
      // pinned and changes height when its image finishes loading.
      const anchor = !enabled && window.location.hash
        ? document.getElementById(window.location.hash.slice(1))
        : null;
      const anchorTop = anchor && !root!.contains(anchor)
        ? anchor.getBoundingClientRect().top
        : null;
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
      // The stylesheet states how many viewports the opening takes; anything
      // beyond that is the second act.
      const open =
        parseFloat(getComputedStyle(root!).getPropertyValue("--portal-open")) ||
        1.08;
      openTravel = Math.min(travel, Math.max(1, Math.round(stage.offsetHeight * open)));
      panTravel = travel - openTravel > 2 ? travel - openTravel : 0;
      if (!panTravel) openTravel = travel;
      if (anchor && anchorTop !== null && anchorTop >= 0 && anchorTop < window.innerHeight) {
        anchor.scrollIntoView({ block: "start", behavior: "instant" });
      }
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
    <div ref={rootRef} className="brand-portal" data-portal-banner="">
      {children}
    </div>
  );
}
