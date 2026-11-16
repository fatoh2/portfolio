"use client";

import { track } from "@vercel/analytics";
import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";

export type PortalShot = {
  slug: string;
  title: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** The case page; null for the one card without one. */
  casePath: string | null;
};

const imageProps = (shot: PortalShot) =>
  getImageProps({ src: shot.src, width: shot.width, height: shot.height, alt: shot.alt, sizes: "100vw" }).props;

/**
 * The picture seen through the ف's opening. "See it" sends `home:see` with a slug; the new picture is
 * decoded before it replaces the old one on the same element, which PortalMotion holds a reference to.
 */
export function PortalPicture({ shots }: { shots: PortalShot[] }) {
  const photo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = photo.current!;
    const root = image.closest<HTMLElement>(".brand-portal");
    const stage = image.closest<HTMLElement>("[data-portal-stage]");
    if (!root || !stage) return;
    let played = false;
    let trigger: "tap" | "scroll" = "scroll";
    let slug = shots[0].slug;
    let frame = 0;

    function play() {
      if (played) return;
      played = true;
      track("zoom_play", { slug, trigger });
    }

    // Motion on: the opening is half open. Motion off: the stage is on screen.
    function check() {
      frame = 0;
      const settle = parseFloat(root!.style.getPropertyValue("--portal-settle"));
      if (root!.dataset.motion === "ready" && settle <= 0.5) play();
    }
    const onScroll = () => {
      if (!frame && !played) frame = window.requestAnimationFrame(check);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && root.dataset.motion !== "ready") play();
      },
      { threshold: 0.5 },
    );
    observer.observe(stage);

    async function see(event: Event) {
      const shot = shots.find((candidate) => candidate.slug === (event as CustomEvent<{ slug: string }>).detail?.slug);
      if (!shot) return;
      const next = imageProps(shot);
      const loader = new Image();
      if (next.srcSet) loader.srcset = next.srcSet;
      if (next.sizes) loader.sizes = next.sizes;
      loader.src = next.src;
      try {
        await loader.decode();
      } catch {
        return;
      }
      if (next.srcSet) image.srcset = next.srcSet;
      if (next.sizes) image.sizes = next.sizes;
      image.src = next.src;
      image.alt = shot.alt;
      const title = stage!.querySelector("[data-portal-title]");
      const caption = stage!.querySelector("[data-portal-caption-text]");
      const link = stage!.querySelector<HTMLAnchorElement>("[data-portal-case]");
      if (title) title.textContent = shot.title;
      if (caption) caption.textContent = shot.caption;
      if (link) {
        link.hidden = !shot.casePath;
        if (shot.casePath) link.href = shot.casePath;
      }
      slug = shot.slug;
      trigger = "tap";
      played = false;
      if (root!.dataset.motion !== "ready") play();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("home:see", see);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("home:see", see);
    };
  }, [shots]);

  const first = imageProps(shots[0]);
  return (
    // The element is swapped in place, so it is a plain img fed by next/image's own props.
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={photo} {...first} alt={shots[0].alt} className="portal-photo" data-portal-photo="" loading="eager" fetchPriority="high" />
  );
}
