import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { settingAccountSchema } from "@/features/console/model/setting-account";
import { apiPatch } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  full_name: string;
  email: string;
}

export const settingAccountFn = createServerFn({ method: "POST" })
  .inputValidator((input) => settingAccountSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPatch<RequestBody, unknown>(API_URL.identity.me.profile, {
        full_name: input.fullName,
        email: input.email,
      });

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
