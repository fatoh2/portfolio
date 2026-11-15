/**
 * Visitor copy for the rebuilt homepage (design/homepage/DESIGN-2026-11.md), in three languages.
 *
 * Every sentence here is a draft until the owner's swap test and the read of the Arabic and Hebrew copy.
 * Counts are never written into copy: lists come from the cards themselves.
 */
import { tx, type Locale, type LocalizedText } from "./portfolio";

export type AnswerIntent =
  | "live"
  | "install"
  | "services"
  | "process"
  | "resume"
  | "stack"
  | "location"
  | "contact"
  | "price"
  | "play"
  | "demo";

/** Where an answer's content comes from, named in visitor words on the four-field line. */
export type AnswerSource = "projects" | "downloads" | "services" | "process" | "resume" | "contact" | "none";

export type HomeRule = {
  intent: AnswerIntent;
  patterns: Record<Locale, string[]>;
  answer: LocalizedText;
  items: "live" | "install" | string[] | null;
  source: AnswerSource;
  /** A link shown under the answer: an in-page hash, or "resume" for the CV. */
  link?: "#services" | "#process" | "#contact" | "resume";
  /** Prefill for a WhatsApp link under the answer. */
  whatsappPrefill?: LocalizedText;
};

export type HomeChip =
  | { id: "live" | "install" | "services"; intent: AnswerIntent; label: LocalizedText }
  | { id: "demo" | "play"; slug: string; label: LocalizedText };

export const headline: LocalizedText = tx(
  "I build what answers your customers.",
  "أبني ما يردّ على زبائنك.",
  "אני בונה את מה שעונה ללקוחות שלכם.",
);

export const whatsappPrefill: LocalizedText = tx(
  "Hi Fathallah, I'd like to discuss a project.",
  "مرحبا فتحلله، أريد أن نتحدث عن مشروع.",
  "היי פתאללה, אשמח לדבר על פרויקט.",
);

/** Display order of the twelve cards: today's featured order, then the rest in portfolio.ts order, Saqroon last. */
export const cardOrder = [
  "elsewhereco",
  "whatsapp-ai-sales-agent",
  "bab",
  "solitaire",
  "little-keepsakes",
  "seeker-radar",
  "camp-and-hike",
  "nedaa-lifestyle",
  "darbak",
  "go-to-nature",
  "lulu-tokki",
  "saqroon",
];

/** Each project's names in Latin, Arabic and Hebrew script. Bare channel names (WhatsApp, Telegram) are never aliases. */
export const aliases: Record<string, Record<Locale, string[]>> = {
  "camp-and-hike": { en: ["camp & hike", "camp and hike"], ar: ["كامب اند هايك"], he: ["קמפ אנד הייק"] },
  "whatsapp-ai-sales-agent": {
    en: ["sales agent", "whatsapp agent", "whatsapp sales agent"],
    ar: ["وكيل المبيعات", "وكيل واتساب"],
    he: ["סוכן המכירות", "סוכן מכירות"],
  },
  bab: { en: ["bab"], ar: ["باب"], he: ["באב"] },
  "nedaa-lifestyle": { en: ["nedaa", "nedaa lifestyle"], ar: ["نداء"], he: ["נדאא"] },
  darbak: { en: ["darbak"], ar: ["دربك"], he: ["דרבק"] },
  "seeker-radar": { en: ["seeker radar"], ar: ["سيكر رادار"], he: ["סיקר ראדאר"] },
  "little-keepsakes": { en: ["little keepsakes", "keepsakes"], ar: ["ليتل كيبسيكس"], he: ["ליטל קיפסייקס"] },
  solitaire: { en: ["solitaire"], ar: ["سوليتير"], he: ["סוליטר"] },
  elsewhereco: { en: ["elsewhereco", "elsewhere"], ar: ["إلسويركو", "إلسوير"], he: ["אלסוור"] },
  "go-to-nature": { en: ["go to nature"], ar: ["غو تو نيتشر", "جو تو نيتشر"], he: ["גו טו נייצ'ר"] },
  "lulu-tokki": { en: ["lulu tokki", "lulu"], ar: ["لولو توكي", "لولو"], he: ["לולו טוקי", "לולו"] },
  saqroon: { en: ["saqroon", "saqr"], ar: ["صقرون"], he: ["סקרון"] },
};

