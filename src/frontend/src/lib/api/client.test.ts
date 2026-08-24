import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiRequest } from "./client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiRequest", () => {
  it("returns JSON and configures body, cookies, and cancellation", async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "123" }), {
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      apiRequest<{ id: string }, { name: string }>("/api/example", {
        method: "POST",
        signal: controller.signal,
        body: { name: "Example" },
      }),
    ).resolves.toEqual({ id: "123" });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/example",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        signal: controller.signal,
        body: JSON.stringify({ name: "Example" }),
      }),
    );
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(new Headers(request.headers).get("Content-Type")).toBe(
      "application/json",
    );
  });

  it.each([200, 204])(
    "returns undefined for an empty %s response without adding JSON headers",
    async (status) => {
      const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status }));
      vi.stubGlobal("fetch", fetchMock);

      await expect(apiRequest<void>("/api/example")).resolves.toBeUndefined();

      const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
      expect(new Headers(request.headers).has("Content-Type")).toBe(false);
    },
  );

  it("preserves validation Problem Details", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            title: "Validation failed",
            errors: { email: ["Email is required."] },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/problem+json" },
          },
        ),
      ),
    );

    await expect(apiRequest("/api/example")).rejects.toMatchObject({
      name: "ApiError",
      message: "Validation failed",
      status: 400,
      errors: { email: ["Email is required."] },
    });
  });

  it.each([
    [401, "Authentication required."],
    [500, "Internal server error"],
  ])("keeps HTTP status %s distinct", async (status, message) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        status === 500
          ? new Response(JSON.stringify({ title: message }), {
              status,
              headers: { "Content-Type": "application/problem+json" },
            })
          : new Response(null, { status }),
      ),
    );

    await expect(apiRequest("/api/example")).rejects.toEqual(
      expect.objectContaining({ status, message }),
    );
  });

  it("uses a network-specific error only when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    await expect(apiRequest("/api/example")).rejects.toEqual(
      new ApiError("Unable to reach the server.", 0),
    );
  });

  it("preserves an aborted fetch", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(abortError));

    await expect(apiRequest("/api/example")).rejects.toBe(abortError);
  });
});
