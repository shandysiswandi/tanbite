import { z } from "zod";

const resetCodePattern = /^\d{6}$/;

export const resetPasswordSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    code: z
      .string()
      .min(1, "Please enter the reset code")
      .refine((value) => resetCodePattern.test(value), {
        message: "Use the 6-digit code from your email",
      }),
    password: z.string().min(1, "Please enter a new password"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordOutput {
  hasTokens?: boolean;
}

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
