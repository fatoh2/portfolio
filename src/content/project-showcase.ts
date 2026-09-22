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
  desktopRatio: string;
  mobileIndex?: number;
  mobileRatio?: string;
  details: Detail[];
};

export const projectShowcases: Record<string, ProjectShowcase> = {
  "seeker-radar": {
    desktopRatio: "1265 / 712", mobileIndex: 1, mobileRatio: "375 / 812",
    details: [
      {
        mediaIndex: 0, sourceSize: [1265, 712], crop: [243, 217, 567, 83],
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
    details: [
      {
        mediaIndex: 0, sourceSize: [1600, 1000], crop: [536, 224, 528, 102],
        title: tx("Choose your game", "اختر لعبتك", "בחרו את המשחק"),
        description: tx("Classic play or a timed score run, starting from the same lobby.", "لعب كلاسيكي أو جولة نقاط محددة بوقت، من الردهة نفسها.", "משחק קלאסי או סבב ניקוד על זמן, מאותו לובי."),
      },
      {
        mediaIndex: 2, sourceSize: [1179, 2622], crop: [679, 926, 485, 420],
        title: tx("Meet the court", "تعرّف على أوراق البلاط", "הכירו את קלפי החצר"),
        description: tx("Original court characters and crisp card faces, seen in a game in progress.", "شخصيات أصلية لأوراق البلاط ووجوه بطاقات واضحة، من جولة قيد اللعب.", "דמויות חצר מקוריות וקלפים חדים, מתוך משחק בעיצומו."),
      },
    ],
  },
  nuqta: {
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
    desktopRatio: "1440 / 900",
    details: [
      {
        mediaIndex: 0, sourceSize: [1440, 900], crop: [359, 535, 722, 226],
        title: tx("A community identity", "هوية مجتمع", "זהות קהילתית"),
        description: tx("An Arabic-first welcome built around the people and the outdoors.", "ترحيب يبدأ بالعربية، حول الناس والطبيعة.", "קבלת פנים בערבית, סביב האנשים והטבע."),
      },
      {
        mediaIndex: 0, sourceSize: [1440, 900], crop: [546, 778, 346, 93],
        title: tx("The next adventure", "المغامرة التالية", "ההרפתקה הבאה"),
        description: tx("Clear paths from discovering the community to choosing an adventure.", "مسارات واضحة من اكتشاف المجتمع إلى اختيار المغامرة.", "דרך ברורה מהיכרות עם הקהילה לבחירת הרפתקה."),
      },
    ],
  },
};
