import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { registerSchema } from "@/features/auth/model/register";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

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
      await apiPost<RequestBody, unknown>(
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

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
