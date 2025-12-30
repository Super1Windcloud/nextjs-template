"use client";

import { LogIn, LogOut, Settings, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";

export function UserAccountNav() {
	const { data: session } = useSession();
	const t = useTranslations("Navigation");

	if (!session) {
		return (
			<Button variant="default" size="sm" onClick={() => signIn()}>
				<LogIn className="mr-2 h-4 w-4" />
				{t("signIn")}
			</Button>
		);
	}

	const user = session.user;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
						<AvatarFallback>
							{user?.name?.charAt(0).toUpperCase() ?? "U"}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user?.name && <p className="font-medium">{user.name}</p>}
						{user?.email && (
							<p className="w-[200px] truncate text-sm text-muted-foreground">
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile" className="cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						{t("profile")}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/dashboard" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						{t("dashboard")}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-destructive focus:text-destructive"
					onSelect={(event) => {
						event.preventDefault();
						signOut({ callbackUrl: "/" });
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					{t("signOut")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
