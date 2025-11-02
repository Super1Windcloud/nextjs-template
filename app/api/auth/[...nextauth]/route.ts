import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}

const handler = NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.AUTH_GITHUB_ID ?? "",
			clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID ?? "",
			clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider
			session.accessToken = token.accessToken;
			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
