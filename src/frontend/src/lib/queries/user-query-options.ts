import { queryOptions } from "@tanstack/react-query";
import { getUser } from "../api/user";

export const userQueryOptions = queryOptions({
  queryKey: ["user"] as const,
  queryFn: getUser,
  staleTime: Infinity,
  retry: false,
});
