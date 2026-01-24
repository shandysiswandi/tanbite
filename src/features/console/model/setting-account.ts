import { z } from "zod";

export const settingAccountSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  email: z.email("Please enter a valid email address"),
});

export type SettingAccountInput = z.infer<typeof settingAccountSchema>;
