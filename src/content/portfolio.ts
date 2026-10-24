export const locales = ["en", "ar", "he"] as const;

export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;
export type ProjectStatus =
  | "live-product"
  | "public-build"
  | "private-build"
  | "in-development";

export type ContactLink = {
  label: LocalizedText;
  href: string;
  kind: "email" | "social" | "resume" | "whatsapp";
};

export type Profile = {
  name: string;
  role: LocalizedText;
  headline: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
  email: string;
  contactLinks: ContactLink[];
};

export type ServicePath = {
  id: "product" | "automation" | "reliability";
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  signals: string[];
};

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
  fit?: "cover" | "contain";
  /** A live page shown over the still once it loads; width and height are the size the still was captured at. */
  embed?: { src: string; width: number; height: number; label?: LocalizedText };
};

export type ProofLink = {
  label: LocalizedText;
  href: string;
  kind: "live" | "repo" | "download";
  note?: LocalizedText;
};

export type ArchitectureNode = {
  label: LocalizedText;
  detail: LocalizedText;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  audience: LocalizedText;
  role: LocalizedText;
  status: ProjectStatus;
  statusNote: LocalizedText;
  capabilities: LocalizedText[];
  evidence: LocalizedText[];
  stack: string[];
  architecture: ArchitectureNode[];
  nextStep: LocalizedText;
  media: ProjectMedia[];
  links: ProofLink[];
  featured: boolean;
  customerPath: "business" | "startup";
};

export type ContactBrief = {
  name: string;
  reply: string;
  company?: string;
  category: "product" | "automation" | "reliability" | "unsure";
  message: string;
};

export const tx = (en: string, ar: string, he: string): LocalizedText => ({
  en,
  ar,
  he,
});

export const t = (value: LocalizedText, locale: Locale) => value[locale];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const localizedPath = (locale: Locale, path = "/") => {
  if (path.startsWith("/#") || path.startsWith("#")) {
    const fragment = path.slice(path.indexOf("#"));
    return `${locale === "en" ? "/" : `/${locale}`}${fragment}`;
  }
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? normalized || "/" : `/${locale}${normalized}`;
};

export const profile: Profile = {
  name: "Fathallah Haj",
  role: tx(
    "Independent product & DevOps engineer",
    "مهندس منتجات وDevOps مستقل",
    "מהנדס מוצר ו-DevOps עצמאי",
  ),
  headline: tx(
    "I build digital systems that sell, automate, and stay reliable.",
    "أبني أنظمة رقمية تبيع، تؤتمت، وتبقى موثوقة.",
    "אני בונה מערכות דיגיטליות שמוכרות, מבצעות אוטומציה ונשארות אמינות.",
  ),
  summary: tx(
    "I help startups and ambitious regional businesses launch multilingual products, put AI agents to work on WhatsApp, Instagram and Telegram, and run dependable cloud platforms.",
    "أساعد الشركات الناشئة والأعمال الطموحة في المنطقة على إطلاق منتجات متعددة اللغات، وتشغيل وكلاء ذكاء اصطناعي على واتساب وإنستغرام وتيليغرام، وتشغيل منصات سحابية موثوقة.",
    "אני עוזר לסטארטאפים ולעסקים אזוריים שאפתניים להשיק מוצרים רב-לשוניים, להפעיל סוכני AI ב-WhatsApp, Instagram וטלגרם, ולהפעיל פלטפורמות ענן אמינות.",
  ),
  description: tx(
    "Fathallah Haj builds multilingual digital products, AI agents on WhatsApp, Instagram and Telegram, and reliable cloud platforms for startups and regional businesses.",
    "فتحلله حاج يبني منتجات رقمية متعددة اللغات، وأتمتة بالذكاء الاصطناعي، ومنصات سحابية موثوقة للشركات الناشئة والأعمال الإقليمية.",
    "פתאללה חאג' בונה מוצרים דיגיטליים רב-לשוניים, אוטומציית AI ופלטפורמות ענן אמינות לסטארטאפים ולעסקים אזוריים.",
  ),
  location: tx(
    "Remote · Israel time zone",
    "عن بُعد · توقيت إسرائيل",
    "מרחוק · אזור הזמן של ישראל",
  ),
  email: "fatoh.haj@gmail.com",
  contactLinks: [
    {
      label: tx("Email", "البريد الإلكتروني", "דוא״ל"),
      href: "mailto:fatoh.haj@gmail.com?subject=Project%20inquiry",
      kind: "email",
    },
    {
      label: tx("WhatsApp", "واتساب", "WhatsApp"),
      href: "https://wa.me/972545964855?text=Hi%20Fathallah%2C%20I%27d%20like%20to%20discuss%20a%20project.",
      kind: "whatsapp",
    },
    {
      label: tx("Resume", "السيرة الذاتية", "קורות חיים"),
      href: "/Fathallah_Haj_DevOps_CV_2026.pdf",
      kind: "resume",
    },
    {
      label: tx("GitHub", "GitHub", "GitHub"),
      href: "https://github.com/fatoh2",
      kind: "social",
    },
    {
      label: tx("LinkedIn", "LinkedIn", "LinkedIn"),
      href: "https://linkedin.com/in/fathallah-haj-a59258123/",
      kind: "social",
    },
  ],
};

export const services: ServicePath[] = [
  {
    id: "automation",
    number: "01",
    title: tx(
      "Automate a workflow with AI",
      "أتمت سير عمل بالذكاء الاصطناعي",
      "להפוך תהליך לאוטומטי עם AI",
    ),
    summary: tx(
      "AI agents that work where your customers already are: WhatsApp, Instagram and Telegram. Grounded in your catalog and business rules, with review gates and a clear human takeover path.",
      "وكلاء ذكاء اصطناعي يعملون حيث يوجد عملاؤك أصلاً: واتساب وإنستغرام وتيليغرام. مبنيون على الكتالوج وقواعد العمل، مع نقاط مراجعة ومسار واضح للتدخل البشري.",
      "סוכני AI שעובדים במקום שבו הלקוחות שלכם כבר נמצאים: WhatsApp, Instagram וטלגרם. מבוססים על הקטלוג וכללי העסק, עם נקודות בקרה ומעבר ברור לאדם.",
    ),
    signals: ["WhatsApp Cloud API", "Instagram API", "Telegram bots", "LLM tools", "Evaluations"],
  },
  {
    id: "product",
    number: "02",
    title: tx("Launch a digital product", "أطلق منتجاً رقمياً", "להשיק מוצר דיגיטלי"),
    summary: tx(
      "From idea and product architecture to a multilingual web or mobile experience, admin tools, payments, and production delivery.",
      "من الفكرة وهندسة المنتج إلى تجربة ويب أو موبايل متعددة اللغات، وأدوات الإدارة، والدفع، والإطلاق للإنتاج.",
      "מרעיון וארכיטקטורת מוצר ועד חוויית ווב או מובייל רב-לשונית, כלי ניהול, תשלומים ועלייה לייצור.",
    ),
    signals: ["Next.js", "React", "Flutter", "PostgreSQL", "Payments"],
  },
  {
    id: "reliability",
    number: "03",
    title: tx("Make the platform reliable", "اجعل المنصة موثوقة", "להפוך את הפלטפורמה לאמינה"),
    summary: tx(
      "Infrastructure as code, Kubernetes, GitOps, delivery pipelines, observability, security controls, and operational runbooks.",
      "بنية تحتية ككود، Kubernetes، GitOps، خطوط تسليم، مراقبة، ضوابط أمنية، وأدلة تشغيل.",
      "תשתית כקוד, Kubernetes, GitOps, תהליכי מסירה, ניטור, בקרות אבטחה וספרי הפעלה.",
    ),
    signals: ["Kubernetes", "Terraform", "ArgoCD", "Prometheus", "CI/CD"],
  },
];

const commonLive = tx(
  "Live product work; private source",
  "منتج مباشر؛ الشيفرة خاصة",
  "מוצר חי; קוד פרטי",
);

// Where the live SOLitaire hero is served. Production by default; NEXT_PUBLIC_SOLITAIRE_ORIGIN points a local or
// preview build at another SOLitaire server (its /embed/ pages allow fhaj.dev and localhost to frame them).
const solitaireOrigin = process.env.NEXT_PUBLIC_SOLITAIRE_ORIGIN ?? "https://sol-solitaire.com";
const heroLabel = tx("Live · pick a suit", "مباشر · اختر رمزًا", "חי · בחרו צורה");

export const solitaireMedia = {
  hero: {
    src: "/labs/solitaire/solitaire-suit-hero-desktop.jpg", width: 2560, height: 1600,
    alt: tx(
      "SOLitaire website hero in sapphire spades: the headline Same deck, a fanned court of spades, four suit buttons and two tables racing on the same seven cards",
      "واجهة موقع SOLitaire باللون الياقوتي للبستوني: عنوان Same deck ومروحة أوراق البلاط البستوني وأربعة أزرار للرموز وطاولتان تتسابقان على البطاقات السبع نفسها",
      "ראש אתר SOLitaire בכחול ספיר של עלה: הכותרת Same deck, מניפת קלפי חצר בעלה, ארבעה כפתורי צורה ושני שולחנות שמתחרים על אותם שבעה קלפים",
    ),
    caption: tx("Website hero, live: pick a suit and the page takes its colour", "واجهة الموقع مباشرة: اختر رمزًا لتأخذ الصفحة لونه", "ראש האתר, חי: בחרו צורה והעמוד מקבל את צבעה"),
    fit: "contain",
    embed: { src: `${solitaireOrigin}/embed/hero`, width: 1280, height: 800, label: heroLabel },
  },
  mobileHero: {
    src: "/labs/solitaire/solitaire-suit-hero-mobile.jpg", width: 1170, height: 2601,
    alt: tx(
      "SOLitaire website hero on a phone in sapphire spades, with the Play button, the court fan, the suit buttons and the shared deal",
      "واجهة موقع SOLitaire على الهاتف باللون الياقوتي مع زر اللعب ومروحة أوراق البلاط وأزرار الرموز والتوزيعة المشتركة",
      "ראש אתר SOLitaire בטלפון בכחול ספיר, עם כפתור המשחק, מניפת קלפי החצר, כפתורי הצורות והחלוקה המשותפת",
    ),
    caption: tx("Website hero on a phone, live", "واجهة الموقع على الهاتف، مباشرة", "ראש האתר בטלפון, חי"),
    fit: "contain",
    embed: { src: `${solitaireOrigin}/embed/hero`, width: 390, height: 867 },
  },
  gameplay: {
    src: "/labs/solitaire/solitaire-suit-table-live-mobile.jpg", width: 1179, height: 2622,
    alt: tx(
      "Playable SOLitaire Klondike table on a phone: four foundations in their suit colours, seven columns, the draw pile, moves and score",
      "طاولة Klondike قابلة للعب من SOLitaire على الهاتف: أربعة أساسات بألوان رموزها وسبعة أعمدة وكومة السحب والحركات والنقاط",
      "שולחן Klondike של SOLitaire שאפשר לשחק בו בטלפון: ארבעה יסודות בצבעי הצורות, שבע עמודות, ערימת משיכה, מהלכים וניקוד",
    ),
    caption: tx("Classic table, playable: tap a card to play it", "الطاولة الكلاسيكية قابلة للعب: انقر على ورقة لتلعبها", "השולחן הקלאסי, אפשר לשחק: הקישו על קלף כדי לשחק בו"),
    fit: "contain",
    embed: { src: `${solitaireOrigin}/embed/table`, width: 393, height: 874 },
  },
  lobby: {
    src: "/labs/solitaire/solitaire-suit-home-desktop.jpg", width: 2560, height: 1600,
    alt: tx(
      "SOLitaire game home on desktop with the Play, Compete and Daily hubs in sapphire, ruby and gold",
      "الصفحة الرئيسية للعبة SOLitaire على سطح المكتب مع أقسام اللعب والمنافسة واليومي بالياقوتي والأحمر والذهبي",
      "מסך הבית של המשחק SOLitaire במחשב עם מרכזי Play, Compete ו-Daily בכחול ספיר, אודם וזהב",
    ),
    caption: tx("Game home, desktop", "الصفحة الرئيسية للعبة على سطح المكتب", "מסך הבית של המשחק במחשב"),
    fit: "contain",
  },
} satisfies Record<string, ProjectMedia>;

