import type { MetadataRoute } from "next";
import { locales, localizedPath, projects } from "@/content/portfolio";
import { languageAlternates, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...projects.map((project) => `/work/${project.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "monthly" as const : "yearly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([key, value]) => [
            key,
            `${siteUrl}${value}`,
          ]),
        ),
      },
    })),
  );
}
