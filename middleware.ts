import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "ar"]; // Supported locales
const defaultLocale = "en"; // Default locale

// Next-Intl Middleware for locale detection
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(req: NextRequest) {
  // Apply Next-Intl Middleware FIRST for locale detection
  const localeResponse = intlMiddleware(req);
  if (localeResponse) return localeResponse; // Redirect if missing locale

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Extract the pathname and locale from the request URL
  const { pathname } = req.nextUrl;
  const locale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || defaultLocale;

  // Define protected routes (routes that require authentication)
  const protectedRoutes = [`/${locale}/profile`]; // Locale-aware protected routes

  // Define public routes (routes that don't require authentication)
  const publicRoutes = [`/${locale}/login`, `/${locale}/register`, `/${locale}/forgetpassword`, `/${locale}/resetpassword`];

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Check if the token is invalid (e.g., expired or missing)
  const isTokenInvalid =
    !token ||
    (token.exp && typeof token.exp === "number" && Date.now() > token.exp * 1000) ||
    token.error === "RefreshAccessTokenError";

  // Debug logs to verify token and expiry
  console.log("Token:", token);
  if (token && token.exp && typeof token.exp === "number") {
    console.log("Token expiry time:", new Date(token.exp * 1000).toLocaleString());
  }
  console.log("Is token invalid?", isTokenInvalid);

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

  // Allow access to other routes
  return NextResponse.next();
}

// Define routes where the middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (e.g., /api/...)
     * - Static files (e.g., /_next/static, /_next/image, /favicon.ico, /fonts, /images, etc.)
     * - Public assets (e.g., /wallet.gif, /delivery.gif, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|.*\\.(?:svg|gif|png|jpg|jpeg|webp|ico|json|txt)).*)",
  ],
};