const liveLink = (href: string): ProofLink => ({
  label: tx("Visit live product", "زيارة المنتج", "למוצר החי"),
  href,
  kind: "live",
});

const repoLink = (href: string): ProofLink => ({
  label: tx("View public repository", "عرض المستودع العام", "למאגר הציבורי"),
  href,
  kind: "repo",
});

// Direct-install Android build served from public/downloads, same pattern as the FocusQuest beta.
const apkLink = (href: string, note: LocalizedText, label?: LocalizedText): ProofLink => ({
  label: label ?? tx(
    "Download Android beta (APK)",
    "تحميل نسخة أندرويد التجريبية (APK)",
    "הורדת גרסת בטא לאנדרואיד (APK)",
  ),
  href,
  kind: "download",
  note,
});

export const projects: PortfolioProject[] = [
  {
    slug: "camp-and-hike",
    title: "Camp & Hike",
    category: tx("Multilingual commerce & booking", "تجارة وحجوزات متعددة اللغات", "מסחר והזמנות רב-לשוניים"),
    summary: tx(
      "An Arabic-first adventure platform combining trips, commerce, content, payments, and complete administration across three languages.",
      "منصة مغامرات تبدأ بالعربية وتجمع الرحلات والتجارة والمحتوى والدفع والإدارة الكاملة بثلاث لغات.",
      "פלטפורמת הרפתקאות שמתחילה בערבית ומשלבת טיולים, מסחר, תוכן, תשלומים וניהול מלא בשלוש שפות.",
    ),
    problem: tx(
      "An adventure operator needs one credible customer journey for discovery, booking, products, content, and ongoing operations instead of disconnected tools.",
      "يحتاج مشغّل الرحلات إلى رحلة عميل موحّدة للاكتشاف والحجز والمنتجات والمحتوى والتشغيل، بدلاً من أدوات منفصلة.",
      "מפעיל הרפתקאות צריך מסע לקוח אמין לגילוי, הזמנה, מוצרים, תוכן ותפעול, במקום כלים מנותקים.",
    ),
    audience: tx("Regional adventure businesses and their customers", "شركات المغامرات الإقليمية وعملاؤها", "עסקי הרפתקאות אזוריים והלקוחות שלהם"),
    role: tx("Product architecture, engineering, and DevOps", "هندسة المنتج والتطوير وDevOps", "ארכיטקטורת מוצר, פיתוח ו-DevOps"),
    status: "live-product",
    statusNote: commonLive,
    capabilities: [
      tx("Arabic, Hebrew, and English storefront and trip discovery with correct bidirectional layouts.", "واجهة متجر واكتشاف رحلات بالعربية والعبرية والإنجليزية مع اتجاه صحيح.", "חנות וגילוי טיולים בערבית, עברית ואנגלית עם כיווניות נכונה."),
      tx("Trip booking, product catalog, HYP payments, authentication, and media storage.", "حجز رحلات وكتالوج منتجات ودفع HYP وتسجيل دخول وتخزين وسائط.", "הזמנת טיולים, קטלוג מוצרים, תשלומי HYP, אימות ואחסון מדיה."),
      tx("CMS and administration for trips, products, orders, content, and customers.", "نظام محتوى وإدارة للرحلات والمنتجات والطلبات والمحتوى والعملاء.", "CMS וניהול לטיולים, מוצרים, הזמנות, תוכן ולקוחות."),
    ],
    evidence: [
      tx("Public production experience", "تجربة إنتاج عامة", "חוויית ייצור ציבורית"),
      tx("Trilingual RTL/LTR implementation", "تنفيذ ثلاثي اللغات RTL/LTR", "מימוש תלת-לשוני RTL/LTR"),
      tx("Integrated commerce and operations", "تجارة وتشغيل متكاملان", "מסחר ותפעול משולבים"),
    ],
    stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "HYP", "Vercel Blob"],
    architecture: [
      { label: tx("Customer experience", "تجربة العميل", "חוויית לקוח"), detail: tx("Localized trips, products, content, checkout, and accounts.", "رحلات ومنتجات ومحتوى ودفع وحسابات محلية.", "טיולים, מוצרים, תוכן, תשלום וחשבונות מותאמים לשפה.") },
      { label: tx("Application core", "نواة التطبيق", "ליבת היישום"), detail: tx("Next.js server and client flows with role-aware access.", "تدفقات خادم وعميل بصلاحيات حسب الدور.", "תהליכי שרת ולקוח עם גישה לפי תפקיד.") },
      { label: tx("Operations", "التشغيل", "תפעול"), detail: tx("CMS, bookings, orders, customers, media, and operational records.", "محتوى وحجوزات وطلبات وعملاء ووسائط وسجلات تشغيل.", "CMS, הזמנות, לקוחות, מדיה ורשומות תפעול.") },
    ],
    nextStep: tx("Continue validating live purchase and booking journeys as operations grow.", "مواصلة اختبار مسارات الشراء والحجز مع توسع التشغيل.", "להמשיך לאמת מסלולי רכישה והזמנה עם צמיחת התפעול."),
    media: [
      { src: "/work/camp-and-hike/desktop.webp", width: 2880, height: 1800, alt: tx("Camp & Hike Arabic homepage over a mountain landscape on desktop", "الصفحة العربية لكامب أند هايك فوق منظر جبلي على الحاسوب", "דף הבית בערבית של Camp & Hike על רקע הרים במחשב"), caption: tx("Public Arabic homepage, desktop", "الصفحة العربية العامة على الحاسوب", "דף הבית הציבורי בערבית, מחשב") },
      { src: "/work/camp-and-hike/mobile.webp", width: 780, height: 1688, alt: tx("Camp & Hike Arabic homepage over a mountain landscape on a phone", "الصفحة العربية لكامب أند هايك فوق منظر جبلي على الهاتف", "דף הבית בערבית של Camp & Hike על רקע הרים בטלפון"), caption: tx("Public Arabic homepage, phone", "الصفحة العربية العامة على الهاتف", "דף הבית הציבורי בערבית, טלפון"), fit: "contain" },
    ],
    links: [liveLink("https://camp-and-hike.vercel.app/")],
    featured: false,
    customerPath: "business",
  },
  {
    slug: "whatsapp-ai-sales-agent",
    title: "Arabic-first WhatsApp AI Sales Agent",
    category: tx("AI business automation", "أتمتة أعمال بالذكاء الاصطناعي", "אוטומציה עסקית עם AI"),
    summary: tx(
      "A multi-tenant WhatsApp sales assistant grounded in catalog data and deterministic business rules, with evaluation, human takeover and in-chat order capture built in.",
      "مساعد مبيعات متعدد المستأجرين على واتساب، مرتبط ببيانات الكتالوج وقواعد عمل حتمية، مع تقييم وتحويل إلى موظف والتقاط الطلبات داخل المحادثة.",
      "עוזר מכירות רב-דיירי ל-WhatsApp, מבוסס על קטלוג וכללים עסקיים דטרמיניסטיים, עם הערכה, מעבר לאדם ולכידת הזמנות בתוך השיחה.",
    ),
    problem: tx("Business messaging becomes risky when AI can invent prices, ignore rules, or continue after a person should take over.", "تصبح مراسلات الأعمال خطرة عندما يخترع الذكاء الاصطناعي أسعاراً أو يتجاهل القواعد أو يستمر بعد الحاجة لموظف.", "הודעות עסקיות הופכות למסוכנות כאשר AI ממציא מחירים, מתעלם מכללים או ממשיך כשנדרש מעבר לאדם."),
    audience: tx("Arabic-speaking retail and service businesses", "متاجر وشركات خدمات ناطقة بالعربية", "עסקי קמעונאות ושירות דוברי ערבית"),
    role: tx("AI system design, backend, and safety controls", "تصميم نظام AI وخلفية وضوابط أمان", "תכנון מערכת AI, צד שרת ובקרות בטיחות"),
    status: "private-build",
    statusNote: tx("Private source; anonymized product evidence", "شيفرة خاصة؛ أدلة منتج مجهّلة", "קוד פרטי; ראיות מוצר אנונימיות"),
    capabilities: [
      tx("WhatsApp Cloud API message ingestion, delivery, and conversation state.", "استقبال وتسليم رسائل WhatsApp Cloud API وحالة المحادثة.", "קליטה ומסירה של הודעות WhatsApp Cloud API ומצב שיחה."),
      tx("Catalog-grounded responses with deterministic pricing, availability, and policy rules.", "ردود مرتبطة بالكتالوج مع قواعد حتمية للسعر والتوفر والسياسات.", "תשובות מבוססות קטלוג עם כללים דטרמיניסטיים למחיר, מלאי ומדיניות."),
      tx("Prompt versions, evaluation scenarios, outbound safety gates, and human takeover.", "إصدارات للقوالب وسيناريوهات تقييم وبوابات أمان وتحويل للموظف.", "גרסאות הנחיה, תרחישי הערכה, שערי בטיחות ומעבר לאדם."),
    ],
    evidence: [tx("Deterministic business-rule layer", "طبقة قواعد عمل حتمية", "שכבת כללים עסקיים דטרמיניסטית"), tx("Human takeover state machine", "آلة حالات للتحويل البشري", "מכונת מצבים למעבר לאדם"), tx("Evaluation and outbound safety gates", "تقييم وبوابات أمان للإرسال", "הערכה ושערי בטיחות לשליחה")],
    stack: ["WhatsApp Cloud API", "TypeScript", "LLM APIs", "PostgreSQL", "Webhooks", "Evaluations"],
    architecture: [
      { label: tx("Message gateway", "بوابة الرسائل", "שער הודעות"), detail: tx("Verifies webhooks and normalizes inbound customer messages.", "يتحقق من Webhooks ويوحّد رسائل العملاء.", "מאמת webhooks ומנרמל הודעות לקוח נכנסות.") },
      { label: tx("Business guardrails", "ضوابط العمل", "כללים עסקיים"), detail: tx("Applies catalog, pricing, availability, consent, and escalation rules.", "يطبق قواعد الكتالوج والسعر والتوفر والموافقة والتصعيد.", "מחיל כללי קטלוג, מחיר, מלאי, הסכמה והסלמה.") },
      { label: tx("Assistant runtime", "محرك المساعد", "זמן ריצה של העוזר"), detail: tx("Generates grounded Arabic responses and yields control when required.", "ينشئ ردوداً عربية موثوقة ويسلّم التحكم عند الحاجة.", "מייצר תשובות בערבית ומעביר שליטה כשנדרש.") },
    ],
    nextStep: tx("Connect a verified production number and approved catalog after final policy review.", "ربط رقم إنتاج موثّق وكتالوج معتمد بعد مراجعة السياسات.", "לחבר מספר ייצור מאומת וקטלוג מאושר לאחר בדיקת מדיניות."),
    media: [
      { src: "/work/whatsapp-ai-sales-agent/simulator-desktop.webp", width: 2880, height: 2000, alt: tx("The agent's simulator on desktop: an Arabic conversation where prices come from the approved catalog and a request for the owner is handed to a human, with the inspector explaining each reply", "محاكي الوكيل على الحاسوب: محادثة عربية تأتي أسعارها من الكتالوج المعتمد، وطلب التحدث مع صاحب المحل يُحوَّل إلى إنسان، مع لوحة تشرح كل رد", "סימולטור הסוכן במחשב: שיחה בערבית שבה המחירים מגיעים מהקטלוג המאושר ובקשה לדבר עם הבעלים מועברת לאדם, עם חלונית שמסבירה כל תשובה"), caption: tx("Simulator with a demo catalog; no real customers, no external sends", "المحاكي مع كتالوج تجريبي؛ لا عملاء حقيقيين ولا إرسال خارجي", "הסימולטור עם קטלוג לדוגמה; בלי לקוחות אמיתיים ובלי שליחה החוצה") },
      { src: "/work/whatsapp-ai-sales-agent/simulator-mobile.webp", width: 780, height: 1688, alt: tx("The same simulated conversation on a phone", "المحادثة المحاكاة نفسها على الهاتف", "אותה שיחה מדומה בטלפון"), caption: tx("Operator view on a phone", "عرض المشغّل على الهاتف", "תצוגת המפעיל בטלפון"), fit: "contain" },
      { src: "/work/whatsapp-ai-sales-agent/dashboard-desktop.webp", width: 2880, height: 2000, alt: tx("The operator's day view: setup progress, new conversations, replies by the agent, confirmed orders and revenue for a demo tenant", "صفحة اليوم للمشغّل: تقدّم الإعداد والمحادثات الجديدة وردود الوكيل والطلبات المؤكدة والإيراد لمستأجر تجريبي", "תצוגת היום של המפעיל: התקדמות ההגדרה, שיחות חדשות, תשובות הסוכן, הזמנות מאושרות והכנסה לדייר לדוגמה"), caption: tx("Operator dashboard, demo tenant", "لوحة المشغّل، مستأجر تجريبي", "לוח המפעיל, דייר לדוגמה") },
    ],
    links: [],
    featured: true,
    customerPath: "business",
  },
  {
    slug: "bab",
    title: "Bab (باب)",
    category: tx("AI referral agent for job seekers", "وكيل ذكاء اصطناعي للتوظيف عبر الإحالة", "סוכן AI להשמה דרך המלצות"),
    summary: tx(
      "Two AI agents broker vetted job referrals for the Arab community in Israel: a seeker agent that writes CVs only from confirmed facts, and a referrer agent that protects the people who refer. Arabic, Hebrew and English, on WhatsApp and the web.",
      "وكيلان من الذكاء الاصطناعي يرتّبان إحالات توظيف موثوقة للمجتمع العربي في إسرائيل: وكيل للباحث يكتب سيرته من حقائق مؤكدة فقط، ووكيل للمُحيل يحمي من يُحيل. بالعربية والعبرية والإنجليزية، على واتساب والويب.",
      "שני סוכני AI מתווכים המלצות עבודה מאומתות לחברה הערבית בישראל: סוכן למחפש שכותב קורות חיים רק מעובדות מאושרות, וסוכן לממליץ שמגן על מי שממליץ. בערבית, עברית ואנגלית, ב-WhatsApp ובאתר.",
    ),
    problem: tx(
      "Hi-tech hires through referrals, and most Arab graduates know nobody inside. Open referral marketplaces burn out the few people willing to refer.",
      "الهايتك يوظّف عبر الإحالات، ومعظم الخريجين العرب لا يعرفون أحداً في الداخل. أسواق الإحالة المفتوحة تُنهك القلّة المستعدة للإحالة.",
      "ההייטק מגייס דרך המלצות, ורוב הבוגרים הערבים לא מכירים אף אחד בפנים. שוקי המלצות פתוחים שוחקים את המעטים שמוכנים להמליץ.",
    ),
    audience: tx("Job seekers from the Arab community in Israel, and the employees who refer them", "باحثون عن عمل من المجتمع العربي في إسرائيل، والموظفون الذين يُحيلونهم", "מחפשי עבודה מהחברה הערבית בישראל, והעובדים שממליצים עליהם"),
    role: tx("Product design, agent architecture and full-stack engineering", "تصميم المنتج وهندسة الوكلاء والتطوير Full-stack", "עיצוב מוצר, ארכיטקטורת סוכנים ופיתוח Full-stack"),
    status: "in-development",
    statusNote: tx("Private source; running for invited testers; no hire claims yet", "شيفرة خاصة؛ يعمل لمختبرين مدعوين؛ بلا ادعاءات توظيف بعد", "קוד פרטי; פועל לבודקים מוזמנים; עדיין ללא טענות על גיוס"),
    capabilities: [
      tx("Seeker agent: a fact base confirmed line by line, CVs that cite only those facts, and fit scores with honest gaps.", "وكيل الباحث: قاعدة حقائق تُؤكَّد سطراً سطراً، وسيرة ذاتية تستند إلى تلك الحقائق فقط، ودرجات ملاءمة بفجوات صريحة.", "סוכן המחפש: בסיס עובדות שמאושר שורה אחר שורה, קורות חיים שמצטטים רק אותן, וציוני התאמה עם פערים כנים."),
      tx("Referrer agent: register an employer once, set a weekly cap, judge a packet in thirty seconds; names are released only on yes.", "وكيل المُحيل: تسجيل جهة العمل مرة واحدة، وسقف أسبوعي، وحزمة تُقيَّم في ثلاثين ثانية؛ الأسماء تُكشف فقط عند الموافقة.", "סוכן הממליץ: רישום מעסיק פעם אחת, מכסה שבועית, חבילה שנשפטת בשלושים שניות; שמות נחשפים רק אחרי כן."),
      tx("One conversation across WhatsApp and the web in three languages, with an operator queue, an audit log and approved consent texts.", "محادثة واحدة عبر واتساب والويب بثلاث لغات، مع طابور للمشغّل وسجل تدقيق ونصوص موافقة معتمدة.", "שיחה אחת לאורך WhatsApp והאתר בשלוש שפות, עם תור למפעיל, יומן ביקורת ונוסחי הסכמה מאושרים."),
    ],
    evidence: [
      tx("Deployed for invited testers", "منشور لمختبرين مدعوين", "פרוס לבודקים מוזמנים"),
      tx("Reads live roles from public job boards", "يقرأ وظائف حقيقية من لوحات توظيف عامة", "קורא משרות חיות מלוחות דרושים ציבוריים"),
      tx("Every outward action behind an approval gate", "كل إجراء خارجي خلف بوابة موافقة", "כל פעולה כלפי חוץ מאחורי שער אישור"),
    ],
    stack: ["TypeScript", "PostgreSQL + pgvector", "Redis", "WhatsApp Cloud API", "Claude API", "Vercel", "Railway"],
    architecture: [
      { label: tx("Seeker agent", "وكيل الباحث", "סוכן המחפש"), detail: tx("Intake interview, confirmed facts, CVs and fit scores that cite them.", "مقابلة استقبال، وحقائق مؤكدة، وسير ذاتية ودرجات ملاءمة تستند إليها.", "ריאיון קליטה, עובדות מאושרות, קורות חיים וציוני התאמה שמצטטים אותן.") },
      { label: tx("Referral engine", "محرك الإحالة", "מנוע ההמלצות"), detail: tx("Matches referable fits to referrers with capacity, builds the packet, tracks every outcome.", "يطابق الملاءمات القابلة للإحالة مع مُحيلين لديهم سعة، ويبني الحزمة، ويتتبع كل نتيجة.", "מתאים התאמות ראויות להמלצה לממליצים עם קיבולת, בונה את החבילה ועוקב אחרי כל תוצאה.") },
      { label: tx("Operator console", "لوحة المشغّل", "קונסולת המפעיל"), detail: tx("Approval queue, funnel by route and door, stop rules and any conversation handed over.", "طابور موافقات، وقمع حسب المسار والباب، وقواعد إيقاف، وأي محادثة تُسلَّم للمشغّل.", "תור אישורים, משפך לפי מסלול ודלת, כללי עצירה וכל שיחה שמועברת למפעיל.") },
    ],
    nextStep: tx("The first real form submission and the first verified hire; a legal entity and a lawyer before public launch.", "أول تقديم حقيقي وأول توظيف موثّق؛ كيان قانوني ومحامٍ قبل الإطلاق العام.", "ההגשה האמיתית הראשונה והגיוס המאומת הראשון; ישות משפטית ועורך דין לפני השקה ציבורית."),
    media: [
      { src: "/work/bab/desktop.webp", width: 2880, height: 1800, fit: "contain", alt: tx("Bab's Arabic front door on desktop: a door to your first hi-tech job, with a demo role card and a referral request", "واجهة باب العربية على الحاسوب: باب إلى عملك الأول في الهايتك، مع بطاقة وظيفة تجريبية وطلب إحالة", "דף הכניסה של באב בערבית במחשב: דלת לעבודה הראשונה בהייטק, עם כרטיס משרה לדוגמה ובקשת המלצה"), caption: tx("Front door, tester deployment, demo content", "الواجهة الأمامية، نسخة المختبرين، محتوى تجريبي", "דלת הכניסה, פריסת בודקים, תוכן לדוגמה") },
      { src: "/work/bab/mobile.webp", width: 780, height: 1688, alt: tx("Bab's Arabic front door on a phone", "واجهة باب العربية على الهاتف", "דף הכניסה של באב בערבית בטלפון"), caption: tx("Front door on a phone", "الواجهة على الهاتف", "דלת הכניסה בטלפון"), fit: "contain" },
    ],
    links: [],
    featured: true,
    customerPath: "startup",
  },
  {
    slug: "nedaa-lifestyle",
    title: "Nedaa Lifestyle",
    category: tx("Studio booking app and back office", "تطبيق حجز وإدارة لاستوديو", "אפליקציית הזמנות וניהול לסטודיו"),
    summary: tx(
      "An Arabic-first mobile app for a women-only Pilates studio in Nazareth: members book and cancel classes, and the trainer runs the studio from the same app, on top of the website's existing booking and payment data.",
      "تطبيق موبايل يبدأ بالعربية لاستوديو بيلاتس نسائي في الناصرة: العضوات يحجزن ويلغين الحصص، والمدرّبة تدير الاستوديو من التطبيق نفسه، فوق بيانات الحجز والدفع الموجودة في موقع الاستوديو.",
      "אפליקציית מובייל בערבית לסטודיו פילאטיס לנשים בנצרת: המתאמנות מזמינות ומבטלות שיעורים, והמאמנת מנהלת את הסטודיו מאותה אפליקציה, על גבי נתוני ההזמנות והתשלומים הקיימים של האתר.",
    ),
    problem: tx(
      "The studio already ran on WordPress, Amelia bookings and PayPlus payments. A second system would have split members, packages and payments in two.",
      "الاستوديو يعمل أصلاً على WordPress وحجوزات Amelia ومدفوعات PayPlus. نظام ثانٍ كان سيقسم العضوات والباقات والمدفوعات إلى نصفين.",
      "הסטודיו כבר רץ על WordPress, הזמנות Amelia ותשלומי PayPlus. מערכת שנייה הייתה מפצלת מתאמנות, חבילות ותשלומים לשניים.",
    ),
    audience: tx("A boutique fitness studio, its members and its trainer", "استوديو لياقة صغير، وعضواته، ومدرّبته", "סטודיו כושר בוטיק, המתאמנות שלו והמאמנת"),
    role: tx("Product design, mobile engineering and the WordPress integration", "تصميم المنتج وتطوير الموبايل والتكامل مع WordPress", "עיצוב מוצר, פיתוח מובייל והאינטגרציה עם WordPress"),
    status: "in-development",
    statusNote: tx("Client app; iOS in App Store review, Android build below, plugin live on the studio's site", "تطبيق لعميل؛ iOS قيد مراجعة App Store، ونسخة أندرويد أدناه، والإضافة تعمل على موقع الاستوديو", "אפליקציה ללקוח; iOS בבדיקת App Store, גרסת אנדרואיד למטה, התוסף פעיל באתר הסטודיו"),
    capabilities: [
      tx("Members: weekly schedule, booking and cancelling, packages and sessions left, Arabic-first with English.", "العضوات: جدول أسبوعي، وحجز وإلغاء، وباقات وحصص متبقية، بالعربية أولاً مع الإنجليزية.", "מתאמנות: לוח שבועי, הזמנה וביטול, חבילות ומפגשים שנותרו, ערבית תחילה עם אנגלית."),
      tx("Back office in the app: approvals, attendance, payments and refunds, schedule, reports, admins and account deletion.", "إدارة من داخل التطبيق: موافقات، وحضور، ومدفوعات واستردادات، وجدول، وتقارير، ومديرون، وحذف الحساب.", "משרד אחורי באפליקציה: אישורים, נוכחות, תשלומים והחזרים, לוח, דוחות, מנהלים ומחיקת חשבון."),
      tx("A WordPress plugin exposes Amelia and WooCommerce data to the app, so the website stays the single source of truth.", "إضافة WordPress تعرض بيانات Amelia وWooCommerce للتطبيق، فيبقى الموقع المصدر الوحيد للحقيقة.", "תוסף WordPress חושף את נתוני Amelia ו-WooCommerce לאפליקציה, כך שהאתר נשאר מקור האמת היחיד."),
    ],
    evidence: [
      tx("Plugin live on the studio's production site", "الإضافة تعمل على موقع الاستوديو الفعلي", "התוסף פעיל באתר הייצור של הסטודיו"),
      tx("Booking and cancelling tested against real classes", "الحجز والإلغاء مختبران على حصص حقيقية", "הזמנה וביטול נבדקו מול שיעורים אמיתיים"),
      tx("Audit log for every admin action", "سجل تدقيق لكل إجراء إداري", "יומן ביקורת לכל פעולת ניהול"),
    ],
    stack: ["Expo", "React Native", "TypeScript", "WordPress plugin (PHP)", "Amelia", "WooCommerce", "PayPlus", "EAS"],
    architecture: [
      { label: tx("Member app", "تطبيق العضوات", "אפליקציית המתאמנות"), detail: tx("Schedule, bookings, packages and profile, with the trainer's screens behind a role.", "جدول وحجوزات وباقات وملف شخصي، مع شاشات المدرّبة خلف صلاحية.", "לוח, הזמנות, חבילות ופרופיל, עם מסכי המאמנת מאחורי תפקיד.") },
      { label: tx("Plugin API", "واجهة الإضافة", "ממשק התוסף"), detail: tx("Authenticated endpoints that replay the website's own booking calls server-side.", "نقاط نهاية موثّقة تعيد تنفيذ نداءات الحجز الخاصة بالموقع من جهة الخادم.", "נקודות קצה מאומתות שמריצות את קריאות ההזמנה של האתר עצמו בצד השרת.") },
      { label: tx("Studio systems", "أنظمة الاستوديو", "מערכות הסטודיו"), detail: tx("Amelia keeps capacity, packages and emails; WooCommerce and PayPlus keep the money.", "Amelia يحفظ السعة والباقات والرسائل؛ WooCommerce وPayPlus يحفظان المال.", "Amelia שומר קיבולת, חבילות ודוא\"ל; WooCommerce ו-PayPlus שומרים את הכסף.") },
    ],
    nextStep: tx("Walk the admin screens on a phone, test a real refund, then ship the iOS and Android builds.", "تجربة شاشات الإدارة على الهاتف، واختبار استرداد حقيقي، ثم إصدار نسختي iOS وأندرويد.", "לעבור על מסכי הניהול בטלפון, לבדוק החזר אמיתי, ואז לשחרר את גרסאות iOS ואנדרואיד."),
    media: [
      { src: "/work/nedaa-lifestyle/member-home.webp", width: 780, height: 1691, alt: tx("Member home on a phone: the studio photo, the next booking, sessions left as dots and open classes this week", "الصفحة الرئيسية للعضوة على الهاتف: صورة الاستوديو والحجز القادم والجلسات المتبقية كنقاط والحصص المتاحة هذا الأسبوع", "מסך הבית של המתאמנת בטלפון: תמונת הסטודיו, ההזמנה הבאה, מפגשים שנותרו כנקודות ושיעורים פתוחים השבוע"), caption: tx("Member home, the live app on an iPhone", "الصفحة الرئيسية للعضوة، التطبيق الحي على آيفون", "מסך הבית של המתאמנת, האפליקציה החיה באייפון"), fit: "contain" },
      { src: "/work/nedaa-lifestyle/admin-dashboard.webp", width: 780, height: 1688, alt: tx("The trainer's dashboard: today's classes, bookings and free places", "لوحة المدرّبة: حصص اليوم والحجوزات والأماكن المتاحة", "לוח המאמנת: שיעורי היום, הזמנות ומקומות פנויים"), caption: tx("Trainer dashboard, demo data", "لوحة المدرّبة، بيانات تجريبية", "לוח המאמנת, נתוני דוגמה"), fit: "contain" },
      { src: "/work/nedaa-lifestyle/admin-reports.webp", width: 780, height: 1688, alt: tx("Studio reports: revenue by channel after refunds, classes, fill rate and new members", "تقارير الاستوديو: الإيراد حسب القناة بعد الاستردادات والحصص ونسبة الإشغال والعضوات الجدد", "דוחות הסטודיו: הכנסה לפי ערוץ אחרי החזרים, שיעורים, תפוסה ומתאמנות חדשות"), caption: tx("Reports, demo data", "التقارير، بيانات تجريبية", "דוחות, נתוני דוגמה"), fit: "contain" },
      { src: "/work/nedaa-lifestyle/admin-classes.webp", width: 780, height: 1688, alt: tx("Today's roster for the trainer with attendees and a booking waiting for approval", "قائمة حصص اليوم للمدرّبة مع الحاضرات وحجز بانتظار الموافقة", "רשימת השיעורים של היום למאמנת עם המשתתפות והזמנה שממתינה לאישור"), caption: tx("Roster, demo data", "قائمة الحصص، بيانات تجريبية", "רשימת שיעורים, נתוני דוגמה"), fit: "contain" },
    ],
    links: [
      apkLink(
        "/downloads/Nedaa-Lifestyle.apk",
        tx(
          "The studio's real Android app, connected to the live studio: members sign in with their nedaalifestyle.com account, and signing up creates a real account. Android will ask you to allow installs from your browser.",
          "تطبيق الاستوديو الفعلي لأندرويد، متصل بالاستوديو الحقيقي: العضوات يدخلن بحساب nedaalifestyle.com، وإنشاء حساب ينشئ حساباً حقيقياً. سيطلب أندرويد السماح بالتثبيت من المتصفح.",
          "אפליקציית האנדרואיד האמיתית של הסטודיו, מחוברת לסטודיו החי: מתאמנות נכנסות עם חשבון nedaalifestyle.com, והרשמה יוצרת חשבון אמיתי. אנדרואיד יבקש לאשר התקנה מהדפדפן.",
        ),
        tx("Download Android (APK)", "تحميل نسخة أندرويد (APK)", "הורדת גרסת אנדרואיד (APK)"),
      ),
    ],
    featured: false,
    customerPath: "business",
  },
  {
    slug: "darbak",
    title: "Darbak (دربك)",
    category: tx("Volunteering travel app", "تطبيق سفر تطوّعي", "אפליקציית טיולי התנדבות"),
    summary: tx(
      "An Arabic-first mobile app for volunteering trips abroad, limited to places the founder has personally lived and worked in, with a visa checker and a cost calculator.",
      "تطبيق موبايل يبدأ بالعربية لرحلات التطوع في الخارج، مقتصر على أماكن عاش وعمل فيها المؤسس بنفسه، مع فاحص تأشيرات وحاسبة تكاليف.",
      "אפליקציית מובייל בערבית לטיולי התנדבות בחו\"ל, מוגבלת למקומות שהמייסד חי ועבד בהם בעצמו, עם בודק ויזות ומחשבון עלויות.",
    ),
    problem: tx(
      "Arab travellers who want to volunteer abroad find scattered, English-only information, and agencies that charge for what hosts offer in exchange for work.",
      "المسافرون العرب الراغبون بالتطوع في الخارج يجدون معلومات متناثرة بالإنجليزية فقط، ووكالات تتقاضى ثمن ما يقدّمه المضيفون مقابل العمل.",
      "מטיילים ערבים שרוצים להתנדב בחו\"ל מוצאים מידע מפוזר באנגלית בלבד, וסוכנויות שגובות כסף על מה שמארחים נותנים תמורת עבודה.",
    ),
    audience: tx("Arab travellers considering volunteering abroad", "مسافرون عرب يفكرون بالتطوع في الخارج", "מטיילים ערבים ששוקלים התנדבות בחו\"ל"),
    role: tx("Concept, product design and mobile engineering", "الفكرة وتصميم المنتج وتطوير الموبايل", "רעיון, עיצוב מוצר ופיתוח מובייל"),
    status: "in-development",
    statusNote: tx("Early build with a public web preview; one real destination, application form not yet wired", "بناء مبكر بمعاينة ويب عامة؛ وجهة حقيقية واحدة، ونموذج التقديم غير موصول بعد", "בנייה מוקדמת עם תצוגת ווב ציבורית; יעד אמיתי אחד, טופס ההרשמה עדיין לא מחובר"),
    capabilities: [
      tx("Destinations, a host guide and an application flow, Arabic-first and right-to-left with an English toggle.", "وجهات ودليل للمضيف ومسار تقديم، بالعربية أولاً ومن اليمين إلى اليسار مع تبديل إلى الإنجليزية.", "יעדים, מדריך למארח ותהליך הרשמה, ערבית תחילה ומימין לשמאל עם מעבר לאנגלית."),
      tx("A visa checker and a cost calculator driven by one bilingual content file.", "فاحص تأشيرات وحاسبة تكاليف يعملان من ملف محتوى ثنائي اللغة واحد.", "בודק ויזות ומחשבון עלויות שמופעלים מקובץ תוכן דו-לשוני אחד."),
      tx("A web build on Vercel and Android previews from the same Expo code.", "نسخة ويب على Vercel ومعاينات أندرويد من شيفرة Expo نفسها.", "גרסת ווב ב-Vercel ותצוגות אנדרואיד מאותו קוד Expo."),
    ],
    evidence: [
      tx("Structured bilingual content model", "نموذج محتوى ثنائي اللغة منظم", "מודל תוכן דו-לשוני מובנה"),
      tx("Typed Expo Router app", "تطبيق Expo Router بأنواع صارمة", "אפליקציית Expo Router עם טיפוסים"),
      tx("Founder-tested destinations only", "وجهات جرّبها المؤسس فقط", "יעדים שהמייסד בדק בלבד"),
    ],
    stack: ["Expo", "React Native", "expo-router", "TypeScript", "Vercel", "EAS"],
    architecture: [
      { label: tx("Content model", "نموذج المحتوى", "מודל התוכן"), detail: tx("Places, visa rules and cost tables in one bilingual file.", "أماكن وقواعد تأشيرات وجداول تكاليف في ملف ثنائي اللغة واحد.", "מקומות, כללי ויזה וטבלאות עלויות בקובץ דו-לשוני אחד.") },
      { label: tx("App screens", "شاشات التطبيق", "מסכי האפליקציה"), detail: tx("Home, places, guide, apply and a destination page, with the visa checker and calculator.", "الرئيسية والأماكن والدليل والتقديم وصفحة الوجهة، مع فاحص التأشيرات والحاسبة.", "בית, מקומות, מדריך, הרשמה ודף יעד, עם בודק הוויזות והמחשבון.") },
      { label: tx("Delivery", "التسليم", "מסירה"), detail: tx("Static web export on Vercel and EAS builds for Android.", "تصدير ويب ثابت على Vercel وبناء EAS لأندرويد.", "ייצוא ווב סטטי ב-Vercel ובניית EAS לאנדרואיד.") },
    ],
    nextStep: tx("Fill the Tanzania destination, wire the application form to a real inbox, and publish a preview.", "إكمال وجهة تنزانيا، وربط نموذج التقديم بصندوق بريد حقيقي، ونشر معاينة.", "להשלים את יעד טנזניה, לחבר את טופס ההרשמה לתיבה אמיתית ולפרסם תצוגה מקדימה."),
    media: [
      { src: "/work/darbak/desktop.webp", width: 2880, height: 1800, alt: tx("Darbak Arabic home on desktop: a dotted globe with the routes from Arab cities to Arusha and the volunteering destinations", "الصفحة العربية لدربك على الحاسوب: كرة أرضية منقّطة بمسارات من المدن العربية إلى أروشا ووجهات التطوع", "דף הבית של דרבכ בערבית במחשב: גלובוס נקודות עם המסלולים מערים ערביות לארושה ויעדי ההתנדבות"), caption: tx("Web preview, desktop", "معاينة الويب على الحاسوب", "תצוגת ווב, מחשב") },
      { src: "/work/darbak/mobile.webp", width: 780, height: 1688, alt: tx("Darbak Arabic home on a phone with the departure board and tab bar", "الصفحة العربية لدربك على الهاتف مع لوحة المغادرة وشريط التبويب", "דף הבית של דרבכ בערבית בטלפון עם לוח היציאות וסרגל הטאבים"), caption: tx("Web preview, phone", "معاينة الويب على الهاتف", "תצוגת ווב, טלפון"), fit: "contain" },
    ],
    links: [{ label: tx("Open the web preview", "افتح معاينة الويب", "לפתוח את תצוגת הווב"), href: "https://darbak-inky.vercel.app/", kind: "live" }],
    featured: false,
    customerPath: "startup",
  },
  {
    slug: "seeker-radar",
    title: "Seeker Radar",
    category: tx("App discovery & monitoring", "اكتشاف التطبيقات ومتابعتها", "גילוי אפליקציות ומעקב"),
    summary: tx(
      "An independent discovery platform that turns a changing Solana Mobile app catalog into searchable briefs, daily updates, saved apps, and personalized alerts.",
      "منصة اكتشاف مستقلة تحوّل كتالوج تطبيقات Solana Mobile المتغير إلى ملفات قابلة للبحث وتحديثات يومية وتطبيقات محفوظة وتنبيهات مخصصة.",
      "פלטפורמת גילוי עצמאית שהופכת קטלוג משתנה של אפליקציות Solana Mobile לסקירות ניתנות לחיפוש, עדכונים יומיים, אפליקציות שמורות והתראות מותאמות אישית.",
    ),
    problem: tx(
      "Help users discover useful apps and follow meaningful changes without sorting through promotional noise or routine rating fluctuations.",
      "مساعدة المستخدمين على اكتشاف تطبيقات مفيدة ومتابعة التغييرات المهمة دون الغرق في الضجيج الترويجي أو التقلبات المعتادة في التقييمات.",
      "לעזור למשתמשים לגלות אפליקציות שימושיות ולעקוב אחר שינויים משמעותיים בלי לסנן רעש שיווקי או תנודות שגרתיות בדירוגים.",
    ),
    audience: tx("Seeker users, app builders, and ecosystem researchers", "مستخدمي Seeker ومطوري التطبيقات والباحثين في المنظومة", "משתמשי Seeker, מפתחי אפליקציות וחוקרי האקוסיסטם"),
    role: tx("Creator, product engineer, and platform engineer", "المنشئ ومهندس المنتج والمنصة", "יוצר, מהנדס מוצר ומהנדס פלטפורמה"),
    status: "live-product",
    statusNote: tx("Live independent product; private source. Not affiliated with Solana Mobile.", "منتج مستقل مباشر؛ الشيفرة خاصة. غير تابع لـSolana Mobile.", "מוצר עצמאי פעיל; קוד פרטי. ללא זיקה רשמית ל-Solana Mobile."),
    capabilities: [
      tx("Searchable app catalog with category, score, rating, and reward filters, plus app briefs with screenshots and source-linked evidence.", "كتالوج تطبيقات قابل للبحث والتصفية حسب الفئة والدرجة والتقييم والمكافآت، مع ملفات تضم لقطات شاشة وأدلة مرتبطة بمصادرها.", "קטלוג ניתן לחיפוש ולסינון לפי קטגוריה, ציון, דירוג ותגמולים, לצד סקירות עם צילומי מסך וראיות המקושרות למקורות."),
      tx("Daily catalog snapshots and a public change feed for launches, removals, meaningful listing changes, and significant score movement.", "لقطات يومية للكتالوج وسجل تغييرات عام للإطلاقات والإزالات وتعديلات القوائم المهمة والتغيرات الملحوظة في الدرجات.", "תמונות מצב יומיות של הקטלוג ויומן ציבורי של השקות, הסרות, שינויים משמעותיים ברשומות ותזוזות בולטות בציונים."),
      tx("Saved apps, community ratings, and custom alert rules with email or signed-wallet account flows and browser push support.", "تطبيقات محفوظة وتقييمات مجتمعية وقواعد تنبيه مخصصة، مع حسابات عبر البريد أو توقيع المحفظة ودعم إشعارات المتصفح.", "אפליקציות שמורות, דירוגי קהילה וכללי התראה אישיים, עם חשבונות דרך אימייל או חתימת ארנק ותמיכה בהתראות דפדפן."),
      tx("Builder corrections and reward updates go through review before publishing; the installable web app keeps discovery mobile-first.", "تمر تصحيحات المطورين وتحديثات المكافآت بالمراجعة قبل النشر، مع تطبيق ويب قابل للتثبيت مصمم للموبايل أولاً.", "תיקוני מפתחים ועדכוני תגמולים עוברים בדיקה לפני פרסום; אפליקציית הווב הניתנת להתקנה מתוכננת קודם למובייל."),
    ],
    evidence: [
      tx("Live searchable app catalog", "كتالوج تطبيقات مباشر قابل للبحث", "קטלוג אפליקציות חי וניתן לחיפוש"),
      tx("Public daily change history", "سجل تغييرات يومي عام", "היסטוריית שינויים יומית ציבורית"),
      tx("Source-linked app briefs", "ملفات تطبيقات مرتبطة بالمصادر", "סקירות אפליקציות עם קישורים למקורות"),
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "GitHub Actions", "PWA", "Web Push", "Vitest", "Playwright"],
    architecture: [
      {
        label: tx("Catalog pipeline", "خط بيانات الكتالوج", "תהליך נתוני הקטלוג"),
        detail: tx("Scheduled ingestion validates Store data, creates snapshots and meaningful diffs, and checks freshness before publishing generated catalog files.", "يجمع المسار المجدول بيانات المتجر ويتحقق منها، وينشئ لقطات وفروقاً ذات معنى، ويفحص حداثة البيانات قبل نشر ملفات الكتالوج المولّدة.", "איסוף מתוזמן מאמת נתוני חנות, יוצר תמונות מצב והבדלים משמעותיים ובודק עדכניות לפני פרסום קובצי הקטלוג."),
      },
      {
        label: tx("Discovery experience", "تجربة الاكتشاف", "חוויית גילוי"),
        detail: tx("Next.js renders public app briefs and a cached catalog API powers search, filters, and pagination without exposing private account data.", "يعرض Next.js ملفات التطبيقات العامة، وتدعم واجهة كتالوج مخزنة مؤقتاً البحث والتصفية وتقسيم الصفحات دون كشف بيانات الحسابات الخاصة.", "Next.js מציג סקירות ציבוריות, ו-API קטלוג עם מטמון מפעיל חיפוש, סינון ודפדוף בעמודים בלי לחשוף נתוני חשבון פרטיים."),
      },
      {
        label: tx("Accounts & alerts", "الحسابات والتنبيهات", "חשבונות והתראות"),
        detail: tx("Supabase stores identity-scoped saves, ratings, alert preferences, and reviewed submissions; snapshot changes feed the alert workflow.", "يخزن Supabase المحفوظات والتقييمات وتفضيلات التنبيه والمساهمات المراجعة حسب هوية المستخدم، وتغذي تغييرات اللقطات مسار التنبيهات.", "Supabase שומר מועדפים, דירוגים, העדפות התראה והגשות לבדיקה לפי זהות המשתמש; שינויי תמונות המצב מזינים את תהליך ההתראות."),
      },
    ],
    nextStep: tx(
      "Strengthen device-level push checks and snapshot failure monitoring before extending the product to native Android.",
      "تعزيز فحوصات الإشعارات على الأجهزة ومراقبة فشل اللقطات قبل توسيع المنتج إلى تطبيق Android أصلي.",
      "לחזק בדיקות התראות במכשירים וניטור כשלים בתמונות מצב לפני הרחבת המוצר לאפליקציית Android מקורית.",
    ),
    media: [
      {
        src: "/work/seeker-radar/discovery-desktop.jpg", width: 1280, height: 720,
        alt: tx("Seeker Radar desktop app catalog with discovery navigation, filters, app listings, and evidence scores", "كتالوج Seeker Radar على سطح المكتب مع تنقل الاكتشاف والتصفية وقوائم التطبيقات ودرجات الأدلة", "קטלוג האפליקציות של Seeker Radar במחשב עם ניווט, מסננים, רשומות וציונים מבוססי ראיות"),
        caption: tx("Live discovery catalog and filters", "كتالوج الاكتشاف المباشر وأدوات التصفية", "קטלוג גילוי חי ומסננים"),
        fit: "contain",
      },
      {
        src: "/work/seeker-radar/app-brief-mobile.jpg", width: 390, height: 844,
        alt: tx("Seeker Radar mobile TokenRun app brief with Store artwork, rating, evidence summary, and app actions", "ملف TokenRun على Seeker Radar للموبايل مع صور المتجر والتقييم وملخص الأدلة وإجراءات التطبيق", "סקירת TokenRun במובייל של Seeker Radar עם תמונות מהחנות, דירוג, סיכום ראיות ופעולות"),
        caption: tx("Mobile app brief with listing evidence", "ملف تطبيق على الموبايل مع أدلة من المتجر", "סקירת אפליקציה במובייל עם ראיות מהרשומה"),
        fit: "contain",
      },
      {
        src: "/work/seeker-radar/updates-mobile.jpg", width: 390, height: 844,
        alt: tx("Seeker Radar mobile daily update feed showing snapshot totals and apps with meaningful changes", "سجل Seeker Radar اليومي على الموبايل مع ملخص اللقطة والتطبيقات ذات التغييرات المهمة", "יומן העדכונים היומי של Seeker Radar במובייל עם סיכומי תמונת מצב ואפליקציות שהשתנו"),
        caption: tx("Daily change feed on mobile", "سجل التغييرات اليومي على الموبايل", "יומן שינויים יומי במובייל"),
        fit: "contain",
      },
    ],
    links: [liveLink("https://seeker-radar.app")],
    featured: true,
    customerPath: "startup",
  },
  {
    slug: "little-keepsakes",
    title: "Little Keepsakes",
    category: tx("Personal embroidery studio", "استوديو تطريز شخصي", "סטודיו לרקמה אישית"),
    summary: tx(
      "An Arabic-first embroidery app that helps beginners turn a name and a small story into a stitchable keepsake.",
      "تطبيق تطريز يبدأ بالعربية ويساعد المبتدئين على تحويل اسم وحكاية صغيرة إلى تذكار قابل للتطريز.",
      "אפליקציית רקמה שמתחילה בערבית ועוזרת למתחילים להפוך שם וסיפור קטן למזכרת שאפשר לרקום.",
    ),
    problem: tx(
      "Making a personal embroidered gift can mean juggling a design tool, a stitch chart, a shopping list, and a separate progress tracker.",
      "صنع هدية مطرزة شخصية قد يتطلب التنقل بين أداة تصميم ومخطط غرز وقائمة مشتريات وطريقة منفصلة لمتابعة التقدم.",
      "יצירת מתנה רקומה אישית דורשת לעיתים כלי עיצוב, תרשים תכים, רשימת קניות ומעקב התקדמות נפרד.",
    ),
    audience: tx("Beginner stitchers and makers of personal gifts", "المبتدئين في التطريز وصنّاع الهدايا الشخصية", "רוקמים מתחילים ויוצרי מתנות אישיות"),
    role: tx("Product design, pattern engine, localization, and Android packaging", "تصميم المنتج ومحرك الأنماط والتعريب وتجهيز أندرويد", "עיצוב מוצר, מנוע דוגמאות, לוקליזציה ואריזה לאנדרואיד"),
    status: "in-development",
    statusNote: tx(
      "Installable Android preview. The APK builds successfully; physical-device and real-stitch validation are still pending.",
      "معاينة قابلة للتثبيت على أندرويد. بُني ملف APK بنجاح، وما زال اختبار الهاتف الحقيقي والتطريز الفعلي قيد الانتظار.",
      "תצוגה מקדימה להתקנה באנדרואיד. קובץ ה-APK נבנה בהצלחה; בדיקה במכשיר וברקמה ממשית עדיין נדרשת.",
    ),
    capabilities: [
      tx("Twelve starting motifs, ten palettes, exact colour codes, lettering placement, and flippable decorations.", "اثنا عشر تصميمًا وعشر مجموعات ألوان مع رموز ألوان دقيقة، وتغيير موضع الكتابة وقلب الزخارف.", "שנים עשר דגמי פתיחה, עשר ערכות צבעים, קודי צבע מדויקים, מיקום כיתוב והיפוך קישוטים."),
      tx("A compact phone editor with an expandable live preview, simpler option panels, and bottom-reach design and stitching actions.", "محرر مدمج للهاتف مع معاينة حية قابلة للتكبير، وخيارات أبسط، وأزرار التصميم والتطريز في متناول اليد أسفل الشاشة.", "עורך קומפקטי לטלפון עם תצוגה חיה מתרחבת, אפשרויות פשוטות יותר ופעולות עיצוב ורקמה נגישות בתחתית המסך."),
      tx("A supply checklist, fabric size, thread colours and recorded shop codes, plus a shareable shopping list.", "قائمة تجهيز للأدوات ومقاس القماش وألوان الخيوط ورموزها المسجلة من المتجر، مع قائمة مشتريات قابلة للمشاركة.", "רשימת ציוד, מידות בד, צבעי חוטים וקודים שנרשמו מהחנות, עם רשימת קניות לשיתוף."),
      tx("Guided stitch marking that moves to the next unfinished square, with exact progress saved across up to 30 projects.", "تحديد الغرز خطوة بخطوة والانتقال إلى المربع التالي غير المكتمل، مع حفظ التقدم الدقيق لما يصل إلى 30 مشروعًا.", "סימון תכים מודרך שמתקדם למשבצת הבאה שלא הושלמה, עם שמירת התקדמות מדויקת בעד 30 פרויקטים."),
      tx("Arabic by default, right-to-left interface for mixed Arabic and English text, plus English and Hebrew options, offline saving, export, share, and Android printing.", "العربية افتراضيًا وواجهة من اليمين إلى اليسار حتى مع نص عربي وإنجليزي مختلط، مع الإنجليزية والعبرية والحفظ دون إنترنت والتصدير والمشاركة والطباعة على أندرويد.", "ערבית כברירת מחדל וממשק מימין לשמאל גם בטקסט מעורב בערבית ובאנגלית, לצד אנגלית ועברית, שמירה ללא רשת, ייצוא, שיתוף והדפסה באנדרואיד."),
    ],
    evidence: [
      tx("Android preview APK v0.3.1", "ملف معاينة APK لأندرويد، الإصدار 0.3.1", "קובץ APK לתצוגה מקדימה באנדרואיד, גרסה 0.3.1"),
      tx("Real gallery, supply and stitching captures", "صور فعلية لمعرض التصاميم وتجهيز الأدوات والتطريز", "צילומי מסך אמיתיים של הגלריה, הציוד והרקמה"),
      tx("Automated pattern, controller, and storage checks", "فحوصات آلية للأنماط والمحرر والتخزين", "בדיקות אוטומטיות לדוגמאות, לעורך ולאחסון"),
    ],
    stack: ["JavaScript", "Capacitor 8", "Android", "SVG", "Canvas", "Local storage"],
    architecture: [
      { label: tx("Simple editor", "محرر بسيط", "עורך פשוט"), detail: tx("Choose a motif, personalize the text and colours, then review the chart.", "اختر تصميمًا وعدّل النص والألوان ثم راجع مخطط الغرز.", "בוחרים דגם, עורכים כיתוב וצבעים ובודקים את התרשים.") },
      { label: tx("Pattern engine", "محرك الأنماط", "מנוע דוגמאות"), detail: tx("Generates a countable grid, dimensions, materials, and printable output.", "يولّد شبكة غرز قابلة للعد والأبعاد والمواد ومخرجات قابلة للطباعة.", "יוצר רשת תכים לספירה, מידות, חומרים ופלט להדפסה.") },
      { label: tx("On-device library", "مكتبة على الجهاز", "ספרייה במכשיר"), detail: tx("Keeps projects and stitch progress locally, with export and import for backup.", "تحفظ المشاريع وتقدم الغرز محليًا، مع التصدير والاستيراد للنسخ الاحتياطي.", "שומרת פרויקטים והתקדמות במכשיר, עם ייצוא וייבוא לגיבוי.") },
    ],
    nextStep: tx(
      "Test the APK on physical phones and stitch sample patterns with beginners before a store release.",
      "اختبار ملف APK على هواتف حقيقية وتطريز نماذج مع مبتدئين قبل نشره في المتجر.",
      "לבדוק את ה-APK בטלפונים אמיתיים ולרקום דוגמאות עם מתחילים לפני פרסום בחנות.",
    ),
    media: [
      { src: "/work/little-keepsakes-arabic-desktop.jpg", width: 1350, height: 890, alt: tx("Little Keepsakes Arabic gallery showing embroidery templates on desktop", "معرض Little Keepsakes بالعربية يعرض قوالب التطريز على سطح المكتب", "גלריית Little Keepsakes בערבית עם דגמי רקמה במסך מחשב"), caption: tx("Arabic-first design gallery", "معرض التصاميم بالعربية افتراضيًا", "גלריית דגמים בערבית כברירת מחדל"), fit: "contain" },
      { src: "/work/little-keepsakes-arabic-mobile.jpg", width: 375, height: 812, alt: tx("Little Keepsakes Arabic design gallery on a phone-sized screen", "معرض تصاميم Little Keepsakes بالعربية على شاشة بحجم هاتف", "גלריית הדגמים של Little Keepsakes בערבית במסך בגודל טלפון"), caption: tx("Choose from twelve motifs on a phone", "اختر من اثني عشر تصميمًا على الهاتف", "בחירה מבין שנים עשר דגמים בטלפון"), fit: "contain" },
      { src: "/work/little-keepsakes-editor.jpg", width: 375, height: 812, alt: tx("Arabic mobile editor with a compact live embroidery preview and a bottom Continue action", "المحرر العربي على الهاتف مع معاينة تطريز مدمجة وزر متابعة في أسفل الشاشة", "עורך בערבית בנייד עם תצוגת רקמה קומפקטית וכפתור המשך בתחתית"), caption: tx("Edit with the pattern in view and Continue within reach", "عدّل مع بقاء التصميم أمامك وزر متابعة في متناول يدك", "עורכים כשהדגם גלוי וכפתור ההמשך בהישג יד"), fit: "contain" },
      { src: "/work/little-keepsakes-customization.jpg", width: 375, height: 812, alt: tx("Arabic mobile editor showing the new butterfly motif and decoration controls", "المحرر العربي على الهاتف مع تصميم الفراشات الجديد وأدوات الزخرفة", "העורך בערבית בנייד עם דגם הפרפרים החדש ואפשרויות הקישוט"), caption: tx("Adjust decoration and layout while the stitch chart updates", "عدّل الزخارف والتنسيق مع تحديث مخطط الغرز مباشرة", "שינוי הקישוט והפריסה עם עדכון מידי של תרשים הרקמה"), fit: "contain" },
      { src: "/work/little-keepsakes-preparation.jpg", width: 375, height: 812, alt: tx("Arabic preparation checklist showing fabric and thread readiness with a recorded thread code", "قائمة تجهيز بالعربية تعرض القماش والخيوط مع رمز خيط مسجل", "רשימת הכנה בערבית עם בד וחוטים וקוד חוט שנרשם"), caption: tx("Gather fabric and threads, and save the codes you buy", "جهّز القماش والخيوط واحفظ رموزها من المتجر", "מכינים בד וחוטים ושומרים את הקודים שנקנו"), fit: "contain" },
      { src: "/work/little-keepsakes-stitching.jpg", width: 375, height: 812, alt: tx("Arabic guided stitch chart with the mark-and-next control at the bottom of a phone screen", "مخطط تطريز بالعربية مع زر تحديد الغرزة والانتقال للتالية أسفل شاشة الهاتف", "תרשים רקמה בערבית עם כפתור סימון ומעבר בתחתית מסך הטלפון"), caption: tx("Mark & next stays near your thumb while the chart remains visible", "زر «علّم ثم التالي» قريب من يدك والمخطط ظاهر", "כפתור הסימון והמעבר נשאר נגיש והתרשים גלוי"), fit: "contain" },
      { src: "/work/little-keepsakes-library.jpg", width: 375, height: 812, alt: tx("Little Keepsakes saved project library showing stitch progress", "مكتبة المشاريع المحفوظة في Little Keepsakes مع تقدم التطريز", "ספריית הפרויקטים השמורים של Little Keepsakes עם התקדמות הרקמה"), caption: tx("Saved projects and stitch progress", "المشاريع المحفوظة وتقدم الغرز", "פרויקטים שמורים והתקדמות הרקמה"), fit: "contain" },
    ],
    links: [apkLink(
      "/downloads/Little-Keepsakes-0.3.1-preview.apk",
      tx(
        "Debug-signed Android preview, not a Play Store release. It has not yet been tested on a physical phone; review the chart before stitching.",
        "معاينة لأندرويد موقعة بمفتاح تطوير وليست إصدارًا على Google Play. لم تُختبر بعد على هاتف حقيقي؛ راجع المخطط قبل التطريز.",
        "תצוגה מקדימה לאנדרואיד בחתימת פיתוח, לא גרסה בחנות Play. טרם נבדקה בטלפון אמיתי; יש לבדוק את התרשים לפני הרקמה.",
      ),
      tx("Download Android preview (APK)", "تحميل معاينة أندرويد (APK)", "הורדת תצוגה מקדימה לאנדרואיד (APK)"),
    )],
    featured: true,
    customerPath: "startup",
  },
  {
    slug: "solitaire",
    title: "SOLitaire",
    category: tx("Competitive mobile product", "منتج موبايل تنافسي", "מוצר מובייל תחרותי"),
    summary: tx("A competitive Klondike app with a redesigned lobby, responsive gameplay, Solana wallet authentication, and escrow-oriented match flows.", "تطبيق Klondike تنافسي مع ردهة بتصميم جديد ولعب متجاوب ودخول بمحفظة Solana ومسارات مباريات مبنية على الضمان.", "אפליקציית Klondike תחרותית עם לובי מעוצב מחדש, משחק רספונסיבי, אימות ארנק Solana ותהליכי משחק מבוססי escrow."),
    problem: tx("A competitive card product must keep onboarding, wallet state, match creation, gameplay, and transaction feedback understandable.", "يجب أن يبقي منتج الورق التنافسي التسجيل والمحفظة وإنشاء المباراة واللعب وحالة المعاملة واضحة.", "מוצר קלפים תחרותי צריך לשמור על הצטרפות, מצב ארנק, יצירת משחק, משחק ומשוב עסקה ברורים."),
    audience: tx("Web3 game players and product partners", "لاعبي Web3 وشركاء المنتج", "שחקני Web3 ושותפי מוצר"),
    role: tx("Product engineering and infrastructure", "هندسة المنتج والبنية التحتية", "הנדסת מוצר ותשתיות"),
    status: "live-product",
    statusNote: commonLive,
    capabilities: [tx("Public marketing experience and mobile-first onboarding.", "موقع تسويقي عام وبدء استخدام للموبايل.", "אתר שיווק ציבורי והצטרפות מותאמת מובייל."), tx("Solana wallet authentication and escrow-oriented match creation.", "دخول بمحفظة Solana وإنشاء مباريات موجه للضمان.", "אימות ארנק Solana ויצירת משחק מבוססת escrow."), tx("Competitive Klondike gameplay, scoring, and transaction-aware state.", "لعب Klondike تنافسي وتسجيل نقاط وحالة واعية بالمعاملات.", "משחק Klondike תחרותי, ניקוד ומצב מודע לעסקאות." )],
    evidence: [tx("Redesigned app lobby", "ردهة التطبيق بتصميم جديد", "לובי אפליקציה מעוצב מחדש"), tx("Responsive Klondike gameplay", "لعب Klondike متجاوب", "משחק Klondike רספונסיבי"), tx("Product and chain integration", "تكامل المنتج والسلسلة", "שילוב מוצר ושרשרת")],
    stack: ["Expo", "React Native", "Supabase", "Solana", "Anchor", "TypeScript", "Vitest"],
    architecture: [
      { label: tx("Player experience", "تجربة اللاعب", "חוויית שחקן"), detail: tx("Onboarding, wallet connection, matchmaking, and gameplay.", "بدء الاستخدام وربط المحفظة والمباريات واللعب.", "הצטרפות, חיבור ארנק, התאמת משחק ומשחקיות.") },
      { label: tx("Product backend", "خلفية المنتج", "צד שרת"), detail: tx("Accounts, match state, live data, and operational records.", "حسابات وحالة مباريات وبيانات مباشرة وسجلات تشغيل.", "חשבונות, מצב משחק, נתונים חיים ורשומות תפעול.") },
      { label: tx("Chain boundary", "حد السلسلة", "גבול השרשרת"), detail: tx("Wallet authentication and escrow-oriented transaction flows.", "دخول بالمحفظة وتدفقات معاملات موجهة للضمان.", "אימות ארנק ותהליכי עסקה מבוססי escrow.") },
    ],
    nextStep: tx("Continue hardening transaction recovery and gameplay telemetry.", "مواصلة تقوية استعادة المعاملات وقياس اللعب.", "להמשיך לחזק התאוששות מעסקאות וטלמטריית משחק."),
    media: [solitaireMedia.hero, solitaireMedia.mobileHero, solitaireMedia.gameplay, solitaireMedia.lobby],
    links: [
      liveLink("https://sol-solitaire.com"),
      apkLink(
        "/downloads/SOLitaire.apk",
        tx(
          "Production build for Android and Seeker: mainnet, real USDC matches. Android will ask you to allow installs from your browser.",
          "نسخة الإنتاج لأندرويد وSeeker: الشبكة الرئيسية ومباريات USDC حقيقية. سيطلب أندرويد السماح بالتثبيت من المتصفح.",
          "גרסת הייצור לאנדרואיד ו-Seeker: רשת ראשית ומשחקי USDC אמיתיים. אנדרואיד יבקש לאשר התקנה מהדפדפן.",
        ),
        tx("Download Android (APK)", "تحميل نسخة أندرويد (APK)", "הורדת גרסת אנדרואיד (APK)"),
      ),
      apkLink(
        "/downloads/SOLitaire-staging.apk",
        tx(
          "Staging build for Android and Seeker testers. Android will ask you to allow installs from your browser.",
          "نسخة staging لمختبري أندرويد وSeeker. سيطلب أندرويد السماح بالتثبيت من المتصفح.",
          "גרסת staging לבודקי אנדרואיד ו-Seeker. אנדרואיד יבקש לאשר התקנה מהדפדפן.",
        ),
      ),
      apkLink(
        "/downloads/SOLitaire-admin-staging.apk",
        tx(
          "Operator console for the staging environment. It only opens for allow-listed admin wallets.",
          "لوحة المشغّل لبيئة staging. تفتح فقط لمحافظ المشرفين المصرّح بها.",
          "קונסולת המפעיל לסביבת staging. נפתחת רק לארנקי מנהל מאושרים.",
        ),
        tx("Admin console (staging APK)", "لوحة الإدارة (APK staging)", "קונסולת ניהול (APK staging)"),
      ),
    ],
    featured: true,
    customerPath: "startup",
  },
  {
    slug: "elsewhereco",
    title: "ElsewhereCo",
    category: tx("Expedition content & operations", "محتوى وتشغيل رحلات", "תוכן ותפעול מסעות"),
    summary: tx("A cinematic Arabic-first expedition experience with English support, structured trip content, administration, and AI-assisted drafting.", "تجربة رحلات سينمائية تبدأ بالعربية وتدعم الإنجليزية، مع محتوى منظم وإدارة وصياغة مساعدة بالذكاء الاصطناعي.", "חוויית מסעות קולנועית שמתחילה בערבית ותומכת באנגלית, עם תוכן מובנה, ניהול וכתיבה בסיוע AI."),
    problem: tx("Premium expeditions need a distinctive public story and an operational content system that can keep complex trip information current.", "تحتاج الرحلات المميزة إلى قصة عامة متفردة ونظام محتوى تشغيلي يحافظ على معلومات الرحلة المعقدة.", "מסעות פרימיום דורשים סיפור ציבורי ייחודי ומערכת תוכן ששומרת מידע מורכב מעודכן."),
    audience: tx("Expedition operators and adventurous travelers", "مشغلو الرحلات والمسافرون المغامرون", "מפעילי מסעות ומטיילים הרפתקנים"),
    role: tx("Product design, engineering, and content operations", "تصميم المنتج والتطوير وتشغيل المحتوى", "עיצוב מוצר, פיתוח ותפעול תוכן"),
    status: "live-product",
    statusNote: commonLive,
    capabilities: [tx("Arabic-first and English editorial experience.", "تجربة تحريرية تبدأ بالعربية وتدعم الإنجليزية.", "חוויה עריכתית שמתחילה בערבית ותומכת באנגלית."), tx("Structured trips, collections, media, and Supabase administration.", "رحلات ومجموعات ووسائط وإدارة عبر Supabase.", "טיולים, אוספים, מדיה וניהול מבוסס Supabase."), tx("AI-assisted trip drafting with human editorial control.", "صياغة رحلات بمساعدة AI مع تحكم تحريري بشري.", "כתיבת טיולים בסיוע AI עם שליטה אנושית." )],
    evidence: [tx("Public production experience", "تجربة إنتاج عامة", "חוויית ייצור ציבורית"), tx("Bilingual RTL/LTR presentation", "عرض ثنائي اللغة RTL/LTR", "תצוגה דו-לשונית RTL/LTR"), tx("Operational content system", "نظام محتوى تشغيلي", "מערכת תוכן תפעולית")],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AI drafting", "Telegram operator agent", "Structured data"],
    architecture: [
      { label: tx("Editorial experience", "التجربة التحريرية", "חוויה עריכתית"), detail: tx("Cinematic trip and collection storytelling in two languages.", "سرد سينمائي للرحلات والمجموعات بلغتين.", "סיפור קולנועי של טיולים ואוספים בשתי שפות.") },
      { label: tx("Content operations", "تشغيل المحتوى", "תפעול תוכן"), detail: tx("Administered structured records, media, and publishing state.", "سجلات منظمة ووسائط وحالة نشر قابلة للإدارة.", "רשומות מובנות, מדיה ומצב פרסום מנוהל.") },
      { label: tx("AI drafting", "صياغة AI", "כתיבה עם AI"), detail: tx("Draft assistance remains behind human review and publishing control.", "المساعدة في الصياغة تبقى خلف مراجعة ونشر بشريين.", "סיוע בכתיבה נשאר תחת ביקורת ושליטת פרסום אנושית.") },
    ],
    nextStep: tx("Keep editorial workflows and structured SEO aligned as the catalog expands.", "الحفاظ على توافق التحرير وSEO المنظم مع توسع الكتالوج.", "לשמור על התאמה בין תהליכי העריכה ל-SEO מובנה ככל שהקטלוג גדל."),
    media: [
      { src: "/work/elsewhereco/desktop.webp", width: 2880, height: 1800, alt: tx("ElsewhereCo Arabic expedition homepage on desktop", "الصفحة العربية لرحلات ElsewhereCo على الحاسوب", "דף המסעות בערבית של ElsewhereCo במחשב"), caption: tx("Public Arabic homepage, desktop", "الصفحة العربية العامة على الحاسوب", "דף הבית הציבורי בערבית, מחשב") },
      { src: "/work/elsewhereco/mobile.webp", width: 780, height: 1688, alt: tx("ElsewhereCo Arabic expedition homepage on a phone", "الصفحة العربية لرحلات ElsewhereCo على الهاتف", "דף המסעות בערבית של ElsewhereCo בטלפון"), caption: tx("Public Arabic homepage, phone", "الصفحة العربية العامة على الهاتف", "דף הבית הציבורי בערבית, טלפון"), fit: "contain" },
    ],
    links: [liveLink("https://elsewhereco.vercel.app/")],
    featured: true,
    customerPath: "business",
  },
  {
    slug: "go-to-nature",
    title: "Go To Nature",
    category: tx("Community & adventure platform", "منصة مجتمع ومغامرات", "פלטפורמת קהילה והרפתקאות"),
    summary: tx("An Arabic-first community platform giving programs, activities, memories, reviews, and commerce one coherent public identity.", "منصة مجتمع تبدأ بالعربية وتجمع البرامج والفعاليات والذكريات والآراء والتجارة في هوية عامة واحدة.", "פלטפורמת קהילה שמתחילה בערבית ומאחדת תכניות, פעילויות, זיכרונות, ביקורות ומסחר בזהות ציבורית אחת."),
    problem: tx("A growing outdoor community needs a navigable product surface for programs, trust, booking intent, and ongoing content.", "يحتاج مجتمع الطبيعة المتنامي إلى منصة للبرامج والثقة ونية الحجز والمحتوى المستمر.", "קהילת טבע צומחת צריכה משטח מוצר לתכניות, אמון, כוונת הזמנה ותוכן מתמשך."),
    audience: tx("Outdoor communities, families, and adventure operators", "مجتمعات الطبيعة والعائلات ومشغلو المغامرات", "קהילות טבע, משפחות ומפעילי הרפתקאות"),
    role: tx("Product design and full-stack engineering", "تصميم المنتج وتطوير Full-stack", "עיצוב מוצר ופיתוח Full-stack"),
    status: "live-product",
    statusNote: commonLive,
    capabilities: [tx("Arabic-first public experience with English support.", "تجربة عامة تبدأ بالعربية وتدعم الإنجليزية.", "חוויה ציבורית שמתחילה בערבית ותומכת באנגלית."), tx("Programs, activities, memories, reviews, and store surfaces.", "واجهات للبرامج والفعاليات والذكريات والآراء والمتجر.", "מסכים לתכניות, פעילויות, זיכרונות, ביקורות וחנות."), tx("Responsive visual system built around authentic community imagery.", "نظام بصري متجاوب مبني على صور مجتمع حقيقية.", "מערכת חזותית רספונסיבית המבוססת על תמונות קהילה אותנטיות." )],
    evidence: [tx("Public production experience", "تجربة إنتاج عامة", "חוויית ייצור ציבורית"), tx("Real community visual assets", "صور مجتمع حقيقية", "נכסים חזותיים אמיתיים"), tx("Structured multi-surface product", "منتج منظم متعدد الواجهات", "מוצר מובנה רב-מסכי")],
    stack: ["Next.js", "TypeScript", "Responsive UI", "Content workflows", "Telegram operator agent", "Commerce"],
    architecture: [
      { label: tx("Discover", "الاكتشاف", "גילוי"), detail: tx("Programs, activities, stories, and visual proof.", "برامج وفعاليات وقصص وأدلة بصرية.", "תכניות, פעילויות, סיפורים והוכחה חזותית.") },
      { label: tx("Trust", "الثقة", "אמון"), detail: tx("Reviews, memories, team identity, and clear contact paths.", "آراء وذكريات وهوية الفريق ومسارات تواصل واضحة.", "ביקורות, זיכרונות, זהות צוות ונתיבי קשר ברורים.") },
      { label: tx("Act", "الإجراء", "פעולה"), detail: tx("Booking intent, program selection, and store interactions.", "نية الحجز واختيار البرامج والتفاعل مع المتجر.", "כוונת הזמנה, בחירת תכנית ואינטראקציות חנות.") },
    ],
    nextStep: tx("Keep booking and content operations measurable as new programs are introduced.", "جعل الحجز وتشغيل المحتوى قابلين للقياس مع إضافة برامج جديدة.", "לשמור על מדידות של הזמנות ותפעול תוכן עם הוספת תכניות."),
    media: [
      { src: "/work/go-to-nature/desktop.webp", width: 2880, height: 1800, alt: tx("Go To Nature Arabic community homepage on desktop", "الصفحة العربية لمجتمع Go To Nature على الحاسوب", "דף הקהילה בערבית של Go To Nature במחשב"), caption: tx("Public Arabic homepage, desktop", "الصفحة العربية العامة على الحاسوب", "דף הבית הציבורי בערבית, מחשב") },
      { src: "/work/go-to-nature/mobile.webp", width: 780, height: 1688, alt: tx("Go To Nature Arabic community homepage on a phone", "الصفحة العربية لمجتمع Go To Nature على الهاتف", "דף הקהילה בערבית של Go To Nature בטלפון"), caption: tx("Public Arabic homepage, phone", "الصفحة العربية العامة على الهاتف", "דף הבית הציבורי בערבית, טלפון"), fit: "contain" },
    ],
    links: [liveLink("https://go-to-nature.vercel.app/")],
    featured: false,
    customerPath: "business",
  },
  {
    slug: "lulu-tokki",
    title: "Lulu Tokki",
    category: tx("Trilingual commerce product", "منتج تجارة ثلاثي اللغات", "מוצר מסחר תלת-לשוני"),
    summary: tx("A trilingual Korean-snacks storefront with authentication, wishlist, cart, orders, administration, and installable PWA behavior.", "متجر سناكات كورية بثلاث لغات مع تسجيل دخول ومفضلة وسلة وطلبات وإدارة وتجربة PWA قابلة للتثبيت.", "חנות חטיפים קוריאניים בשלוש שפות עם אימות, מועדפים, סל, הזמנות, ניהול ו-PWA להתקנה."),
    problem: tx("A product catalog needs a memorable brand and a complete path from discovery to order management across three languages.", "يحتاج كتالوج المنتجات إلى علامة مميزة ومسار كامل من الاكتشاف إلى إدارة الطلبات بثلاث لغات.", "קטלוג מוצרים צריך מותג זכיר ומסלול מלא מגילוי ועד ניהול הזמנה בשלוש שפות."),
    audience: tx("Regional specialty retail customers and operators", "عملاء ومشغلو تجارة التجزئة المتخصصة في المنطقة", "לקוחות ומפעילי קמעונאות מתמחה באזור"),
    role: tx("Product engineering and deployment", "هندسة المنتج والنشر", "הנדסת מוצר ופריסה"),
    status: "live-product",
    statusNote: tx("Live product work; public repository", "منتج مباشر؛ مستودع عام", "מוצר חי; מאגר ציבורי"),
    capabilities: [tx("Arabic, Hebrew, and English storefront with RTL/LTR support.", "متجر بالعربية والعبرية والإنجليزية مع RTL/LTR.", "חנות בערבית, עברית ואנגלית עם RTL/LTR."), tx("Authentication, wishlist, cart, orders, and administration.", "تسجيل دخول ومفضلة وسلة وطلبات وإدارة.", "אימות, מועדפים, סל, הזמנות וניהול."), tx("Firebase data, R2 media delivery, and PWA installation.", "بيانات Firebase ووسائط R2 وتثبيت PWA.", "נתוני Firebase, מסירת מדיה מ-R2 והתקנת PWA." )],
    evidence: [tx("Public production storefront", "متجر إنتاج عام", "חנות ייצור ציבורית"), tx("Public source repository", "مستودع شيفرة عام", "מאגר קוד ציבורי"), tx("Complete customer and admin flows", "تدفقات عميل وإدارة كاملة", "תהליכי לקוח וניהול מלאים")],
    stack: ["React", "Vite", "Firebase", "Cloudflare R2", "PWA", "RTL/LTR"],
    architecture: [
      { label: tx("Storefront", "المتجر", "חנות"), detail: tx("Localized discovery, products, wishlist, cart, and accounts.", "اكتشاف ومنتجات ومفضلة وسلة وحسابات محلية.", "גילוי, מוצרים, מועדפים, סל וחשבונות מותאמים לשפה.") },
      { label: tx("Commerce state", "حالة التجارة", "מצב מסחר"), detail: tx("Firebase-backed customers, products, and order workflows.", "عملاء ومنتجات وطلبات عبر Firebase.", "לקוחות, מוצרים והזמנות מבוססי Firebase.") },
      { label: tx("Delivery", "التسليم", "מסירה"), detail: tx("R2 media, responsive delivery, and an installable PWA shell.", "وسائط R2 وتسليم متجاوب وغلاف PWA قابل للتثبيت.", "מדיה מ-R2, מסירה רספונסיבית ומעטפת PWA להתקנה.") },
    ],
    nextStep: tx("Continue hardening inventory and order operations as the catalog evolves.", "مواصلة تقوية المخزون والطلبات مع تطور الكتالوج.", "להמשיך לחזק את ניהול המלאי וההזמנות עם התפתחות הקטלוג."),
    media: [
      { src: "/work/lulu-tokki/desktop.webp", width: 2880, height: 1800, alt: tx("Lulu Tokki Arabic Korean snacks storefront on desktop", "متجر Lulu Tokki العربي للسناكات الكورية على الحاسوب", "חנות החטיפים הקוריאניים בערבית של Lulu Tokki במחשב"), caption: tx("Public Arabic homepage, desktop", "الصفحة العربية العامة على الحاسوب", "דף הבית הציבורי בערבית, מחשב") },
      { src: "/work/lulu-tokki/mobile.webp", width: 780, height: 1688, alt: tx("Lulu Tokki Arabic Korean snacks storefront on a phone", "متجر Lulu Tokki العربي للسناكات الكورية على الهاتف", "חנות החטיפים הקוריאניים בערבית של Lulu Tokki בטלפון"), caption: tx("Public Arabic homepage, phone", "الصفحة العربية العامة على الهاتف", "דף הבית הציבורי בערבית, טלפון"), fit: "contain" },
    ],
    links: [liveLink("https://lulu-tokki.vercel.app/"), repoLink("https://github.com/fatoh2/lulu-tokki")],
    featured: false,
    customerPath: "business",
  },
];

