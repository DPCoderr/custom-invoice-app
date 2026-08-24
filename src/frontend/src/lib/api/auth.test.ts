import { afterEach, expect, it, vi } from "vitest";
import { register, toRegisterRequest } from "./auth";

afterEach(() => vi.unstubAllGlobals());

it("does not send the form-only confirmation password", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null));
  vi.stubGlobal("fetch", fetchMock);

  await register(
    toRegisterRequest({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      password: "secret",
      confirmPassword: "secret",
    }),
  );

  const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
  expect(JSON.parse(request.body as string)).toEqual({
    firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", password: "secret",
  });
});
