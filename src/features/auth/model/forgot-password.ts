import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
  captchaToken: z.string().min(1, "Please complete the captcha"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
