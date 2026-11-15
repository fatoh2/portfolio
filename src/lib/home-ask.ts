/**
 * Matches a visitor's question to an answer id (design step 1.4). Safe for the browser: it imports no content.
 * The server builds the `Matcher` with `matcherFor()` in home-answers.ts and passes it to the question box as
 * props; the answers themselves are already in the server HTML.
 */
import { normalize } from "./agent-demo";

export type Matcher = {
  /** In match order. `intent` is a rule intent, or a project slug. */
  rules: { intent: string; source: string }[];
  /** The `wa.me` address without a query, for the unknown answer's link. */
  whatsappBase: string;
};

const ARABIC = /[؀-ۿ]/;
const HEBREW = /[֐-׿]/;
// Letters written onto the front of a word: the article, "and", "with", "to", "so" in Arabic; their Hebrew peers.
const ARABIC_PREFIX = "وال|بال|فال|كال|لل|ال|و|ب|ل|ف";
const HEBREW_PREFIX = "וה|ה|ו|ב|ל|מ|ש|כ";

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** One pattern as a whole-word regex source. `\b` only knows Latin letters, so Unicode letter lookarounds are used. */
export function patternSource(pattern: string): string {
  const prefix = ARABIC.test(pattern) ? ARABIC_PREFIX : HEBREW.test(pattern) ? HEBREW_PREFIX : "";
  const body = escape(normalize(pattern).trim()).replace(/\s+/g, "\\s+");
  return `(?<!\\p{L})${prefix ? `(?:${prefix})?` : ""}${body}(?!\\p{L})`;
}

/** Returns the matching intent, "unknown" when nothing matches, or null for empty input. */
export function matchIntent(text: string, matcher: Matcher): string | null {
  if (!text.trim()) return null;
  const value = normalize(text);
  const hit = matcher.rules.find((rule) => new RegExp(rule.source, "iu").test(value));
  return hit ? hit.intent : "unknown";
}

export const unknownWhatsappHref = (text: string, whatsappBase: string) =>
  `${whatsappBase}?text=${encodeURIComponent(text)}`;
