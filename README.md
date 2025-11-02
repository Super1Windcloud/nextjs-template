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

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Build and start production server
- `pnpm lint` - Lint code with Biome
- `pnpm fix` - Auto-fix issues with Biome
- `pnpm shadcn` - Add new shadcn/ui components
- `pnpm taze` - Update dependencies to latest major versions
- `pnpm clean` - Remove node_modules

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
├── app/                # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   └── utils.ts        # cn utility for class merging
├── hooks/              # Custom React hooks
│   └── use-mobile.ts   # Mobile detection hook
└── public/             # Static assets
```

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

## 🧪 Testing

This template is ready for testing. Configure your testing framework of choice (Jest, React Testing Library, Vitest) as needed.

## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This template is compatible with all major deployment platforms including Netlify, AWS, and GitHub Pages.

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
