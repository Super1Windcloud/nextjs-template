# GEMINI.md - Project Context

## Project Overview

**Name:** next-shadcn-template
**Description:** A modern, production-ready Next.js 16 template integrated with Shadcn UI, Tailwind CSS v4, and a suite of developer tools (Biome, Vitest, Sentry). It is designed for building scalable React applications with a pre-configured stack including authentication (NextAuth), database client (Supabase), state management (Zustand, TanStack Query), and testing.

### Key Technologies

*   **Framework:** Next.js 16 (App Router), React 19
*   **Styling:** Tailwind CSS v4, Shadcn UI, Lucide Icons
*   **Language:** TypeScript
*   **State Management:** Zustand (global), TanStack Query (server state)
*   **Authentication:** NextAuth.js (v5 beta / v4 patterns adapted)
*   **Database:** Supabase (client configured)
*   **Tooling:** Biome (linting/formatting), Vitest (testing), Sentry (monitoring)
*   **Package Manager:** pnpm

## Building and Running

The project uses `pnpm` for script execution.

*   **Install Dependencies:**
    ```bash
    pnpm install
    ```
*   **Development Server:**
    ```bash
    pnpm dev
    ```
    Runs at `http://localhost:3000`.
*   **Production Build:**
    ```bash
    pnpm build
    ```
*   **Start Production Server:**
    ```bash
    pnpm start
    ```
*   **Clean:**
    ```bash
    pnpm clean
    ```
    Removes `node_modules`.

## Testing

*   **Run Unit Tests:**
    ```bash
    pnpm test
    ```
    Uses Vitest with React Testing Library.
*   **Run Tests with UI:**
    ```bash
    pnpm test:ui
    ```
*   **Coverage:**
    ```bash
    pnpm test:coverage
    ```

## Development Conventions

### Code Style & Linting
*   **Formatter/Linter:** This project uses **Biome** for fast formatting and linting.
*   **Check & Fix:**
    ```bash
    pnpm fix
    ```
    Runs `biome check --fix`.
*   **Lint:**
    ```bash
    pnpm lint
    ```
    Runs `biome check`.

### Component Management
*   **Adding Shadcn Components:**
    ```bash
    pnpm shadcn add [component-name]
    ```
    Example: `pnpm shadcn add button`

### Architecture & Structure
*   `app/`: Contains Next.js App Router pages and layouts.
    *   `api/`: API routes.
    *   `globals.css`: Global styles using Tailwind `@theme` and `oklch` colors.
*   `components/`: React components.
    *   `ui/`: Shadcn UI primitives (do not modify manually unless necessary).
*   `lib/`: Shared utilities, configurations (Supabase, Auth), and stores (Zustand).
*   `hooks/`: Custom React hooks.
*   `tests/`: Test setup and configuration.

### Environment Variables
*   Required variables (Supabase, NextAuth, Sentry) should be placed in `.env.local`.
*   Refer to `README.md` for the specific variable names required.

## Key Configuration Files
*   `package.json`: Scripts and dependencies.
*   `biome.json`: Biome configuration for formatting/linting rules.
*   `vitest.config.ts`: Test runner configuration.
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts` (or via CSS): Tailwind v4 configuration.
