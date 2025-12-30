import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:33333";
	const locales = routing.locales;

	const routes = ["", "/integration-demo", "/data-fetching", "/form-handling"];

	return locales.flatMap((locale) =>
		routes.map((route) => ({
			url: `${baseUrl}/${locale}${route}`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: route === "" ? 1 : 0.8,
		})),
	);
}
