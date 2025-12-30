export function Footer() {
	return (
		<footer className="w-full border-t py-6 bg-zinc-50 dark:bg-zinc-950">
			<div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm text-muted-foreground text-center md:text-left">
					© {new Date().getFullYear()} NextTemplate. All rights reserved.
				</p>
				<div className="flex space-x-6 text-sm text-muted-foreground">
					<a href="#" className="hover:text-primary transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-primary transition-colors">
						Terms of Service
					</a>
					<a
						href="https://github.com/Super1Windcloud"
						target="_blank"
						rel="noreferrer"
						className="hover:text-primary transition-colors"
					>
						GitHub
					</a>
				</div>
			</div>
		</footer>
	);
}
