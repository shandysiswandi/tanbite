import { createServerFn } from "@tanstack/react-start";
import { setRegisterChallengeServerFn } from "@/app/servers/cookies";
import { catchErrorServer } from "@/app/servers/utils";
import { registerSchema } from "@/features/auth/model/register";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface ResponseBody {
  challenge_token: string;
}

interface RequestBody {
  email: string;
  password: string;
  captcha: string;
  full_name: string;
}

export const registerFn = createServerFn({ method: "POST" })
  .inputValidator((input) => registerSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      const { data } = await apiPost<RequestBody, ResponseBody>(
        API_URL.identity.register,
        {
          captcha: input.captchaToken,
          full_name: input.name,
          email: input.email,
          password: input.password,
        },
        {
          needAccessToken: false,
          needAutoRefreshToken: false,
        }
      );

      await setRegisterChallengeServerFn({ data: data.challenge_token });

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
