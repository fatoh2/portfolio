"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A live page layered over a deck or case-study still, the way DeckVideo layers a loop. The frame is
 * laid out at the size the still was captured at and scaled to fit, so the page shows the layout it
 * was designed for at any panel width. It loads only when it comes near the viewport and fades in
 * once the page says it is ready; until then, or if it never does, the still underneath stays.
 */
export const EMBED_READY_MESSAGE = "solitaire:hero-ready";

export function LiveEmbed({ src, title, label, width, height }: { src: string; title: string; label?: string; width: number; height: number }) {
  const host = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!element || !near) return;
    const fit = () => {
      const box = element.clientWidth;
      if (box > 0 && frame.current) frame.current.style.transform = `scale(${box / width})`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    fit();
    return () => observer.disconnect();
  }, [near, width]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source === frame.current?.contentWindow && event.data?.type === EMBED_READY_MESSAGE) setReady(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <span ref={host} className="live-embed" data-ready={ready ? "" : undefined}>
      {near ? (
        <iframe
          ref={frame}
          src={src}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          tabIndex={ready ? 0 : -1}
          aria-hidden={ready ? undefined : true}
        />
      ) : null}
      <span className="live-embed-label" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
