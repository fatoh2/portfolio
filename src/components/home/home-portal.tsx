import { labels } from "@/content/home";
import type { Locale } from "@/content/portfolio";
import { statusLabels } from "@/content/ui";
import type { HomeCard } from "@/lib/home-cards";
import { monogramCounter, monogramPath } from "@/lib/monogram";
import { BrandMonogram } from "../brand-monogram";
import { PortalMotion } from "../portal-motion";
import { PortalScene } from "../portal-scene";
import { IslandBoundary } from "./island-boundary";
import { PortalPicture, type PortalShot } from "./portal-picture";

/**
 * The zoom through the ف: the markup PortalMotion drives (its eight `data-portal-*` hooks), opening onto
 * the old page's scene of devices. Its laptop screen is PortalPicture, which "See it" swaps; PortalMotion is unchanged.
 */
export function HomePortal({ locale, cards }: { locale: Locale; cards: HomeCard[] }) {
  const shots: PortalShot[] = cards.map((card) => {
    const picture = card.still ?? card.phone;
    return {
      slug: card.slug,
      title: card.title,
      caption: `${card.category[locale]} · ${statusLabels[card.status][locale]}`,
      src: picture.src,
      width: picture.width,
      height: picture.height,
      alt: card.phone.alt[locale],
      casePath: card.casePath,
    };
  });
  const first = shots[0];

  return (
    <IslandBoundary island="portal">
      <PortalMotion>
        <div className="portal-stage" id="portal" data-portal-stage="">
          <section className="portal-opening" aria-label={first.title}>
            <div className="portal-copy" data-portal-copy="">
              <p className="portal-title" data-portal-title="">
                {first.title}
              </p>
              <div className="portal-actions" data-portal-actions="">
                <a href={first.casePath ?? "#work"} className="home-button home-button-line" data-portal-case="">
                  {labels.sheet.readCase[locale]}
                </a>
              </div>
            </div>
            <div className="portal-poster" data-portal-poster="">
              <BrandMonogram />
            </div>
          </section>
          <div className="portal-scene">
            <div className="portal-photo-frame">
              <PortalScene
                laptop={
                  <IslandBoundary island="portal-picture">
                    <PortalPicture shots={shots} />
                  </IslandBoundary>
                }
              />
            </div>
            <p className="portal-caption portal-banner-caption" data-portal-caption="">
              <span data-portal-caption-text="">{first.caption}</span>
            </p>
          </div>
          <svg className="portal-veil" aria-hidden="true" focusable="false" width="100%" height="100%">
            <defs>
              <mask
                id={`home-portal-counter-${locale}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100%"
                height="100%"
                style={{ maskType: "luminance" }}
              >
                <rect width="100%" height="100%" fill="white" />
                <path d={monogramCounter} fill="black" data-portal-mask="" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#0b0b0b" mask={`url(#home-portal-counter-${locale})`} />
            <g fill="#c8ff34" data-portal-mark="">
              <path fillRule="evenodd" d={monogramPath} />
              <circle cx="739" cy="246" r="33" />
            </g>
          </svg>
        </div>
      </PortalMotion>
    </IslandBoundary>
  );
}
