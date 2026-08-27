import type { Metadata } from "next";
import {
  localizedPath,
  profile,
  t,
  type Locale,
} from "@/content/portfolio";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fhaj.vercel.app";

export const languageAlternates = (path = "/") => ({
  en: localizedPath("en", path),
  ar: localizedPath("ar", path),
  he: localizedPath("he", path),
  "x-default": localizedPath("en", path),
});

export function homeMetadata(locale: Locale): Metadata {
  const title = `${profile.name} · ${t(profile.role, locale)}`;
  const description = t(profile.description, locale);
  const canonical = localizedPath(locale);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: profile.name,
      locale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
