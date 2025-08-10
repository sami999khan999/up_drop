import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/not-found(.*)",
  // Removed "/sso-callback(.*)" to allow access for logged-in users
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const isPublic = publicRoute(request);

  if (userId && isPublic) {
    // Redirect authenticated users away from public pages like login/register
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !userId) {
    // Redirect unauthenticated users to login if accessing protected pages
    return NextResponse.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
