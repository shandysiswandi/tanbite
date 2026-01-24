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
    const { refreshToken } = await getTokensServerFn();

    await delTokensServerFn();

    if (!refreshToken) {
      return {};
    }

    apiPost<RequestBody, unknown>(
      API_URL.identity.logout,
      {
        refresh_token: refreshToken,
      },
      {
        needAccessToken: false,
        needAutoRefreshToken: false,
      }
    ).catch(() => {
      // Best-effort token revocation; local session is already cleared.
    });

    return {};
  });
