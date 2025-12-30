# Next.js + shadcn/ui Template

A modern, production-ready Next.js 16 template with shadcn/ui, Tailwind CSS v4, TypeScript, and Biome. Features internationalization (i18n), a global UI framework, and comprehensive developer tooling.

## ✨ Features

- **Next.js 16** - Latest React 19 features with App Router & Streaming.
- **Internationalization (i18n)** - Full support with `next-intl`, localized routing, and automatic language detection.
- **Global UI Framework** - Responsive Navbar with localized links, user profile dropdown, and a sticky Footer.
- **User Authentication** - Next-Auth v4 integration with shared config and middleware protection.
- **UX Enhancements** - Navigation progress bar (`nextjs-toploader`) and rich global notifications (`sonner`).
- **Standardized States** - Global `loading.tsx` (Skeletons) and `error.tsx` (Error Boundaries) for a polished experience.
- **Tailwind CSS v4** - Utility-first CSS with modern oklch color spaces and theming.
- **Custom Hooks Library** - Built-in hooks for `useDebounce`, `useLocalStorage`, `useMediaQuery`, etc.
- **SEO Optimized** - Dynamic `sitemap.xml`, `robots.txt`, and automated `hreflang` metadata.
- **Docker Support** - Optimized multi-stage `Dockerfile` with standalone output.
- **CI/CD** - Automated GitHub Actions for linting, testing, and building.
- **Conventional Commits** - Enforced with Husky and Commitlint.
- **Testing** - Vitest with React Testing Library and fully typed configuration.

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
- `pnpm fix` - Auto-fix formatting/lint issues
- `pnpm test` - Run unit tests with Vitest
- `pnpm shadcn` - Add new shadcn/ui components

## 🏗️ Project Structure

```
├── .github/workflows/          # CI/CD (GitHub Actions)
├── app/[locale]/               # Localized pages (en, zh)
│   ├── layout.tsx              # Unified layout (Navbar, Footer, Toaster)
│   ├── loading.tsx             # Global skeleton loading
│   └── error.tsx               # Global error handling
├── i18n/                       # i18n routing & request config
├── messages/                   # Translation JSON files (en, zh)
├── components/                 
│   ├── ui/                     # shadcn/ui primitives
│   ├── Navbar.tsx              # Global navigation
│   ├── UserAccountNav.tsx      # Auth status & menu
│   └── ModeToggle.tsx          # Theme switcher
├── hooks/                      # Custom hooks (debounce, storage, etc.)
├── lib/                        # Shared utilities & configs
├── proxy.ts                    # Next.js 16 Interceptor (Auth & i18n)
├── Dockerfile                  # Optimized production image
└── commitlint.config.ts        # Commit message rules
```

## 🌐 Internationalization (i18n)

This template uses `next-intl` for localized routing.
- **Default Locale**: `en`
- **Supported Locales**: `en`, `zh`
- **Routing**: Routes are automatically prefixed (e.g., `/en/dashboard`).
- **Configuration**: Easily add public routes in `proxy.ts` to skip authentication.

## 🐳 Docker

Build the optimized production image:
```bash
docker build -t next-shadcn-template .
```
The image leverages Next.js **standalone output** to ensure the smallest possible footprint.

## 🤝 Contributing

This project enforces **Conventional Commits**. Please follow the format:
- `feat: ...` for new features
- `fix: ...` for bug fixes
- `chore: ...` for maintenance

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
