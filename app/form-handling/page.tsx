"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
	CalendarIcon,
	Eye,
	EyeOff,
	Info,
	Lock,
	Mail,
	MapPin,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Define the form schema with Zod
const formSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "Username must be at least 2 characters long." })
			.max(30, { message: "Username must be at most 30 characters long." })
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: "Username can only contain letters, numbers, and underscores.",
			}),
		email: z.string().email({ message: "Please enter a valid email address." }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter.",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter.",
			})
			.regex(/[0-9]/, {
				message: "Password must contain at least one number.",
			}),
		confirmPassword: z.string(),
		firstName: z
			.string()
			.min(1, { message: "First name is required." })
			.max(50, { message: "First name must be at most 50 characters long." }),
		lastName: z
			.string()
			.min(1, { message: "Last name is required." })
			.max(50, { message: "Last name must be at most 50 characters long." }),
		bio: z
			.string()
			.max(500, { message: "Bio must be at most 500 characters long." })
			.optional(),
		country: z.string().min(1, { message: "Please select a country." }),
		age: z
			.number()
			.min(13, { message: "You must be at least 13 years old." })
			.max(120, { message: "Please enter a valid age." }),
		newsletter: z.boolean().optional(),
		notifications: z.enum(["all", "mentions", "none"]),
		birthDate: z.date(),
		terms: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type FormData = z.infer<typeof formSchema>;

