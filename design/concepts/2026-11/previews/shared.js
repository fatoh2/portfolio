/* PROTOTYPE, throwaway. Data, the demo rules and the bottom switcher shared by the six concept previews.
   Values were copied on 2026-11-10 from src/content/portfolio.ts, src/content/now.json, src/lib/agent-demo.ts
   and public/downloads (sizes and SHA-256 read from the files). A real build imports those modules instead. */
const PUB = '../../../../public';
const WHATSAPP = 'https://wa.me/972545964855?text=Hi%20Fathallah%2C%20I%27d%20like%20to%20discuss%20a%20project.';
const EYE_D = 'M718 362H746C762 362 774 374 774 390V425H718C701 425 691 416 691 400V389C691 374 702 362 718 362Z';
const MARK_D = 'M250 284H417V395H526V284H610V512H732C755 512 770 498 774 471H704C664 471 638 449 638 411V392C638 334 679 295 739 295C801 295 843 335 843 392V482C843 542 805 582 742 582H526V453H417V582H248C225 582 210 597 210 619C210 642 227 655 254 655C292 655 334 645 364 627C363 685 318 717 254 717C187 717 145 676 145 618C145 559 190 513 250 513H346V358H249C233 358 225 367 225 383V411H312V470H247C211 470 179 486 150 516V377C150 325 192 284 250 284Z' + EYE_D;
const markSvg = () => `<svg viewBox="120 190 750 550" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="${MARK_D}"/><circle cx="739" cy="246" r="33"/></svg>`;
// one tick: in development or private. two: live.
const ticks = n => `<svg class="ticks" viewBox="0 0 26 14" role="img" aria-label="${n > 1 ? 'Live' : 'Not public yet'}"><path d="${n > 1 ? 'M2 7.5l4 4 8-9M12.6 11.2l8.4-8.7' : 'M8 7.5l4 4 8-9'}"/></svg>`;
const day = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const STATUS = { live: 'Live', dev: 'In development', private: 'Private build' };

const PROJECTS = [
  { slug: 'elsewhereco', title: 'ElsewhereCo', status: 'live', img: '/work/elsewhereco/desktop.webp', url: 'https://elsewhereco.vercel.app/', now: 'Per-trip destination patches', updated: '2026-10-16' },
  { slug: 'whatsapp-ai-sales-agent', title: 'WhatsApp AI Sales Agent', status: 'private', img: '/work/whatsapp-ai-sales-agent/simulator-desktop.webp' },
  { slug: 'bab', title: 'Bab (باب)', status: 'dev', img: '/work/bab/desktop.webp', now: 'Building', updated: '2026-10-24' },
  { slug: 'solitaire', title: 'SOLitaire', status: 'live', img: '/labs/solitaire/solitaire-suit-home-desktop.jpg', url: 'https://sol-solitaire.com', apk: 'SOLitaire.apk', now: 'Court Table redesign on staging', updated: '2026-10-18' },
  { slug: 'little-keepsakes', title: 'Little Keepsakes', status: 'dev', img: '/work/little-keepsakes-library.jpg', apk: 'Little-Keepsakes-0.3.1-preview.apk' },
  { slug: 'seeker-radar', title: 'Seeker Radar', status: 'live', img: '/work/seeker-radar/discovery-desktop.jpg', url: 'https://seeker-radar.app', now: 'Live at seeker-radar.app', updated: '2026-09-03' },
  { slug: 'camp-and-hike', title: 'Camp & Hike', status: 'live', img: '/work/camp-and-hike/desktop.webp', url: 'https://camp-and-hike.vercel.app/', now: 'Site feature-complete', updated: '2026-09-22' },
  { slug: 'go-to-nature', title: 'Go To Nature', status: 'live', img: '/work/go-to-nature/desktop.webp', url: 'https://go-to-nature.vercel.app/', now: 'Live', updated: '2026-10-14' },
  { slug: 'lulu-tokki', title: 'Lulu Tokki', status: 'live', img: '/work/lulu-tokki/desktop.webp', url: 'https://lulu-tokki.vercel.app/' },
  { slug: 'nedaa-lifestyle', title: 'Nedaa Lifestyle', status: 'dev', img: '/work/nedaa-lifestyle/member-schedule.webp', apk: 'Nedaa-Lifestyle.apk', now: 'Running the studio from the app', updated: '2026-10-17' },
  { slug: 'darbak', title: 'Darbak (دربك)', status: 'dev', img: '/work/darbak/desktop.webp' },
  { slug: 'saqroon', title: 'Saqroon', status: 'dev', img: '/labs/saqroon/saqroon-landing-desktop.jpg', apk: 'Saqroon-arm64.apk', now: 'Pilot implementation and review', updated: '2026-10-20' },
];
const APKS = [
  { file: 'SOLitaire.apk', bytes: 44024471, sha: 'f81116772aeb5f7121e3fe6c1cfafd8175d6ee8c808624610b88ebf483a0115f' },
  { file: 'Nedaa-Lifestyle.apk', bytes: 62341016, sha: '6c8c7afdf051f0cb9758948567c72dbadfffd7d46d672a35130e08ed91184894' },
  { file: 'Little-Keepsakes-0.3.1-preview.apk', bytes: 4370193, sha: '8445ea5cb81d3803aa9e9a1ebd0f9e93733fa59ca7358f174bf00a8a9f2ff805' },
  { file: 'Saqroon-arm64.apk', bytes: 99005689, sha: '0f9a1c07e0c4832c23bc2dfc8b76e496a120ca644ccb142bab9d92dd9edbb496' },
];

