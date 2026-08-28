import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Download,
  Mail,
  MessageCircle,
  MoveRight,
} from "lucide-react";
import Image from "next/image";
import {
  focusQuest,
  localizedPath,
  profile,
  projects,
  services,
  t,
  type Locale,
} from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { ContactForm } from "./contact-form";
import { HeroCanvas } from "./hero-canvas";
import { SiteHeader } from "./site-header";
import { SystemVisual } from "./system-visual";
import { TrackedAnchor, TrackedLink } from "./tracked-link";

const directIcon = {
  email: Mail,
  whatsapp: MessageCircle,
  resume: Download,
  social: Code2,
};

const featuredOrder = [
  "go-to-nature",
  "seeker-radar",
  "whatsapp-ai-sales-agent",
  "argus-ai",
  "solitaire",
];

export function PortfolioHome({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const featured = projects
    .filter((project) => project.featured)
    .sort(
      (left, right) =>
        featuredOrder.indexOf(left.slug) - featuredOrder.indexOf(right.slug),
    );
  const additional = projects.filter(
    (project) => !project.featured && !project.slug.startsWith("argus-"),
  );

  return (
    <div id="top" className="site-shell">
      <SiteHeader locale={locale} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">{dictionary.hero.eyebrow}</p>
            <h1>{t(profile.headline, locale)}</h1>
            <p className="hero-summary">{t(profile.summary, locale)}</p>
            <div className="hero-actions">
              <TrackedLink
                href={localizedPath(locale, "/#work")}
                className="button button-acid"
                eventName="cta_click"
                eventData={{ placement: "hero", target: "work", locale }}
              >
                {dictionary.hero.primary}
                <ArrowDownRight aria-hidden="true" size={18} />
              </TrackedLink>
              <TrackedLink
                href={localizedPath(locale, "/#contact")}
                className="button button-ghost-dark"
                eventName="cta_click"
                eventData={{ placement: "hero", target: "contact", locale }}
              >
                {dictionary.hero.secondary}
                <MoveRight aria-hidden="true" size={18} />
              </TrackedLink>
            </div>
          </div>
          <HeroCanvas locale={locale} />
        </section>

        <div className="proof-ribbon" aria-label="Proof signals">
          <div>
            {dictionary.proof.map((item) => (
              <span key={item}>
                <Check aria-hidden="true" size={15} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="section section-paper audience-section">
          <div className="section-intro wide-intro">
            <p className="eyebrow">{dictionary.paths.eyebrow}</p>
            <h2>{dictionary.paths.title}</h2>
          </div>
          <div className="audience-grid">
            <article>
              <span>01</span>
              <h3>{dictionary.paths.businessTitle}</h3>
              <p>{dictionary.paths.businessText}</p>
              <a href="#work" aria-label={dictionary.paths.businessTitle}>
                <ArrowDownRight aria-hidden="true" size={22} />
              </a>
            </article>
            <article>
              <span>02</span>
              <h3>{dictionary.paths.startupTitle}</h3>
              <p>{dictionary.paths.startupText}</p>
              <a href="#work" aria-label={dictionary.paths.startupTitle}>
                <ArrowDownRight aria-hidden="true" size={22} />
              </a>
            </article>
          </div>
        </section>

        <section id="services" className="section section-cobalt services-section">
          <div className="section-intro">
            <p className="eyebrow">{dictionary.services.eyebrow}</p>
            <h2>{dictionary.services.title}</h2>
            <p>{dictionary.services.summary}</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article key={service.id}>
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{t(service.title, locale)}</h3>
                  <p>{t(service.summary, locale)}</p>
                </div>
                <div className="signal-list">
                  {service.signals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section section-paper work-section">
          <div className="section-intro wide-intro">
            <p className="eyebrow">{dictionary.work.eyebrow}</p>
            <h2>{dictionary.work.title}</h2>
            <p>{dictionary.work.summary}</p>
          </div>
          <div className="featured-work">
            {featured.map((project, index) => {
              const media = project.media[0];
              return (
                <article className="feature-row" key={project.slug}>
                  <div className="feature-media">
                    {media ? (
                      <Image
                        src={media.src}
                        alt={t(media.alt, locale)}
                        fill
                        sizes="(min-width: 960px) 54vw, 100vw"
                        className={media.fit === "contain" ? "feature-image contain" : "feature-image"}
                      />
                    ) : (
                      <SystemVisual project={project} locale={locale} compact />
                    )}
                    <span className="feature-index">0{index + 1}</span>
                  </div>
                  <div className="feature-copy">
                    <div className="feature-meta">
                      <span>{t(project.category, locale)}</span>
                      <span>{statusLabels[project.status][locale]}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{t(project.summary, locale)}</p>
                    <ul>
                      {project.evidence.map((item) => (
                        <li key={item.en}>
                          <Check aria-hidden="true" size={15} />
                          {t(item, locale)}
                        </li>
                      ))}
                    </ul>
                    <TrackedLink
                      href={localizedPath(locale, `/work/${project.slug}`)}
                      className="text-link"
                      eventName="case_study_open"
                      eventData={{ slug: project.slug, locale }}
                    >
                      {dictionary.work.caseStudy}
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </TrackedLink>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section section-ink more-work-section">
          <div className="section-intro">
            <p className="eyebrow">{dictionary.work.liveWork}</p>
            <h2>{dictionary.work.liveSummary}</h2>
          </div>
          <div className="project-grid">
            {additional.map((project) => {
              const media = project.media[0];
              return (
                <TrackedLink
                  key={project.slug}
                  href={localizedPath(locale, `/work/${project.slug}`)}
                  className="project-card"
                  eventName="case_study_open"
                  eventData={{ slug: project.slug, locale }}
                >
                  {media ? (
                    <span className="project-card-media">
                      <Image
                        src={media.src}
                        alt={t(media.alt, locale)}
                        fill
                        sizes="(min-width: 900px) 31vw, 92vw"
                        className="project-card-image"
                      />
                    </span>
                  ) : null}
                  <span className="project-card-copy">
                    <small>{t(project.category, locale)}</small>
                    <strong>{project.title}</strong>
                    <span>{t(project.summary, locale)}</span>
                    <ArrowUpRight aria-hidden="true" size={20} />
                  </span>
                </TrackedLink>
              );
            })}
          </div>
          <article className="lab-row">
            <div>
              <p className="eyebrow">{dictionary.lab.eyebrow}</p>
              <h3>{focusQuest.title}</h3>
              <p>{t(focusQuest.summary, locale)}</p>
            </div>
            <div className="lab-stack">
              {focusQuest.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <Bot aria-hidden="true" size={32} />
          </article>
        </section>

        <section className="section section-signal technical-section">
          <div className="section-intro">
            <p className="eyebrow">{dictionary.proofSection.eyebrow}</p>
            <h2>{dictionary.proofSection.title}</h2>
            <p>{dictionary.proofSection.summary}</p>
          </div>
          <div className="technical-grid">
            {dictionary.proofSection.groups.map((group, index) => (
              <article key={group.title}>
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section section-paper process-section">
          <div className="section-intro">
            <p className="eyebrow">{dictionary.process.eyebrow}</p>
            <h2>{dictionary.process.title}</h2>
          </div>
          <ol className="process-list">
            {dictionary.process.steps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-copy">
            <p className="eyebrow">{dictionary.contact.eyebrow}</p>
            <h2>{dictionary.contact.title}</h2>
            <p>{dictionary.contact.summary}</p>
            <div className="direct-contact">
              <strong>{dictionary.contact.direct}</strong>
              {profile.contactLinks
                .filter((link) => link.kind === "email" || link.kind === "whatsapp")
                .map((link) => {
                  const Icon = directIcon[link.kind];
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
          <div className="contact-form-wrap">
            <ContactForm locale={locale} />
            <p className="privacy-note">{dictionary.contact.privacy}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Fathallah Haj</strong>
          <span>{dictionary.footer.line}</span>
        </div>
        <div className="footer-links">
          {profile.contactLinks.slice(2).map((link) => (
            <TrackedAnchor
              key={link.href}
              href={link.href}
              target={link.kind === "social" ? "_blank" : undefined}
              rel={link.kind === "social" ? "noreferrer" : undefined}
              eventName={link.kind === "resume" ? "resume_download" : "social_click"}
              eventData={{ target: link.kind, locale }}
            >
              {t(link.label, locale)}
            </TrackedAnchor>
          ))}
          <a href="#top" className="to-top" title={dictionary.footer.top}>
            <ArrowUp aria-hidden="true" size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
