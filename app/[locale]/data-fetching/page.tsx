"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Types
interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: "John Doe",
					email: "john@example.com",
					role: "Admin",
					created_at: "2023-01-15",
				},
				{
					id: 2,
					name: "Jane Smith",
					email: "jane@example.com",
					role: "Editor",
					created_at: "2023-02-20",
				},
				{
					id: 3,
					name: "Robert Johnson",
					email: "robert@example.com",
					role: "Viewer",
					created_at: "2023-03-10",
				},
				{
					id: 4,
					name: "Emily Davis",
					email: "emily@example.com",
					role: "Editor",
					created_at: "2023-04-05",
				},
			]);
		}, 800);
	});
};

const fetchUser = async (id: number): Promise<User> => {
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				name: `User ${id}`,
				email: `user${id}@example.com`,
				role: id % 2 === 0 ? "Admin" : "Editor",
				created_at: "2023-01-01",
			});
		}, 500);
	});
};

const deleteUser = async (id: number): Promise<void> => {
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`Deleted user ${id}`);
			resolve();
		}, 500);
	});
};

export default function DataFetchingPage() {
	const [userId, setUserId] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isAddingUser, setIsAddingUser] = useState(false);
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "Viewer",
	});

	const queryClient = useQueryClient();

	// Query for all users
	const {
		data: users,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	// Query for a single user
	const {
		data: user,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useQuery({
		queryKey: ["user", userId],
		queryFn: () => fetchUser(Number(userId)),
		enabled: !!userId, // Only run query when userId is provided
	});

	// Mutation for deleting users
	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			// Invalidate and refetch the users query
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	// Mutation for adding users
	const addMutation = useMutation({
		mutationFn: async (userData: Omit<User, "id" | "created_at">) => {
			// In a real app, this would be an API call
			console.log("Adding user:", userData);
			return {
				id: Date.now(),
				...userData,
				created_at: new Date().toISOString(),
			};
		},
		onSuccess: () => {
			// Invalidate and refetch the users query
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsAddingUser(false);
			setNewUser({ name: "", email: "", role: "Viewer" });
		},
	});

	const handleDelete = (id: number) => {
		if (confirm("Are you sure you want to delete this user?")) {
			deleteMutation.mutate(id);
		}
	};

	const handleAddUser = (e: React.FormEvent) => {
		e.preventDefault();
		addMutation.mutate(newUser);
	};

	// Filter users based on search term
	const filteredUsers =
		users?.filter(
			(user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase()),
		) || [];

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Data Fetching Demo</h1>
				<Button onClick={() => setIsAddingUser(!isAddingUser)}>
					<Plus className="mr-2 h-4 w-4" />{" "}
					{isAddingUser ? "Cancel" : "Add User"}
				</Button>
			</div>

			{/* Add User Form */}
			{isAddingUser && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Add New User</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleAddUser} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={newUser.name}
										onChange={(e) =>
											setNewUser({ ...newUser, name: e.target.value })
										}
										placeholder="John Doe"
										required
									/>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={newUser.email}
										onChange={(e) =>
											setNewUser({ ...newUser, email: e.target.value })
										}
										placeholder="john@example.com"
										required
									/>
								</div>
								<div>
									<Label htmlFor="role">Role</Label>
									<select
										id="role"
										value={newUser.role}
										onChange={(e) =>
											setNewUser({ ...newUser, role: e.target.value })
										}
										className="w-full p-2 border rounded-md"
										required
									>
										<option value="Viewer">Viewer</option>
										<option value="Editor">Editor</option>
										<option value="Admin">Admin</option>
									</select>
								</div>
							</div>
							<Button type="submit" disabled={addMutation.isPending}>
								{addMutation.isPending ? "Adding..." : "Add User"}
							</Button>
						</form>
					</CardContent>
				</Card>
			)}

			{/* Search and Controls */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search users..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-8"
						/>
					</div>
				</div>
				<Button variant="outline" onClick={() => refetch()}>
					Refresh Data
				</Button>
			</div>

			{/* Single User Detail */}
			{!searchTerm && userId && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>User Details</CardTitle>
						<CardDescription>Details for user ID: {userId}</CardDescription>
					</CardHeader>
					<CardContent>
						{isUserLoading && <p>Loading user...</p>}
						{isUserError && <p className="text-red-500">Error loading user</p>}
						{user && !isUserLoading && (
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Name
										</h3>
										<p>{user.name}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Email
										</h3>
										<p>{user.email}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Role
										</h3>
										<Badge
											variant={
												user.role === "Admin"
													? "default"
													: user.role === "Editor"
														? "secondary"
														: "outline"
											}
										>
											{user.role}
										</Badge>
									</div>
									<div>
										<h3 className="text-sm font-medium text-muted-foreground">
											Created
										</h3>
										<p>{new Date(user.created_at).toLocaleDateString()}</p>
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{/* Users Table */}
			<Card>
				<CardHeader>
					<CardTitle>Users</CardTitle>
					<CardDescription>Manage your application users</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading && <p>Loading users...</p>}
					{isError && <p className="text-red-500">Error loading users</p>}
					{!isLoading && !isError && (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Created</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredUsers.map((user) => (
										<TableRow key={user.id}>
											<TableCell className="font-medium">{user.id}</TableCell>
											<TableCell>{user.name}</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell>
												<Badge
													variant={
														user.role === "Admin"
															? "default"
															: user.role === "Editor"
																? "secondary"
																: "outline"
													}
												>
													{user.role}
												</Badge>
											</TableCell>
											<TableCell>
												{new Date(user.created_at).toLocaleDateString()}
											</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => setUserId(user.id.toString())}
													>
														<Edit3 className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => handleDelete(user.id)}
														disabled={
															deleteMutation.isPending &&
															deleteMutation.variables === user.id
														}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Query Info */}
			<Card className="mt-8">
				<CardHeader>
					<CardTitle>TanStack Query Features Demonstrated</CardTitle>
					<CardDescription>
						This page showcases various TanStack Query capabilities
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						<li className="flex items-start">
							<Badge variant="secondary" className="mr-2">
								Query
							</Badge>
							<span>Fetching users with useQuery</span>
						</li>
						<li className="flex items-start">
							<Badge variant="secondary" className="mr-2">
								Mutations
							</Badge>
							<span>Adding and deleting users with useMutation</span>
						</li>
						<li className="flex items-start">
							<Badge variant="secondary" className="mr-2">
								Cache
							</Badge>
							<span>Automatic caching and background updates</span>
						</li>
						<li className="flex items-start">
							<Badge variant="secondary" className="mr-2">
								Refetching
							</Badge>
							<span>Manual refetch and stale time configuration</span>
						</li>
						<li className="flex items-start">
							<Badge variant="secondary" className="mr-2">
								Optimistic Updates
							</Badge>
							<span>Could be implemented for better UX</span>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
