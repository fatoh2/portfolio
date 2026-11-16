"use client";

import { track } from "@vercel/analytics";
import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale, type LocalizedText, type ProjectStatus } from "@/content/portfolio";
import type { HomeCard } from "@/lib/home-cards";
import { AgentDemo, type AgentDemoCopy } from "../agent-demo";
import { DeckVideo } from "../deck-video";
import { LiveEmbed } from "../live-embed";
import { TrackedAnchor } from "../tracked-link";

export type SheetLabels = {
  close: LocalizedText;
  languages: LocalizedText;
  playHand: LocalizedText;
  readCase: LocalizedText;
};

const languageNames: Record<Locale, string> = { en: "English", ar: "العربية", he: "עברית" };
const direction = (locale: Locale) => (locale === "en" ? "ltr" : "rtl");
const turnEase = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * The project sheet: one native dialog for every card. It opens and closes to match `card`; the work
 * table owns the history entry, so Escape, Android Back and the close button all go back one step.
 * The language buttons turn the sheet's text in place and never change the address.
 */
export function ProjectSheet({
  card,
  locale,
  labels,
  agentDemoCopy,
  statusLabels,
}: {
  card: HomeCard | null;
  locale: Locale;
  labels: SheetLabels;
  agentDemoCopy: Record<Locale, AgentDemoCopy>;
  statusLabels: Record<ProjectStatus, Record<Locale, string>>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState(locale);
  const [shownSlug, setShownSlug] = useState(card?.slug);

  // A different card opens in the page's language.
  if (card?.slug !== shownSlug) {
    setShownSlug(card?.slug);
    setLanguage(locale);
  }

  useEffect(() => {
    const element = dialog.current!;
    try {
      if (card && !element.open) element.showModal();
      if (!card && element.open) element.close();
    } catch {
      // A dialog that cannot open leaves the page as it was; the card's link still works.
    }
  }, [card]);

  useEffect(() => {
    const element = dialog.current!;
    const cancel = (event: Event) => {
      event.preventDefault();
      window.history.back();
    };
    element.addEventListener("cancel", cancel);
    return () => element.removeEventListener("cancel", cancel);
  }, []);

  async function turn(next: Locale) {
    if (!card || next === language) return;
    track("sheet_language", { slug: card.slug, language: next });
    const element = body.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduced || !element.animate) {
      setLanguage(next);
      return;
    }
    const sign = direction(language) === "rtl" ? -1 : 1;
    await element
      .animate([{ transform: "rotateY(0deg)" }, { transform: `rotateY(${90 * sign}deg)` }], { duration: 150, easing: "cubic-bezier(0.77, 0, 0.175, 1)" })
      .finished.catch(() => {});
    setLanguage(next);
    element.animate([{ transform: `rotateY(${-90 * sign}deg)` }, { transform: "rotateY(0deg)" }], { duration: 180, easing: turnEase });
  }

  const media = card?.still ?? null;

  return (
    <dialog ref={dialog} className="project-sheet" aria-labelledby={card ? "sheet-title" : undefined}>
      {card ? (
        <>
          <div className="sheet-bar">
            <div className="sheet-languages" role="group" aria-label={labels.languages[language]}>
              {locales.map((option) => (
                <button key={option} type="button" lang={option} aria-pressed={option === language} onClick={() => turn(option)}>
                  {languageNames[option]}
                </button>
              ))}
            </div>
            <button type="button" className="sheet-close" onClick={() => window.history.back()}>
              {labels.close[language]}
            </button>
          </div>
          <div className="sheet-turn">
            <div ref={body} className="sheet-body" lang={language} dir={direction(language)}>
              <div className="sheet-media">
                {media ? (
                  <span className="sheet-still live-embed-host">
                    <Image src={media.src} alt={card.phone.alt[language]} width={media.width} height={media.height} sizes="(min-width: 760px) 50vw, 100vw" />
                    {card.loops ? <DeckVideo mp4={`${card.loops.desktop}.mp4`} webm={`${card.loops.desktop}.webm`} /> : null}
                    {card.embeds.hero ? (
                      <LiveEmbed
                        src={card.embeds.hero.src}
                        title={card.embeds.hero.title[language]}
                        width={card.embeds.hero.width}
                        height={card.embeds.hero.height}
                      />
                    ) : null}
                  </span>
                ) : (
                  <span className="sheet-phone">
                    <Image src={card.phone.src} alt={card.phone.alt[language]} width={card.phone.width} height={card.phone.height} sizes="280px" />
                  </span>
                )}
              </div>
              <div className="sheet-copy">
                <p className="sheet-status" data-status={card.status}>
                  {statusLabels[card.status][language]}
                </p>
                <h2 id="sheet-title">
                  <bdi>{card.title}</bdi>
                </h2>
                <p className="sheet-category">{card.category[language]}</p>
                <p className="sheet-summary">{card.summary[language]}</p>
                {card.statusNote ? <p className="sheet-note">{card.statusNote[language]}</p> : null}
                <p className="sheet-links">
                  {card.live ? (
                    <TrackedAnchor
                      href={card.live.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip chip-acid"
                      eventName="live_product_open"
                      eventData={{ slug: card.slug, surface: "sheet" }}
                    >
                      {card.live.label[language]}
                    </TrackedAnchor>
                  ) : null}
                  {card.casePath ? (
                    <TrackedAnchor
                      href={card.casePath}
                      className="chip"
                      eventName="case_study_open"
                      eventData={{ slug: card.slug, placement: "sheet" }}
                    >
                      {labels.readCase[language]}
                    </TrackedAnchor>
                  ) : null}
                  {card.downloads.map((download) => (
                    <TrackedAnchor
                      key={download.href}
                      href={download.href}
                      download
                      className="chip"
                      eventName={card.casePath ? "apk_download" : "focusquest_apk_download"}
                      eventData={
                        card.casePath
                          ? { slug: card.slug, surface: "sheet" }
                          : { surface: "sheet", build: download.href.split("/").pop()! }
                      }
                    >
                      <Download aria-hidden="true" size={15} />
                      {download.label[language]}
                    </TrackedAnchor>
                  ))}
                </p>
                {card.note ? <p className="sheet-note">{card.note[language]}</p> : null}
              </div>
              {card.embeds.table ? (
                <div className="sheet-extra">
                  <h3>{labels.playHand[language]}</h3>
                  <span className="sheet-table live-embed-host">
                    <Image
                      src={card.embeds.table.still.src}
                      alt={card.embeds.table.title[language]}
                      width={card.embeds.table.still.width}
                      height={card.embeds.table.still.height}
                      sizes="320px"
                    />
                    <LiveEmbed
                      src={card.embeds.table.src}
                      title={card.embeds.table.title[language]}
                      width={card.embeds.table.width}
                      height={card.embeds.table.height}
                      onReady={() => track("play_view", { locale: language })}
                    />
                  </span>
                </div>
              ) : null}
              {card.slug === "whatsapp-ai-sales-agent" ? (
                <div className="sheet-extra">
                  <AgentDemo key={language} locale={language} copy={agentDemoCopy[language]} />
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
