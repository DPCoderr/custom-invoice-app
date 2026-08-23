import type { RegisterSchemaType } from "#/features/auth/schema";
import { apiRequest } from "./client";

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterRequest = {
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

export async function login(data: LoginRequest): Promise<void> {
  return apiRequest<void, LoginRequest>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export async function register(data: RegisterRequest): Promise<void> {
  return apiRequest<void, RegisterRequest>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

export async function logout(): Promise<void> {
  return apiRequest<void>("/api/auth/logout", { method: "POST" });
}
