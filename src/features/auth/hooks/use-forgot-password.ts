import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { forgotPasswordSchema } from "../model/forgot-password";
import { forgotPasswordFn } from "../servers/forgot-password";

export const useForgotPassword = () => {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: forgotPasswordFn,
    onMutate: () => {
      setState("idle");
      setErrorMessage("");
    },
    onSuccess: () => {
      toast.success("Check your inbox for password reset instructions");
      setState("success");
    },
    onError: (error) => {
      toast.error(error.message);
      setState("error");
      setErrorMessage(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      captchaToken: "",
    },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: async ({ value }) => {
      setEmail(value.email);
      await mutateAsync({ data: value });
    },
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const onResetState = () => {
    setState("idle");
    setErrorMessage("");
    form.reset();
  };

  return {
    form,
    onSubmitDefault,
    state,
    email,
    errorMessage,
    onResetState,
  };
};
