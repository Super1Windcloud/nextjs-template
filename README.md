# Next.js + shadcn/ui Template

A modern, production-ready Next.js 16 template with shadcn/ui, Tailwind CSS v4, TypeScript, and Biome. Features internationalization (i18n), dark mode, and comprehensive developer tooling.

## ✨ Features

- **Next.js 16** - Latest React 19 features with App Router
- **Internationalization (i18n)** - Full support with `next-intl`, including localized routing and automatic language detection.
- **shadcn/ui** - Beautifully designed components that you can copy and paste
- **Tailwind CSS v4** - Utility-first CSS framework with modern theming and oklch colors
- **Authentication** - Next-Auth v4 with middleware protection and shared config
- **Docker Support** - Optimized multi-stage `Dockerfile` with standalone output support
- **CI/CD** - Automated workflows with GitHub Actions for linting, testing, and building
- **Conventional Commits** - Enforced with Husky and Commitlint
- **Biome** - Fast, opinionated linter/formatter (replaces ESLint/Prettier)
- **Dark Mode** - Built-in theme support integrated with i18n
- **State Management** - Zustand (global) & TanStack Query (server state)
- **Monitoring** - Sentry integration for client, server, and edge
- **Testing** - Vitest with React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Super1Windcloud/next-shadcn-template.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables (copy `.env.example` to `.env.local`).

4. Run the development server:
```bash
pnpm dev
```

## 📦 Scripts

- `pnpm dev` - Start development server (port 33333)
- `pnpm build` - Build for production
- `pnpm start` - Build and start production server
- `pnpm lint` - Lint code with Biome
- `pnpm fix` - Auto-fix issues with Biome
- `pnpm test` - Run unit tests with Vitest
- `pnpm shadcn` - Add new shadcn/ui components

## 🏗️ Project Structure

```
├── .github/workflows/          # CI/CD (GitHub Actions)
├── app/[locale]/               # Localized pages (en, zh)
│   ├── dashboard/              # Protected dashboard
│   ├── profile/                # User profile
│   └── layout.tsx              # Root layout with i18n & Theme providers
├── i18n/                       # i18n routing & request config
├── messages/                   # Translation JSON files
├── components/                 # React components
│   ├── ui/                     # shadcn/ui components
│   └── ThemeProvider.tsx       # Dark mode provider
├── lib/                        # Shared utilities & configs
│   ├── nextauth.config.ts      # Shared Auth config
│   └── supabase-client.ts      # Supabase configuration
├── proxy.ts                    # Next.js 16 Interceptor (Auth & i18n)
├── Dockerfile                  # Optimized production image
└── commitlint.config.ts        # Commit message rules
```

## 🌐 Internationalization (i18n)

This template uses `next-intl` for localized routing.
- **Default Locale**: `en`
- **Supported Locales**: `en`, `zh`
- **Routing**: Routes are prefixed with the locale (e.g., `/en/dashboard`).

To add translations, modify the files in `messages/*.json`.

## 🐳 Docker

Build the optimized production image:
```bash
docker build -t next-shadcn-template .
```
The image leverages Next.js standalone output to keep the size minimal.

## 🤝 Contributing

This project enforces **Conventional Commits**. Please follow the format:
- `feat: ...` for new features
- `fix: ...` for bug fixes
- `chore: ...` for maintenance

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.