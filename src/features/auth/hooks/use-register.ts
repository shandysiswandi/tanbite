import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { type RegisterState, registerSchema } from "../model/register";
import { registerFn } from "../servers/register";

export const useRegister = () => {
  const [state, setState] = useState<RegisterState>("idle");

  const mutation = useMutation({
    mutationFn: registerFn,
    onMutate: () => {
      setState("idle");
    },
    onSuccess: () => {
      setState("new_account");
    },
    onError: (error) => {
      if ("statusCode" in error && error.statusCode === 403) {
        setState("block_account");
      } else if ("statusCode" in error && error.statusCode === 409) {
        if (error.message.includes("Account not verified")) {
          setState("new_account");
        } else {
          setState("exists_account");
        }
      } else {
        setState("idle");
        toast.error(error.message);
      }
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      captchaToken: "",
    },
    validators: { onSubmit: registerSchema },
    onSubmit: async ({ value }) => await mutation.mutateAsync({ data: value }),
  });

  const onResetForm = () => {
    setState("idle");
    form.reset();
  };

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    state,
    onSubmitDefault,
    onResetForm,
  };
};
