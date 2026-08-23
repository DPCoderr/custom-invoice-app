import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "#/features/auth/schema";

export type ResponseDto<T = null> = {
  success: boolean;
  data: T | null;
  message?: string;
};
export type MeResponseDto = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export async function login(data: LoginSchemaType): Promise<void> {
  try {
    const res = await fetch("http://localhost:5050/api/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      console.log("body", body);
      console.log("res", res);
      throw new Error(body?.message ?? "Something went wrong");
    }
  } catch {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }
}

export async function register(data: RegisterSchemaType): Promise<void> {
  try {
    const res = await fetch("http://localhost:5050/api/auth/register", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message ?? "Something went wrong");
    }
  } catch {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }
}

export async function logout(): Promise<void> {
  try {
    const res = await fetch("http://localhost:5050/api/auth/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message ?? "Something went wrong");
    }

  } catch {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }
}

export async function getUser(): Promise<MeResponseDto> {
  let res: Response;

  try {
    res = await fetch("http://localhost:5050/api/auth/me", {
      credentials: "include",
      method: "GET",
    });
  } catch {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }

  const body: ResponseDto = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message ?? "Something went wrong");
  }

  if (!body) {
    throw new Error("Invalid response from server");
  }

  return res.json();
}
