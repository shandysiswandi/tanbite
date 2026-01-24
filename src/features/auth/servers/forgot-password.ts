import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { forgotPasswordSchema } from "@/features/auth/model/forgot-password";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  email: string;
  captcha: string;
}

export const forgotPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((input) => forgotPasswordSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPost<RequestBody, Record<string, never>>(
        API_URL.identity.password.forgot,
        { email: input.email, captcha: input.captchaToken },
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
