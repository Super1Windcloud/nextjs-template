import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:33333";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/dashboard/", "/profile/", "/settings/"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
