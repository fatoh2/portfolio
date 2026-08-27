import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import {
  getProject,
  getProjectParams,
  isLocale,
  localizedPath,
  profile,
  t,
} from "@/content/portfolio";
import { languageAlternates, siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return { title: "Project not found" };

  const path = `/work/${slug}`;
  const title = `${project.title} · ${profile.name}`;
  const description = t(project.summary, locale);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: localizedPath(locale, path),
      images: [
        {
          url: project.media[0]?.src || "/og-image.png",
          alt: project.media[0] ? t(project.media[0].alt, locale) : project.title,
        },
      ],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: t(project.summary, locale),
    url: `${siteUrl}${localizedPath(locale, `/work/${slug}`)}`,
    inLanguage: locale,
    creator: { "@type": "Person", name: profile.name, url: siteUrl },
    sameAs: project.links.map((link) => link.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectPage project={project} locale={locale} />
    </>
  );
}
