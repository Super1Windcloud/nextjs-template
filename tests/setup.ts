import '@testing-library/jest-dom/vitest';

// Mock Next.js modules
vi?.mock('next/router', () => ({
  useRouter: () => ({
    push: vi?.fn(),
    replace: vi?.fn(),
    prefetch: vi?.fn(),
    query: {},
    asPath: '',
    pathname: '',
    isReady: true,
  }),
  useSearchParams: () => ({
    get: vi?.fn(),
  }),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi?.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi?.fn(),
    removeListener: vi?.fn(),
    addEventListener: vi?.fn(),
    removeEventListener: vi?.fn(),
    dispatchEvent: vi?.fn(),
  })),
});