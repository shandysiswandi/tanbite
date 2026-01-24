import { createServerFn } from "@tanstack/react-start";
import { delTokensServerFn, getTokensServerFn } from "@/app/servers/cookies";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  refresh_token: string;
}

export const logoutFn = createServerFn({ method: "POST" })
  .inputValidator((input) => input)
  .handler(async () => {
    try {
      const { refreshToken } = await getTokensServerFn();

      await apiPost<RequestBody, unknown>(
        API_URL.identity.logout,
        {
          refresh_token: refreshToken ?? "__NO_TOKEN__",
        },
        {
          needAccessToken: true,
          needAutoRefreshToken: false,
        }
      );

      return {};
    } catch {
      return {};
    } finally {
      await delTokensServerFn();
    }
  });
