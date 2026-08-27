import { NextResponse, type NextRequest } from "next/server";

const renderedLocales = ["en", "ar", "he"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (renderedLocales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next();
  }

  const target = request.nextUrl.clone();
  target.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(target);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
