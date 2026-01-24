import { createServerFn } from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { z } from "zod";
import { COOKIE } from "@/libraries/constants/cookie";

const cookieOptions = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: "lax" as const,
  path: "/",
};

// ********** ********** ********** ********** **********
// All about user tokens
// ********** ********** ********** ********** **********

const tokens = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const getTokensServerFn = createServerFn().handler(() => {
  const accessToken = getCookie(COOKIE.accessToken);
  const refreshToken = getCookie(COOKIE.refreshToken);

  return { accessToken, refreshToken };
});

export const setTokensServerFn = createServerFn({ method: "POST" })
  .inputValidator(tokens)
  .handler(({ data }) => {
    // Set access token cookie with 15 minute expiration
    setCookie(COOKIE.accessToken, data.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60, // 15 minutes in seconds
    });

    // Set refresh token cookie with 7 day expiration
    setCookie(COOKIE.refreshToken, data.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });
  });

// ********** ********** ********** ********** **********
// All about challenge token
// ********** ********** ********** ********** **********

const challengeTokenSchema = z.string();

export const getMfaChallengeServerFn = createServerFn().handler(() =>
  getCookie(COOKIE.mfaChallengeToken)
);

export const delMfaChallengeServerFn = createServerFn({
  method: "POST",
}).handler(() => deleteCookie(COOKIE.mfaChallengeToken));

export const setMfaChallengeServerFn = createServerFn({ method: "POST" })
  .inputValidator(challengeTokenSchema)
  .handler(({ data }) =>
    setCookie(COOKIE.mfaChallengeToken, data, { ...cookieOptions })
  );

export const getRegisterChallengeServerFn = createServerFn().handler(() =>
  getCookie(COOKIE.registerChallengeToken)
);

export const delRegisterChallengeServerFn = createServerFn({
  method: "POST",
}).handler(() => deleteCookie(COOKIE.registerChallengeToken));

export const setRegisterChallengeServerFn = createServerFn({ method: "POST" })
  .inputValidator(challengeTokenSchema)
  .handler(({ data }) =>
    setCookie(COOKIE.registerChallengeToken, data, { ...cookieOptions })
  );

// ********** ********** ********** ********** **********
// All about theme
// ********** ********** ********** ********** **********

const themeSchema = z.union([
  z.literal("light"),
  z.literal("dark"),
  z.literal("system"),
]);

export type Theme = z.infer<typeof themeSchema>;

export const getThemeServerFn = createServerFn().handler(() => {
  return (getCookie(COOKIE.theme) ?? "system") as Theme;
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(themeSchema)
  .handler(({ data }) => setCookie(COOKIE.theme, data, { ...cookieOptions }));
