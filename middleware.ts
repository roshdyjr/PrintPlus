import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "ar"]; // Supported locales
const defaultLocale = "ar"; // Default locale

// Next-Intl Middleware for locale detection
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect root URL (`/`) to the default locale (`/ar`)
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
  }

  // Apply Next-Intl Middleware for locale detection
  const localeResponse = intlMiddleware(req);
  if (localeResponse) return localeResponse; // Redirect if missing locale

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the token is invalid (e.g., expired or missing)
  const isTokenInvalid =
    !token ||
    (token.exp && typeof token.exp === "number" && Date.now() > token.exp * 1000) ||
    token.error === "RefreshAccessTokenError" ||
    token.error === "RefreshTokenExpiredError"; // Add check for refresh token expiration

  // Extract the locale from the request URL
  const locale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || defaultLocale;

  // Define protected routes (routes that require authentication)
  const protectedRoutes = [`/${locale}/profile`]; // Locale-aware protected routes

  // Define public routes (routes that don't require authentication)
  const publicRoutes = [
    `/${locale}/login`,
    `/${locale}/register`,
    `/${locale}/forgetpassword`,
    `/${locale}/resetpassword`,
  ];

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Redirect authenticated users away from public routes
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    const homeUrl = new URL(`/${locale}`, req.url); // Ensure correct locale in redirect
    return NextResponse.redirect(homeUrl);
  }

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated || isTokenInvalid) {
      // Redirect to locale-specific login page
      const loginUrl = new URL(`/${locale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|.*\\.(?:svg|gif|png|jpg|jpeg|webp|ico|json|txt)).*)",
  ],
};