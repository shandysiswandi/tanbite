import { createServerFn } from "@tanstack/react-start";
import { setTokensServerFn } from "@/app/servers/cookies";
import { catchErrorServer } from "@/app/servers/utils";
import { resetPasswordSchema } from "@/features/auth/model/reset-password";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface ResponseBody {
  access_token?: string;
  refresh_token?: string;
}

interface RequestBody {
  email: string;
  code: string;
  password: string;
}

export const resetPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((input) => resetPasswordSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      const { data } = await apiPost<RequestBody, ResponseBody>(
        API_URL.identity.password.reset,
        {
          email: input.email,
          code: input.code,
          password: input.password,
        },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      const hasTokens = Boolean(data.access_token && data.refresh_token);
      if (hasTokens) {
        await setTokensServerFn({
          data: {
            accessToken: data.access_token ?? "",
            refreshToken: data.refresh_token ?? "",
          },
        });
      }

      return { hasTokens };
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
