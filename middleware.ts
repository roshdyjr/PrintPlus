import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Extract the pathname from the request URL
  const { pathname } = req.nextUrl;

  // Define protected routes (routes that require authentication)
  const protectedRoutes = ["/profile"]; // Add your protected routes here

  // Define public routes (routes that don't require authentication)
  const publicRoutes = [
    "/login",
    "/register",
    "/forgetpassword",
    "/resetpassword",
  ]; // Add your public routes here

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Check if the token is invalid (e.g., expired or missing)
  const isTokenInvalid =
    !token ||
    (token.exp && typeof token.exp === "number" && Date.now() > token.exp * 1000) ||
    token.error === "RefreshAccessTokenError"; // Check for token error

  // Debug logs to verify token and expiry
  console.log("Token:", token);
  if (token && token.exp && typeof token.exp === "number") {
    console.log("Token expiry time:", new Date(token.exp * 1000).toLocaleString());
  }
  console.log("Is token invalid?", isTokenInvalid);

  // Redirect authenticated users away from public routes
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    // Redirect to the home page
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    // Allow access to public routes for unauthenticated users
    return NextResponse.next();
  }

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated || isTokenInvalid) {
      // Clear the invalid token by redirecting to the login page
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to other routes (e.g., public routes not explicitly listed)
  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|help-circle.svg|profile.svg|logo.svg|search.svg|headphones.svg|cart.svg|check-circle.svg|fonts/.*).*)",
  ],
};