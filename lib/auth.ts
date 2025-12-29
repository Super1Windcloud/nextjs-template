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

//  2. 工程化与质量保证 (Medium
//   Priority)  提升开发体验和代码质量的配置：   * CI/CD 配置 (如 GitHub Actions):       * 原因: 项目配置了 Biome (Linting) 和 Vitest (Testing)
//   以及 Husky，但缺少自动化的 CI 流程配置（如 .github/workflows/ci.yml），无法在         Pull Request 时自动执行这些检查。   * 端到端测试 (E2E
//   Testing):       * 原因: 目前只有单元/集成测试 (Vitest)。对于全栈应用，建议集成 Playwright 或 Cypress 来进行真实环境的测试。   * Docker 支持:
//   * 原因: 缺少 Dockerfile 和 .dockerignore。为了方便部署（特别是自托管），容器化支持通常是模板的加分项。  3. 增强功能 (Nice to have)
//   让模板更完善的补充：   * Commitlint: 既然已经有了 Husky，增加 commit message 规范检查（如 Conventional Commits）会更专业。   * 国际化 (i18n):
//   如 next-intl 的基础配置。
