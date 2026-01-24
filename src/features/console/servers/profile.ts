import { createServerFn } from "@tanstack/react-start";
import { catchErrorServer } from "@/app/servers/utils";
import { apiGet } from "@/libraries/client/api";
import { API_URL } from "@/libraries/constants/api-url";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  status: string;
}
interface Permission {
  permissions: Record<string, string[]>;
}

export const profileFn = createServerFn()
  .inputValidator((input) => input)
  .handler(async () => {
    try {
      const [{ data: user }, { data: perm }] = await Promise.all([
        apiGet<Profile>(API_URL.identity.me.profile),
        apiGet<Permission>(API_URL.identity.me.permissions),
      ]);

      return {
        id: user.id,
        email: user.email,
        name: user.full_name,
        avatar: user.avatar_url,
        status: user.status,
        permission: perm.permissions,
      };
    } catch (error: unknown) {
      throw catchErrorServer(error);
    }
  });
