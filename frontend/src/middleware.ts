import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);
  const path = url.pathname;

  // Define public routes manually
  const publicRoutes = ["/login", "/register", "/sso-callback", "/not-found"];

  const isPublic = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // If logged in and trying to visit a public page → redirect to home
  if (userId && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If not logged in and visiting a private page → redirect to login
  if (!userId && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
