import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Please enter your password"),
  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface LoginOutput {
  mfaRequired?: boolean;
  challengeToken?: string;
  availableMethods?: string[];
}
