import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { ProfileContext } from "../hooks/use-profile";
import { profileQueryKey, profileQueryOptions } from "../queries/profile-query";
import { logoutFn } from "../servers/logout";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: logoutFn,
    onMutate: async () => {
      setIsLoggedOut(true);
      await queryClient.cancelQueries({ queryKey: profileQueryKey });
      queryClient.removeQueries({ queryKey: profileQueryKey });
    },
    onSettled: () => {
      setIsLoggedOut(true);
      queryClient.cancelQueries({ queryKey: profileQueryKey });
      queryClient.removeQueries({ queryKey: profileQueryKey });
      router.navigate({ to: "/login", replace: true, viewTransition: true });
    },
  });

  const profile = useQuery({
    ...profileQueryOptions(),
    enabled: !(isPending || isLoggedOut),
  });

  return (
    <ProfileContext.Provider
      value={{
        profile: profile.data,
        isProfileLoading: profile.isLoading,
        isProfileError: profile.isError,
        isLoggingOut: isPending,
        onLogout: () => mutate({}),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
