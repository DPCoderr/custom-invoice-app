export type ApiRequestOptions<TBody> = Omit<RequestInit, "body"> & {
  body?: TBody;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getValidationErrors(
  payload: unknown,
): Record<string, string[]> | undefined {
  if (!isRecord(payload) || !isRecord(payload.errors)) return undefined;

  const errors = Object.entries(payload.errors).filter(
    (entry): entry is [string, string[]] =>
      Array.isArray(entry[1]) && entry[1].every((item) => typeof item === "string"),
  );

  return errors.length > 0 ? Object.fromEntries(errors) : undefined;
}

function getErrorMessage(payload: unknown, status: number): string {
  if (typeof payload === "string" && payload) return payload;

  if (isRecord(payload)) {
    for (const key of ["detail", "title", "message"] as const) {
      if (typeof payload[key] === "string" && payload[key]) return payload[key];
    }
  }

  if (status === 401) return "Authentication required.";
  if (status >= 500) return "The server could not complete the request.";
  return `Request failed with status ${status}.`;
}

function throwTransportError(error: unknown): never {
  if (error instanceof DOMException && error.name === "AbortError") throw error;
  throw new ApiError("Unable to reach the server.", 0);
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  if (!response.headers.get("content-type")?.includes("json")) return text;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<TResponse, TBody = never>(
  path: `/api/${string}`,
  options?: ApiRequestOptions<TBody>,
): Promise<TResponse> {
  const { body, headers, ...requestInit } = options ?? {};
  const hasBody = body !== undefined;
  const requestHeaders = new Headers(headers);

  if (hasBody && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(path, {
      ...requestInit,
      credentials: "include",
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throwTransportError(error);
  }

  let payload: unknown;
  try {
    payload = await readResponseBody(response);
  } catch (error) {
    throwTransportError(error);
  }
  if (response.ok) return payload as TResponse;

  throw new ApiError(
    getErrorMessage(payload, response.status),
    response.status,
    getValidationErrors(payload),
  );
}
