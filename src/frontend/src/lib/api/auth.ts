import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "#/features/auth/schema";
import i18n from "#/i18n";

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
      throw new Error(body?.message ?? i18n.t("common:errors.generic"));
    }
  } catch {
    throw new Error(i18n.t("common:errors.connection"));
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
      throw new Error(body?.message ?? i18n.t("common:errors.generic"));
    }
  } catch {
    throw new Error(i18n.t("common:errors.connection"));
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
      throw new Error(body?.message ?? i18n.t("common:errors.generic"));
    }

  } catch {
    throw new Error(i18n.t("common:errors.connection"));
  }
}
