import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IntegrationDemo from "./page";

// Mock the imported modules
vi.mock("@/lib/store/counterStore", () => ({
	useCounterStore: vi.fn(() => ({
		count: 0,
		increment: vi.fn(),
		decrement: vi.fn(),
		reset: vi.fn(),
	})),
}));

vi.mock("@tanstack/react-query", () => ({
	useQuery: vi.fn(() => ({
		data: { message: "Data fetched from Supabase" },
		isLoading: false,
		error: null,
	})),
}));

vi.mock("next-auth/react", () => ({
	useSession: vi.fn(() => ({
		data: null, // No session for this test
	})),
	signIn: vi.fn(),
	signOut: vi.fn(),
}));

vi.mock("@/lib/supabase-client", () => ({
	supabase: {
		from: vi.fn(() => ({
			select: vi.fn(() => Promise.resolve({ data: [], error: null })),
		})),
	},
}));

describe("IntegrationDemo", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly", () => {
		render(<IntegrationDemo />);

		expect(screen.getByText("Integration Demo")).toBeInTheDocument();
		expect(screen.getByText("Zustand State Management")).toBeInTheDocument();
		expect(screen.getByText("TanStack Query")).toBeInTheDocument();
		expect(screen.getByText("Next-Auth Authentication")).toBeInTheDocument();
		expect(screen.getByText("Supabase Integration")).toBeInTheDocument();
	});

	it("displays the count from Zustand store", () => {
		render(<IntegrationDemo />);

		// We're mocking the count as 0, so it should display "Count: 0"
		expect(screen.getByText("Count: 0")).toBeInTheDocument();
	});

	it("displays Supabase data when loaded", () => {
		render(<IntegrationDemo />);

		expect(screen.getByText("Data fetched from Supabase")).toBeInTheDocument();
	});
});
