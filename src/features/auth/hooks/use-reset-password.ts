import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { resetPasswordSchema } from "@/features/auth/model/reset-password";
import { resetPasswordFn } from "../servers/reset-password";

export const useResetPassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: () => {
      toast.success("Password updated successfully.");
      router.navigate({ to: "/login", replace: true, viewTransition: true });
    },
    onError: (error) => {
      toast.error(error.message);
      router.navigate({
        to: "/reset-password",
        search: { token: undefined },
        replace: true,
        viewTransition: true,
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      challengeToken: token,
      password: "",
      confirmPassword: "",
    },
    validators: { onSubmit: resetPasswordSchema },
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
