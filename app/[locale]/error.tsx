"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service like Sentry
		console.error(error);
	}, [error]);

	const handleGoHome = () => {
		window.location.href = "/";
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-black">
			<div className="w-full max-w-md space-y-6 text-center">
				<Alert variant="destructive" className="border-2">
					<AlertCircle className="h-5 w-5" />
					<AlertTitle className="text-lg font-bold">
						Something went wrong!
					</AlertTitle>
					<AlertDescription className="mt-2 text-sm opacity-90">
						{error.message ||
							"An unexpected error occurred while rendering this page."}
					</AlertDescription>
				</Alert>

				<div className="flex flex-col gap-3">
					<Button
						onClick={() => reset()}
						className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02]"
					>
						<RefreshCcw className="mr-2 h-4 w-4" />
						Try again
					</Button>

					<Button variant="ghost" onClick={handleGoHome} className="w-full">
						Go back home
					</Button>
				</div>

				{error.digest && (
					<p className="text-xs text-muted-foreground mt-4">
						Error ID: <span className="font-mono">{error.digest}</span>
					</p>
				)}
			</div>
		</div>
	);
}