export const chips: HomeChip[] = [
  { id: "live", intent: "live", label: tx("What's live?", "ما الذي يعمل الآن؟", "מה באוויר?") },
  { id: "install", intent: "install", label: tx("What can I install?", "ماذا يمكنني أن أثبّت؟", "מה אפשר להתקין?") },
  { id: "services", intent: "services", label: tx("What do you build?", "ماذا تبني؟", "מה אתה בונה?") },
  { id: "demo", slug: "whatsapp-ai-sales-agent", label: tx("Try the agent", "جرّب الوكيل", "נסו את הסוכן") },
  { id: "play", slug: "solitaire", label: tx("Play SOLitaire", "العب SOLitaire", "שחקו SOLitaire") },
];

/**
 * The answer rules. Matching order lives in home-answers.ts; patterns are normalised the same way as the
 * visitor's text before they are compiled, and Arabic and Hebrew patterns accept an attached prefix.
 */
export const rules: HomeRule[] = [
  {
    intent: "live",
    patterns: {
      en: ["live", "shipped", "launched", "in production", "online now"],
      ar: ["يعمل الآن", "تعمل الآن", "شغال", "منشور", "مباشر"],
      he: ["באוויר", "חי", "פעיל", "פעילים"],
    },
    answer: tx(
      "These are live now. Open one to see it working.",
      "هذه تعمل الآن. افتح أيًّا منها لتراه يعمل.",
      "אלה באוויר עכשיו. פתחו אחד כדי לראות אותו עובד.",
    ),
    items: "live",
    source: "projects",
  },
  {
    intent: "install",
    patterns: {
      en: ["install", "apk", "android", "download"],
      ar: ["تثبيت", "أثبت", "أثبّت", "تنزيل", "تحميل", "أندرويد"],
      he: ["להתקין", "התקנה", "הורדה", "להוריד", "אנדרואיד"],
    },
    answer: tx(
      "These have Android builds you can install today.",
      "لهذه نسخ أندرويد يمكنك تثبيتها اليوم.",
      "לאלה יש גרסאות אנדרואיד שאפשר להתקין היום.",
    ),
    items: "install",
    source: "downloads",
  },
  {
    intent: "services",
    patterns: {
      en: [
        "what do you build", "what do you do", "what do you offer", "services", "build a whatsapp",
        "build a telegram", "build an instagram", "whatsapp bot", "telegram bot", "instagram bot", "chatbot",
        "ai agent", "automation", "automate",
      ],
      ar: ["ماذا تبني", "شو بتبني", "خدمات", "خدماتك", "بوت", "روبوت محادثة", "وكيل ذكاء", "أتمتة"],
      he: ["מה אתה בונה", "שירותים", "בוט", "צ'אטבוט", "סוכן AI", "אוטומציה"],
    },
    answer: tx(
      "Three kinds of work: AI agents on WhatsApp, Instagram and Telegram, multilingual web and mobile products, and reliable cloud platforms.",
      "ثلاثة أنواع من العمل: وكلاء ذكاء اصطناعي على واتساب وإنستغرام وتيليغرام، ومنتجات ويب وموبايل متعددة اللغات، ومنصات سحابية موثوقة.",
      "שלושה סוגי עבודה: סוכני AI ב-WhatsApp, Instagram וטלגרם, מוצרי ווב ומובייל רב-לשוניים, ופלטפורמות ענן אמינות.",
    ),
    items: null,
    source: "services",
    link: "#services",
  },
  {
    intent: "process",
    patterns: {
      en: ["process", "how do you work", "how you work", "steps", "workflow", "timeline", "how long"],
      ar: ["كيف تعمل", "كيف بتشتغل", "طريقة العمل", "مراحل", "خطوات"],
      he: ["איך אתה עובד", "תהליך", "שלבים", "איך עובדים"],
    },
    answer: tx(
      "Four steps: frame the problem, shape the smallest architecture, build in visible slices, then operate and hand over.",
      "أربع خطوات: تحديد المشكلة، ثم أصغر هندسة تكفي، ثم البناء على مراحل مرئية، ثم التشغيل والتسليم.",
      "ארבעה שלבים: להגדיר את הבעיה, לעצב את הארכיטקטורה הקטנה ביותר, לבנות בחלקים גלויים, ואז להפעיל ולמסור.",
    ),
    items: null,
    source: "process",
    link: "#process",
  },
  {
    intent: "resume",
    patterns: {
      en: ["resume", "résumé", "cv", "curriculum vitae", "experience", "background"],
      ar: ["سيرة ذاتية", "السيرة الذاتية", "سيرتك", "سي في", "خبرة", "خبرتك"],
      he: ["קורות חיים", "ניסיון", "רקע"],
    },
    answer: tx("Here is the résumé, as a PDF.", "هذه السيرة الذاتية، ملف PDF.", "הנה קורות החיים, כקובץ PDF."),
    items: null,
    source: "resume",
    link: "resume",
  },
  {
    intent: "stack",
    patterns: {
      en: ["stack", "tech stack", "tools", "technologies", "kubernetes", "terraform", "argocd", "devops", "next.js", "react", "flutter"],
      ar: ["تقنيات", "أدوات", "ستاك", "كوبرنيتس"],
      he: ["טכנולוגיות", "כלים", "סטאק", "קוברנטיס"],
    },
    answer: tx("The tools, by kind of work:", "الأدوات حسب نوع العمل:", "הכלים, לפי סוג העבודה:"),
    items: null,
    source: "services",
    link: "#services",
  },
  {
    intent: "location",
    patterns: {
      en: ["where are you", "where do you live", "based", "location", "located", "time zone", "timezone", "remote"],
      ar: ["وين", "أين أنت", "مكانك", "موقعك", "من وين", "توقيت"],
      he: ["איפה אתה", "מאיפה", "מיקום", "אזור זמן"],
    },
    answer: tx("Where I work from:", "مكان العمل:", "מאיפה אני עובד:"),
    items: null,
    source: "contact",
    link: "#contact",
  },
  {
    intent: "contact",
    patterns: {
      en: ["contact", "reach you", "email", "phone", "call", "talk to you", "message you"],
      ar: ["تواصل", "أتواصل", "إيميل", "بريد", "رقمك", "هاتف"],
      he: ["ליצור קשר", "יצירת קשר", "טלפון", "מייל", "לדבר"],
    },
    answer: tx(
      "WhatsApp is quickest. Email and a project form are under Contact.",
      "واتساب هو الأسرع. البريد ونموذج المشروع في قسم التواصل.",
      "WhatsApp הכי מהיר. דוא״ל וטופס פרויקט נמצאים תחת יצירת קשר.",
    ),
    items: null,
    source: "contact",
    link: "#contact",
  },
  {
    intent: "price",
    patterns: {
      en: ["price", "prices", "pricing", "cost", "costs", "how much", "budget", "quote", "rate", "rates", "fee"],
      ar: ["سعر", "أسعار", "تكلفة", "كلفة", "قديش", "بكم", "كم يكلف", "ميزانية"],
      he: ["מחיר", "מחירים", "כמה עולה", "עלות", "תקציב", "הצעת מחיר"],
    },
    answer: tx(
      "Prices are quoted per project, after a short conversation about what you need. Ask on WhatsApp.",
      "الأسعار حسب كل مشروع، بعد محادثة قصيرة عما تحتاجه. اسأل على واتساب.",
      "המחיר נקבע לכל פרויקט, אחרי שיחה קצרה על מה שאתם צריכים. שאלו ב-WhatsApp.",
    ),
    items: null,
    source: "contact",
    whatsappPrefill: tx(
      "Hi Fathallah, I'd like a quote for a project.",
      "مرحبا فتحلله، أريد عرض سعر لمشروع.",
      "היי פתאללה, אשמח להצעת מחיר לפרויקט.",
    ),
  },
  {
    intent: "play",
    patterns: {
      en: ["play", "game", "card game"],
      ar: ["العب", "لعبة"],
      he: ["לשחק", "משחק"],
    },
    answer: tx(
      "SOLitaire's classic table is playable right here.",
      "طاولة SOLitaire الكلاسيكية قابلة للعب هنا.",
      "השולחן הקלאסי של SOLitaire זמין למשחק כאן.",
    ),
    items: ["solitaire"],
    source: "projects",
  },
  {
    intent: "demo",
    patterns: {
      en: ["demo", "try the agent", "test the agent", "agent demo", "shop agent"],
      ar: ["ديمو", "جرب الوكيل", "جرّب الوكيل", "تجربة الوكيل", "وكيل المتجر"],
      he: ["דמו", "לנסות את הסוכן", "נסו את הסוכן", "סוכן החנות"],
    },
    answer: tx(
      "Try the WhatsApp sales agent on a demo shop. Nothing you type leaves the page.",
      "جرّب وكيل المبيعات على واتساب مع متجر تجريبي. لا يغادر ما تكتبه الصفحة.",
      "נסו את סוכן המכירות ל-WhatsApp על חנות לדוגמה. מה שתכתבו לא יוצא מהעמוד.",
    ),
    items: ["whatsapp-ai-sales-agent"],
    source: "projects",
  },
];

