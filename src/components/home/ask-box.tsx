"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Locale } from "@/content/portfolio";
import { detectLanguage } from "@/lib/agent-demo";
import type { Answer, AnswerLabels } from "@/lib/home-answers";
import { matchIntent, unknownWhatsappHref, type Matcher } from "@/lib/home-ask";
import { AnswerView } from "./answer-view";

type Shown =
  | { kind: "known"; html: string; see: string | null }
  | { kind: "unknown"; text: string; askedIn: Locale };

export type AskBoxLabels = { seeIt: string; askAnother: string };

/**
 * Adds behaviour to the question box the server rendered in the fold (`[data-ask]`). It renders only the
 * answer area: a known answer is a copy of the server-rendered one in the thread, so no answer text ships
 * as script; only the unknown answer is built here, because its WhatsApp link carries the visitor's words.
 */
export function AskBox({
  matcher,
  locale,
  labels,
  answerLabels,
  unknown,
}: {
  matcher: Matcher;
  locale: Locale;
  labels: AskBoxLabels;
  answerLabels: AnswerLabels;
  unknown: Answer;
}) {
  const area = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Shown | null>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    const box = area.current?.closest<HTMLElement>("[data-ask]");
    if (!box) return;
    const form = box.querySelector<HTMLFormElement>("[data-ask-form]")!;
    const input = form.querySelector("input")!;
    const chips = [...box.querySelectorAll<HTMLAnchorElement>("[data-ask-chip]")];

    function show(intent: string, source: "chip" | "typed", text = "") {
      const askedIn = source === "typed" ? detectLanguage(text) : locale;
      const original = intent === "unknown" ? null : document.getElementById(`q-${intent}`);
      track("ask", { intent: original ? intent : "unknown", source });
      if (!original) {
        setShown({ kind: "unknown", text, askedIn });
        return;
      }
      const copy = original.cloneNode(true) as HTMLElement;
      copy.removeAttribute("aria-labelledby");
      for (const element of [copy, ...copy.querySelectorAll("[id]")]) element.removeAttribute("id");
      const language = copy.querySelector("[data-field='language']");
      if (language) language.textContent = answerLabels.languages[askedIn];
      setShown({ kind: "known", html: copy.outerHTML, see: copy.querySelector("[data-sheet]")?.getAttribute("data-sheet") ?? null });
    }

    function onChip(event: Event) {
      const chip = event.currentTarget as HTMLAnchorElement;
      if (event instanceof KeyboardEvent) {
        if (event.key !== " ") return;
      } else if (event instanceof globalThis.MouseEvent && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
        return;
      }
      event.preventDefault();
      show(chip.dataset.askChip!, "chip");
    }

    function onSubmit(event: SubmitEvent) {
      event.preventDefault();
      const text = input.value;
      const intent = matchIntent(text, matcher);
      if (!intent) return;
      show(intent, "typed", text);
    }

    for (const chip of chips) {
      chip.setAttribute("role", "button");
      chip.addEventListener("click", onChip);
      chip.addEventListener("keydown", onChip);
    }
    form.hidden = false;
    form.addEventListener("submit", onSubmit);
    return () => {
      for (const chip of chips) {
        chip.removeAttribute("role");
        chip.removeEventListener("click", onChip);
        chip.removeEventListener("keydown", onChip);
      }
      form.hidden = true;
      form.removeEventListener("submit", onSubmit);
    };
  }, [matcher, locale, answerLabels]);

  // The answer takes the chips' place, so the first screen does not grow; focus follows it.
  useEffect(() => {
    const box = area.current?.closest<HTMLElement>("[data-ask]");
    if (!box) return;
    for (const part of box.querySelectorAll<HTMLElement>("[data-ask-chips], [data-ask-form]")) part.hidden = Boolean(shown);
    if (shown) area.current!.querySelector<HTMLElement>("[data-answer-heading]")?.focus();
    else if (restoreFocus.current) box.querySelector<HTMLElement>("[data-ask-chip], [data-sheet]")?.focus();
    restoreFocus.current = false;
  }, [shown]);

  // The copy is plain HTML, so its WhatsApp link reports its own click here.
  function trackCopy(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest("[data-track]")) track("whatsapp_click", { placement: "answer" });
  }

  const see = shown?.kind === "known" ? shown.see : null;

  return (
    <div ref={area} className="ask-answer" hidden={!shown}>
      {shown?.kind === "known" ? <div onClick={trackCopy} dangerouslySetInnerHTML={{ __html: shown.html }} /> : null}
      {shown?.kind === "unknown" ? (
        <AnswerView
          answer={{ ...unknown, whatsappHref: unknownWhatsappHref(shown.text, matcher.whatsappBase) }}
          labels={answerLabels}
          askedIn={shown.askedIn}
        />
      ) : null}
      <div className="ask-answer-actions">
        {see ? (
          <a
            href="#portal"
            className="chip chip-acid"
            onClick={() => document.dispatchEvent(new CustomEvent("home:see", { detail: { slug: see } }))}
          >
            {labels.seeIt}
          </a>
        ) : null}
        <button
          type="button"
          className="chip"
          onClick={() => {
            restoreFocus.current = true;
            setShown(null);
          }}
        >
          {labels.askAnother}
        </button>
      </div>
    </div>
  );
}
