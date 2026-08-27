import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Radio,
} from "lucide-react";
import Image from "next/image";
import {
  localizedPath,
  profile,
  t,
  type Locale,
  type PortfolioProject,
} from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { SiteHeader } from "./site-header";
import { SystemVisual } from "./system-visual";
import { TrackedAnchor, TrackedLink } from "./tracked-link";

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
              {project.links.map((link) => (
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
              ))}
            </div>
          </div>
          <div className="project-hero-media">
            {primaryMedia ? (
              <Image
                src={primaryMedia.src}
                alt={t(primaryMedia.alt, locale)}
                fill
                priority
                sizes="(min-width: 920px) 50vw, 100vw"
                className={primaryMedia.portrait ? "project-hero-image contain" : "project-hero-image"}
              />
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
              <figure key={media.src}>
                <Image
                  src={media.src}
                  alt={t(media.alt, locale)}
                  fill
                  sizes="(min-width: 920px) 42vw, 90vw"
                  className={media.portrait ? "contain" : ""}
                />
                <figcaption>{t(media.caption, locale)}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

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
          {project.status === "private-build" ? (
            <p className="private-note">{dictionary.case.privateNote}</p>
          ) : null}
        </section>

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
