import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { resetPasswordSchema } from "@/features/auth/model/reset-password";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  challenge_token: string;
  new_password: string;
}

export const resetPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((input) => resetPasswordSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPost<RequestBody, unknown>(
        API_URL.identity.password.reset,
        {
          challenge_token: input.challengeToken,
          new_password: input.password,
        },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
