// This file provides client-side auth utilities
// For server-side authentication, use the handlers in the API routes

export type { Session, User } from "next-auth";
export { getServerSession } from "next-auth";

// Add type declarations for session
declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			id?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}


//   让模板更完善的补充：   * Commitlint: 既然已经有了 Husky，增加 commit message 规范检查（如 Conventional Commits）会更专业。   * 国际化 (i18n):
//   如 next-intl 的基础配置。
