import { tx, type LocalizedText } from "./portfolio";

type Detail = {
  mediaIndex: number;
  sourceSize: [number, number];
  /** Pixel coordinates in the original capture; the source image stays intact. */
  crop: [number, number, number, number];
  title: LocalizedText;
  description: LocalizedText;
};
type ProjectShowcase = {
  /** Silent loops at /work/<slug>/loop-desktop.* and loop-mobile.* */
  loops?: boolean;
  desktopRatio: string;
  mobileIndex?: number;
  mobileRatio?: string;
  detailPresentation?: "edge-to-edge";
  details: Detail[];
};

export const projectShowcases: Record<string, ProjectShowcase> = {
  "whatsapp-ai-sales-agent": { desktopRatio: "1440 / 1000", mobileIndex: 1, mobileRatio: "390 / 844", details: [] },
  bab: { loops: true, desktopRatio: "1440 / 900", mobileIndex: 1, mobileRatio: "390 / 844", details: [] },
  darbak: { desktopRatio: "1440 / 900", mobileIndex: 1, mobileRatio: "390 / 844", details: [] },
  "little-keepsakes": {
    desktopRatio: "1365 / 900", mobileIndex: 1, mobileRatio: "390 / 844",
    details: [],
  },
  "seeker-radar": {
    desktopRatio: "1265 / 712", mobileIndex: 1, mobileRatio: "375 / 812",
    detailPresentation: "edge-to-edge",
    details: [
      {
        mediaIndex: 0, sourceSize: [1265, 712], crop: [242, 218, 976, 390],
        title: tx("Curated picks", "اختيارات منتقاة", "בחירות נבחרות"),
        description: tx("Highlighted apps, with their category and Radar score in view.", "تطبيقات مختارة مع تصنيفها ودرجة Radar في مكان واحد.", "אפליקציות נבחרות, עם הקטגוריה וציון Radar במקום אחד."),
      },
      {
        mediaIndex: 1, sourceSize: [375, 812], crop: [15, 269, 335, 136],
        title: tx("App brief", "لمحة عن التطبيق", "סקירת אפליקציה"),
        description: tx("Store ratings and app signals, brought together for a closer look.", "تقييمات المتجر ومؤشرات التطبيق معاً لإلقاء نظرة أقرب.", "דירוגי החנות וסימני האפליקציה, יחד למבט מקרוב."),
      },
    ],
  },
  solitaire: {
    desktopRatio: "1600 / 1000", mobileIndex: 2, mobileRatio: "1179 / 2622",
    detailPresentation: "edge-to-edge",
    details: [
      {
        mediaIndex: 3, sourceSize: [2560, 1600], crop: [260, 270, 2040, 790],
        title: tx("Choose your game", "اختر لعبتك", "בחרו את המשחק"),
        description: tx("Play, Compete or Daily, each hub in its own suit colour.", "اللعب أو المنافسة أو اليومي، كل قسم بلون رمزه.", "Play, Compete או Daily, כל מרכז בצבע הצורה שלו."),
      },
      {
        mediaIndex: 2, sourceSize: [1179, 2622], crop: [0, 330, 1179, 945],
        title: tx("Suits on the table", "الرموز على الطاولة", "הצורות על השולחן"),
        description: tx("Foundations in their suit colours and original court art, from a fresh deal.", "أساسات بألوان رموزها ورسومات أصلية لأوراق البلاط، من توزيعة جديدة.", "יסודות בצבעי הצורות ואיורי חצר מקוריים, מחלוקה חדשה."),
      },
    ],
  },
  saqroon: {
    desktopRatio: "1430 / 755", mobileIndex: 1, mobileRatio: "1170 / 2532",
    details: [
      {
        mediaIndex: 1, sourceSize: [1170, 2532], crop: [73, 740, 1025, 525],
        title: tx("A path to follow", "مسار للتعلّم", "מסלול ללמידה"),
        description: tx("Maths units and visible progress give each short quest a place in the journey.", "وحدات رياضيات وتقدّم واضح يمنحان كل مهمة قصيرة مكانًا في الرحلة.", "יחידות מתמטיקה והתקדמות גלויה נותנות לכל משימה קצרה מקום במסע."),
      },
      {
        mediaIndex: 2, sourceSize: [1170, 2532], crop: [130, 489, 915, 547],
        title: tx("Make the question visual", "سؤال تراه بوضوح", "לראות את השאלה"),
        description: tx("A fraction diagram makes an Arabic maths question concrete, one step at a time.", "رسم للكسور يقرّب سؤال الرياضيات بالعربية، خطوة بخطوة.", "תרשים שברים ממחיש שאלת מתמטיקה בערבית, צעד אחר צעד."),
      },
    ],
  },
  "go-to-nature": {
    desktopRatio: "1440 / 900", mobileIndex: 1, mobileRatio: "390 / 844",
    details: [],
  },
  elsewhereco: {
    loops: true, desktopRatio: "1440 / 900", mobileIndex: 1, mobileRatio: "390 / 844",
    details: [],
  },
};
