import NextAuth from "next-auth";
import { NextAuthConfig } from "@/lib/nextauth.config";

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}

const handler = NextAuth(NextAuthConfig);

export { handler as GET, handler as POST };
