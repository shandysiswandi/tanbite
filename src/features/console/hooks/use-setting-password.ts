import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { settingPasswordSchema } from "@/features/console/model/setting-password";
import { settingPasswordFn } from "../servers/setting-password";

export const useSettingPassword = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: settingPasswordFn,
    onSuccess: () => {
      toast.success("Password updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: settingPasswordSchema },
    onSubmit: async ({ value }) => {
      await mutateAsync({ data: value });
      form.reset();
    },
  });

  const onSubmitDefault = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    isPending,
    onSubmitDefault,
  };
};
