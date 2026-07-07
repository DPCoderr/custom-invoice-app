import { cookies } from "next/headers";
import { ApiError } from "./error";

const API_URL = process.env.API_URL ?? "http://localhost:5050/api";
const IDENTITY_COOKIE_NAME = ".AspNetCore.Identity.Application";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  // Get the user cookie and send it into headers for the http request
  const cookieStore = await cookies();
  const identityCookie = cookieStore.get(IDENTITY_COOKIE_NAME);

  const headers = new Headers(options.headers);

  if (identityCookie) {
    headers.set("Cookie", `${identityCookie.name}=${identityCookie.value}`);
  }

  // Prepare body for mutation
  let body: BodyInit | undefined;

  if (options.body instanceof FormData || typeof options.body === "string") {
    body = options.body;
  } else if (options.body !== undefined) {
    body = JSON.stringify(options.body);
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new ApiError(res.status, err.message ?? "Error");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
