import { z } from "zod";

export const verifyEmailSchema = z.object({
  challengeToken: z.string(),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
