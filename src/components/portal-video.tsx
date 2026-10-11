"use client";

import { useEffect, useRef } from "react";

/**
 * Silent loop layered over the poster image. The poster stays the motion
 * gate; the video only fades in once it is actually playing, pauses while
 * off screen, and is never loaded under reduced motion.
 */
export function PortalVideo({
  desktopMp4,
  desktopWebm,
  mobileMp4,
  mobileWebm,
}: {
  desktopMp4: string;
  desktopWebm: string;
  mobileMp4: string;
  mobileWebm: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 759px)");
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
      const webm = phone.matches ? mobileWebm : desktopWebm;
      const mp4 = phone.matches ? mobileMp4 : desktopMp4;
      const next =
        video!.canPlayType('video/webm; codecs="vp9"') === "probably" ? webm : mp4;
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
      { threshold: 0.05 },
    );
    observer.observe(video);
    video.addEventListener("playing", playing);
    phone.addEventListener("change", load);
    reduced.addEventListener("change", load);
    load();

    return () => {
      observer.disconnect();
      video.removeEventListener("playing", playing);
      phone.removeEventListener("change", load);
      reduced.removeEventListener("change", load);
      video.pause();
    };
  }, [desktopMp4, desktopWebm, mobileMp4, mobileWebm]);

  return (
    <video
      ref={ref}
      className="portal-video"
      muted
      playsInline
      loop
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
