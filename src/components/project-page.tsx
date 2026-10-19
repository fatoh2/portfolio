import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Download,
  Radio,
} from "lucide-react";
import Image from "next/image";
import {
  localizedPath,
  profile,
  t,
  type Locale,
  type PortfolioProject,
  type ProjectMedia,
} from "@/content/portfolio";
import type { ReactNode } from "react";
import { getDictionary, statusLabels } from "@/content/ui";
import { LiveEmbed } from "./live-embed";
import { SiteHeader } from "./site-header";
import { SystemVisual } from "./system-visual";
import { TrackedAnchor, TrackedLink } from "./tracked-link";

/** A still with its live page layered over it, when the media has one. */
function MediaWithEmbed({ media, locale, children }: { media: ProjectMedia; locale: Locale; children: ReactNode }) {
  if (!media.embed) return children;
  const { src, width, height, label } = media.embed;
  return (
    <span className="live-embed-host">
      {children}
      <LiveEmbed src={src} title={t(media.alt, locale)} label={label && t(label, locale)} width={width} height={height} />
    </span>
  );
}

export function ProjectPage({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const BackIcon = locale === "en" ? ArrowLeft : ArrowRight;
  const primaryMedia = project.media[0];

  return (
    <div className="site-shell project-page">
      <SiteHeader locale={locale} currentPath={`/work/${project.slug}`} />
      <main>
        <section className="project-hero">
          <div className="project-hero-copy">
            <TrackedLink
              href={localizedPath(locale, "/#work")}
              className="back-link"
              eventName="navigation"
              eventData={{ target: "work", locale }}
            >
              <BackIcon aria-hidden="true" size={17} />
              {dictionary.case.back}
            </TrackedLink>
            <div className="project-kicker">
              <span>{t(project.category, locale)}</span>
              <span>{statusLabels[project.status][locale]}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{t(project.summary, locale)}</p>
            <div className="project-links">
              {project.links.map((link) =>
                link.kind === "download" ? (
                  <TrackedAnchor
                    key={link.href}
                    href={link.href}
                    download
                    eventName="apk_download"
                    eventData={{ slug: project.slug, locale }}
                    className="button button-ghost-dark"
                  >
                    <Download aria-hidden="true" size={17} />
                    {t(link.label, locale)}
                  </TrackedAnchor>
                ) : (
                  <TrackedAnchor
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    eventName={link.kind === "repo" ? "repo_click" : "live_product_click"}
                    eventData={{ slug: project.slug, locale }}
                    className={link.kind === "live" ? "button button-acid" : "button button-ghost-dark"}
                  >
                    {link.kind === "repo" ? <Code2 aria-hidden="true" size={17} /> : <Radio aria-hidden="true" size={17} />}
                    {t(link.label, locale)}
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </TrackedAnchor>
                ),
              )}
            </div>
            {project.links
              .filter((link) => link.note)
              .map((link) => (
                <p key={`${link.href}-note`} className="project-link-note">
                  {t(link.note!, locale)}
                </p>
              ))}
          </div>
          <div className={`project-hero-media${primaryMedia ? " project-hero-screenshot" : ""}${primaryMedia && primaryMedia.height > primaryMedia.width ? " project-hero-phone" : ""}`}>
            {primaryMedia ? (
              <MediaWithEmbed media={primaryMedia} locale={locale}>
                <Image
                  src={primaryMedia.src}
                  alt={t(primaryMedia.alt, locale)}
                  width={primaryMedia.width}
                  height={primaryMedia.height}
                  preload
                  sizes="(min-width: 920px) 50vw, 100vw"
                  className="project-hero-image contain"
                />
              </MediaWithEmbed>
            ) : (
              <SystemVisual project={project} locale={locale} />
            )}
          </div>
        </section>

        <section className="project-facts">
          <article>
            <span>{dictionary.case.audience}</span>
            <strong>{t(project.audience, locale)}</strong>
          </article>
          <article>
            <span>{dictionary.case.role}</span>
            <strong>{t(project.role, locale)}</strong>
          </article>
          <article>
            <span>{dictionary.case.status}</span>
            <strong>{t(project.statusNote, locale)}</strong>
          </article>
        </section>

        <section className="section section-paper project-story">
          <div className="project-problem">
            <p className="eyebrow">{dictionary.case.problem}</p>
            <h2>{t(project.problem, locale)}</h2>
          </div>
          <div className="project-capabilities">
            <p className="eyebrow">{dictionary.case.capabilities}</p>
            {project.capabilities.map((capability) => (
              <p key={capability.en}>
                <Check aria-hidden="true" size={17} />
                {t(capability, locale)}
              </p>
            ))}
          </div>
        </section>

        {project.media.length > 1 ? (
          <section className="project-gallery">
            {project.media.slice(1).map((media) => (
              <figure key={media.src} className={media.height > media.width ? "project-gallery-phone" : "project-gallery-desktop"}>
                <MediaWithEmbed media={media} locale={locale}>
                  <Image
                    src={media.src}
                    alt={t(media.alt, locale)}
                    width={media.width}
                    height={media.height}
                    sizes={media.height > media.width ? "(min-width: 620px) 360px, 90vw" : "(min-width: 920px) 60vw, 90vw"}
                    className="contain"
                  />
                </MediaWithEmbed>
                <figcaption>{t(media.caption, locale)}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        {primaryMedia ? (
        <section className="section section-ink architecture-section">
          <div className="section-intro">
            <p className="eyebrow">{dictionary.case.architecture}</p>
            <h2>{project.title}</h2>
          </div>
          <ol className="architecture-list">
            {project.architecture.map((node, index) => (
              <li key={node.label.en}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{t(node.label, locale)}</h3>
                  <p>{t(node.detail, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
          {project.status !== "public-build" && project.status !== "live-product" ? (
            <p className="private-note">{dictionary.case.privateNote}</p>
          ) : null}
        </section>
        ) : project.status !== "public-build" ? (
          <section className="section section-ink architecture-section architecture-note">
            <p className="private-note">{dictionary.case.privateNote}</p>
          </section>
        ) : null}

        <section className="section section-signal project-proof">
          <div>
            <p className="eyebrow">{dictionary.case.evidence}</p>
            <div className="evidence-list">
              {project.evidence.map((item) => (
                <span key={item.en}>
                  <Check aria-hidden="true" size={16} />
                  {t(item, locale)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">{dictionary.case.stack}</p>
            <div className="stack-cloud">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="section section-paper next-step-section">
          <p className="eyebrow">{dictionary.case.next}</p>
          <h2>{t(project.nextStep, locale)}</h2>
          <TrackedLink
            href={localizedPath(locale, "/#contact")}
            className="button button-ink"
            eventName="cta_click"
            eventData={{ placement: "case_study", slug: project.slug, locale }}
          >
            {dictionary.case.contact}
            <ArrowUpRight aria-hidden="true" size={18} />
          </TrackedLink>
        </section>
      </main>

      <footer className="site-footer project-footer">
        <div>
          <strong>{profile.name}</strong>
          <span>{dictionary.footer.line}</span>
        </div>
        <TrackedLink href={localizedPath(locale, "/#contact")} eventName="cta_click" eventData={{ placement: "footer", locale }}>
          {dictionary.nav.start}
        </TrackedLink>
      </footer>
    </div>
  );
}
