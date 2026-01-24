import { z } from "zod";

const method = z.union([z.literal("TOTP"), z.literal("BackupCode")]);
const totpCodePattern = /^\d{6}$/;
const backupCodePattern = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

export type VerifyMethod = z.infer<typeof method>;

export const twoFactorSchema = z
  .object({
    code: z.string().min(1, "Please enter your verification code"),
    method,
  })
  .superRefine((data, ctx) => {
    const isTotp = data.method === "TOTP";
    const isValid = isTotp
      ? totpCodePattern.test(data.code)
      : backupCodePattern.test(data.code);

    if (isValid) {
      return;
    }

    ctx.addIssue({
      code: "custom",
      message: isTotp
        ? "Code must be 6 digits"
        : "Code format: XXXX-XXXX-XXXX (include hyphens)",
      path: ["code"],
    });
  });

export type TwoFactorInput = z.infer<typeof twoFactorSchema>;
