import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  Noto_Sans_Arabic,
  Noto_Sans_Hebrew,
  Space_Grotesk,
} from "next/font/google";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  type Locale,
} from "@/content/portfolio";
import { homeMetadata } from "@/lib/seo";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

const notoHebrew = Noto_Sans_Hebrew({
  variable: "--font-hebrew",
  subsets: ["hebrew"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark light",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return homeMetadata(isLocale(locale) ? locale : "en");
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) notFound();

  const locale: Locale = requestedLocale;
  const direction = locale === "en" ? "ltr" : "rtl";

  return (
    <html lang={locale} dir={direction} className={`${spaceGrotesk.variable} ${notoArabic.variable} ${notoHebrew.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
