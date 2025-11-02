"use client";

import { useQuery } from "@tanstack/react-query";
import { Heart, Settings, TrendingUp, Users } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCounterStore } from "@/lib/store/counterStore";

// Mock data for charts
const data = [
	{ name: "Jan", revenue: 4000, users: 2400 },
	{ name: "Feb", revenue: 3000, users: 1398 },
	{ name: "Mar", revenue: 2000, users: 9800 },
	{ name: "Apr", revenue: 2780, users: 3908 },
	{ name: "May", revenue: 1890, users: 4800 },
	{ name: "Jun", revenue: 2390, users: 3800 },
];

const pieData = [
	{ name: "Group A", value: 75 },
	{ name: "Group B", value: 15 },
	{ name: "Group C", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Define type for dashboard data
interface DashboardData {
	totalUsers: number;
	activeUsers: number;
	revenue: number;
	growth: number;
}

// Example function to fetch dashboard data
const fetchDashboardData = async (): Promise<DashboardData> => {
	// Simulate API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				totalUsers: 1234,
				activeUsers: 856,
				revenue: 24567,
				growth: 12.5,
			});
		}, 500);
	});
};

export default function DashboardPage() {
	const { count, increment, decrement } = useCounterStore();

	const { data: dashboardData, isLoading } = useQuery<DashboardData>({
		queryKey: ["dashboard"],
		queryFn: fetchDashboardData,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<Button>
					<Settings className="mr-2 h-4 w-4" /> Settings
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading
								? "..."
								: dashboardData
									? dashboardData.totalUsers
									: "0"}
						</div>
						<p className="text-xs text-muted-foreground">
							+20% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Heart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading
								? "..."
								: dashboardData
									? dashboardData.activeUsers
									: "0"}
						</div>
						<p className="text-xs text-muted-foreground">+180 new users</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Revenue</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading
								? "..."
								: dashboardData
									? `${dashboardData.revenue}`
									: "$0"}
						</div>
						<p className="text-xs text-muted-foreground">
							+12.5% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Growth</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading
								? "..."
								: dashboardData
									? `${dashboardData.growth}%`
									: "0%"}
						</div>
						<Progress
							value={isLoading ? 0 : dashboardData ? dashboardData.growth : 0}
							className="mt-2"
						/>
					</CardContent>
				</Card>
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Revenue Overview</CardTitle>
						<CardDescription>Monthly revenue and user growth</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={data}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="revenue" fill="#8884d8" />
								<Bar dataKey="users" fill="#82ca9d" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>User Distribution</CardTitle>
						<CardDescription>
							How users are distributed across segments
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{pieData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Zustand Integration Example */}
			<div className="mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Zustand State Management</CardTitle>
						<CardDescription>
							Demonstrating global state management
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							<h2 className="text-xl font-semibold">Counter: {count}</h2>
							<div className="flex gap-2">
								<Button onClick={increment}>+</Button>
								<Button onClick={decrement}>-</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>
						Your latest updates and notifications
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4">
						<li className="flex items-center justify-between">
							<div>
								<p className="font-medium">New user registered</p>
								<p className="text-sm text-muted-foreground">
									john@example.com
								</p>
							</div>
							<Badge variant="secondary">2 min ago</Badge>
						</li>
						<li className="flex items-center justify-between">
							<div>
								<p className="font-medium">Payment received</p>
								<p className="text-sm text-muted-foreground">$2,499.00</p>
							</div>
							<Badge variant="secondary">1 hour ago</Badge>
						</li>
						<li className="flex items-center justify-between">
							<div>
								<p className="font-medium">Report generated</p>
								<p className="text-sm text-muted-foreground">
									Monthly analytics
								</p>
							</div>
							<Badge variant="secondary">3 hours ago</Badge>
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
