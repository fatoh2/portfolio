import { notFound } from "next/navigation";
import { parsePortalVariant } from "@/components/portal-variant";
import { PortfolioHome } from "@/components/portfolio-home";
import { isLocale, profile, t } from "@/content/portfolio";
import { siteUrl } from "@/lib/seo";

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ portal?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // Preview switches select a portal treatment or one of the three banner concepts.
  const portalVariant = parsePortalVariant((await searchParams).portal);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        url: siteUrl,
        jobTitle: t(profile.role, locale),
        email: `mailto:${profile.email}`,
        sameAs: [
          "https://github.com/fatoh2",
          "https://linkedin.com/in/fathallah-haj-a59258123/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} Portfolio`,
        inLanguage: ["en", "ar", "he"],
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioHome locale={locale} portalVariant={portalVariant} />
    </>
  );
}
