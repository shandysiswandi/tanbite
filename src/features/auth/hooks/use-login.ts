import { useMutation } from "@tanstack/react-query";
import { useRouter, useRouterState } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { type LoginOutput, loginSchema } from "@/features/auth/model/login";
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

  const { mutateAsync } = useMutation({
    mutationFn: loginFn,
    onSuccess: (output: LoginOutput) => {
      if (output.mfaRequired) {
        router.navigate({
          to: "/two-factor/app",
          search: { redirect: next },
          replace: true,
          viewTransition: true,
        });
        return;
      }

      toast.success("Welcome back!");
      router.navigate({ to: next, replace: true, viewTransition: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    onSubmitDefault,
  };
};
