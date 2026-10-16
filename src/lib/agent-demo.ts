/**
 * A scripted stand-in for the WhatsApp sales agent, for the homepage demo.
 *
 * It mirrors the real system's deterministic layer: the classifier's intent and
 * handoff rules, catalog-grounded answers, and the owner acknowledgement when
 * no approved source exists. There is no model here and nothing leaves the
 * browser. Prices and areas come from the demo catalog below, never from text.
 */
import type { Locale } from "@/content/portfolio";

export type DemoIntent =
  | "greeting"
  | "price"
  | "stock"
  | "delivery"
  | "discount"
  | "complaint"
  | "human"
  | "legal"
  | "injection"
  | "other";

export type DemoHandoff =
  | "human_requested"
  | "complaint_or_refund"
  | "sensitive_escalation"
  | "prompt_injection_attempt"
  | "missing_approved_sources";

export type DemoSource = { id: string; label: Record<Locale, string> };

export type DemoReply = {
  text: string;
  intent: DemoIntent;
  language: Locale;
  source: DemoSource | null;
  handoff: DemoHandoff | null;
};

type DemoItem = {
  id: string;
  name: Record<Locale, string>;
  price: number;
  stock: "in_stock" | "limited" | "out_of_stock";
  aliases: string[];
};

type DemoArea = { id: string; name: Record<Locale, string>; fee: number; aliases: string[] };

export const demoCatalog: DemoItem[] = [
  {
    id: "KNAFEH-KG",
    name: { ar: "كنافة نابلسية، كيلو", en: "Nabulsi knafeh, 1 kg", he: "כנאפה נאבלוסית, קילו" },
    price: 90,
    stock: "in_stock",
    aliases: ["كنافة", "كنافه", "knafeh", "kunafa", "knafe", "כנאפה"],
  },
  {
    id: "BAKLAWA-BOX",
    name: { ar: "علبة بقلاوة، نص كيلو", en: "Baklawa box, 500 g", he: "קופסת בקלאווה, חצי קילו" },
    price: 65,
    stock: "in_stock",
    aliases: ["بقلاوة", "بقلاوه", "baklawa", "baklava", "בקלאווה", "בקלאוה"],
  },
  {
    id: "MAAMOUL-BOX",
    name: { ar: "معمول بالتمر، 24 حبة", en: "Ma'amoul with dates, 24 pieces", he: "מעמול תמרים, 24 יחידות" },
    price: 55,
    stock: "limited",
    aliases: ["معمول", "maamoul", "ma'amoul", "mamoul", "מעמול"],
  },
  {
    id: "HALAWET-JIBN",
    name: { ar: "صينية حلاوة الجبن", en: "Halawet el jibn tray", he: "מגש חלאוות אל-ג'יבן" },
    price: 70,
    stock: "out_of_stock",
    aliases: ["حلاوة الجبن", "حلاوه الجبن", "halawet", "jibn", "חלאוות"],
  },
];

