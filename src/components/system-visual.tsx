import { Bot, Boxes, Database, GitBranch, ShieldCheck } from "lucide-react";
import type { Locale, PortfolioProject } from "@/content/portfolio";
import { t } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";

export function SystemVisual({
  project,
  locale,
  compact = false,
}: {
  project: PortfolioProject;
  locale: Locale;
  compact?: boolean;
}) {
  const dictionary = getDictionary(locale);
  const icons = [Bot, GitBranch, Database];

  return (
    <div className={`system-visual ${compact ? "system-visual-compact" : ""}`}>
      <div className="system-visual-head">
        <span>{project.title}</span>
        <span className="system-status">
          <ShieldCheck aria-hidden="true" size={14} />
          {project.status === "private-build"
            ? dictionary.case.privateVisual
            : dictionary.hero.public}
        </span>
      </div>
      <div className="system-node-grid">
        {project.architecture.map((node, index) => {
          const Icon = icons[index] ?? Boxes;
          return (
            <div className="system-node" key={node.label.en}>
              <Icon aria-hidden="true" size={18} />
              <strong>{t(node.label, locale)}</strong>
              {!compact ? <small>{t(node.detail, locale)}</small> : null}
            </div>
          );
        })}
      </div>
      <div className="system-flow" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
