import { Download } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/content/portfolio";
import { statusLabels } from "@/content/ui";
import { cardTilt, type HomeCard as Card } from "@/lib/home-cards";
import { TrackedAnchor } from "../tracked-link";

const tones = ["paper", "ink", "lime"] as const;

/**
 * One card on the table. The title link covers the card and opens the case page (Saqroon's website);
 * the download and live links sit above it as siblings, so every link stays clickable.
 */
export function HomeCard({ card, index, locale }: { card: Card; index: number; locale: Locale }) {
  const saqroon = card.casePath === null;
  return (
    <article
      className="home-card"
      id={saqroon ? card.slug : undefined}
      data-slug={card.slug}
      data-status={card.status}
      data-has-download={card.downloads.length > 0 ? "true" : "false"}
      style={{ "--tilt": `${cardTilt(index)}deg` } as React.CSSProperties}
    >
      <div className="home-card-face" data-tone={tones[index % 3]}>
        <span className="home-card-name" aria-hidden="true">
          {card.title}
        </span>
        <Image
          src={card.phone.src}
          alt={card.phone.alt[locale]}
          width={card.phone.width}
          height={card.phone.height}
          sizes="(min-width: 760px) 200px, 45vw"
        />
      </div>
      <p className="home-card-status" data-status={card.status}>
        {statusLabels[card.status][locale]}
      </p>
      <h3 className="home-card-title">
        <a
          href={card.casePath ?? card.live!.href}
          data-sheet={card.slug}
          {...(saqroon ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <bdi>{card.title}</bdi>
        </a>
      </h3>
      <p className="home-card-category">{card.category[locale]}</p>
      {card.phase ? (
        <p className="home-card-phase">
          <span lang="en" dir="ltr">
            {card.phase.text}
          </span>{" "}
          <time dateTime={card.phase.updated}>{card.phase.updated}</time>
        </p>
      ) : null}
      {card.live || card.downloads.length ? (
        <p className="home-card-links">
          {card.live ? (
            <TrackedAnchor
              href={card.live.href}
              target="_blank"
              rel="noopener noreferrer"
              eventName="live_product_open"
              eventData={{ slug: card.slug, surface: "card" }}
            >
              {card.live.label[locale]}
            </TrackedAnchor>
          ) : null}
          {card.downloads.map((download) => (
            <TrackedAnchor
              key={download.href}
              href={download.href}
              download
              eventName={saqroon ? "focusquest_apk_download" : "apk_download"}
              eventData={saqroon ? { surface: "card", build: download.href.split("/").pop()! } : { slug: card.slug, surface: "card" }}
            >
              <Download aria-hidden="true" size={15} />
              {download.label[locale]}
            </TrackedAnchor>
          ))}
        </p>
      ) : null}
    </article>
  );
}
