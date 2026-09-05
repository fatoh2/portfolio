import Image from "next/image";
import { localizedPath, projects, t, type Locale } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";
import { monogramCounter, monogramPath } from "@/lib/monogram";
import { BrandMonogram } from "./brand-monogram";
import { HomeProjectSummary } from "./home-project-summary";
import { PortalMotion } from "./portal-motion";
import { TrackedAnchor } from "./tracked-link";

export function BrandPortal({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).home;
  const project = projects.find((project) => project.slug === "go-to-nature")!;
  const media = project.media[0];

  return (
    <PortalMotion>
      <div className="portal-stage" data-portal-stage>
        <section className="portal-opening" aria-labelledby="home-title">
          <div className="portal-copy" data-portal-copy>
            <p className="portal-role">{copy.role}</p>
            <h1 id="home-title" dir="ltr">
              <span>Fathallah</span> <span>Haj</span>
            </h1>
            <p className="portal-summary">{copy.summary}</p>
            <div className="portal-actions" data-portal-actions>
              <TrackedAnchor
                href={localizedPath(locale, "/#work")}
                className="home-button home-button-acid"
                eventName="cta_click"
                eventData={{ placement: "hero", target: "work", locale }}
              >
                {copy.workAction}
              </TrackedAnchor>
              <TrackedAnchor
                href={localizedPath(locale, "/#contact")}
                className="home-button home-button-line"
                eventName="cta_click"
                eventData={{ placement: "hero", target: "contact", locale }}
              >
                {copy.contactAction}
              </TrackedAnchor>
            </div>
          </div>
          <div className="portal-poster" data-portal-poster>
            <BrandMonogram />
          </div>
          <div className="portal-disciplines" aria-hidden="true">
            <span>{copy.product}</span>
            <span>{copy.ai}</span>
            <span>{copy.infrastructure}</span>
          </div>
        </section>
        <div className="portal-scene">
          <h2 className="sr-only">{copy.selectedWork}</h2>
          <div className="portal-photo-frame">
            <Image
              src={media.src}
              alt={t(media.alt, locale)}
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="portal-photo"
              data-portal-photo
            />
          </div>
          <article
            className="feature-row home-feature home-feature-first portal-caption"
            data-project={project.slug}
            data-portal-caption
          >
            <HomeProjectSummary project={project} locale={locale} />
          </article>
        </div>
        <svg
          className="portal-veil"
          aria-hidden="true"
          focusable="false"
          width="100%"
          height="100%"
        >
          <defs>
            <mask
              id={`portal-counter-${locale}`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="100%"
              height="100%"
              style={{ maskType: "luminance" }}
            >
              <rect width="100%" height="100%" fill="white" />
              <path d={monogramCounter} fill="black" data-portal-mask />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#0b0b0b"
            mask={`url(#portal-counter-${locale})`}
          />
          <g fill="#c8ff34" data-portal-mark>
            <path fillRule="evenodd" d={monogramPath} />
            <circle cx="739" cy="246" r="33" />
          </g>
        </svg>
      </div>
      <div id="work" className="portal-work-anchor" />
    </PortalMotion>
  );
}
