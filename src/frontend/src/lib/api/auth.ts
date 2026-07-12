import type { LoginSchemaValues } from "#/components/login-form";
import type { RegisterSchemaValues } from "#/components/signup-form";

export type ResponseDto<T = null> = {
  success: boolean,
  data: T | null
  message?: string
}

export async function login(data: LoginSchemaValues): Promise<void> {
  let res: Response;

  try {
    res = await fetch("http://localhost:5050/api/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Something went wrong");
  }
}

export async function register(data: RegisterSchemaValues): Promise<void> {
  let res: Response;

  try {
    res = await fetch("http://localhost:5050/api/auth/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Something went wrong");
  }
}

export async function logout(): Promise<ResponseDto> {
  let res: Response;

  try {
    res = await fetch("http://localhost:5050/api/auth/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }

  const body: ResponseDto = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message ?? "Something went wrong");
  }

  if (!body) {
  throw new Error("Invalid response from server");
}

  return body;
}
