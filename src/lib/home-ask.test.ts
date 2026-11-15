import { describe, expect, it } from "vitest";
import { aliases, chips, rules } from "@/content/home";
import { locales, type Locale } from "@/content/portfolio";
import { matchIntent, unknownWhatsappHref } from "./home-ask";
import { answersFor, matcherFor } from "./home-answers";

const matcher = matcherFor();
const ask = (text: string) => matchIntent(text, matcher);

// Questions a hirer and a client would ask, in each language, with the intent they should reach.
const fixtures: Record<Locale, [string, string][]> = {
  en: [
    ["Can I see your CV?", "resume"],
    ["Do you use Kubernetes?", "stack"],
    ["Where are you based?", "location"],
    ["What's live?", "live"],
    ["Which apps can I install?", "install"],
    ["How much does a project cost?", "price"],
    ["Show me Bab", "bab"],
    ["How do you work?", "process"],
    ["What do you build?", "services"],
  ],
  ar: [
    ["هل يمكنني رؤية سيرتك الذاتية؟", "resume"],
    ["هل تستخدم كوبرنيتس؟", "stack"],
    ["وين مكانك؟", "location"],
    ["ما الذي يعمل الآن؟", "live"],
    ["ماذا يمكنني أن أثبّت؟", "install"],
    ["كم تكلفة المشروع؟", "price"],
    ["احكيلي عن باب", "bab"],
    ["كيف تعمل؟", "process"],
    ["ماذا تبني؟", "services"],
  ],
  he: [
    ["אפשר לראות קורות חיים?", "resume"],
    ["אתה עובד עם Kubernetes?", "stack"],
    ["איפה אתה גר?", "location"],
    ["מה באוויר?", "live"],
    ["מה אפשר להתקין?", "install"],
    ["כמה עולה פרויקט?", "price"],
    ["ספר לי על באב", "bab"],
    ["איך אתה עובד?", "process"],
    ["מה אתה בונה?", "services"],
  ],
};

describe("homepage question box rules", () => {
  for (const locale of locales) {
    it(`answers the ${locale} fixtures`, () => {
      for (const [question, intent] of fixtures[locale]) expect(ask(question), question).toBe(intent);
    });

    it(`answers at least 90% of the ${locale} fixtures with something other than unknown`, () => {
      const answered = fixtures[locale].filter(([question]) => ask(question) !== "unknown").length;
      expect(answered / fixtures[locale].length).toBeGreaterThanOrEqual(0.9);
    });
  }

  it("sends what it cannot answer to WhatsApp with the visitor's own words", () => {
    const question = "Can you build a booking system for my clinic?";
    expect(ask(question)).toBe("unknown");
    expect(unknownWhatsappHref(question, matcher.whatsappBase)).toBe(
      `https://wa.me/972545964855?text=${encodeURIComponent(question)}`,
    );
  });

  it("matches whole words in Arabic and Hebrew, with or without an attached prefix", () => {
    expect(ask("ما هي الأسباب؟")).toBe("unknown");
    expect(ask("أسباب")).toBe("unknown");
    expect(ask("شو في بالباب؟")).toBe("bab");
    expect(ask("מה קורה לבאב?")).toBe("bab");
    expect(ask("ما السعر؟")).toBe("price");
    expect(ask("قديش الاسعار؟")).toBe("price");
    expect(ask("מה המחיר?")).toBe("price");
  });

  it("normalises the patterns the same way as the visitor's text", () => {
    // Patterns are written with ة and أ; visitors often type ه and ا.
    expect(ask("كم التكلفه؟")).toBe("price");
    expect(ask("بدي اثبت التطبيق")).toBe("install");
  });

  it("keeps channel and download questions with the right rule", () => {
    expect(ask("Which apps are available for Android?")).toBe("install");
    expect(ask("Can you build a WhatsApp bot?")).toBe("services");
  });

  it("returns nothing for empty input", () => {
    expect(ask("")).toBeNull();
    expect(ask("   ")).toBeNull();
  });

  it("reaches every card by each of its aliases in each script", () => {
    for (const [slug, byLocale] of Object.entries(aliases)) {
      for (const locale of locales) {
        for (const alias of byLocale[locale]) expect(ask(alias), `${slug} ${locale} "${alias}"`).toBe(slug);
      }
    }
  });

  it("has an answer in all three languages for every chip and every rule", () => {
    for (const locale of locales) {
      const ids = new Set(answersFor(locale).map((answer) => answer.id));
      for (const chip of chips) expect(ids.has("intent" in chip ? `q-${chip.intent}` : `q-${chip.slug}`), `${locale} ${chip.id}`).toBe(true);
      for (const rule of rules) expect(rule.answer[locale].length, `${locale} ${rule.intent}`).toBeGreaterThan(0);
    }
  });

  it("writes answers in the page's language, whatever the question's language", () => {
    const live = (locale: Locale) => answersFor(locale).find((answer) => answer.id === "q-live")!;
    expect(live("ar").text).toBe(rules.find((rule) => rule.intent === "live")!.answer.ar);
    expect(live("ar").items.every((item) => item.status === "live-product")).toBe(true);
    expect(live("ar").items.length).toBeGreaterThan(0);
  });

  it("sends the browser the matcher only, with no answer text", () => {
    const shipped = JSON.stringify(matcher);
    for (const locale of locales) {
      for (const answer of answersFor(locale)) expect(shipped.includes(answer.text), answer.id).toBe(false);
    }
  });
});
