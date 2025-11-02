# Next.js + shadcn/ui Template

A modern, production-ready Next.js 16 template with shadcn/ui, Tailwind CSS, TypeScript, and Biome. Perfect for building scalable React applications with an elegant UI kit and developer-friendly tooling.

## ✨ Features

- **Next.js 16** - Latest React framework with App Router
- **shadcn/ui** - Beautifully designed components that you can copy and paste
- **Tailwind CSS v4** - Utility-first CSS framework with modern theming
- **TypeScript** - Type-safe development
- **Biome** - Fast, opinionated linter/formatter in place of ESLint/Prettier
- **Dark Mode** - Built-in dark/light theme support
- **Lucide Icons** - Beautiful, accessible icons
- **Modern Styling** - Using latest CSS features like `@theme` and oklch color spaces
- **Pre-configured Components** - All shadcn/ui components pre-installed
- **Responsive Design** - Mobile-first approach with responsive breakpoints
- **State Management** - Zustand for lightweight global state
- **Data Fetching** - TanStack Query for server state management
- **Authentication** - Next-Auth with multiple providers
- **Database** - Supabase client for database operations
- **Error Monitoring** - Sentry for error tracking and performance monitoring
- **Testing** - Vitest with React Testing Library for unit tests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended)

### Installation

1. Clone the repository or use it as a template:
```bash
npx create-next-app -e https://github.com/your-username/next-shadcn-template
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root and add your environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Next-Auth
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Sentry (optional)
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Build and start production server
- `pnpm lint` - Lint code with Biome
- `pnpm fix` - Auto-fix issues with Biome
- `pnpm shadcn` - Add new shadcn/ui components
- `pnpm taze` - Update dependencies to latest major versions
- `pnpm clean` - Remove node_modules
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:coverage` - Run tests and generate coverage report

## 🎨 Design System

This template uses:
- **shadcn/ui** - Pre-built accessible components
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Consistent iconography
- **Geist Font** - Modern, clean typography
- **oklch Colors** - Wide gamut color space for better theming
- **Dark Mode** - Automatic light/dark theme switching

### Color Palette

The template uses a modern oklch-based color system:
- **Primary**: oklch(0.205 0 0) (dark) / oklch(0.922 0 0) (light)
- **Secondary**: oklch(0.97 0 0) (dark) / oklch(0.269 0 0) (light)
- **Background**: oklch(1 0 0) (light) / oklch(0.145 0 0) (dark)
- **Foreground**: oklch(0.145 0 0) (light) / oklch(0.985 0 0) (dark)

## 🏗️ Project Structure

```
├── app/                           # Next.js App Router pages
│   ├── api/                       # API routes
│   │   └── auth/[...nextauth]/    # Next-Auth API route
│   ├── dashboard/                 # Dashboard example page
│   ├── data-fetching/             # Data fetching example page
│   ├── form-handling/             # Form handling example page
│   ├── integration-demo/          # Integration demo page
│   ├── profile/                   # User profile example page
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.tsx                 # Root layout with providers
│   └── page.tsx                   # Home page
├── components/                    # React components
│   ├── ui/                        # shadcn/ui components
│   ├── NextAuthProvider.tsx       # Next-Auth provider wrapper
│   └── QueryProvider.tsx          # TanStack Query provider wrapper
├── lib/                           # Utility functions
│   ├── store/                     # Zustand stores
│   │   └── counterStore.ts        # Example Zustand store
│   ├── supabase-client.ts         # Supabase client configuration
│   ├── nextauth.config.ts         # NextAuth configuration
│   ├── auth.ts                    # Next-Auth utilities
│   └── utils.ts                   # cn utility for class merging
├── hooks/                         # Custom React hooks
│   └── use-mobile.ts              # Mobile detection hook
├── tests/                         # Test configuration
│   └── setup.ts                   # Test setup file
├── types/                         # TypeScript type definitions
│   └── next-auth.d.ts             # Next-Auth type extensions
├── public/                        # Static assets
├── sentry.client.config.ts        # Sentry client configuration
├── sentry.edge.config.ts          # Sentry edge configuration
├── sentry.server.config.ts        # Sentry server configuration
├── vitest.config.ts               # Vitest configuration
└── .env.local                     # Environment variables (not committed)
```

