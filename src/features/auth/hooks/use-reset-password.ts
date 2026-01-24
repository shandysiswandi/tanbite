import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import type { ResetPasswordOutput } from "@/features/auth/model/reset-password";
import { resetPasswordFn } from "../servers/reset-password";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: (output: ResetPasswordOutput) => {
      toast.success("Password updated successfully.");
      if (output.hasTokens) {
        router.navigate({ to: "/console", replace: true });
        return;
      }

      router.navigate({ to: "/login", replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
