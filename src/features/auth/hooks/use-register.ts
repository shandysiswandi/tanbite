import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { RegisterState } from "../model/register";
import { registerFn } from "../servers/register";

export const useRegister = () => {
  const [state, setState] = useState<RegisterState>("idle");
  const mutate = useMutation({
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

  return {
    ...mutate,
    state,
    resetState: () => setState("idle"),
  };
};
