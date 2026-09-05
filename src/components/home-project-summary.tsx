import { ArrowUpRight } from "lucide-react";
import {
  localizedPath,
  t,
  type Locale,
  type PortfolioProject,
} from "@/content/portfolio";
import { getDictionary, statusLabels } from "@/content/ui";
import { TrackedLink } from "./tracked-link";

export function HomeProjectSummary({
  project,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  return (
    <div className="home-feature-copy">
      <div className="home-feature-title">
        <div className="home-project-meta">
          <span>{t(project.category, locale)}</span>
          <span>{statusLabels[project.status][locale]}</span>
        </div>
        <h3 dir="auto">{project.title}</h3>
      </div>
      <div className="home-feature-detail">
        <p>{t(project.summary, locale)}</p>
        <ul className="home-evidence">
          {project.evidence.map((item) => (
            <li key={item.en}>{t(item, locale)}</li>
          ))}
        </ul>
        <TrackedLink
          href={localizedPath(locale, `/work/${project.slug}`)}
          className="home-project-link"
          eventName="case_study_open"
          eventData={{ slug: project.slug, locale }}
        >
          {getDictionary(locale).work.caseStudy}
          <ArrowUpRight aria-hidden="true" size={18} />
        </TrackedLink>
      </div>
    </div>
  );
}
