import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import NextAuthProvider from "@/components/NextAuthProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:33333";

	return {
		title: {
			template: "%s | Next.js Template",
			default: "Next.js + shadcn Template",
		},
		description:
			"A modern, production-ready Next.js 16 template with i18n and Theme support",
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: "/en",
				zh: "/zh",
			},
		},
		openGraph: {
			type: "website",
			locale: locale === "zh" ? "zh_CN" : "en_US",
			url: `${baseUrl}/${locale}`,
			siteName: "Next.js Template",
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}
	// Enable static rendering
	setRequestLocale(locale);

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<NextTopLoader
							color="var(--primary)"
							initialPosition={0.08}
							crawlSpeed={200}
							height={3}
							crawl={true}
							showSpinner={false}
							easing="ease"
							speed={200}
							shadow="0 0 10px var(--primary),0 0 5px var(--primary)"
						/>
						<NextAuthProvider>
							<QueryProvider>{children}</QueryProvider>
						</NextAuthProvider>
						<Toaster position="top-right" richColors closeButton />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
