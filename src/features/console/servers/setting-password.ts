import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { settingPasswordSchema } from "@/features/console/model/setting-password";
import { apiPost } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface RequestBody {
  current_password: string;
  new_password: string;
}

export const settingPasswordFn = createServerFn({ method: "POST" })
  .inputValidator((input) => settingPasswordSchema.parse(input))
  .handler(async ({ data: input }) => {
    try {
      await apiPost<RequestBody, unknown>(API_URL.identity.password.change, {
        current_password: input.currentPassword,
        new_password: input.newPassword,
      });

      return {};
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
