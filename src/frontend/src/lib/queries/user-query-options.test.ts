import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userQueryOptions } from "./user-query-options";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("userQueryOptions", () => {
  it("returns null only for 401 and throws server or network failures", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));
    await expect(queryClient.fetchQuery(userQueryOptions)).resolves.toBeNull();

    queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(queryClient.fetchQuery(userQueryOptions)).rejects.toMatchObject({
      status: 500,
    });

    queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });
    fetchMock.mockRejectedValueOnce(new TypeError("fetch failed"));
    await expect(queryClient.fetchQuery(userQueryOptions)).rejects.toMatchObject({
      status: 0,
    });

    expect(userQueryOptions.staleTime).toBe(60_000);
  });
});
