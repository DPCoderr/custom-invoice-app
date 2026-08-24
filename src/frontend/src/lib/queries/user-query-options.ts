import { queryOptions } from "@tanstack/react-query";
import { getUser } from "../api/user";

export const userQueryOptions = queryOptions({
  queryKey: ["user"] as const,
  queryFn: ({ signal }) => getUser(signal),
  staleTime: 60_000,
  retry: false,
});
