import { queryOptions } from "@tanstack/react-query";
import { profileFn } from "../servers/profile";

export const profileQueryKey = ["me", "profile"] as const;

export const profileQueryOptions = () =>
  queryOptions({
    queryKey: profileQueryKey,
    queryFn: async () => await profileFn(),
    staleTime: 15 * 60 * 1000,
  });
