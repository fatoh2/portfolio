/**
 * The twelve homepage cards, built on the server from the content files (design step 1.3).
 * One shape for the eleven projects and Nuqta Kids (`focusQuest`), which has no case page and carries builds
 * and a website instead of links.
 */
import { cardOrder } from "@/content/home";
import now from "@/content/now.json";
import {
  focusQuest,
  localizedPath,
  projects,
  type Locale,
  type LocalizedText,
  type ProjectMedia,
  type ProjectStatus,
} from "@/content/portfolio";
import { projectShowcases } from "@/content/project-showcase";

/** A live page and the still it is layered over, each at its captured size. */
export type Embed = {
  src: string;
  title: LocalizedText;
  width: number;
  height: number;
  still: { src: string; width: number; height: number };
};

export type HomeCard = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category: LocalizedText;
  summary: LocalizedText;
  statusNote: LocalizedText | null;
  phone: { src: string; width: number; height: number; alt: LocalizedText };
  /** Desktop capture for the sheet; null when the project has phone captures only. */
  still: { src: string; width: number; height: number } | null;
  /** DeckVideo paths without the extension. */
  loops: { desktop: string; mobile: string } | null;
  embeds: { hero?: Embed; table?: Embed };
  live: { href: string; label: LocalizedText } | null;
  downloads: { href: string; label: LocalizedText }[];
  /** Localised case-page address; null for Nuqta Kids. */
  casePath: string | null;
  /** Nuqta Kids' install note. */
  note: LocalizedText | null;
  phase: { text: string; updated: string } | null;
};

/** `href` is the case page, or `#nuqta-kids` for the one card without one. */
export type HomeCardRef = { slug: string; title: string; status: ProjectStatus; hasDownload: boolean; href: string };

type Source = {
  slug: string;
  title: string;
  status: ProjectStatus;
  category: LocalizedText;
  summary: LocalizedText;
  statusNote: LocalizedText | null;
  media: ProjectMedia[];
  live: { href: string; label: LocalizedText } | null;
  downloads: { href: string; label: LocalizedText }[];
  hasCasePage: boolean;
  note: LocalizedText | null;
};

function sources(locale: Locale): Source[] {
  return [
    ...projects.map((project) => {
      const live = project.links.find((link) => link.kind === "live");
      return {
        slug: project.slug,
        title: project.title,
        status: project.status,
        category: project.category,
        summary: project.summary,
        statusNote: project.statusNote,
        media: project.media,
        live: live ? { href: live.href, label: live.label } : null,
        downloads: project.links
          .filter((link) => link.kind === "download")
          .map((link) => ({ href: link.href, label: link.label })),
        hasCasePage: true,
        note: null,
      };
    }),
    {
      slug: focusQuest.slug,
      title: focusQuest.title,
      status: focusQuest.status,
      category: focusQuest.category,
      summary: focusQuest.summary,
      statusNote: null,
      media: focusQuest.media,
      // The same English address today's homepage uses.
      live: {
        href: locale === "en" ? `${focusQuest.website}/en` : focusQuest.website,
        label: focusQuest.websiteLabel,
      },
      downloads: focusQuest.builds.map((build) => ({ href: build.apkUrl, label: build.label })),
      hasCasePage: false,
      note: focusQuest.downloadNote,
    },
  ];
}

const embedOf = (media: ProjectMedia[], path: string): Embed | undefined => {
  const item = media.find((entry) => entry.embed?.src.endsWith(path));
  return item?.embed
    ? {
        src: item.embed.src,
        title: item.alt,
        width: item.embed.width,
        height: item.embed.height,
        still: { src: item.src, width: item.width, height: item.height },
      }
    : undefined;
};

function toCard(source: Source, locale: Locale): HomeCard {
  const showcase = projectShowcases[source.slug];
  const phoneMedia = source.media[showcase?.mobileIndex ?? 0];
  const first = source.media[0];
  const phase = now.find((entry) => entry.slug === source.slug);
  const hero = embedOf(source.media, "/embed/hero");
  const table = embedOf(source.media, "/embed/table");
  return {
    slug: source.slug,
    title: source.title,
    status: source.status,
    category: source.category,
    summary: source.summary,
    statusNote: source.statusNote,
    phone: { src: phoneMedia.src, width: phoneMedia.width, height: phoneMedia.height, alt: phoneMedia.alt },
    still: first && first.width > first.height ? { src: first.src, width: first.width, height: first.height } : null,
    loops: showcase?.loops
      ? { desktop: `/work/${source.slug}/loop-desktop`, mobile: `/work/${source.slug}/loop-mobile` }
      : null,
    embeds: { ...(hero ? { hero } : {}), ...(table ? { table } : {}) },
    live: source.live,
    downloads: source.downloads,
    casePath: source.hasCasePage ? localizedPath(locale, `/work/${source.slug}`) : null,
    note: source.note,
    phase: phase ? { text: phase.phase, updated: phase.updated } : null,
  };
}

export function buildCards(locale: Locale): HomeCard[] {
  const all = sources(locale);
  const slugs = all.map((source) => source.slug);
  const unordered = slugs.filter((slug) => !cardOrder.includes(slug));
  const unknown = cardOrder.filter((slug) => !slugs.includes(slug));
  if (unordered.length || unknown.length) {
    throw new Error(
      `home.ts cardOrder and portfolio.ts disagree: missing from cardOrder [${unordered}], unknown in cardOrder [${unknown}]`,
    );
  }
  return cardOrder.map((slug) => toCard(all.find((source) => source.slug === slug)!, locale));
}

export const getCard = (slug: string, locale: Locale) => buildCards(locale).find((card) => card.slug === slug);

export const toRef = (card: HomeCard): HomeCardRef => ({
  slug: card.slug,
  title: card.title,
  status: card.status,
  hasDownload: card.downloads.length > 0,
  href: card.casePath ?? `#${card.slug}`,
});

/** Card tilt in degrees, fixed by position so the server and the browser agree. */
export const cardTilt = (index: number) => ((index % 5) - 2) * 1.5;
