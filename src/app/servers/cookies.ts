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
  rememberMe: z.boolean().optional(),
});

export const getTokensServerFn = createServerFn().handler(() => {
  const accessToken = getCookie(COOKIE.accessToken);
  const refreshToken = getCookie(COOKIE.refreshToken);

  return { accessToken, refreshToken };
});

export const setTokensServerFn = createServerFn({ method: "POST" })
  .inputValidator(tokens)
  .handler(({ data }) => {
    const shouldPersistAccessToken =
      data.rememberMe ?? getCookie(COOKIE.rememberMe) === "true";

    // Keep the access token cookie available for server-side refresh flow.
    // Note: the JWT itself still expires in ~15 minutes — this does NOT extend token validity.
    // When the access token is expired, the refresh token will be used to issue a new one.
    setCookie(COOKIE.accessToken, data.accessToken, {
      ...cookieOptions,
      ...(shouldPersistAccessToken ? { maxAge: 7 * 24 * 60 * 60 } : {}),
    });

    // Set refresh token cookie with 7 day expiration
    setCookie(COOKIE.refreshToken, data.refreshToken, {
      ...cookieOptions,
      ...(shouldPersistAccessToken ? { maxAge: 7 * 24 * 60 * 60 } : {}),
      sameSite: "strict",
    });

    if (data.rememberMe !== undefined) {
      setCookie(COOKIE.rememberMe, String(data.rememberMe), {
        ...cookieOptions,
        ...(data.rememberMe ? { maxAge: 7 * 24 * 60 * 60 } : {}),
      });
    }
  });

export const delTokensServerFn = createServerFn({
  method: "POST",
}).handler(() => {
  deleteCookie(COOKIE.accessToken);
  deleteCookie(COOKIE.refreshToken);
  deleteCookie(COOKIE.rememberMe);
});

// ********** ********** ********** ********** **********
// All about challenge token
// ********** ********** ********** ********** **********

const challengeTokenSchema = z.string();
const mfaRememberMeSchema = z.boolean();

export const getMfaChallengeServerFn = createServerFn().handler(() =>
  getCookie(COOKIE.mfaChallengeToken)
);

export const getMfaRememberMeServerFn = createServerFn().handler(
  () => getCookie(COOKIE.mfaRememberMe) === "true"
);

export const delMfaChallengeServerFn = createServerFn({
  method: "POST",
}).handler(() => deleteCookie(COOKIE.mfaChallengeToken));

export const delMfaRememberMeServerFn = createServerFn({
  method: "POST",
}).handler(() => deleteCookie(COOKIE.mfaRememberMe));

export const setMfaChallengeServerFn = createServerFn({ method: "POST" })
  .inputValidator(challengeTokenSchema)
  .handler(({ data }) =>
    setCookie(COOKIE.mfaChallengeToken, data, { ...cookieOptions })
  );

export const setMfaRememberMeServerFn = createServerFn({ method: "POST" })
  .inputValidator(mfaRememberMeSchema)
  .handler(({ data }) =>
    setCookie(COOKIE.mfaRememberMe, String(data), { ...cookieOptions })
  );
