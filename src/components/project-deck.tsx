import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { localizedPath, t, type Locale, type PortfolioProject } from "@/content/portfolio";
import { projectShowcases } from "@/content/project-showcase";
import { getDictionary, statusLabels } from "@/content/ui";
import { BrandMonogram } from "./brand-monogram";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import "./project-deck.css";

function ProductPortrait({ project, locale }: { project: PortfolioProject; locale: Locale }) {
  const showcase = projectShowcases[project.slug];
  const desktop = project.media[0];
  const mobile = showcase?.mobileIndex !== undefined ? project.media[showcase.mobileIndex] : undefined;
  if (!desktop) return null;
  return (
    <div className={`deck-portrait${mobile ? " deck-portrait-pair" : ""}`} dir="ltr">
      <div className="deck-desktop" style={{ aspectRatio: showcase?.desktopRatio ?? "16 / 10" }}>
        <Image src={desktop.src} alt={t(desktop.alt, locale)} fill sizes="(min-width: 960px) 57vw, 76vw" className="deck-image contain" />
      </div>
      {mobile ? (
        <div className="deck-mobile" style={{ aspectRatio: showcase.mobileRatio }}>
          <Image src={mobile.src} alt={t(mobile.alt, locale)} fill sizes="(min-width: 960px) 18vw, 25vw" className="deck-image contain" />
        </div>
      ) : null}
    </div>
  );
}

function InterfaceDetails({ project, locale }: { project: PortfolioProject; locale: Locale }) {
  const details = projectShowcases[project.slug]?.details;
  if (!details?.length) return null;
  return (
    <div className="deck-details">
      {details.map((detail, index) => {
        const [x, y, width, height] = detail.crop;
        const [sourceWidth, sourceHeight] = detail.sourceSize;
        return (
          <figure className="deck-detail" key={detail.title.en}>
            <div className="deck-detail-image">
              <div className="deck-detail-crop" style={{ aspectRatio: `${width} / ${height}`, "--detail-ratio": width / height } as CSSProperties}>
                <Image src={project.media[detail.mediaIndex].src} alt="" width={sourceWidth} height={sourceHeight}
                  sizes={`${Math.ceil((sourceWidth / width) * 45)}vw`}
                  style={{ width: `${(sourceWidth / width) * 100}%`, left: `${(-x / width) * 100}%`, top: `${(-y / height) * 100}%` }} />
              </div>
            </div>
            <figcaption>
              <span className="deck-detail-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h4>{t(detail.title, locale)}</h4><p>{t(detail.description, locale)}</p></div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/** Native radios keep the whole collection usable before hydration or without JS. */
export function ProjectDeck({ projects, locale }: { projects: PortfolioProject[]; locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <section id="work" className="home-work" aria-labelledby="selected-work-title">
      <div className="deck-heading"><h2 id="selected-work-title">{dictionary.home.selectedWork}</h2><p>{dictionary.home.deckIntro}</p></div>
      <fieldset className="project-deck" style={{ "--deck-count": projects.length } as CSSProperties}>
        <legend className="sr-only">{dictionary.home.deckChoose}</legend>
        {projects.map((project, index) => {
          const id = `deck-${locale}-${project.slug}`;
          const position = {
            "--deck-column": index + 1,
            "--deck-mobile-row": Math.floor(index / 2) + 1,
            "--deck-mobile-column": index % 2 + 1,
          } as CSSProperties;
          return (
            <Fragment key={project.slug}>
              <input className="deck-choice" type="radio" name={`project-deck-${locale}`} id={id} value={project.slug} defaultChecked={index === 0} aria-controls={`${id}-panel`} style={position} />
              <label className="deck-selector" htmlFor={id} style={position}>
                <span className="deck-selector-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="deck-selector-title" dir="ltr">{project.slug === "whatsapp-ai-sales-agent" ? "WhatsApp AI" : project.title}</span>
                <span className="deck-selector-dot" aria-hidden="true" />
              </label>
              <article className="feature-row deck-panel" id={`${id}-panel`} data-project={project.slug} aria-labelledby={`${id}-title`}>
                <div className="deck-overview">
                  <div className="deck-caption">
                    <div className="deck-status"><span>{statusLabels[project.status][locale]}</span><span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
                    <h3 id={`${id}-title`} dir="auto">{project.title}</h3>
                    <p>{t(project.summary, locale)}</p>
                    <ul className="deck-evidence">{project.evidence.map(item => <li key={item.en}>{t(item, locale)}</li>)}</ul>
                    <span className="deck-stamp" aria-hidden="true"><BrandMonogram /></span>
                  </div>
                  {project.media[0] ? <ProductPortrait project={project} locale={locale} /> : (
                    <div className="deck-system">
                      <p>{project.status === "private-build" ? dictionary.case.privateVisual : dictionary.case.architecture}</p>
                      <div className="deck-system-flow">
                        {project.architecture.slice(0, 3).map((node, nodeIndex) => (
                          <Fragment key={node.label.en}>
                            {nodeIndex > 0 ? <ArrowDown size={20} aria-hidden="true" /> : null}
                            <div><span aria-hidden="true">{String(nodeIndex + 1).padStart(2, "0")}</span><strong>{t(node.label, locale)}</strong><p>{t(node.detail, locale)}</p></div>
                          </Fragment>
                        ))}
                      </div>
                      <span className="deck-system-tools" dir="ltr">{project.stack.slice(0, 3).join(" / ")}</span>
                    </div>
                  )}
                </div>
                <InterfaceDetails project={project} locale={locale} />
                <div className="deck-footer">
                  <p>{t(project.category, locale)}</p>
                  <div className="deck-actions">
                    <TrackedLink href={localizedPath(locale, `/work/${project.slug}`)} className="deck-case-link" eventName="case_study_open" eventData={{ slug: project.slug, locale }}>
                      {dictionary.work.caseStudy}<ArrowUpRight size={20} aria-hidden="true" />
                    </TrackedLink>
                    {project.links.filter(link => link.kind === "download").map(link => (
                      <div key={link.href} className="deck-download">
                        <TrackedAnchor href={link.href} className="deck-case-link deck-download-link" download eventName="apk_download" eventData={{ slug: project.slug, locale, surface: "home" }}>
                          {t(link.label, locale)}<Download size={20} aria-hidden="true" />
                        </TrackedAnchor>
                        {link.note ? <small className="deck-download-note">{t(link.note, locale)}</small> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Fragment>
          );
        })}
      </fieldset>
    </section>
  );
}