export const focusQuest = {
  slug: "saqroon",
  title: "Saqroon · صقرون",
  website: "https://www.nuqtakids.com",
  websiteLabel: tx("Explore Saqroon", "اكتشف صقرون", "גלו את סקרון"),
  media: [
    {
      src: "/labs/saqroon/saqroon-landing-desktop-20261020.jpg", width: 1430, height: 755,
      alt: tx("Saqroon’s Arabic landing page featuring Saqr the falcon and its invitation for families", "صفحة صقرون بالعربية، مع صقر ودعوة العائلات إلى التجربة", "דף הנחיתה של סקרון בערבית, עם הבז סקר והזמנה למשפחות"),
      caption: tx("Arabic landing page", "صفحة التعريف بالعربية", "דף נחיתה בערבית"),
      fit: "contain",
    },
    {
      src: "/labs/saqroon/saqroon-journey-ar-20261020.png", width: 1170, height: 2532,
      alt: tx("Saqroon’s Arabic learning journey with a maths unit, progress path and Saqr", "رحلة التعلّم في صقرون بالعربية، مع وحدة رياضيات ومسار التقدّم وصقر", "מסע הלמידה של סקרון בערבית, עם יחידת מתמטיקה, מסלול התקדמות וסקר"),
      caption: tx("Learning journey · development preview", "رحلة التعلّم · معاينة تطوير", "מסע למידה · תצוגת פיתוח"),
      fit: "contain",
    },
    {
      src: "/labs/saqroon/saqroon-quest-ar-20261020.png", width: 1170, height: 2532,
      alt: tx("An Arabic maths quest in Saqroon with a fraction diagram and four answer choices", "مهمة رياضيات بالعربية في صقرون، مع رسم يوضّح الكسور وأربعة خيارات للإجابة", "משימת מתמטיקה בערבית בסקרון, עם תרשים שברים וארבע תשובות לבחירה"),
      caption: tx("Visual maths · development preview", "رياضيات مصوّرة · معاينة تطوير", "מתמטיקה חזותית · תצוגת פיתוח"),
      fit: "contain",
    },
  ] satisfies ProjectMedia[],
  category: tx(
    "In-development learning product",
    "منتج تعليمي قيد التطوير",
    "מוצר למידה בפיתוח",
  ),
  summary: tx(
    "An Arabic-first Flutter app for children aged 5–12: short learning quests with Saqr the falcon, learning checkpoints during screen time, and controls that stay with the parents. An Android family pilot in development, starting in Nazareth and nearby towns.",
    "تطبيق Flutter بالعربية أولًا للأطفال من 5 إلى 12 عامًا: مهمات تعلّم قصيرة مع صقر، ووقفات تعلّم أثناء وقت الشاشة، وقرار يبقى بيد الأهل. تجربة عائلية على أندرويد قيد التطوير، تبدأ من الناصرة والبلدات القريبة.",
    "אפליקציית Flutter בערבית קודם כול לילדים בגילאי 5–12: משימות למידה קצרות עם הבז סקר, נקודות למידה בזמן השימוש במסך, ושליטה שנשארת בידי ההורים. פיילוט משפחתי לאנדרואיד בפיתוח, שמתחיל בנצרת והסביבה.",
  ),
  status: "in-development" as ProjectStatus,
  stack: ["Flutter", "Firebase", "Android", "RevenueCat", "Accessibility"],
  builds: [
    {
      id: "saqroon",
      apkUrl: "/downloads/Saqroon-arm64.apk",
      label: tx(
        "Download Android beta (APK)",
        "تحميل نسخة أندرويد التجريبية (APK)",
        "הורדת גרסת בטא לאנדרואיד (APK)",
      ),
    },
  ],
  downloadNote: tx(
    "Android pilot APK. Images show current development previews. Android will ask you to allow installs from your browser.",
    "نسخة أندرويد للتجربة. الصور من معاينات التطوير الحالية. سيطلب أندرويد السماح بالتثبيت من المتصفح.",
    "APK לפיילוט באנדרואיד. התמונות מציגות תצוגות פיתוח עדכניות. אנדרואיד יבקש לאשר התקנה מהדפדפן.",
  ),
};

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectParams = () =>
  locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
