import { type NextRequest, NextResponse } from "next/server";

// This is an example of a proxy route handler.
// It acts as an interceptor/proxy for requests to this route, forwarding them to an external service.
// This is useful for:
// 1. Hiding API keys (server-to-server communication).
// 2. Avoiding CORS issues.
// 3. Modifying the request/response (interception).

export async function GET(request: NextRequest) {
	// Target URL to proxy to
	const targetUrl = "https://jsonplaceholder.typicode.com/todos/1";

	try {
		// Intercept: Log the request or check permissions here
		console.log(
			`[Proxy] Intercepting request from ${request.url} to ${targetUrl}`,
		);

		// Forward the request
		const response = await fetch(targetUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// "Authorization": `Bearer ${process.env.API_SECRET}`,
			},
		});

		if (!response.ok) {
			throw new Error(`External API responded with status: ${response.status}`);
		}

		const data = await response.json();

		// Intercept response: Modify data before sending back to client
		return NextResponse.json({
			proxy: "interception-successful",
			source: "jsonplaceholder",
			data,
		});
	} catch (error) {
		console.error("[Proxy] Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error during proxying" },
			{ status: 500 },
		);
	}
}
