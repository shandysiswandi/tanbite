import { useMutation } from "@tanstack/react-query";
import { useRouter, useRouterState } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import type { RedirectSearch } from "@/libraries/types/redirect";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { twoFactorSchema, type VerifyMethod } from "../model/two-factor";
import { twoFactorFn } from "../servers/two-factor";

export const useTwoFactor = ({ method }: { method: VerifyMethod }) => {
  const router = useRouter();
  const redirect = useRouterState({
    select: (s) => (s.location.search as RedirectSearch).redirect,
  });
  const redirectTo = safeRedirectConsole(redirect);

  const { mutateAsync } = useMutation({
    mutationFn: twoFactorFn,
    onSuccess: () => {
      toast.success("Welcome back!");
      router.navigate({
        to: redirectTo,
        replace: true,
        viewTransition: true,
      });
    },
    onError: (error) => {
      let msg = "An unexpected error occurred";
      if ("statusCode" in error && error.statusCode === 403) {
        toast.warning(error.message);
        router.navigate({
          to: "/login",
          search: { redirect: redirectTo },
          replace: true,
          viewTransition: true,
        });
        return;
      }

      if ("message" in error) {
        msg = error.message;
      }

      toast.error(msg);
    },
  });

  const form = useAppForm({
    defaultValues: {
      code: "",
      method,
    },
    validators: { onSubmit: twoFactorSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    redirectTo,
    onSubmitDefault,
  };
};
