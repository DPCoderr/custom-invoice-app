import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	currentUserQuery,
	refreshCurrentUser,
	register,
	toRegisterRequest,
} from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("auth API", () => {
	it("does not send the form-only confirmation password", async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response(null));
		vi.stubGlobal("fetch", fetchMock);

		await register(
			toRegisterRequest({
				firstName: "Ada",
				lastName: "Lovelace",
				email: "ada@example.com",
				password: "Secret1!",
				confirmPassword: "Secret1!",
			}),
		);

		const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
		expect(JSON.parse(request.body as string)).toEqual({
			firstName: "Ada",
			lastName: "Lovelace",
			email: "ada@example.com",
			password: "Secret1!",
		});
	});

	it("returns null only for 401 and throws server or network failures", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false } },
		});

		fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));
		await expect(queryClient.fetchQuery(currentUserQuery)).resolves.toBeNull();

		queryClient.removeQueries({ queryKey: currentUserQuery.queryKey });
		fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
		await expect(
			queryClient.fetchQuery(currentUserQuery),
		).rejects.toMatchObject({
			status: 500,
		});

		queryClient.removeQueries({ queryKey: currentUserQuery.queryKey });
		fetchMock.mockRejectedValueOnce(new TypeError("fetch failed"));
		await expect(
			queryClient.fetchQuery(currentUserQuery),
		).rejects.toMatchObject({
			status: 0,
		});

		expect(currentUserQuery.staleTime).toBe(60_000);
	});

	it("refreshes the cached user after authentication", async () => {
		const user = {
			firstName: "Ada",
			lastName: "Lovelace",
			email: "ada@example.com",
			roles: ["Member"],
		};
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(user)));
		const queryClient = new QueryClient();

		await expect(refreshCurrentUser(queryClient)).resolves.toEqual(user);
		expect(queryClient.getQueryData(currentUserQuery.queryKey)).toEqual(user);
	});
});