/* ---- the demo sweets shop's rules layer, a straight port of src/lib/agent-demo.ts ---- */
const CATALOG = [
  { id: 'KNAFEH-KG', name: { ar: 'كنافة نابلسية، كيلو', en: 'Nabulsi knafeh, 1 kg', he: 'כנאפה נאבלוסית, קילו' }, price: 90, stock: 'in_stock', aliases: ['كنافة', 'كنافه', 'knafeh', 'kunafa', 'knafe', 'כנאפה'] },
  { id: 'BAKLAWA-BOX', name: { ar: 'علبة بقلاوة، نص كيلو', en: 'Baklawa box, 500 g', he: 'קופסת בקלאווה, חצי קילו' }, price: 65, stock: 'in_stock', aliases: ['بقلاوة', 'بقلاوه', 'baklawa', 'baklava', 'בקלאווה', 'בקלאוה'] },
  { id: 'MAAMOUL-BOX', name: { ar: 'معمول بالتمر، 24 حبة', en: "Ma'amoul with dates, 24 pieces", he: 'מעמול תמרים, 24 יחידות' }, price: 55, stock: 'limited', aliases: ['معمول', 'maamoul', "ma'amoul", 'mamoul', 'מעמול'] },
  { id: 'HALAWET-JIBN', name: { ar: 'صينية حلاوة الجبن', en: 'Halawet el jibn tray', he: "מגש חלאוות אל-ג'יבן" }, price: 70, stock: 'out_of_stock', aliases: ['حلاوة الجبن', 'حلاوه الجبن', 'halawet', 'jibn', 'חלאוות'] },
];
const AREAS = [
  { id: 'nazareth', name: { ar: 'الناصرة', en: 'Nazareth', he: 'נצרת' }, fee: 0, aliases: ['الناصرة', 'الناصره', 'nazareth', 'נצרת'] },
  { id: 'haifa', name: { ar: 'حيفا', en: 'Haifa', he: 'חיפה' }, fee: 25, aliases: ['حيفا', 'haifa', 'חיפה'] },
  { id: 'kufr-kanna', name: { ar: 'كفر كنا', en: 'Kafr Kanna', he: 'כפר כנא' }, fee: 15, aliases: ['كفر كنا', 'kafr kanna', 'kufr kanna', 'כפר כנא'] },
];
const norm = t => t.toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
const detectLanguage = t => /[؀-ۿ]/.test(t) ? 'ar' : /[֐-׿]/.test(t) ? 'he' : 'en';
const RULES = [ // order matters: handoffs are checked before anything the agent may answer
  ['injection', 'prompt_injection_attempt', /ignore (?:all |the )?(?:previous|system)|system prompt|developer message|تجاهل التعليمات|הוראות מערכת/iu],
  ['human', 'human_requested', /\b(?:human|owner|person|agent|representative)\b|المالك|صاحب المحل|موظف|بني ادم|נציג|בעלים|בן אדם/iu],
  ['complaint', 'complaint_or_refund', /\b(?:complaint|angry|broken|wrong|terrible|refund)\b|شكوي|غاضب|خربان|استرجاع|תלונה|החזר/iu],
  ['legal', 'sensitive_escalation', /\b(?:lawyer|lawsuit|police|legal|injured)\b|محامي|شرطه|قانون|اصابه|עורך דין|משטרה/iu],
  ['stock', null, /\b(?:stock|available|availability|left)\b|متوفر|مخزون|موجود|في عندكم|במלאי|זמין|יש לכם/iu],
  ['delivery', null, /\b(?:deliver|delivery|shipping|arrive|eta)\b|توصيل|توصلوا|بتوصلوا|شحن|بوصل|משלוח|שולחים/iu],
  ['price', null, /\b(?:price|cost|how much)\b|سعر|قديش|بكم|كم ثمن|מחיר|כמה עולה|כמה זה/iu],
  ['discount', null, /\b(?:discount|deal|cheaper)\b|خصم|تنزيل|ارخص|הנחה|מבצע/iu],
  ['greeting', null, /^\s*(?:hello|hi|hey|good (?:morning|evening)|مرحبا|اهلا|يهلا|هاي|صباح الخير|مساء الخير|שלום|היי|בוקר טוב)(?=[\s!?؟.,]|$)/iu],
];
const SAY = {
  ar: {
    greeting: 'أهلاً. كيف بقدر أساعد اليوم؟', price: (n, p) => `${n} سعره ${p} شيكل.`,
    stock: { in_stock: n => `${n} متوفر اليوم.`, limited: n => `${n} متوفر بكمية محدودة، الأفضل تحجز اليوم.`, out_of_stock: n => `${n} مش متوفر حالياً.` },
    delivery: (a, f) => f === 0 ? `بنوصل لـ${a} مجاناً.` : `بنوصل لـ${a}، رسوم التوصيل ${f} شيكل.`,
    whichItem: ns => `أي صنف بتقصد؟ عنا: ${ns.join('، ')}.`, owner: 'خليني أتأكد من المسؤول وبرجعلك بجواب.',
    clarify: 'ممكن توضحلي أكثر؟ بقدر أساعدك بالأسعار والتوفر والتوصيل.',
  },
  en: {
    greeting: 'Hello. How can I help today?', price: (n, p) => `${n} is ${p} ILS.`,
    stock: { in_stock: n => `${n} is in stock today.`, limited: n => `${n} is in limited supply; best to order today.`, out_of_stock: n => `${n} is out of stock right now.` },
    delivery: (a, f) => f === 0 ? `We deliver to ${a} for free.` : `We deliver to ${a}; the delivery fee is ${f} ILS.`,
    whichItem: ns => `Which item do you mean? We have: ${ns.join(', ')}.`, owner: 'Let me check with the business and get back to you.',
    clarify: 'Could you tell me a little more? I can help with prices, availability and delivery.',
  },
  he: {
    greeting: 'שלום. איך אפשר לעזור היום?', price: (n, p) => `${n} עולה ${p} ש"ח.`,
    stock: { in_stock: n => `${n} במלאי היום.`, limited: n => `${n} בכמות מוגבלת, כדאי להזמין היום.`, out_of_stock: n => `${n} לא במלאי כרגע.` },
    delivery: (a, f) => f === 0 ? `אנחנו שולחים ל${a} בחינם.` : `אנחנו שולחים ל${a}; דמי המשלוח ${f} ש"ח.`,
    whichItem: ns => `לאיזה פריט התכוונת? יש לנו: ${ns.join(', ')}.`, owner: 'אבדוק עם האחראי ואחזור עם תשובה.',
    clarify: 'אפשר לפרט קצת? אני יכול לעזור במחירים, זמינות ומשלוחים.',
  },
};
const lookup = (list, text) => list.find(x => [...x.aliases, ...Object.values(x.name)].some(a => norm(text).includes(norm(a)))) ?? null;
function reply(text) {
  const language = detectLanguage(text), t = SAY[language];
  const [intent, handoff] = RULES.find(r => r[2].test(norm(text))) ?? ['other', null];
  const base = { intent, language };
  if (handoff) return { ...base, text: t.owner, source: null, handoff };
  if (intent === 'greeting') return { ...base, text: t.greeting, source: null, handoff: null };
  if (intent === 'price' || intent === 'stock') {
    const item = lookup(CATALOG, text);
    if (!item) return { ...base, text: t.whichItem(CATALOG.map(e => e.name[language])), source: null, handoff: null };
    const source = { id: `catalog:${item.id}`, label: item.name };
    return { ...base, source, handoff: null, text: intent === 'price' ? t.price(item.name[language], item.price) : t.stock[item.stock](item.name[language]) };
  }
  if (intent === 'delivery') {
    const area = lookup(AREAS, text);
    if (!area) return { ...base, text: t.owner, source: null, handoff: 'missing_approved_sources' };
    return { ...base, text: t.delivery(area.name[language], area.fee), source: { id: `delivery:${area.id}`, label: area.name }, handoff: null };
  }
  if (intent === 'discount') return { ...base, text: t.owner, source: null, handoff: 'missing_approved_sources' };
  return { ...base, text: t.clarify, source: null, handoff: null };
}
// self-check against the values the live demo is known to give
console.assert(reply('بكم الكنافة؟').source.id === 'catalog:KNAFEH-KG' && reply('Do you deliver to Haifa?').text.includes('25') && reply('Any discount?').handoff === 'missing_approved_sources', 'rules port drifted from agent-demo.ts');

document.querySelectorAll('[data-mark]').forEach(e => { e.innerHTML = markSvg(); });
{
  const pages = [['index', 'All'], ['h-scope', 'H Real scope'], ['g-mix', 'G Mix'], ['a-message', 'A Message'], ['b-thread', 'B Thread'], ['c-spine', 'C Spine'], ['d-opening', 'D Opening'], ['e-receipts', 'E Receipts'], ['f-table', 'F Table']];
  const here = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.body.insertAdjacentHTML('beforeend', `<nav id="pv" aria-label="Concept previews">${pages.map(([f, n]) => `<a href="${f}.html"${f === here ? ' aria-current="page"' : ''}>${n}</a>`).join('')}</nav>`);
}
