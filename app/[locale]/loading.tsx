import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-16 px-4 bg-white dark:bg-black sm:items-start">
				<div className="w-full max-w-3xl mx-auto space-y-8">
					{/* Logo Skeleton */}
					<div className="flex justify-center mb-10">
						<Skeleton className="h-10 w-32" />
					</div>

					{/* Header Skeleton */}
					<div className="space-y-4 text-center">
						<Skeleton className="h-12 w-3/4 mx-auto" />
						<Skeleton className="h-6 w-full max-w-2xl mx-auto" />
					</div>

					{/* Grid Skeleton */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map(() => (
							<Card key={crypto.randomUUID()} className="p-6 space-y-4">
								<Skeleton className="h-6 w-1/2" />{" "}
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-10 w-full" />
							</Card>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
