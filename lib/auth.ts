// This file provides client-side auth utilities
// For server-side authentication, use the handlers in the API routes

export { getServerSession } from 'next-auth';
export type { Session, User } from 'next-auth';

// Add type declarations for session
declare module 'next-auth' {
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

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}