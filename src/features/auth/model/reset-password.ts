import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    challengeToken: z.string(),
    password: z.string().min(8, "Please enter a new password"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
