import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/shared/locale/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const getLocale = (req: NextRequest): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18n.locales];

  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
};

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url,
      ),
    );
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
