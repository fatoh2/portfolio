import { describe, expect, it } from "vitest";
import {
  getProject,
  getProjectParams,
  isLocale,
  locales,
  localizedPath,
  profile,
  projects,
  services,
  solitaireMedia,
  t,
} from "./portfolio";

describe("customer-first portfolio content", () => {
  it("uses the verified public identity and customer positioning", () => {
    expect(profile.name).toBe("Fathallah Haj");
    expect(profile.email).toBe("fatoh.haj@gmail.com");
    expect(profile.headline.en).toBe(
      "I build digital systems that sell, automate, and stay reliable.",
    );
    expect(profile.contactLinks.map((link) => link.kind)).toEqual(
      expect.arrayContaining(["email", "whatsapp", "resume", "social"]),
    );
  });

  it("provides complete locale records and stable localized paths", () => {
    expect(locales).toEqual(["en", "ar", "he"]);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(localizedPath("en", "/work/argus-ai")).toBe("/work/argus-ai");
    expect(localizedPath("ar", "/work/argus-ai")).toBe(
      "/ar/work/argus-ai",
    );
    expect(localizedPath("he")).toBe("/he");
    expect(t(profile.summary, "ar").length).toBeGreaterThan(20);
    expect(t(profile.summary, "he").length).toBeGreaterThan(20);
  });

  it("keeps project routes unique and pre-renders every locale", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getProjectParams()).toHaveLength(projects.length * locales.length);
    expect(getProject("camp-and-hike")?.status).toBe("live-product");
    expect(getProject("missing")).toBeUndefined();
  });

  it("keeps private work private and links only approved public evidence", () => {
    const privateProjects = projects.filter(
      (project) => project.status === "private-build",
    );
    expect(privateProjects.length).toBeGreaterThan(0);
    expect(
      privateProjects.every((project) =>
        project.links.every((link) => link.kind !== "repo"),
      ),
    ).toBe(true);
    expect(
      projects
        .flatMap((project) => project.links)
        .filter((link) => link.kind === "repo")
        .every((link) => link.href.startsWith("https://github.com/fatoh2/")),
    ).toBe(true);
  });

  it("describes every project with evidence and an honest next step", () => {
    expect(projects.length).toBeGreaterThanOrEqual(9);
    expect(
      projects.every(
        (project) =>
          project.capabilities.length >= 3 &&
          project.evidence.length >= 3 &&
          project.architecture.length >= 3 &&
          project.nextStep.en.length > 10,
      ),
    ).toBe(true);
    expect(getProject("argus-ai")?.summary.en).toContain(
      "working Kubernetes connector",
    );
    expect(getProject("argus-ai")?.summary.en).not.toContain(
      "GitHub Actions",
    );
  });

  it("leads the commercial work with Go To Nature", () => {
    expect(getProject("go-to-nature")?.featured).toBe(true);
    expect(getProject("camp-and-hike")?.featured).toBe(false);
  });

  it("leads SOLitaire with the redesigned app and keeps gameplay captures current", () => {
    const project = getProject("solitaire");
    expect(project?.media).toEqual([
      solitaireMedia.lobby,
      solitaireMedia.mobileLobby,
      solitaireMedia.gameplay,
    ]);
    expect(project?.media.every((media) => media.fit === "contain")).toBe(true);
    expect(project?.media.some((media) => media.src.includes("banner"))).toBe(false);
    expect(project?.links[0].href).toBe("https://sol-solitaire.com");
    for (const locale of locales) {
      for (const media of Object.values(solitaireMedia)) {
        expect(t(media.alt, locale).length).toBeGreaterThan(20);
        expect(t(media.caption, locale).length).toBeGreaterThan(5);
      }
    }
  });

  it("features Seeker Radar with public evidence and complete localized content", () => {
    const project = getProject("seeker-radar");
    expect(project?.featured).toBe(true);
    expect(project?.status).toBe("live-product");
    expect(project?.links.map(({ href, kind }) => ({ href, kind }))).toEqual([
      { href: "https://seeker-radar.app", kind: "live" },
    ]);
    expect(project?.statusNote.en).toContain("Not affiliated with Solana Mobile");
    expect(project?.media).toHaveLength(3);
    expect(project?.media.every((media) => media.fit === "contain")).toBe(true);
    if (!project) throw new Error("Missing Seeker Radar project");
    const textRecords = [
      project.category, project.summary, project.problem, project.audience,
      project.role, project.statusNote, project.nextStep,
      ...project.capabilities, ...project.evidence,
      ...project.architecture.flatMap((node) => [node.label, node.detail]),
      ...project.media.flatMap((media) => [media.alt, media.caption]),
    ];
    for (const locale of locales) {
      expect(getProjectParams()).toContainEqual({ locale, slug: project.slug });
      for (const value of textRecords) {
        expect(t(value, locale).length).toBeGreaterThan(5);
      }
    }
  });

  it("exposes three customer-outcome service paths", () => {
    expect(services.map((service) => service.id)).toEqual([
      "product",
      "automation",
      "reliability",
    ]);
  });
});
