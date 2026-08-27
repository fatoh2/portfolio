import { Fragment } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BellRing,
  Bot,
  Cloud,
  Database,
  GitBranch,
  Globe2,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Locale, PortfolioProject } from "@/content/portfolio";
import { t } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";

const projectIcons: Record<string, LucideIcon[]> = {
  "whatsapp-ai-sales-agent": [MessageCircle, Bot, UserCheck],
  "argus-ai": [Search, Database, ShieldCheck],
  "argus-infra": [Cloud, GitBranch, Activity],
  "argus-monitor": [Server, Database, BellRing],
};

const fallbackIcons: LucideIcon[] = [Globe2, Workflow, Server];

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
  const icons = projectIcons[project.slug] ?? fallbackIcons;
  const FlowIcon = locale === "en" ? ArrowRight : ArrowLeft;

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
        {project.architecture.slice(0, 3).map((node, index) => {
          const Icon = icons[index] ?? Workflow;
          return (
            <Fragment key={node.label.en}>
              <article className={`system-node system-node-${index + 1}`}>
                <div className="system-node-meta">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                </div>
                <strong>{t(node.label, locale)}</strong>
                <small>{t(node.detail, locale)}</small>
              </article>
              {index < 2 ? (
                <div className="system-connector" aria-hidden="true">
                  <span />
                  <FlowIcon size={18} strokeWidth={2.2} />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <div className="system-tech-rail">
        {project.stack.slice(0, compact ? 5 : 7).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
