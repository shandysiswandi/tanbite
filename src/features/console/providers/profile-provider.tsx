import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { delTokensServerFn } from "@/app/servers/cookies";
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

  useEffect(() => {
    const statusCode =
      typeof profile.error === "object" &&
      profile.error &&
      "statusCode" in profile.error
        ? Number(profile.error.statusCode)
        : null;

    if (!(statusCode === 403 && !isLoggedOut)) {
      return;
    }

    const redirectTo = router.state.location.href;

    const handleForbiddenProfile = async () => {
      setIsLoggedOut(true);
      await delTokensServerFn();
      await queryClient.cancelQueries({ queryKey: profileQueryKey });
      queryClient.removeQueries({ queryKey: profileQueryKey });
      await router.navigate({
        to: "/login",
        search: { redirect: redirectTo },
        replace: true,
        viewTransition: true,
      });
    };

    handleForbiddenProfile().catch(() => {
      // Ignore redirect errors from unmounted navigation transitions.
    });
  }, [isLoggedOut, profile.error, queryClient, router]);

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
