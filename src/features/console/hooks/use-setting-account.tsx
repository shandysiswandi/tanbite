import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { settingAccountSchema } from "@/features/console/model/setting-account";
import { settingAccountFn } from "../servers/setting-account";

export const useSettingAccount = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: settingAccountFn,
    onSuccess: () => {
      toast.success("Account settings updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
    validators: { onSubmit: settingAccountSchema },
    onSubmit: async ({ value }) => {
      await mutateAsync({ data: value });
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
