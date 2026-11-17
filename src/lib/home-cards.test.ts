import { describe, expect, it } from "vitest";
import { aliases, cardOrder } from "@/content/home";
import { focusQuest, locales, projects } from "@/content/portfolio";
import { buildCards } from "./home-cards";

describe("homepage cards", () => {
  const cards = buildCards("en");

  it("has one card per project plus Nuqta Kids, in cardOrder order", () => {
    expect(cards.map((card) => card.slug)).toEqual(cardOrder);
    expect(cards).toHaveLength(projects.length + 1);
  });

  it("has aliases in all three scripts for every card", () => {
    for (const card of cards) {
      for (const locale of locales) expect(aliases[card.slug]?.[locale]?.length, `${card.slug} ${locale}`).toBeGreaterThan(0);
    }
  });

  it("carries every download today's homepage offers", () => {
    const today = [
      ...projects.flatMap((project) => project.links.filter((link) => link.kind === "download").map((link) => link.href)),
      ...focusQuest.builds.map((build) => build.apkUrl),
    ].sort();
    expect(cards.flatMap((card) => card.downloads.map((download) => download.href)).sort()).toEqual(today);
  });

  it("gives SOLitaire both live frames and Bab and ElsewhereCo their loops", () => {
    const bySlug = Object.fromEntries(cards.map((card) => [card.slug, card]));
    expect(bySlug.solitaire.embeds.hero?.src).toMatch(/\/embed\/hero$/);
    expect(bySlug.solitaire.embeds.table?.src).toMatch(/\/embed\/table$/);
    expect(cards.filter((card) => card.loops).map((card) => card.slug).sort()).toEqual(["bab", "elsewhereco"]);
  });

  it("links every card but Nuqta Kids to its localised case page", () => {
    expect(cards.filter((card) => !card.casePath).map((card) => card.slug)).toEqual(["nuqta-kids"]);
    expect(buildCards("ar").find((card) => card.slug === "bab")?.casePath).toBe("/ar/work/bab");
    expect(cards.find((card) => card.slug === "bab")?.casePath).toBe("/work/bab");
  });

  it("uses phone captures for the card picture, and no still where there is no desktop capture", () => {
    const bySlug = Object.fromEntries(cards.map((card) => [card.slug, card]));
    for (const slug of ["camp-and-hike", "lulu-tokki", "nedaa-lifestyle"]) {
      expect(bySlug[slug].phone.height, slug).toBeGreaterThan(bySlug[slug].phone.width);
    }
    expect(bySlug["nedaa-lifestyle"].still).toBeNull();
    expect(bySlug["camp-and-hike"].still?.width).toBeGreaterThan(bySlug["camp-and-hike"].still!.height);
  });

  it("points Nuqta Kids's English site link at /en, as today", () => {
    expect(cards.find((card) => card.slug === "nuqta-kids")?.live?.href).toBe(`${focusQuest.website}/en`);
    expect(buildCards("he").find((card) => card.slug === "nuqta-kids")?.live?.href).toBe(focusQuest.website);
  });

  it("throws when cardOrder and portfolio.ts disagree", () => {
    cardOrder.push("not-a-project");
    try {
      expect(() => buildCards("en")).toThrow(/cardOrder/);
    } finally {
      cardOrder.pop();
    }
  });
});
