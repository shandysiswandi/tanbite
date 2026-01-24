import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { verifyEmailSchema } from "@/features/auth/model/verify-email";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  challenge_token: string;
}

export const verifyEmailFn = createServerFn({ method: "POST" })
  .inputValidator((input) => verifyEmailSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPost<RequestBody, unknown>(
        API_URL.identity.registerVerify,
        {
          challenge_token: input.challengeToken,
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