## 🌐 Available Routes

The template includes several demonstration pages showcasing the integrated technologies:

- **Home** (`/`) - Basic landing page
- **Dashboard** (`/dashboard`) - Shows multiple components and data visualization
- **User Profile** (`/profile`) - Authentication and profile management
- **Data Fetching** (`/data-fetching`) - TanStack Query features demonstration
- **Form Handling** (`/form-handling`) - React Hook Form and Zod validation
- **Integration Demo** (`/integration-demo`) - Overview of all integrated technologies
- **Auth API** (`/api/auth/[...nextauth]`) - Next-Auth API routes

## 🛠️ Customization

### Adding New shadcn/ui Components

Use the built-in script to add new components:
```bash
pnpm shadcn
```

This will automatically install and configure new components from shadcn/ui.

### Theming

The template uses Tailwind's `@theme` feature for consistent design tokens. You can modify colors, spacing, and other design tokens in `app/globals.css`:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  /* ... other tokens */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ... other tokens */
}
```

### Adding Icons

This template uses Lucide React for icons. Add new icons by importing from `lucide-react`:

```tsx
import { Heart, Settings, User } from 'lucide-react';

<Heart className="w-4 h-4" />
```

### Demo Pages

This template includes several demo pages that showcase the integrated technologies:

- **Dashboard** (`/dashboard`): Demonstrates multiple UI components, charts with Recharts, and state management with Zustand
- **User Profile** (`/profile`): Shows authentication features with Next-Auth
- **Data Fetching** (`/data-fetching`): Shows TanStack Query features like queries, mutations, and caching
- **Form Handling** (`/form-handling`): Demonstrates React Hook Form with Zod validation
- **Integration Demo** (`/integration-demo`): Shows all integrated technologies working together

### State Management with Zustand

The template includes Zustand for lightweight state management. Example usage:

```tsx
// In lib/store/counterStore.ts
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// In your component
import { useCounterStore } from '@/lib/store/counterStore';

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Data Fetching with TanStack Query

The template includes TanStack Query with a configured QueryProvider in `app/layout.tsx`. Example usage:

```tsx
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Authentication with Next-Auth

Next-Auth is configured with GitHub and Google providers. To use it:

1. Add environment variables in `.env.local`:
```
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

2. Use the auth functions in your components:
```tsx
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => signIn()}>Sign in</button>
  );
}
```

### Database with Supabase

Supabase client is configured in `lib/supabase-client.ts`. Example usage:

```tsx
import { supabase } from '@/lib/supabase-client';

// In your component or API route
const { data, error } = await supabase
  .from('users')
  .select('*');
```

### Error Monitoring with Sentry

Sentry is configured for client, server, and edge environments. To use Sentry in development, add your DSN to your environment variables:

```env
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Testing with Vitest

The template includes Vitest with React Testing Library. Create test files with `.test.ts` or `.test.tsx` extensions:

```tsx
// Example test in components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

Run tests with:
```bash
pnpm test
```

## 🧪 Testing

This template uses Vitest with React Testing Library for fast, efficient testing. The configuration includes:
- jsdom environment for browser-like testing
- Automatic mocking of Next.js router
- Setup for common testing utilities

## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This template is compatible with all major deployment platforms including Netlify, AWS, and GitHub Pages.

### Environment Variables for Production

When deploying, ensure you set the following environment variables:
- For Supabase: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- For Next-Auth: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, etc.
- For Sentry: `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` (optional)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com) - Rapidly build modern websites
- [Biome](https://biomejs.dev) - Fast JavaScript toolchain
- [Lucide](https://lucide.dev) - Beautiful & consistent icons
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Next-Auth](https://authjs.dev/) - Authentication
- [Supabase](https://supabase.com) - Database
- [Sentry](https://sentry.io) - Error monitoring
- [Vitest](https://vitest.dev) - Testing

## ⚠️ Known Issues

- **Hydration Mismatch Errors**: If you see hydration mismatch errors in development, they may be caused by browser extensions (like Dark Reader) that modify the DOM. These typically don't affect production applications for end users without those extensions.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
