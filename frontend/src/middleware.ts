// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/sso-callback(.*)",
  "/not-found(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const isPublic = publicRoute(request);

  // Case 1: User is logged in but visits a public page -> send to home
  if (userId && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 2: User is NOT logged in and visits a protected page
  if (!userId && !isPublic) {
    const referer = request.headers.get("referer") || "";

    // Allow pass-through if just came from sso-callback (session hydration not complete yet)
    if (referer.includes("/sso-callback")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Default: allow the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
