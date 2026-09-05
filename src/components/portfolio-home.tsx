import {
  ArrowUp,
  ArrowUpRight,
  Download,
  Mail,
  MessageCircle,
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
import { BrandMonogram } from "./brand-monogram";
import { BrandPortal } from "./brand-portal";
import { ContactForm } from "./contact-form";
import { HomeProjectSummary } from "./home-project-summary";
import { SiteHeader } from "./site-header";
import { SystemVisual } from "./system-visual";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import "./homepage.css";

const featuredOrder = [
  "go-to-nature",
  "seeker-radar",
  "whatsapp-ai-sales-agent",
  "argus-ai",
  "solitaire",
];

export function PortfolioHome({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home;
  const featured = projects
    .filter((project) => project.featured)
    .sort(
      (a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug),
    );
  const additional = projects.filter((project) => !project.featured);
  const disciplines = {
    product: copy.product,
    automation: copy.ai,
    reliability: copy.infrastructure,
  };

  return (
    <div id="top" className="site-shell home-page">
      <SiteHeader locale={locale} />
      <main>
        <BrandPortal locale={locale} />

        <section className="home-work" aria-labelledby="selected-work-title">
          <h2 id="selected-work-title" className="sr-only">
            {copy.selectedWork}
          </h2>
          <div className="featured-work">
            {featured
              .filter((project) => project.slug !== "go-to-nature")
              .map((project) => {
                const media = project.media[0];
                return (
                  <article
                    className="feature-row home-feature"
                    key={project.slug}
                    data-project={project.slug}
                  >
                    <div className="home-feature-media">
                      {media ? (
                        <Image
                          src={media.src}
                          alt={t(media.alt, locale)}
                          fill
                          sizes="(min-width: 960px) 58vw, 92vw"
                          className={`feature-image ${media.fit === "contain" ? "contain" : ""}`}
                        />
                      ) : (
                        <SystemVisual
                          project={project}
                          locale={locale}
                          compact
                        />
                      )}
                    </div>
                    <HomeProjectSummary project={project} locale={locale} />
                  </article>
                );
              })}
          </div>
        </section>

        <section className="home-index" aria-labelledby="more-work-title">
          <div className="home-index-heading">
            <h2 id="more-work-title">{copy.moreWork}</h2>
            <p>{copy.workIntro}</p>
          </div>
          <div className="home-project-index">
            {additional.map((project) => (
              <TrackedLink
                key={project.slug}
                href={localizedPath(locale, `/work/${project.slug}`)}
                className="home-index-link"
                eventName="case_study_open"
                eventData={{ slug: project.slug, locale }}
              >
                <span className="home-index-name" dir="auto">
                  {project.title}
                </span>
                <span className="home-index-category">
                  {t(project.category, locale)}
                </span>
                <span className="home-index-status">
                  {statusLabels[project.status][locale]}
                </span>
                <ArrowUpRight aria-hidden="true" size={22} />
              </TrackedLink>
            ))}
          </div>
          <article className="home-lab">
            <div>
              <p className="home-lab-label">
                {copy.lab} / {dictionary.lab.eyebrow}
              </p>
              <h3>{focusQuest.title}</h3>
            </div>
            <p>{t(focusQuest.summary, locale)}</p>
            <div className="home-lab-download">
              <TrackedAnchor
                href={focusQuest.apkUrl}
                className="home-project-link"
                download
                eventName="focusquest_apk_download"
                eventData={{ locale }}
              >
                {t(focusQuest.downloadLabel, locale)}
                <Download aria-hidden="true" size={18} />
              </TrackedAnchor>
              <small>{t(focusQuest.downloadNote, locale)}</small>
            </div>
          </article>
        </section>

        <section
          id="services"
          className="home-approach"
          aria-labelledby="approach-title"
        >
          <div className="home-approach-intro">
            <h2 id="approach-title">{copy.approachTitle}</h2>
            <p>{copy.approachSummary}</p>
          </div>
          <div className="home-service-list">
            {services.map((service) => (
              <article key={service.id}>
                <h3>{disciplines[service.id]}</h3>
                <div>
                  <h4>{t(service.title, locale)}</h4>
                  <p>{t(service.summary, locale)}</p>
                  <ul
                    className="home-service-tools"
                    aria-label={disciplines[service.id]}
                  >
                    {service.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="home-process"
          aria-labelledby="process-title"
        >
          <h2 id="process-title">{copy.processTitle}</h2>
          <ol>
            {dictionary.process.steps.map((step, index) => (
              <li key={step.title}>
                <span className="home-step" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="contact"
          className="home-contact"
          aria-labelledby="contact-title"
        >
          <div className="home-contact-copy">
            <div className="home-signature-mark">
              <BrandMonogram />
            </div>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactSummary}</p>
            <div className="home-direct-contact">
              {profile.contactLinks
                .filter(
                  (link) => link.kind === "email" || link.kind === "whatsapp",
                )
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

      <footer className="site-footer">
        <div>
          <strong>Fathallah Haj</strong>
          <span>{copy.signature}</span>
        </div>
        <div className="footer-links">
          {profile.contactLinks.slice(2).map((link) => (
            <TrackedAnchor
              key={link.href}
              href={link.href}
              target={link.kind === "social" ? "_blank" : undefined}
              rel={link.kind === "social" ? "noreferrer" : undefined}
              eventName={
                link.kind === "resume" ? "resume_download" : "social_click"
              }
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
