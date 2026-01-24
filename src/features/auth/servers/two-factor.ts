import { createServerFn } from "@tanstack/react-start";
import {
  delMfaChallengeServerFn,
  delMfaRememberMeServerFn,
  getMfaChallengeServerFn,
  getMfaRememberMeServerFn,
  setTokensServerFn,
} from "@/app/servers/cookies";
import { catchErrorServer } from "@/app/servers/utils";
import { twoFactorSchema } from "@/features/auth/model/two-factor";
import { apiPost } from "@/libraries/client/api";
import { ApiError } from "@/libraries/client/exceptions";
import { API_URL } from "@/libraries/constants/api-url";

interface ResponseBody {
  access_token: string;
  refresh_token: string;
}

interface RequestBody {
  code: string;
  method: string;
  challenge_token: string;
}

export const twoFactorFn = createServerFn({ method: "POST" })
  .inputValidator((input) => twoFactorSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      const challengeToken = await getMfaChallengeServerFn();
      const rememberMe = await getMfaRememberMeServerFn();
      if (!challengeToken) {
        throw new Error("Missing MFA challenge token");
      }

      const { data } = await apiPost<RequestBody, ResponseBody>(
        API_URL.identity.loginMfa,
        {
          code: input.code,
          method: input.method,
          challenge_token: challengeToken,
        },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      await setTokensServerFn({
        data: {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          rememberMe,
        },
      });

      await delMfaChallengeServerFn();
      await delMfaRememberMeServerFn();

      return {};
    } catch (error: unknown) {
      if (error instanceof ApiError && error.statusCode === 403) {
        await delMfaChallengeServerFn();
        await delMfaRememberMeServerFn();
      }
      throw catchErrorServer(error);
    }
  });
