import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { localizedPath, t, type Locale, type PortfolioProject } from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { BrandMonogram } from "./brand-monogram";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import "./project-deck.css";

/** Native radios keep the whole collection usable before hydration or without JS. */
export function ProjectDeck({ projects, locale }: { projects: PortfolioProject[]; locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <section id="work" className="home-work" aria-labelledby="selected-work-title">
      <div className="deck-heading">
        <h2 id="selected-work-title">{dictionary.home.selectedWork}</h2>
        <p>{dictionary.home.deckIntro}</p>
      </div>
      <fieldset className="project-deck">
        <legend className="sr-only">{dictionary.home.deckChoose}</legend>
        {projects.map((project, index) => {
          const id = `deck-${locale}-${project.slug}`;
          const media = project.media[0];
          const position = {
            "--deck-row": index + 1,
            "--deck-mobile-row": Math.floor(index / 2) + 1,
            "--deck-mobile-column": index % 2 + 1,
          } as CSSProperties;
          return (
            <Fragment key={project.slug}>
              <input
                className="deck-choice"
                type="radio"
                name={`project-deck-${locale}`}
                id={id}
                value={project.slug}
                defaultChecked={index === 0}
                aria-controls={`${id}-panel`}
                style={position}
              />
              <label className="deck-selector" htmlFor={id} style={position}>
                <span className="deck-selector-title" dir="ltr">
                  {project.slug === "whatsapp-ai-sales-agent" ? "WhatsApp AI" : project.title}
                </span>
                <span className="deck-selector-category">{t(project.category, locale)}</span>
                <span className="deck-selector-dot" aria-hidden="true" />
              </label>
              <article className="feature-row deck-panel" id={`${id}-panel`} data-project={project.slug} aria-labelledby={`${id}-title`}>
                <div className="deck-print">
                  <div className="deck-print-header">
                    <span>{statusLabels[project.status][locale]}</span>
                    <span className="deck-stamp" aria-hidden="true"><BrandMonogram /></span>
                  </div>
                  <div className="deck-media">
                    {media ? (
                      <Image
                        src={media.src}
                        alt={t(media.alt, locale)}
                        fill
                        sizes="(min-width: 960px) 52vw, 90vw"
                        className="deck-image contain"
                      />
                    ) : (
                      <div className="deck-system">
                        <p>{project.status === "private-build" ? dictionary.case.privateVisual : dictionary.case.architecture}</p>
                        <div className="deck-system-flow">
                          {project.architecture.slice(0, 3).map((node, nodeIndex) => (
                            <Fragment key={node.label.en}>
                              {nodeIndex > 0 ? <ArrowDown size={18} aria-hidden="true" /> : null}
                              <span>{t(node.label, locale)}</span>
                            </Fragment>
                          ))}
                        </div>
                        <span className="deck-system-tools" dir="ltr">{project.stack.slice(0, 3).join(" / ")}</span>
                      </div>
                    )}
                  </div>
                  <div className="deck-caption">
                    <h3 id={`${id}-title`} dir="auto">{project.title}</h3>
                    <p>{t(project.summary, locale)}</p>
                    <ul className="deck-evidence">
                      {project.evidence.map(item => <li key={item.en}>{t(item, locale)}</li>)}
                    </ul>
                    <TrackedLink
                      href={localizedPath(locale, `/work/${project.slug}`)}
                      className="deck-case-link"
                      eventName="case_study_open"
                      eventData={{ slug: project.slug, locale }}
                    >
                      {dictionary.work.caseStudy}<ArrowUpRight size={20} aria-hidden="true" />
                    </TrackedLink>
                    {project.links
                      .filter((link) => link.kind === "download")
                      .map((link) => (
                        <div key={link.href} className="deck-download">
                          <TrackedAnchor
                            href={link.href}
                            className="deck-case-link deck-download-link"
                            download
                            eventName="apk_download"
                            eventData={{ slug: project.slug, locale, surface: "home" }}
                          >
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
