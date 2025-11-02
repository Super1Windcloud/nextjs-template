"use client";

import { Calendar, Chrome, Github, Mail, MapPin, Settings } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
	const { data: session, status } = useSession();
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState({
		name: session?.user?.name || "",
		email: session?.user?.email || "",
		bio: "Software developer passionate about building great products",
		location: "San Francisco, CA",
		joinedDate: "Jan 2023",
	});

	if (status === "loading") {
		return (
			<div className="container mx-auto py-10 flex items-center justify-center">
				<p>Loading profile...</p>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="container mx-auto py-10">
				<Card className="max-w-md mx-auto">
					<CardHeader>
						<CardTitle>Sign In Required</CardTitle>
						<CardDescription>Sign in to view your profile</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={() => signIn()} className="w-full">
							Sign In with Next-Auth
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const handleSave = () => {
		setIsEditing(false);
		// In a real app, you would save the profile data to your database
		alert("Profile updated successfully!");
	};

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Profile</h1>
				<div className="flex gap-2">
					{isEditing ? (
						<>
							<Button variant="outline" onClick={() => setIsEditing(false)}>
								Cancel
							</Button>
							<Button onClick={handleSave}>Save Changes</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<Settings className="mr-2 h-4 w-4" /> Edit Profile
						</Button>
					)}
					<Button variant="outline" onClick={() => signOut()}>
						Sign Out
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Card */}
				<div className="lg:col-span-1">
					<Card>
						<CardHeader className="items-center">
							<Avatar className="h-32 w-32">
								<AvatarImage
									src={session.user?.image || ""}
									alt={session.user?.name || ""}
								/>
								<AvatarFallback>
									{session.user?.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>
							<CardTitle className="text-2xl">
								{isEditing ? (
									<Input
										value={profile.name}
										onChange={(e) =>
											setProfile({ ...profile, name: e.target.value })
										}
										className="text-center"
									/>
								) : (
									session.user?.name
								)}
							</CardTitle>
							<CardDescription>
								{isEditing ? (
									<Input
										value={profile.email}
										onChange={(e) =>
											setProfile({ ...profile, email: e.target.value })
										}
										className="text-center"
									/>
								) : (
									session.user?.email
								)}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col space-y-4">
								<div className="flex items-center">
									<Mail className="mr-2 h-4 w-4 opacity-70" />
									<span className="text-sm">{session.user?.email}</span>
								</div>
								<div className="flex items-center">
									<MapPin className="mr-2 h-4 w-4 opacity-70" />
									<span className="text-sm">
										{isEditing ? (
											<Input
												value={profile.location}
												onChange={(e) =>
													setProfile({ ...profile, location: e.target.value })
												}
												className="w-full"
											/>
										) : (
											profile.location
										)}
									</span>
								</div>
								<div className="flex items-center">
									<Calendar className="mr-2 h-4 w-4 opacity-70" />
									<span className="text-sm">Joined {profile.joinedDate}</span>
								</div>

								<div className="pt-4">
									<div className="flex gap-2">
										{session.user?.email?.includes("github") && (
											<Badge variant="secondary">
												<Github className="mr-1 h-3 w-3" /> GitHub
											</Badge>
										)}
										{session.user?.email?.includes("gmail") && (
											<Badge variant="secondary">
												<Chrome className="mr-1 h-3 w-3" /> Google
											</Badge>
										)}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Profile Details */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>About</CardTitle>
							<CardDescription>Manage your profile settings</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<Label htmlFor="bio">Bio</Label>
								{isEditing ? (
									<textarea
										id="bio"
										value={profile.bio}
										onChange={(e) =>
											setProfile({ ...profile, bio: e.target.value })
										}
										className="mt-2 w-full p-2 border rounded-md min-h-[100px]"
									/>
								) : (
									<p className="mt-2 text-muted-foreground">{profile.bio}</p>
								)}
							</div>

							<div>
								<Label>Social Links</Label>
								<div className="flex gap-2 mt-2">
									<Input
										placeholder="Twitter URL"
										disabled={!isEditing}
										value="https://twitter.com/username"
									/>
									<Input
										placeholder="LinkedIn URL"
										disabled={!isEditing}
										value="https://linkedin.com/in/username"
									/>
								</div>
							</div>

							<div>
								<Label>Account Security</Label>
								<div className="mt-2 space-y-2">
									<div className="flex justify-between items-center border p-3 rounded-md">
										<div>
											<p className="font-medium">Password</p>
											<p className="text-sm text-muted-foreground">
												Last changed 3 months ago
											</p>
										</div>
										<Button variant="outline" size="sm" disabled={!isEditing}>
											Change
										</Button>
									</div>

									<div className="flex justify-between items-center border p-3 rounded-md">
										<div>
											<p className="font-medium">Two-Factor Authentication</p>
											<p className="text-sm text-muted-foreground">
												Add extra security to your account
											</p>
										</div>
										<Button variant="outline" size="sm" disabled={!isEditing}>
											Setup
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Connected Accounts */}
					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Connected Accounts</CardTitle>
							<CardDescription>
								Manage your connected social accounts
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 border rounded-md">
									<div className="flex items-center">
										<Github className="h-5 w-5 mr-3" />
										<div>
											<p className="font-medium">GitHub</p>
											<p className="text-sm text-muted-foreground">Connected</p>
										</div>
									</div>
									<Button variant="outline" size="sm">
										Disconnect
									</Button>
								</div>

								<div className="flex items-center justify-between p-3 border rounded-md">
									<div className="flex items-center">
										<Chrome className="h-5 w-5 mr-3" />
										<div>
											<p className="font-medium">Google</p>
											<p className="text-sm text-muted-foreground">Connected</p>
										</div>
									</div>
									<Button variant="outline" size="sm">
										Disconnect
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
