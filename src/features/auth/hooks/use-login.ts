import { useMutation } from "@tanstack/react-query";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import type { LoginOutput } from "@/features/auth/model/login";
import type { RedirectSearch } from "@/libraries/types/redirect";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { loginFn } from "../servers/login";

export const useLogin = () => {
  const router = useRouter();
  const next = safeRedirectConsole(
    useRouterState({
      select: (s) => (s.location.search as RedirectSearch).redirect,
    })
  );

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (output: LoginOutput) => {
      if (output.mfaRequired) {
        router.navigate({
          to: "/two-factor/app",
          search: { redirect: next },
          replace: true,
        });
        return;
      }

      toast.success("Welcome back!");
      router.navigate({ to: next, replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
