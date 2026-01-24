import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(5, "Please enter a valid name"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Please enter a password"),
  captchaToken: z.string().min(1, "Please complete the captcha"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

const stateSchema = z.union([
  z.literal("idle"),
  z.literal("new_account"),
  z.literal("exists_account"),
  z.literal("block_account"),
]);

export type RegisterState = z.infer<typeof stateSchema>;
