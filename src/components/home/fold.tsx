import Image from "next/image";
import { chips, headline, labels, whatsappPrefill } from "@/content/home";
import { locales, profile, type Locale } from "@/content/portfolio";
import { answerLabelsFor, matcherFor, unknownAnswerFor } from "@/lib/home-answers";
import type { HomeCard } from "@/lib/home-cards";
import { BrandMonogram } from "../brand-monogram";
import { TrackedAnchor } from "../tracked-link";
import { AskBox } from "./ask-box";
import { IslandBoundary } from "./island-boundary";

const direction = (locale: Locale) => (locale === "en" ? "ltr" : "rtl");

/**
 * The first screen: a folded sheet on the card table. The main leaf holds the headline in the page's
 * language, the two buttons and the question box; the other leaf holds the headline in the other two.
 * In normal page flow, never pinned, so it may run taller than a phone's screen.
 */
export function Fold({ locale, cards }: { locale: Locale; cards: HomeCard[] }) {
  const resume = profile.contactLinks.find((link) => link.kind === "resume")!;
  const whatsapp = profile.contactLinks.find((link) => link.kind === "whatsapp")!;
  const whatsappHref = `${whatsapp.href.split("?")[0]}?text=${encodeURIComponent(whatsappPrefill[locale])}`;
  const bySlug = new Map(cards.map((card) => [card.slug, card]));

  return (
    <section className="fold" aria-labelledby="fold-title">
      <ul className="felt" aria-hidden="true">
        {cards.slice(0, 8).map((card, index) => (
          <li key={card.slug} style={{ "--n": index } as React.CSSProperties}>
            <Image src={card.phone.src} alt="" width={card.phone.width} height={card.phone.height} sizes="150px" />
          </li>
        ))}
      </ul>
      <div className="fold-sheet">
        <div className="leaf leaf-main">
          <p className="fold-name">
            <span>{profile.name}</span> <span>{profile.role[locale]}</span>
          </p>
          <h1 id="fold-title">{headline[locale]}</h1>
          <div className="fold-actions">
            <TrackedAnchor
              href={resume.href}
              className="home-button home-button-ink"
              eventName="resume_download"
              eventData={{ placement: "first-screen", locale }}
            >
              {labels.openResume[locale]}
            </TrackedAnchor>
            <TrackedAnchor
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="home-button home-button-line-ink"
              eventName="whatsapp_click"
              eventData={{ placement: "first-screen", locale }}
            >
              WhatsApp
            </TrackedAnchor>
          </div>
          <div className="ask" data-ask="">
            <p className="ask-label" id="ask-label">
              {labels.ask[locale]}
            </p>
            <div className="ask-chips" data-ask-chips="" role="group" aria-labelledby="ask-label">
              {chips.map((chip) => {
                if ("intent" in chip) {
                  return (
                    <a key={chip.id} href={`#q-${chip.intent}`} className="chip" data-ask-chip={chip.intent}>
                      {chip.label[locale]}
                    </a>
                  );
                }
                const card = bySlug.get(chip.slug)!;
                return (
                  <a key={chip.id} href={card.casePath ?? `#${card.slug}`} className="chip" data-sheet={chip.slug}>
                    {chip.label[locale]}
                  </a>
                );
              })}
            </div>
            <form className="ask-write" data-ask-form="" hidden>
              <label className="sr-only" htmlFor="ask-input">
                {labels.ask[locale]}
              </label>
              <input id="ask-input" type="text" maxLength={280} dir="auto" autoComplete="off" placeholder={labels.ask[locale]} />
              <button type="submit" className="chip chip-acid">
                {labels.send[locale]}
              </button>
            </form>
            <IslandBoundary island="ask">
              <AskBox
                matcher={matcherFor()}
                locale={locale}
                labels={{ seeIt: labels.seeIt[locale], askAnother: labels.askAnother[locale] }}
                answerLabels={answerLabelsFor(locale)}
                unknown={unknownAnswerFor(locale)}
              />
            </IslandBoundary>
          </div>
        </div>
        <div className="fold-spine" aria-hidden="true">
          <BrandMonogram />
        </div>
        <div className="leaf leaf-other">
          {locales
            .filter((other) => other !== locale)
            .map((other) => (
              <p key={other} lang={other} dir={direction(other)} className={`leaf-headline leaf-headline-${other}`}>
                {headline[other]}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}
