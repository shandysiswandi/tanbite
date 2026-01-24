import { useMutation } from "@tanstack/react-query";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import type { RedirectSearch } from "@/libraries/types/redirect";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { twoFactorFn } from "../servers/two-factor";

export const useTwoFactorAppMutation = () => {
  const router = useRouter();
  const redirect = useRouterState({
    select: (s) => (s.location.search as RedirectSearch).redirect,
  });

  return useMutation({
    mutationFn: twoFactorFn,
    onSuccess: () => {
      toast.success("Welcome back!");
      router.navigate({
        to: safeRedirectConsole(redirect),
        replace: true,
      });
    },
    onError: (error) => {
      let msg = "An unexpected error occurred";
      if ("statusCode" in error && error.statusCode === 403) {
        toast.warning(error.message);
        router.navigate({
          to: "/login",
          search: { redirect: safeRedirectConsole(redirect) },
          replace: true,
        });
        return;
      }

      if ("message" in error) {
        msg = error.message;
      }

      toast.error(msg);
    },
  });
};
