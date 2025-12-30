"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { UserAccountNav } from "./UserAccountNav";

export function Navbar() {
	const t = useTranslations("Navigation");
	const commonT = useTranslations("Common");
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: t("home") },
		{ href: "/dashboard", label: t("dashboard") },
		{ href: "/integration-demo", label: t("integration") },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center px-4">
				<div className="mr-8 flex items-center space-x-2">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							{commonT("logo")}
						</span>
					</Link>
				</div>

				<nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"transition-colors hover:text-primary",
								pathname === item.href
									? "text-primary"
									: "text-muted-foreground",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center justify-end space-x-4">
					<div className="flex items-center space-x-2 mr-2 border-r pr-4">
						{/* 语言切换链接可以在这里精简展示，或者放在下拉菜单中 */}
						<Link
							href={pathname}
							locale="en"
							className={cn(
								"text-xs px-1",
								pathname.includes("/en")
									? "font-bold"
									: "text-muted-foreground",
							)}
						>
							EN
						</Link>
						<Link
							href={pathname}
							locale="zh"
							className={cn(
								"text-xs px-1",
								pathname.includes("/zh")
									? "font-bold"
									: "text-muted-foreground",
							)}
						>
							中文
						</Link>
					</div>
					<ModeToggle />
					<UserAccountNav />
				</div>
			</div>
		</header>
	);
}
