import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { verifyEmailSchema } from "../model/verify-email";
import { verifyEmailFn } from "../servers/verify-email";

export const useVerifyEmail = ({ token }: { token: string }) => {
  const router = useRouter();

  const { mutateAsync, isError } = useMutation({
    mutationFn: verifyEmailFn,
    onSuccess: () => {
      toast.success("Email verified successfully.");
      router.navigate({ to: "/login", replace: true, viewTransition: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      challengeToken: token,
    },
    validators: { onSubmit: verifyEmailSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    isError,
    onSubmitDefault,
  };
};
