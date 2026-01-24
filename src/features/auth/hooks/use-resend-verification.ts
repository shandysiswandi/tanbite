import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resendVerificationFn } from "../servers/resend-verification";

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerificationFn,
    onSuccess: () => {
      toast.success("Verification email sent.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
