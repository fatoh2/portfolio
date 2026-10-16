"use client";

import { useEffect, useRef } from "react";

/**
 * Silent loop layered over a deck still. It fades in only once it is playing,
 * pauses while its panel is hidden or off screen, and is never loaded under
 * reduced motion; the still underneath stays the fallback.
 */
export function DeckVideo({ mp4, webm }: { mp4: string; webm: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    video.muted = true;

    function sync() {
      if (visible && !reduced.matches && video!.getAttribute("src")) {
        video!.play().catch(() => {});
      } else {
        video!.pause();
      }
    }
    function load() {
      video!.removeAttribute("data-playing");
      if (reduced.matches) {
        video!.removeAttribute("src");
        video!.load();
        return;
      }
      const next = video!.canPlayType('video/webm; codecs="vp9"') === "probably" ? webm : mp4;
      if (video!.getAttribute("src") !== next) {
        video!.setAttribute("src", next);
        video!.load();
      }
      sync();
    }
    function playing() {
      video!.setAttribute("data-playing", "");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    video.addEventListener("playing", playing);
    reduced.addEventListener("change", load);
    load();

    return () => {
      observer.disconnect();
      video.removeEventListener("playing", playing);
      reduced.removeEventListener("change", load);
      video.pause();
    };
  }, [mp4, webm]);

  return (
    <video
      ref={ref}
      className="deck-video"
      muted
      playsInline
      loop
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
