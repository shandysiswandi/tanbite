import { z } from "zod";

export const settingPasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Please enter your current password"),
    newPassword: z.string().min(8, "Please enter a new password"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SettingPasswordInput = z.infer<typeof settingPasswordSchema>;
