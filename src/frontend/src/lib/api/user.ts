import { ApiError, apiRequest } from "./client";

export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export async function getUser(signal?: AbortSignal): Promise<UserDto | null> {
  try {
    return await apiRequest<UserDto>("/api/auth/me", { signal });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}
