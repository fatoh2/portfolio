import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { labels } from "@/content/home";
import { locales, profile, t, type Locale } from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { buildCards } from "@/lib/home-cards";
import { BrandMonogram } from "../brand-monogram";
import { ContactForm } from "../contact-form";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { TrackedAnchor } from "../tracked-link";
import { Fold } from "./fold";
import { HomeCard } from "./home-card";
import { HomePortal } from "./home-portal";
import { IslandBoundary } from "./island-boundary";
import { Thread } from "./thread";
import { WorkTable } from "./work-table";
import "./home-sheet.css";

/** The rebuilt homepage (design/homepage/DESIGN-2026-11.md): every card, answer and section is server HTML. */
export function HomeSheetPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home;
  const cards = buildCards(locale);
  const pick = <K extends string>(record: Record<K, Record<Locale, string>>) =>
    Object.fromEntries(Object.entries(record).map(([key, value]) => [key, (value as Record<Locale, string>)[locale]])) as Record<K, string>;

  return (
    <div id="top" className="site-shell sheet-home">
      <SiteHeader locale={locale} />
      <main>
        <Fold locale={locale} cards={cards} />
        <HomePortal locale={locale} cards={cards} />

        <section id="work" className="work" aria-labelledby="work-title">
          <h2 id="work-title">{labels.work[locale]}</h2>
          <IslandBoundary island="work">
            <WorkTable
              cards={cards}
              locale={locale}
              callLabels={pick(labels.calls)}
              sheetLabels={labels.sheet}
              agentDemoCopy={Object.fromEntries(locales.map((l) => [l, getDictionary(l).home.agentDemo])) as Record<Locale, typeof copy.agentDemo>}
              statusLabels={statusLabels}
            />
          </IslandBoundary>
          <div className="work-cards">
            {cards.map((card, index) => (
              <HomeCard key={card.slug} card={card} index={index} locale={locale} />
            ))}
          </div>
        </section>

        <Thread locale={locale} />

        <section id="contact" className="home-contact" aria-labelledby="contact-title">
          <div className="home-contact-copy">
            <div className="home-signature-mark">
              <BrandMonogram />
            </div>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactSummary}</p>
            <div className="home-direct-contact">
              {profile.contactLinks
                .filter((link) => link.kind === "email" || link.kind === "whatsapp")
                .map((link) => {
                  const Icon = link.kind === "email" ? Mail : MessageCircle;
                  return (
                    <TrackedAnchor
                      key={link.kind}
                      href={link.href}
                      eventName={`${link.kind}_click`}
                      eventData={{ placement: "contact", locale }}
                      target={link.kind === "whatsapp" ? "_blank" : undefined}
                      rel={link.kind === "whatsapp" ? "noreferrer" : undefined}
                    >
                      <Icon aria-hidden="true" size={17} />
                      {t(link.label, locale)}
                      <ArrowUpRight aria-hidden="true" size={15} />
                    </TrackedAnchor>
                  );
                })}
            </div>
          </div>
          <div className="home-contact-form">
            <ContactForm locale={locale} />
            <p className="privacy-note">{dictionary.contact.privacy}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
