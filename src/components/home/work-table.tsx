"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import type { Locale, ProjectStatus } from "@/content/portfolio";
import type { HomeCard } from "@/lib/home-cards";
import type { AgentDemoCopy } from "../agent-demo";
import { ProjectSheet, type SheetLabels } from "./project-sheet";

type Call = "all" | "live" | "install";
export type CallLabels = Record<Call | "again", string>;

const STEP = 50;
const DEAL_MS = 380;
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const matches = (card: HTMLElement, call: Call) =>
  call === "all" ||
  (call === "live" && card.dataset.status === "live-product") ||
  (call === "install" && card.dataset.hasDownload === "true");

/** Deals the cards in order, about 50 ms apart; transform and opacity only, so links keep working. */
function deal(cards: HTMLElement[]) {
  cards.forEach((card, index) => {
    card.animate?.(
      [
        { opacity: 0, transform: "translate3d(0, -32px, 0) rotate(8deg) scale(0.94)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: DEAL_MS, delay: index * STEP, easing: EASE_OUT, fill: "backwards" },
    );
  });
}

const cardsIn = (work: HTMLElement | null | undefined) => [...(work?.querySelectorAll<HTMLElement>("[data-slug]") ?? [])];

function from(target: Element): "chip" | "answer" | "card" {
  if (target.closest(".answer")) return "answer";
  if (target.closest("[data-ask]")) return "chip";
  return "card";
}

/**
 * Adds the deal, the calls and the sheet to the cards the server rendered in `#work`. It renders the
 * calls and the dialog only, and finds the cards through `[data-slug]`.
 */
export function WorkTable({
  cards,
  locale,
  callLabels,
  sheetLabels,
  agentDemoCopy,
  statusLabels,
}: {
  cards: HomeCard[];
  locale: Locale;
  callLabels: CallLabels;
  sheetLabels: SheetLabels;
  agentDemoCopy: Record<Locale, AgentDemoCopy>;
  statusLabels: Record<ProjectStatus, Record<Locale, string>>;
}) {
  const calls = useRef<HTMLDivElement>(null);
  const [call, setCall] = useState<Call>("all");
  const [slug, setSlug] = useState<string | null>(null);

  // The first deal: once, when the table's top first rises 30% into the screen.
  useEffect(() => {
    const work = calls.current?.closest<HTMLElement>("#work");
    if (!work) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = work.getBoundingClientRect();
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (reduced || onScreen || window.location.hash === "#work") return;
    work.setAttribute("data-deal", "down");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        work.removeAttribute("data-deal");
        deal(cardsIn(work));
      },
      // Not a 30% threshold: on a phone the table is several screens tall and would never reach it.
      { rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(work);
    return () => {
      observer.disconnect();
      work.removeAttribute("data-deal");
    };
  }, []);

  // The sheet follows history: a click pushes an entry, Back and Forward open or close to match it.
  useEffect(() => {
    const sync = () => {
      const wanted = window.history.state?.sheet;
      setSlug(typeof wanted === "string" && cards.some((card) => card.slug === wanted) ? wanted : null);
    };
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const trigger = (event.target as Element | null)?.closest<HTMLElement>("[data-sheet]");
      const card = trigger && cards.find((candidate) => candidate.slug === trigger.dataset.sheet);
      if (!card) return;
      event.preventDefault();
      try {
        window.history.pushState({ sheet: card.slug }, "", card.casePath ?? `#${card.slug}`);
      } catch {
        window.location.assign(trigger.getAttribute("href") ?? card.casePath ?? `#${card.slug}`);
        return;
      }
      setSlug(card.slug);
      track("sheet_open", { slug: card.slug, from: from(trigger) });
    }
    window.addEventListener("popstate", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", onClick);
    };
  }, [cards]);

  function choose(next: Call | "again") {
    const chosen = next === "again" ? call : next;
    setCall(chosen);
    const shown: HTMLElement[] = [];
    for (const card of cardsIn(calls.current?.closest<HTMLElement>("#work"))) {
      const match = matches(card, chosen);
      card.hidden = !match;
      if (match) shown.push(card);
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) deal(shown);
    track("deal", { call: next });
  }

  return (
    <>
      <div ref={calls} className="work-calls" role="group">
        {(["all", "live", "install"] as const).map((option) => (
          <button key={option} type="button" className="chip" aria-pressed={call === option} onClick={() => choose(option)}>
            {callLabels[option]}
          </button>
        ))}
        <button type="button" className="chip chip-acid" onClick={() => choose("again")}>
          {callLabels.again}
        </button>
      </div>
      <ProjectSheet
        card={cards.find((card) => card.slug === slug) ?? null}
        locale={locale}
        labels={sheetLabels}
        agentDemoCopy={agentDemoCopy}
        statusLabels={statusLabels}
      />
    </>
  );
}
