import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note: this callback is only called if the strategy is "jwt"
  function middleware(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/api/auth/signin", // Adjust if you have a custom sign-in page
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(/|/(api|integration-demo|data-fetching|form-handling|favicon.ico|fonts|_next|.*\\..*))$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};