export default function FormHandlingPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Initialize the form with react-hook-form
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			bio: "",
			country: "",
			age: 18,
			newsletter: false,
			notifications: undefined, // Changed to undefined to make it truly required
			birthDate: undefined,
			terms: false,
		},
	});

	// Handle form submission
	function onSubmit(values: FormData) {
		console.log("Form submitted with values:", values);
		setIsSubmitted(true);

		// In a real application, you would typically send the data to an API here
		// For this demo, we'll just show a success message
		setTimeout(() => {
			setIsSubmitted(false);
			form.reset();
		}, 3000);
	}

	// Watch for changes to the birthDate field to calculate age
	const birthDate = form.watch("birthDate");
	useEffect(() => {
		if (birthDate) {
			const today = new Date();
			const birth = new Date(birthDate);
			const age = today.getFullYear() - birth.getFullYear();
			const monthDiff = today.getMonth() - birth.getMonth();

			if (
				monthDiff < 0 ||
				(monthDiff === 0 && today.getDate() < birth.getDate())
			) {
				form.setValue("age", age - 1);
			} else {
				form.setValue("age", age);
			}
		}
	}, [birthDate, form]);

	return (
		<div className="container mx-auto py-6">
			<div className="max-w-3xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold">Form Handling Demo</h1>
					<p className="text-muted-foreground mt-2">
						This form demonstrates React Hook Form with Zod validation
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Create Account</CardTitle>
						<CardDescription>
							Fill out the form to create your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isSubmitted ? (
							<div className="text-center py-10">
								<div className="text-green-500 text-5xl mb-4">✓</div>
								<h3 className="text-xl font-semibold mb-2">
									Account Created Successfully!
								</h3>
								<p className="text-muted-foreground">
									Your account has been created. Redirecting...
								</p>
							</div>
						) : (
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									{/* Basic Information */}
									<div>
										<h2 className="text-xl font-semibold mb-4 flex items-center">
											<User className="mr-2 h-5 w-5" /> Basic Information
										</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input placeholder="John" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input placeholder="Doe" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="username"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Username</FormLabel>
														<FormControl>
															<div className="relative">
																<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
																<Input
																	className="pl-9"
																	placeholder="johndoe"
																	{...field}
																/>
															</div>
														</FormControl>
														<FormDescription>
															This is your public username.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email</FormLabel>
														<FormControl>
															<div className="relative">
																<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
																<Input
																	className="pl-9"
																	placeholder="john@example.com"
																	type="email"
																	{...field}
																/>
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Password Fields */}
									<div>
										<h2 className="text-xl font-semibold mb-4 flex items-center">
											<Lock className="mr-2 h-5 w-5" /> Security
										</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Password</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	type={showPassword ? "text" : "password"}
																	placeholder="••••••••"
																	{...field}
																/>
																<Button
																	type="button"
																	variant="ghost"
																	size="sm"
																	className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
																	onClick={() => setShowPassword(!showPassword)}
																>
																	{showPassword ? (
																		<EyeOff className="h-4 w-4 text-muted-foreground" />
																	) : (
																		<Eye className="h-4 w-4 text-muted-foreground" />
																	)}
																	<span className="sr-only">
																		{showPassword
																			? "Hide password"
																			: "Show password"}
																	</span>
																</Button>
															</div>
														</FormControl>
														<FormDescription>
															Must be at least 8 characters with uppercase,
															lowercase, and number.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="confirmPassword"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Confirm Password</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	type={
																		showConfirmPassword ? "text" : "password"
																	}
																	placeholder="••••••••"
																	{...field}
																/>
																<Button
																	type="button"
																	variant="ghost"
																	size="sm"
																	className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
																	onClick={() =>
																		setShowConfirmPassword(!showConfirmPassword)
																	}
																>
																	{showConfirmPassword ? (
																		<EyeOff className="h-4 w-4 text-muted-foreground" />
																	) : (
																		<Eye className="h-4 w-4 text-muted-foreground" />
																	)}
																	<span className="sr-only">
																		{showConfirmPassword
																			? "Hide password"
																			: "Show password"}
																	</span>
																</Button>
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Personal Information */}
									<div>
										<h2 className="text-xl font-semibold mb-4 flex items-center">
											<Info className="mr-2 h-5 w-5" /> Personal Information
										</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<FormField
												control={form.control}
												name="country"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Country</FormLabel>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Select a country" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="us">
																	United States
																</SelectItem>
																<SelectItem value="ca">Canada</SelectItem>
																<SelectItem value="uk">
																	United Kingdom
																</SelectItem>
																<SelectItem value="de">Germany</SelectItem>
																<SelectItem value="fr">France</SelectItem>
																<SelectItem value="au">Australia</SelectItem>
																<SelectItem value="jp">Japan</SelectItem>
																<SelectItem value="other">Other</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="birthDate"
												render={({ field }) => (
													<FormItem className="flex flex-col">
														<FormLabel>Birth Date</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground",
																		)}
																	>
																		{field.value ? (
																			format(field.value, "PPP")
																		) : (
																			<span>Pick a date</span>
																		)}
																		<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent
																className="w-auto p-0"
																align="start"
															>
																<Calendar
																	mode="single"
																	selected={field.value}
																	onSelect={field.onChange}
																	disabled={(date) =>
																		date > new Date() ||
																		date < new Date("1900-01-01")
																	}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="age"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Calculated Age</FormLabel>
														<FormControl>
															<Input
																type="number"
																placeholder="Age"
																disabled
																value={field.value || ""}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name="bio"
											render={({ field }) => (
												<FormItem className="mt-4">
													<FormLabel>Bio</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Tell us about yourself..."
															className="resize-none"
															{...field}
														/>
													</FormControl>
													<FormDescription>
														Briefly describe who you are and what you do.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Preferences */}
									<div>
										<h2 className="text-xl font-semibold mb-4">Preferences</h2>
										<div className="space-y-6">
											<FormField
												control={form.control}
												name="newsletter"
												render={({ field }) => (
													<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
														<FormControl>
															<Checkbox
																checked={field.value}
																onCheckedChange={field.onChange}
															/>
														</FormControl>
														<div className="space-y-1 leading-none">
															<FormLabel>Subscribe to newsletter</FormLabel>
															<FormDescription>
																Receive updates and special offers via email.
															</FormDescription>
														</div>
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="notifications"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Notification Preferences</FormLabel>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={field.value}
																className="grid grid-cols-1 sm:grid-cols-3 gap-4"
															>
																<div>
																	<RadioGroupItem
																		value="all"
																		id="all"
																		className="peer sr-only"
																		aria-label="All notifications"
																	/>
																	<Label
																		htmlFor="all"
																		className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
																	>
																		<span className="font-medium">All</span>
																		<span className="text-sm text-muted-foreground">
																			All notifications
																		</span>
																	</Label>
																</div>
																<div>
																	<RadioGroupItem
																		value="mentions"
																		id="mentions"
																		className="peer sr-only"
																		aria-label="Mentions only"
																	/>
																	<Label
																		htmlFor="mentions"
																		className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
																	>
																		<span className="font-medium">
																			Mentions
																		</span>
																		<span className="text-sm text-muted-foreground">
																			Mentions only
																		</span>
																	</Label>
																</div>
																<div>
																	<RadioGroupItem
																		value="none"
																		id="none"
																		className="peer sr-only"
																		aria-label="No notifications"
																	/>
																	<Label
																		htmlFor="none"
																		className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
																	>
																		<span className="font-medium">None</span>
																		<span className="text-sm text-muted-foreground">
																			No notifications
																		</span>
																	</Label>
																</div>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									{/* Terms and Conditions */}
									<FormField
										control={form.control}
										name="terms"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														I agree to the terms and conditions
													</FormLabel>
													<FormDescription>
														You agree to our Terms of Service and Privacy
														Policy.
													</FormDescription>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit" className="w-full">
										Create Account
									</Button>
								</form>
							</Form>
						)}
					</CardContent>
				</Card>

				{/* Form Features Info */}
				<Card className="mt-8">
					<CardHeader>
						<CardTitle>React Hook Form & Zod Features Demonstrated</CardTitle>
						<CardDescription>
							This form showcases various form handling capabilities
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									1
								</span>
								<span>Schema validation with Zod</span>
							</li>
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									2
								</span>
								<span>Field-level error handling</span>
							</li>
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									3
								</span>
								<span>Custom field components</span>
							</li>
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									4
								</span>
								<span>Conditional field validation</span>
							</li>
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									5
								</span>
								<span>Form state management</span>
							</li>
							<li className="flex items-start">
								<span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
									6
								</span>
								<span>Type-safe form handling</span>
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
