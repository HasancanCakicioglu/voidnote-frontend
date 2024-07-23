import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const i18nMiddleware = createMiddleware({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
});

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');

  // Define your protected routes pattern
  const protectedRoutesPattern = new RegExp('/(en|tr)/note.*|/note.*');

  // If the request is for a protected route and there's no token, redirect to /login
  if (protectedRoutesPattern.test(req.nextUrl.pathname) && !token) {
    const url = req.nextUrl.clone()
    const lang = req.nextUrl.pathname.split('/')[1];
    url.pathname = `${lang}/login`
    return NextResponse.redirect(url);
  }

  // Run the i18n middleware
  const i18nResponse = i18nMiddleware(req);
  if (i18nResponse) {
    return i18nResponse;
  }

  // Proceed if no middleware has interrupted the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(en|tr)/:path*', '/note/:path*'],
};
