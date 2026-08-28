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
  alt: LocalizedText;
  caption: LocalizedText;
  fit?: "cover" | "contain";
};

export type ProofLink = {
  label: LocalizedText;
  href: string;
  kind: "live" | "repo";
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
    "I help startups and ambitious regional businesses launch multilingual products, automate operations with AI, and run dependable cloud platforms.",
    "أساعد الشركات الناشئة والأعمال الطموحة في المنطقة على إطلاق منتجات متعددة اللغات، وأتمتة العمليات بالذكاء الاصطناعي، وتشغيل منصات سحابية موثوقة.",
    "אני עוזר לסטארטאפים ולעסקים אזוריים שאפתניים להשיק מוצרים רב-לשוניים, להפוך תהליכים לאוטומטיים בעזרת AI ולהפעיל פלטפורמות ענן אמינות.",
  ),
  description: tx(
    "Fathallah Haj builds multilingual digital products, AI automation, and reliable cloud platforms for startups and regional businesses.",
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
    id: "product",
    number: "01",
    title: tx("Launch a digital product", "أطلق منتجاً رقمياً", "להשיק מוצר דיגיטלי"),
    summary: tx(
      "From idea and product architecture to a multilingual web or mobile experience, admin tools, payments, and production delivery.",
      "من الفكرة وهندسة المنتج إلى تجربة ويب أو موبايل متعددة اللغات، وأدوات الإدارة، والدفع، والإطلاق للإنتاج.",
      "מרעיון וארכיטקטורת מוצר ועד חוויית ווב או מובייל רב-לשונית, כלי ניהול, תשלומים ועלייה לייצור.",
    ),
    signals: ["Next.js", "React", "Flutter", "PostgreSQL", "Payments"],
  },
  {
    id: "automation",
    number: "02",
    title: tx(
      "Automate a workflow with AI",
      "أتمت سير عمل بالذكاء الاصطناعي",
      "להפוך תהליך לאוטומטי עם AI",
    ),
    summary: tx(
      "Practical assistants grounded in business rules, trusted data, review gates, and clear human takeover paths.",
      "مساعدون عمليّون مبنيون على قواعد العمل والبيانات الموثوقة، مع نقاط مراجعة ومسار واضح للتدخل البشري.",
      "עוזרים מעשיים שמבוססים על כללים עסקיים ונתונים מהימנים, עם נקודות בקרה ומעבר ברור לאדם.",
    ),
    signals: ["LLM tools", "WhatsApp", "RAG", "Evaluations", "Automation"],
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

export const solitaireMedia = {
  lobby: {
    src: "/labs/solitaire/solitaire-lobby-desktop.jpg",
    alt: tx("SOLitaire redesigned green-and-gold app lobby with solo play and competition options", "ردهة تطبيق SOLitaire بتصميم أخضر وذهبي وخيارات اللعب الفردي والمنافسة", "לובי SOLitaire בעיצוב ירוק וזהב עם אפשרויות למשחק יחיד ותחרות"),
    caption: tx("Redesigned desktop lobby", "ردهة سطح المكتب بتصميم جديد", "לובי המחשב בעיצוב החדש"),
    fit: "contain",
  },
  mobileLobby: {
    src: "/labs/solitaire/solitaire-lobby-mobile.jpg",
    alt: tx("SOLitaire mobile lobby with Play Solitaire, challenges, and bottom navigation", "ردهة SOLitaire على الموبايل مع اللعب والتحديات وشريط التنقل السفلي", "לובי SOLitaire במובייל עם משחק, אתגרים וניווט תחתון"),
    caption: tx("Responsive mobile lobby", "ردهة متجاوبة على الموبايل", "לובי מותאם למובייל"),
    fit: "contain",
  },
  gameplay: {
    src: "/labs/solitaire/solitaire-table-mobile.jpg",
    alt: tx("SOLitaire updated mobile Klondike table with seven card columns, score, timer, and game controls", "طاولة Klondike المحدثة في SOLitaire على الموبايل مع سبعة أعمدة ونقاط ومؤقت وأدوات اللعب", "שולחן Klondike המעודכן של SOLitaire במובייל עם שבע עמודות, ניקוד, שעון ופקדי משחק"),
    caption: tx("Updated solo Klondike gameplay", "لعب Klondike الفردي بتصميم محدث", "משחק Klondike יחיד בעיצוב המעודכן"),
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
    media: [{ src: "/work/camp-and-hike-home.png", alt: tx("Camp & Hike Arabic homepage over a mountain landscape", "الصفحة العربية لكامب أند هايك فوق منظر جبلي", "דף הבית בערבית של Camp & Hike על רקע הרים"), caption: tx("Public Arabic production homepage", "الصفحة العربية العامة", "דף הבית הציבורי בערבית") }],
    links: [liveLink("https://camp-and-hike.vercel.app/")],
    featured: false,
    customerPath: "business",
  },
  {
    slug: "whatsapp-ai-sales-agent",
    title: "Arabic-first WhatsApp AI Sales Agent",
    category: tx("AI business automation", "أتمتة أعمال بالذكاء الاصطناعي", "אוטומציה עסקית עם AI"),
    summary: tx(
      "A production-oriented WhatsApp sales assistant grounded in catalog data and deterministic business rules, with evaluation and human takeover built in.",
      "مساعد مبيعات موجّه للإنتاج على واتساب، مرتبط ببيانات الكتالوج وقواعد عمل حتمية، مع تقييم وتحويل إلى موظف.",
      "עוזר מכירות ל-WhatsApp שמיועד לייצור, מבוסס על קטלוג וכללים עסקיים דטרמיניסטיים, עם הערכה ומעבר לאדם.",
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
    media: [],
    links: [],
    featured: true,
    customerPath: "business",
  },
  {
    slug: "argus-ai",
    title: "Argus AI",
    category: tx("AI infrastructure assistant", "مساعد بنية تحتية بالذكاء الاصطناعي", "עוזר תשתיות מבוסס AI"),
    summary: tx("A source-backed DevOps assistant with a working Kubernetes connector and an extensible tool layer for metrics, logs, and delivery systems.", "مساعد DevOps مرتبط بالمصادر مع موصل Kubernetes عامل وطبقة أدوات قابلة للتوسعة للمقاييس والسجلات والتسليم.", "עוזר DevOps מבוסס מקורות עם מחבר Kubernetes פעיל ושכבת כלים ניתנת להרחבה למדדים, לוגים ומערכות מסירה."),
    problem: tx("Operational answers are slow when cluster state, metrics, logs, and deployment context live in separate tools.", "تتأخر الإجابات التشغيلية عندما تتوزع حالة العنقود والمقاييس والسجلات والنشر بين أدوات مختلفة.", "תשובות תפעוליות איטיות כאשר מצב האשכול, מדדים, לוגים והקשר פריסה מפוזרים בין כלים."),
    audience: tx("Platform and DevOps teams", "فرق المنصات وDevOps", "צוותי פלטפורמה ו-DevOps"),
    role: tx("Creator and infrastructure engineer", "المنشئ ومهندس البنية التحتية", "יוצר ומהנדס תשתיות"),
    status: "public-build",
    statusNote: tx("Public working project; Kubernetes connector implemented", "مشروع عام عامل؛ موصل Kubernetes منفّذ", "פרויקט ציבורי פעיל; מחבר Kubernetes ממומש"),
    capabilities: [tx("Natural-language requests routed through validated, read-oriented tools.", "طلبات لغة طبيعية تمر عبر أدوات قراءة موثّقة.", "בקשות בשפה טבעית מנותבות דרך כלי קריאה מאומתים."), tx("Working Kubernetes context for workloads, resources, and events.", "سياق Kubernetes عامل للأحمال والموارد والأحداث.", "הקשר Kubernetes פעיל לעומסים, משאבים ואירועים."), tx("Provider abstraction, validation, rate limits, safe logs, and local observability.", "تجريد للمزوّد وتحقق وحدود استخدام وسجلات آمنة ومراقبة محلية.", "הפשטת ספק, אימות, הגבלת קצב, לוגים בטוחים וניטור מקומי." )],
    evidence: [tx("Public source and setup path", "شيفرة عامة ومسار إعداد", "קוד ציבורי ותהליך התקנה"), tx("Working Kubernetes connector", "موصل Kubernetes عامل", "מחבר Kubernetes פעיל"), tx("Dockerized observability stack", "حزمة مراقبة عبر Docker", "מערך ניטור מבוסס Docker")],
    stack: ["NestJS", "TypeScript", "Kubernetes API", "Prometheus", "Loki", "Docker", "Redis"],
    architecture: [
      { label: tx("Engineer", "المهندس", "מהנדס"), detail: tx("Asks an infrastructure question in natural language.", "يسأل سؤال بنية تحتية بلغة طبيعية.", "שואל שאלת תשתית בשפה טבעית.") },
      { label: tx("Tool router", "موجّه الأدوات", "נתב כלים"), detail: tx("Validates intent and selects a read-oriented connector.", "يتحقق من الهدف ويختار موصل قراءة.", "מאמת כוונה ובוחר מחבר קריאה.") },
      { label: tx("Trusted source", "المصدر الموثوق", "מקור מהימן"), detail: tx("Returns Kubernetes evidence before the model composes an answer.", "يعيد أدلة Kubernetes قبل صياغة الإجابة.", "מחזיר ראיות Kubernetes לפני ניסוח התשובה.") },
    ],
    nextStep: tx("Wire and verify Prometheus, Loki, and ArgoCD before presenting them as implemented integrations.", "ربط واختبار Prometheus وLoki وArgoCD قبل عرضها كتكاملات منفّذة.", "לחבר ולאמת Prometheus, Loki ו-ArgoCD לפני הצגתם כאינטגרציות פעילות."),
    media: [],
    links: [repoLink("https://github.com/fatoh2/argus-ai")],
    featured: true,
    customerPath: "startup",
  },

  {
    slug: "argus-infra",
    title: "Argus Infra",
    category: tx("GitOps platform engineering", "هندسة منصة GitOps", "הנדסת פלטפורמת GitOps"),
    summary: tx("A public Kubernetes platform blueprint spanning infrastructure as code, configuration, GitOps, secrets, observability, policies, and runbooks.", "مخطط عام لمنصة Kubernetes يشمل البنية ككود والإعداد وGitOps والأسرار والمراقبة والسياسات وأدلة التشغيل.", "תכנית ציבורית לפלטפורמת Kubernetes הכוללת תשתית כקוד, תצורה, GitOps, סודות, ניטור, מדיניות וספרי הפעלה."),
    problem: tx("Reliable clusters require clear ownership across provisioning, configuration, delivery, observability, and recovery.", "تحتاج العناقيد الموثوقة إلى ملكية واضحة عبر الإنشاء والإعداد والتسليم والمراقبة والاستعادة.", "אשכולות אמינים דורשים אחריות ברורה על הקמה, תצורה, מסירה, ניטור והתאוששות."),
    audience: tx("Platform teams building repeatable Kubernetes environments", "فرق المنصات التي تبني بيئات Kubernetes متكررة", "צוותי פלטפורמה שבונים סביבות Kubernetes ניתנות לשחזור"),
    role: tx("Creator and platform engineer", "المنشئ ومهندس المنصة", "יוצר ומהנדס פלטפורמה"),
    status: "public-build",
    statusNote: tx("Public repository; deploy stage remains a documented placeholder", "مستودع عام؛ مرحلة النشر ما زالت موثقة كعنصر مستقبلي", "מאגר ציבורי; שלב הפריסה עדיין מוגדר כמציין מקום"),
    capabilities: [tx("Terraform/OpenTofu provisioning across documented cloud targets.", "إنشاء عبر Terraform/OpenTofu لأهداف سحابية موثقة.", "הקמה עם Terraform/OpenTofu ליעדי ענן מתועדים."), tx("Ansible configuration and ArgoCD ownership of platform services.", "إعداد Ansible وملكية ArgoCD لخدمات المنصة.", "תצורת Ansible וניהול שירותי פלטפורמה ב-ArgoCD."), tx("Monitoring, secrets, ingress, policies, sanity checks, ADRs, and runbooks.", "مراقبة وأسرار وIngress وسياسات وفحوصات وADRs وأدلة تشغيل.", "ניטור, סודות, ingress, מדיניות, בדיקות, ADRs וספרי הפעלה.")],
    evidence: [tx("Public infrastructure repository", "مستودع بنية عام", "מאגר תשתית ציבורי"), tx("Documented platform layers", "طبقات منصة موثقة", "שכבות פלטפורמה מתועדות"), tx("Operational checks and runbooks", "فحوصات وأدلة تشغيل", "בדיקות וספרי הפעלה")],
    stack: ["Terraform", "OpenTofu", "Ansible", "Kubernetes", "ArgoCD", "Helm", "Prometheus", "Loki"],
    architecture: [
      { label: tx("Provision", "الإنشاء", "הקמה"), detail: tx("Terraform/OpenTofu creates cloud and cluster resources.", "ينشئ Terraform/OpenTofu موارد السحابة والعنقود.", "Terraform/OpenTofu יוצר משאבי ענן ואשכול.") },
      { label: tx("Configure", "الإعداد", "תצורה"), detail: tx("Ansible establishes repeatable host and cluster state.", "يثبت Ansible حالة متكررة للمضيف والعنقود.", "Ansible מגדיר מצב חוזר למארחים ולאשכול.") },
      { label: tx("Operate", "التشغيل", "תפעול"), detail: tx("ArgoCD, monitoring, secrets, policies, and runbooks close the loop.", "تغلق ArgoCD والمراقبة والأسرار والسياسات وأدلة التشغيل الحلقة.", "ArgoCD, ניטור, סודות, מדיניות וספרי הפעלה סוגרים את המעגל.") },
    ],
    nextStep: tx("Replace the deploy placeholder with an exercised release workflow and recorded recovery test.", "استبدال عنصر النشر المستقبلي بمسار إصدار مجرّب واختبار استعادة موثّق.", "להחליף את מציין המקום של הפריסה בתהליך שחרור בדוק ובמבחן התאוששות מתועד."),
    media: [],
    links: [repoLink("https://github.com/fatoh2/argus-infra")],
    featured: false,
    customerPath: "startup",
  },
  {
    slug: "argus-monitor",
    title: "Argus Monitor",
    category: tx("Monitoring product architecture", "هندسة منتج مراقبة", "ארכיטקטורת מוצר ניטור"),
    summary: tx("A monitoring SaaS architecture with services, queues, WebSockets, CI tests, PostgreSQL, Redis, and resilient external integrations.", "هندسة SaaS للمراقبة مع خدمات وطوابير وWebSockets واختبارات CI وPostgreSQL وRedis وتكاملات خارجية مرنة.", "ארכיטקטורת SaaS לניטור עם שירותים, תורים, WebSockets, בדיקות CI, PostgreSQL, Redis ואינטגרציות חיצוניות עמידות."),
    problem: tx("Event monitoring needs dependable ingestion, rule evaluation, live state, notification delivery, and explicit failure handling.", "تحتاج مراقبة الأحداث إلى استقبال موثوق وتقييم قواعد وحالة مباشرة وتسليم تنبيهات ومعالجة صريحة للفشل.", "ניטור אירועים דורש קליטה אמינה, הערכת כללים, מצב חי, מסירת התראות וטיפול מפורש בכשלים."),
    audience: tx("Product teams building real-time monitoring systems", "فرق المنتجات التي تبني أنظمة مراقبة فورية", "צוותי מוצר שבונים מערכות ניטור בזמן אמת"),
    role: tx("Creator and full-stack infrastructure engineer", "المنشئ ومهندس بنية Full-stack", "יוצר ומהנדס תשתיות Full-stack"),
    status: "public-build",
    statusNote: tx("Public product architecture; no usage or uptime claims", "هندسة منتج عامة؛ بلا ادعاءات استخدام أو إتاحة", "ארכיטקטורת מוצר ציבורית; ללא טענות שימוש או זמינות"),
    capabilities: [tx("Service boundaries for API, indexing, adapters, alerts, and notifications.", "حدود خدمات للـAPI والفهرسة والمحولات والتنبيهات والإشعارات.", "גבולות שירות ל-API, אינדוקס, מתאמים, התראות והודעות."), tx("Redis/BullMQ queues and WebSocket updates for background and live work.", "طوابير Redis/BullMQ وتحديثات WebSocket للعمل الخلفي والمباشر.", "תורי Redis/BullMQ ועדכוני WebSocket לעבודה ברקע ובזמן אמת."), tx("Unit, integration, and Playwright flows around core boundaries.", "اختبارات Unit وIntegration وPlaywright حول الحدود الأساسية.", "תהליכי Unit, Integration ו-Playwright סביב הגבולות המרכזיים.")],
    evidence: [tx("Public service architecture", "هندسة خدمات عامة", "ארכיטקטורת שירות ציבורית"), tx("Documented test posture", "منهج اختبار موثق", "גישת בדיקות מתועדת"), tx("Resilience and secret controls", "ضوابط للمرونة والأسرار", "בקרות עמידות וסודות")],
    stack: ["React", "NestJS", "PostgreSQL", "Redis", "Prisma", "BullMQ", "Socket.io", "Playwright"],
    architecture: [
      { label: tx("Dashboard & API", "لوحة وAPI", "לוח ו-API"), detail: tx("Authenticated configuration and live status flows.", "إعداد موثّق وتدفقات حالة مباشرة.", "תצורה מאומתת ותהליכי מצב חי.") },
      { label: tx("Event pipeline", "خط الأحداث", "צינור אירועים"), detail: tx("Indexers and adapters normalize external data into queued work.", "توحّد الفهارس والمحولات البيانات الخارجية إلى عمل في الطابور.", "אינדקסרים ומתאמים מנרמלים נתונים חיצוניים לעבודה בתור.") },
      { label: tx("Alert delivery", "تسليم التنبيه", "מסירת התראה"), detail: tx("Rules, notifications, and state records complete the loop.", "تكمل القواعد والإشعارات وسجلات الحالة الحلقة.", "כללים, הודעות ורשומות מצב משלימים את המעגל.") },
    ],
    nextStep: tx("Exercise production-like load and failure scenarios before making reliability claims.", "اختبار حمل وفشل شبيهين بالإنتاج قبل أي ادعاءات موثوقية.", "לבחון עומס וכשל דמויי ייצור לפני הצהרות אמינות."),
    media: [],
    links: [repoLink("https://github.com/fatoh2/argus-monitor")],
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
        src: "/work/seeker-radar/discovery-desktop.jpg",
        alt: tx("Seeker Radar desktop app catalog with discovery navigation, filters, app listings, and evidence scores", "كتالوج Seeker Radar على سطح المكتب مع تنقل الاكتشاف والتصفية وقوائم التطبيقات ودرجات الأدلة", "קטלוג האפליקציות של Seeker Radar במחשב עם ניווט, מסננים, רשומות וציונים מבוססי ראיות"),
        caption: tx("Live discovery catalog and filters", "كتالوج الاكتشاف المباشر وأدوات التصفية", "קטלוג גילוי חי ומסננים"),
        fit: "contain",
      },
      {
        src: "/work/seeker-radar/app-brief-mobile.jpg",
        alt: tx("Seeker Radar mobile TokenRun app brief with Store artwork, rating, evidence summary, and app actions", "ملف TokenRun على Seeker Radar للموبايل مع صور المتجر والتقييم وملخص الأدلة وإجراءات التطبيق", "סקירת TokenRun במובייל של Seeker Radar עם תמונות מהחנות, דירוג, סיכום ראיות ופעולות"),
        caption: tx("Mobile app brief with listing evidence", "ملف تطبيق على الموبايل مع أدلة من المتجر", "סקירת אפליקציה במובייל עם ראיות מהרשומה"),
        fit: "contain",
      },
      {
        src: "/work/seeker-radar/updates-mobile.jpg",
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
    media: [solitaireMedia.lobby, solitaireMedia.mobileLobby, solitaireMedia.gameplay],
    links: [liveLink("https://sol-solitaire.com")],
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
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AI drafting", "Structured data"],
    architecture: [
      { label: tx("Editorial experience", "التجربة التحريرية", "חוויה עריכתית"), detail: tx("Cinematic trip and collection storytelling in two languages.", "سرد سينمائي للرحلات والمجموعات بلغتين.", "סיפור קולנועי של טיולים ואוספים בשתי שפות.") },
      { label: tx("Content operations", "تشغيل المحتوى", "תפעול תוכן"), detail: tx("Administered structured records, media, and publishing state.", "سجلات منظمة ووسائط وحالة نشر قابلة للإدارة.", "רשומות מובנות, מדיה ומצב פרסום מנוהל.") },
      { label: tx("AI drafting", "صياغة AI", "כתיבה עם AI"), detail: tx("Draft assistance remains behind human review and publishing control.", "المساعدة في الصياغة تبقى خلف مراجعة ونشر بشريين.", "סיוע בכתיבה נשאר תחת ביקורת ושליטת פרסום אנושית.") },
    ],
    nextStep: tx("Keep editorial workflows and structured SEO aligned as the catalog expands.", "الحفاظ على توافق التحرير وSEO المنظم مع توسع الكتالوج.", "לשמור על התאמה בין תהליכי העריכה ל-SEO מובנה ככל שהקטלוג גדל."),
    media: [{ src: "/work/elsewhereco-home.png", alt: tx("ElsewhereCo Arabic expedition homepage", "الصفحة العربية لرحلات ElsewhereCo", "דף מסעות בערבית של ElsewhereCo"), caption: tx("Public Arabic production homepage", "الصفحة العربية العامة", "דף הבית הציבורי בערבית") }],
    links: [liveLink("https://elsewhereco.vercel.app/")],
    featured: false,
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
    stack: ["Next.js", "TypeScript", "Responsive UI", "Content workflows", "Commerce"],
    architecture: [
      { label: tx("Discover", "الاكتشاف", "גילוי"), detail: tx("Programs, activities, stories, and visual proof.", "برامج وفعاليات وقصص وأدلة بصرية.", "תכניות, פעילויות, סיפורים והוכחה חזותית.") },
      { label: tx("Trust", "الثقة", "אמון"), detail: tx("Reviews, memories, team identity, and clear contact paths.", "آراء وذكريات وهوية الفريق ومسارات تواصل واضحة.", "ביקורות, זיכרונות, זהות צוות ונתיבי קשר ברורים.") },
      { label: tx("Act", "الإجراء", "פעולה"), detail: tx("Booking intent, program selection, and store interactions.", "نية الحجز واختيار البرامج والتفاعل مع المتجر.", "כוונת הזמנה, בחירת תכנית ואינטראקציות חנות.") },
    ],
    nextStep: tx("Keep booking and content operations measurable as new programs are introduced.", "جعل الحجز وتشغيل المحتوى قابلين للقياس مع إضافة برامج جديدة.", "לשמור על מדידות של הזמנות ותפעול תוכן עם הוספת תכניות."),
    media: [{ src: "/work/go-to-nature-home.png", alt: tx("Go To Nature Arabic community homepage", "الصفحة العربية لمجتمع Go To Nature", "דף הקהילה בערבית של Go To Nature"), caption: tx("Public Arabic production homepage", "الصفحة العربية العامة", "דף הבית הציבורי בערבית") }],
    links: [liveLink("https://go-to-nature.vercel.app/")],
    featured: true,
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
    media: [{ src: "/work/lulu-tokki-home.png", alt: tx("Lulu Tokki Arabic Korean snacks storefront", "متجر Lulu Tokki العربي للسناكات الكورية", "חנות החטיפים הקוריאניים של Lulu Tokki בערבית"), caption: tx("Public Arabic production storefront", "المتجر العربي العام", "החנות הציבורית בערבית") }],
    links: [liveLink("https://lulu-tokki.vercel.app/"), repoLink("https://github.com/fatoh2/lulu-tokki")],
    featured: false,
    customerPath: "business",
  },
];

export const focusQuest = {
  title: "FocusQuest",
  category: tx(
    "In-development learning product",
    "منتج تعليمي قيد التطوير",
    "מוצר למידה בפיתוח",
  ),
  summary: tx(
    "An ADHD-first Flutter learning and focus experience for young people, with parent controls, platform-aware restrictions, and Arabic/English product surfaces.",
    "تجربة Flutter للتعلّم والتركيز مصممة أولاً لاضطراب ADHD، مع تحكم للأهل وقيود حسب المنصة وواجهات عربية وإنجليزية.",
    "חוויית למידה וריכוז ב-Flutter שמתחילה מצרכי ADHD, עם בקרת הורים, מגבלות לפי פלטפורמה וממשקים בערבית ובאנגלית.",
  ),
  status: "in-development" as ProjectStatus,
  stack: ["Flutter", "Firebase", "Android", "iOS", "Accessibility"],
};

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectParams = () =>
  locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
