import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { ApiError, apiRequest } from "#/lib/api/client";
import type { RegisterSchemaType } from "./schema";

export type UserDto = {
	firstName: string;
	lastName: string;
	email: string;
	roles: string[];
};

type LoginRequest = {
	email: string;
	password: string;
	rememberMe?: boolean;
};

type RegisterRequest = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	rememberMe?: boolean;
};

export function toRegisterRequest(data: RegisterSchemaType): RegisterRequest {
	const { firstName, lastName, email, password } = data;
	return { firstName, lastName, email, password };
}

export function login(data: LoginRequest): Promise<void> {
	return apiRequest("/api/auth/login", { method: "POST", body: data });
}

export function register(data: RegisterRequest): Promise<void> {
	return apiRequest("/api/auth/register", { method: "POST", body: data });
}

export function logout(): Promise<void> {
	return apiRequest("/api/auth/logout", { method: "POST" });
}

async function getCurrentUser(signal?: AbortSignal): Promise<UserDto | null> {
	try {
		return await apiRequest<UserDto>("/api/auth/me", { signal });
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) return null;
		throw error;
	}
}

export const currentUserQuery = queryOptions({
	queryKey: ["current-user"] as const,
	queryFn: ({ signal }) => getCurrentUser(signal),
	staleTime: 60_000,
	retry: false,
});

export async function refreshCurrentUser(queryClient: QueryClient) {
	const user = await getCurrentUser();
	queryClient.setQueryData(currentUserQuery.queryKey, user);
	return user;
}