export const unknownAnswer: LocalizedText = tx(
  "I don't have an approved answer for that. Send it to me on WhatsApp and I'll answer myself.",
  "ليس لديّ جواب معتمد على هذا. أرسله لي على واتساب وسأجيبك بنفسي.",
  "אין לי תשובה מאושרת לזה. שלחו לי את זה ב-WhatsApp ואענה בעצמי.",
);

/** Visitor words for the four-field line under each answer, and the language names it shows. */
export const glossary = {
  fields: {
    language: tx("Asked in", "اللغة", "נשאל ב"),
    understood: tx("Understood as", "فُهم على أنه", "הובן כ"),
    source: tx("Answer from", "مصدر الجواب", "התשובה מ"),
    takeover: tx("A person takes over", "يتولى إنسان", "אדם ממשיך"),
  },
  languages: {
    en: tx("English", "الإنجليزية", "אנגלית"),
    ar: tx("Arabic", "العربية", "ערבית"),
    he: tx("Hebrew", "العبرية", "עברית"),
  } satisfies Record<Locale, LocalizedText>,
  sources: {
    projects: tx("the project list", "قائمة المشاريع", "רשימת הפרויקטים"),
    downloads: tx("the download list", "قائمة التنزيلات", "רשימת ההורדות"),
    services: tx("the services section", "قسم الخدمات", "פרק השירותים"),
    process: tx("the process section", "قسم المنهج", "פרק התהליך"),
    resume: tx("the résumé", "السيرة الذاتية", "קורות החיים"),
    contact: tx("the contact section", "قسم التواصل", "פרק יצירת הקשר"),
    none: tx("no approved answer", "لا جواب معتمد", "אין תשובה מאושרת"),
  } satisfies Record<AnswerSource, LocalizedText>,
  takeover: {
    no: tx("Not needed", "غير مطلوب", "לא נדרש"),
    yes: tx("Your call, on WhatsApp", "القرار لك، عبر واتساب", "ההחלטה שלכם, ב-WhatsApp"),
  },
};

