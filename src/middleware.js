import { NextResponse } from "next/server";

// Function to check if the user is signed in
function isUserSignedIn(req) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return false;

  // Parse cookies and check for 'auth_token'
  const cookies = Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")));
  return !!cookies.auth_token; // Assuming 'auth_token' is your session token
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define public pages
  const publicPages = ["/signin", "/signup", "/","/about","/credentialing"];

  // Check if the user is signed in
  const userSignedIn = isUserSignedIn(req);

  // Exclude middleware for specific paths like static files, API routes, etc.
  const ignoredPaths = [
    "/assets/",
    "/_next/", // Next.js build assets
    "/api/",   // API routes
    "/static/", // Static files
    "/favicon.ico", // Favicon
    "/robots.txt",  // Robots.txt
  ];

  if (ignoredPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect signed-out users trying to access non-public pages
  if (!publicPages.includes(pathname) && !userSignedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Redirect signed-in users away from public pages to admin dashboard
  if (publicPages.includes(pathname) && userSignedIn) {
    return NextResponse.redirect(new URL("/adminDashboard", req.url));
  }

  // Allow the request to continue for other cases
  return NextResponse.next();
}

// Middleware configuration to limit its application
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|robots.txt).*)", // Apply to pages but exclude static assets and APIs
  ],
};
