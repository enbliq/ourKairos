import { NextRequest, NextResponse } from 'next/server';
import { getLocaleFromHeader, isLocale } from '@/lib/i18n';

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeSegment = pathname.split('/')[1] ?? '';
  if (isLocale(localeSegment)) {
    return NextResponse.next();
  }

  const locale = getLocaleFromHeader(request.headers.get('accept-language'));
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(redirectUrl);
}
