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
  const searchParams = request.nextUrl.searchParams;

  // inside middleware before any returns
  console.log("MW -> path:", request.nextUrl.href);
  console.log(
    "MW -> has handshake:",
    request.nextUrl.searchParams.has("__clerk_handshake")
  );
  console.log("MW -> cookies:", request.headers.get("cookie"));
  console.log("MW -> userId:", userId);

  // Allow requests that contain Clerk's handshake token (important)
  if (searchParams.has("__clerk_handshake")) {
    return NextResponse.next();
  }

  if (userId && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