export const labels = {
  ask: tx("Ask about the work", "اسأل عن الأعمال", "שאלו על העבודות"),
  send: tx("Ask", "اسأل", "שאלו"),
  seeIt: tx("See it", "شاهده", "לצפייה"),
  askAnother: tx("Ask another", "اسأل سؤالًا آخر", "שאלו שאלה נוספת"),
  moreAnswers: tx("More answers", "إجابات أخرى", "תשובות נוספות"),
  sendOnWhatsApp: tx("Send it on WhatsApp", "أرسله على واتساب", "שלחו ב-WhatsApp"),
  openResume: tx("Open the résumé", "افتح السيرة الذاتية", "לפתיחת קורות החיים"),
  readMore: tx("Read more", "اقرأ المزيد", "לקריאה נוספת"),
  calls: {
    all: tx("All", "الكل", "הכול"),
    live: tx("Live product", "منتج مباشر", "מוצר חי"),
    install: tx("Install a preview", "ثبّت نسخة تجريبية", "התקינו גרסת ניסיון"),
    again: tx("Deal again", "وزّع من جديد", "חלקו שוב"),
  },
  sheet: {
    close: tx("Close", "إغلاق", "סגירה"),
    playHand: tx("Play a hand", "العب جولة", "שחקו יד"),
    readCase: tx("Read the case study", "اقرأ دراسة الحالة", "לקריאת התיאור המלא"),
  },
};
