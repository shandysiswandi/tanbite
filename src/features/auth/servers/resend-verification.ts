import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { catchErrorServer } from "@/app/servers/utils";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

const resendVerificationSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

interface RequestBody {
  email: string;
}

export const resendVerificationFn = createServerFn({ method: "POST" })
  .inputValidator((input) => resendVerificationSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPost<RequestBody, Record<string, never>>(
        API_URL.identity.registerResend,
        { email: input.email },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      return { email: input.email };
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
