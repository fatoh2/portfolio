/**
 * Every answer the question box can give, built on the server in the page's language (design step 1.4),
 * and the matcher the box receives as props. Server only: it reads the content files.
 */
import { aliases, glossary, rules, type AnswerIntent, type HomeRule } from "@/content/home";
import { locales, profile, services, type Locale } from "@/content/portfolio";
import { statusLabels } from "@/content/ui";
import { patternSource, type Matcher } from "./home-ask";
import { buildCards, toRef, type HomeCard, type HomeCardRef } from "./home-cards";

export type Answer = {
  /** The element id in the thread: `q-<intent>`. */
  id: string;
  /** A rule intent, or a project slug. */
  intent: string;
  text: string;
  items: HomeCardRef[];
  /** An in-page hash or the résumé address. */
  link: { href: string; label: string } | null;
  handoff: boolean;
  sourceLabel: string;
  whatsappHref: string | null;
};

/** Checked in this order: services first, so "build" with a channel word is not read as a project name. */
const ORDER: AnswerIntent[] = [
  "services", "resume", "stack", "play", "demo", "install", "location", "live", "process", "contact", "price",
];

const ruleOf = (intent: AnswerIntent) => rules.find((rule) => rule.intent === intent)!;
const resumeHref = profile.contactLinks.find((link) => link.kind === "resume")!.href;
const whatsappBase = profile.contactLinks.find((link) => link.kind === "whatsapp")!.href.split("?")[0];

const allPatterns = (byLocale: Record<Locale, string[]>) => locales.flatMap((locale) => byLocale[locale]);
const sourceOf = (patterns: string[]) => patterns.map(patternSource).join("|");

/** The patterns of all three languages, so a question typed in English on /ar still matches. */
export function matcherFor(): Matcher {
  const [first, ...rest] = ORDER;
  const projects = buildCards("en").map((card) => ({ intent: card.slug, source: sourceOf(allPatterns(aliases[card.slug])) }));
  const rule = (intent: AnswerIntent) => ({ intent, source: sourceOf(allPatterns(ruleOf(intent).patterns)) });
  return { rules: [rule(first), ...projects, ...rest.map(rule)], whatsappBase };
}

function itemsFor(rule: HomeRule, cards: HomeCard[]): HomeCardRef[] {
  if (rule.items === "live") return cards.filter((card) => card.status === "live-product").map(toRef);
  if (rule.items === "install") return cards.filter((card) => card.downloads.length).map(toRef);
  if (Array.isArray(rule.items)) return cards.filter((card) => rule.items!.includes(card.slug)).map(toRef);
  return [];
}

function textFor(rule: HomeRule, locale: Locale): string {
  const base = rule.answer[locale];
  if (rule.intent === "stack") return `${base} ${services.map((service) => `${service.title[locale]}: ${service.signals.join(", ")}`).join(". ")}.`;
  if (rule.intent === "location") return `${base} ${profile.location[locale]}.`;
  return base;
}

export function answersFor(locale: Locale): Answer[] {
  const cards = buildCards(locale);
  const fromRules = rules.map((rule): Answer => ({
    id: `q-${rule.intent}`,
    intent: rule.intent,
    text: textFor(rule, locale),
    items: itemsFor(rule, cards),
    link: rule.link
      ? rule.link === "resume"
        ? { href: resumeHref, label: glossary.sources.resume[locale] }
        : { href: rule.link, label: glossary.sources[rule.source][locale] }
      : null,
    handoff: Boolean(rule.whatsappPrefill),
    sourceLabel: glossary.sources[rule.source][locale],
    whatsappHref: rule.whatsappPrefill ? `${whatsappBase}?text=${encodeURIComponent(rule.whatsappPrefill[locale])}` : null,
  }));
  const fromProjects = cards.map((card): Answer => ({
    id: `q-${card.slug}`,
    intent: card.slug,
    text: `${card.title}. ${statusLabels[card.status][locale]}. ${card.category[locale]}.`,
    items: [toRef(card)],
    link: null,
    handoff: false,
    sourceLabel: glossary.sources.projects[locale],
    whatsappHref: null,
  }));
  return [...fromRules, ...fromProjects];
}
