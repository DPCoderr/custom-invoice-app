import { cache } from "react";
import { apiFetch } from "./fetcher";

export type UserDto = {
  firstName: String;
  lastName: String;
  email: string;
  roles: string[];
};

export const getUser = cache(async (): Promise<UserDto> => {
  const data = await apiFetch<UserDto>("/me");
  return data;
});
