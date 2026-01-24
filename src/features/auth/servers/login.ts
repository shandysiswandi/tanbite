import { createServerFn } from "@tanstack/react-start";
import {
  delMfaChallengeServerFn,
  delMfaRememberMeServerFn,
  setMfaChallengeServerFn,
  setMfaRememberMeServerFn,
  setTokensServerFn,
} from "@/app/servers/cookies";
import { catchErrorServer } from "@/app/servers/utils";
import { loginSchema } from "@/features/auth/model/login";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface ResponseBody {
  access_token?: string;
  refresh_token?: string;
  mfa_required?: boolean;
  challenge_token?: string;
  available_methods?: string[];
}

interface RequestBody {
  email: string;
  password: string;
}

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((input) => loginSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      const { email, password, rememberMe } = input;

      const { data } = await apiPost<RequestBody, ResponseBody>(
        API_URL.identity.login,
        {
          email,
          password,
        },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      if (data.mfa_required && data.challenge_token) {
        await setMfaChallengeServerFn({ data: data.challenge_token });
        await setMfaRememberMeServerFn({ data: rememberMe });

        return {
          mfaRequired: true,
          challengeToken: data.challenge_token,
          availableMethods: data.available_methods,
        };
      }

      if (data.access_token && data.refresh_token) {
        await setTokensServerFn({
          data: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            rememberMe,
          },
        });

        await delMfaChallengeServerFn();
        await delMfaRememberMeServerFn();
      }

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
