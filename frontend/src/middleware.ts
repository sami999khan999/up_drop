import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/sso-callback(.*)", // allow OAuth finalization without blocking
  "/not-found(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const isPublic = publicRoute(request);

  // Allow /sso-callback even if no userId yet
  if (request.nextUrl.pathname.startsWith("/sso-callback")) {
    return NextResponse.next();
  }

  if (userId && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
