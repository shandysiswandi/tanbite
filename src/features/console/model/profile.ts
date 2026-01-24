import { z } from "zod";

const permission = z.record(z.string(), z.array(z.string()));

export const profileSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  avatar: z.string(),
  status: z.string(),
  permission,
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfilePermission = z.infer<typeof permission>;