export const demoAreas: DemoArea[] = [
  { id: "nazareth", name: { ar: "الناصرة", en: "Nazareth", he: "נצרת" }, fee: 0, aliases: ["الناصرة", "الناصره", "nazareth", "נצרת"] },
  { id: "haifa", name: { ar: "حيفا", en: "Haifa", he: "חיפה" }, fee: 25, aliases: ["حيفا", "haifa", "חיפה"] },
  { id: "kufr-kanna", name: { ar: "كفر كنا", en: "Kafr Kanna", he: "כפר כנא" }, fee: 15, aliases: ["كفر كنا", "kafr kanna", "kufr kanna", "כפר כנא"] },
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

export function detectLanguage(text: string): Locale {
  if (/[؀-ۿ]/.test(text)) return "ar";
  if (/[֐-׿]/.test(text)) return "he";
  return "en";
}

const patterns = {
  injection: /ignore (?:all |the )?(?:previous|system)|system prompt|developer message|تجاهل التعليمات|הוראות מערכת/iu,
  human: /\b(?:human|owner|person|agent|representative)\b|المالك|صاحب المحل|موظف|بني ادم|נציג|בעלים|בן אדם/iu,
  complaint: /\b(?:complaint|angry|broken|wrong|terrible|refund)\b|شكوي|غاضب|خربان|استرجاع|تلونה|תלונה|החזר/iu,
  legal: /\b(?:lawyer|lawsuit|police|legal|injured)\b|محامي|شرطه|قانون|اصابه|עורך דין|משטרה/iu,
  stock: /\b(?:stock|available|availability|left)\b|متوفر|مخزون|موجود|في عندكم|במלאי|זמין|יש לכם/iu,
  delivery: /\b(?:deliver|delivery|shipping|arrive|eta)\b|توصيل|توصلوا|بتوصلوا|شحن|بوصل|משלוח|שולחים/iu,
  price: /\b(?:price|cost|how much)\b|سعر|قديش|بكم|كم ثمن|מחיר|כמה עולה|כמה זה/iu,
  discount: /\b(?:discount|deal|cheaper)\b|خصم|تنزيل|ارخص|הנחה|מבצע/iu,
  greeting: /^\s*(?:hello|hi|hey|good (?:morning|evening)|مرحبا|اهلا|يهلا|هاي|صباح الخير|مساء الخير|שלום|היי|בוקר טוב)(?=[\s!?؟.,]|$)/iu,
};

export function classify(text: string): { intent: DemoIntent; handoff: DemoHandoff | null } {
  const value = normalize(text);
  if (patterns.injection.test(value)) return { intent: "injection", handoff: "prompt_injection_attempt" };
  if (patterns.human.test(value)) return { intent: "human", handoff: "human_requested" };
  if (patterns.complaint.test(value)) return { intent: "complaint", handoff: "complaint_or_refund" };
  if (patterns.legal.test(value)) return { intent: "legal", handoff: "sensitive_escalation" };
  if (patterns.stock.test(value)) return { intent: "stock", handoff: null };
  if (patterns.delivery.test(value)) return { intent: "delivery", handoff: null };
  if (patterns.price.test(value)) return { intent: "price", handoff: null };
  if (patterns.discount.test(value)) return { intent: "discount", handoff: null };
  if (patterns.greeting.test(value)) return { intent: "greeting", handoff: null };
  return { intent: "other", handoff: null };
}

export function findItem(text: string): DemoItem | null {
  const value = normalize(text);
  return (
    demoCatalog.find((item) =>
      [...item.aliases, ...Object.values(item.name)].some((alias) => value.includes(normalize(alias))),
    ) ?? null
  );
}

export function findArea(text: string): DemoArea | null {
  const value = normalize(text);
  return (
    demoAreas.find((area) =>
      [...area.aliases, ...Object.values(area.name)].some((alias) => value.includes(normalize(alias))),
    ) ?? null
  );
}

const copy = {
  ar: {
    greeting: "أهلاً. كيف بقدر أساعد اليوم؟",
    price: (name: string, price: number) => `${name} سعره ${price} شيكل.`,
    stock: {
      in_stock: (name: string) => `${name} متوفر اليوم.`,
      limited: (name: string) => `${name} متوفر بكمية محدودة، الأفضل تحجز اليوم.`,
      out_of_stock: (name: string) => `${name} مش متوفر حالياً.`,
    },
    delivery: (area: string, fee: number) =>
      fee === 0 ? `بنوصل لـ${area} مجاناً.` : `بنوصل لـ${area}، رسوم التوصيل ${fee} شيكل.`,
    whichItem: (names: string[]) => `أي صنف بتقصد؟ عنا: ${names.join("، ")}.`,
    owner: "خليني أتأكد من المسؤول وبرجعلك بجواب.",
    clarify: "ممكن توضحلي أكثر؟ بقدر أساعدك بالأسعار والتوفر والتوصيل.",
  },
  en: {
    greeting: "Hello. How can I help today?",
    price: (name: string, price: number) => `${name} is ${price} ILS.`,
    stock: {
      in_stock: (name: string) => `${name} is in stock today.`,
      limited: (name: string) => `${name} is in limited supply; best to order today.`,
      out_of_stock: (name: string) => `${name} is out of stock right now.`,
    },
    delivery: (area: string, fee: number) =>
      fee === 0 ? `We deliver to ${area} for free.` : `We deliver to ${area}; the delivery fee is ${fee} ILS.`,
    whichItem: (names: string[]) => `Which item do you mean? We have: ${names.join(", ")}.`,
    owner: "Let me check with the business and get back to you.",
    clarify: "Could you tell me a little more? I can help with prices, availability and delivery.",
  },
  he: {
    greeting: "שלום. איך אפשר לעזור היום?",
    price: (name: string, price: number) => `${name} עולה ${price} ש"ח.`,
    stock: {
      in_stock: (name: string) => `${name} במלאי היום.`,
      limited: (name: string) => `${name} בכמות מוגבלת, כדאי להזמין היום.`,
      out_of_stock: (name: string) => `${name} לא במלאי כרגע.`,
    },
    delivery: (area: string, fee: number) =>
      fee === 0 ? `אנחנו שולחים ל${area} בחינם.` : `אנחנו שולחים ל${area}; דמי המשלוח ${fee} ש"ח.`,
    whichItem: (names: string[]) => `לאיזה פריט התכוונת? יש לנו: ${names.join(", ")}.`,
    owner: "אבדוק עם האחראי ואחזור עם תשובה.",
    clarify: "אפשר לפרט קצת? אני יכול לעזור במחירים, זמינות ומשלוחים.",
  },
} as const;

export function reply(text: string, preferred?: Locale): DemoReply {
  const language = text.trim() ? detectLanguage(text) : (preferred ?? "en");
  const t = copy[language];
  const { intent, handoff } = classify(text);
  const base = { intent, language };
  if (handoff) return { ...base, text: t.owner, source: null, handoff };
  if (intent === "greeting") return { ...base, text: t.greeting, source: null, handoff: null };
  if (intent === "price" || intent === "stock") {
    const item = findItem(text);
    if (!item) {
      return {
        ...base,
        text: t.whichItem(demoCatalog.map((entry) => entry.name[language])),
        source: null,
        handoff: null,
      };
    }
    const source = { id: `catalog:${item.id}`, label: item.name };
    return intent === "price"
      ? { ...base, text: t.price(item.name[language], item.price), source, handoff: null }
      : { ...base, text: t.stock[item.stock](item.name[language]), source, handoff: null };
  }
  if (intent === "delivery") {
    const area = findArea(text);
    if (!area) return { ...base, text: t.owner, source: null, handoff: "missing_approved_sources" };
    return {
      ...base,
      text: t.delivery(area.name[language], area.fee),
      source: { id: `delivery:${area.id}`, label: area.name },
      handoff: null,
    };
  }
  if (intent === "discount") return { ...base, text: t.owner, source: null, handoff: "missing_approved_sources" };
  return { ...base, text: t.clarify, source: null, handoff: null };
}
