import type { PortfolioProject } from "@/content/portfolio";

export const workTags = ["whatsapp", "telegram", "ai", "mobile", "web"] as const;
export type WorkTag = (typeof workTags)[number];

const rules: Record<WorkTag, RegExp> = {
  whatsapp: /whatsapp/i,
  telegram: /telegram/i,
  ai: /\b(?:llm|claude|ai drafting|openai|agent)\b/i,
  mobile: /\b(?:expo|react native|flutter|capacitor|android|ios)\b/i,
  web: /\b(?:next\.js|react|vite|pwa)\b/i,
};

/** Tags derived from a project's declared stack and category; nothing is hand-assigned. */
export function projectTags(project: Pick<PortfolioProject, "stack" | "category" | "slug">): WorkTag[] {
  const haystack = [...project.stack, project.category.en, project.slug].join(" ");
  return workTags.filter((tag) => rules[tag].test(haystack));
}
