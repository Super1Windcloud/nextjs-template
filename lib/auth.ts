"use server";

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
