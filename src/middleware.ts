import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const i18nMiddleware = createMiddleware({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
});

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');
  const url = req.nextUrl.clone();

  // Define your protected routes patterns
  const protectedRoutes = ['/note', '/tree-note', '/calendar', '/todo-list', '/analytics', '/profile'];
  const loginRegisterRoutes = ['/login', '/register'];

  // Check if the request is for login/register and the user has an access token
  if (loginRegisterRoutes.some(route => req.nextUrl.pathname.includes(route)) && token) {
    const lang = req.nextUrl.pathname.split('/')[1];
    url.pathname = `/${lang}/note`;
    return NextResponse.redirect(url);
  }

  // Check if the request is for protected routes and the user does not have an access token
  if (protectedRoutes.some(route => req.nextUrl.pathname.includes(route)) && !token) {
    const lang = req.nextUrl.pathname.split('/')[1];
    url.pathname = `/${lang}/register`;
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
  matcher: ['/', '/(en|tr)/:path*'],
};
