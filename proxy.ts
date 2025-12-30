import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

/**
 * 定义公开路由的路径前缀
 * 只要请求路径匹配以下任何一项，就不需要登录即可访问
 */
const publicPages = [
  "/",
  "/integration-demo",
  "/data-fetching",
  "/form-handling",
  "/api/proxy-demo",
  // 在此处添加更多公开页面...
];

const authMiddleware = withAuth(
  function middleware(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/api/auth/signin",
    },
  }
);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. 排除 Next.js 内部请求和静态资源
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/auth") ||
    pathname.match(/\.(.*)$/)
  ) {
    return intlMiddleware(req);
  }

  // 2. 检查是否匹配公开路由（考虑 i18n 前缀）
  // 逻辑：去除语言前缀后的路径，是否在 publicPages 列表中，或者是否以 publicPages 中的路径开头
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})`),
    ""
  ) || "/";

  const isPublicPage = publicPages.some((page) => {
    if (page === "/") return pathWithoutLocale === "/";
    return pathWithoutLocale.startsWith(page);
  });

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  // 3. 其他所有路由都需要登录
  return (authMiddleware as any)(req);
}

export const config = {
  // 匹配所有路径，除了 api/auth, _next, 静态文件
  matcher: ["/((?!api/auth|_next|.*\\..*).*)"],
};
