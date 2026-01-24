import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordFn } from "../servers/forgot-password";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordFn,
    onSuccess: () => {
      toast.success("Password reset email sent.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
