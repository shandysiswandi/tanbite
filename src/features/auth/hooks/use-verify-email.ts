import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { verifyEmailFn } from "../servers/verify-email";

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyEmailFn,
    onSuccess: () => {
      toast.success("Email verified successfully.");
      router.navigate({ to: "/login", replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
