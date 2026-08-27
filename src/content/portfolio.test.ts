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

  it("exposes three customer-outcome service paths", () => {
    expect(services.map((service) => service.id)).toEqual([
      "product",
      "automation",
      "reliability",
    ]);
  });
});
