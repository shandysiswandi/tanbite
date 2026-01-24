import { getCookie } from "@tanstack/react-start/server";
import ky, { type Options } from "ky";
import { getTokensServerFn, setTokensServerFn } from "@/app/servers/cookies";
import { API_URL } from "@/libraries/constants/api-url";
import { COOKIE } from "@/libraries/constants/cookie";
import { ApiError } from "./exceptions";
import type { ApiEnvelope, ApiErrorResponse, QueryValue } from "./types";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface ApiRequestOptions<Body = unknown> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: Body;
  query?: Record<string, QueryValue>;
  config?: Options;
  needAccessToken?: boolean;
  needAutoRefreshToken?: boolean;
}

declare module "ky" {
  export interface Options {
    context?: {
      needAccessToken?: boolean;
      needAutoRefreshToken?: boolean;
    };
  }
}

// This promise acts as a "lock". Concurrent 401s will wait for this to resolve
// instead of firing multiple refresh requests to your backend.
let refreshPromise: Promise<void> | null = null;

const instance = ky.create({
  prefixUrl: process.env.API_URL,
  retry: 1,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "TanBite/v1.0.0 Build (01-01-2026)",
  },
  hooks: {
    beforeRequest: [
      (req, options) => {
        if (options.context?.needAccessToken === false) {
          return;
        }
        const token = getCookie(COOKIE.accessToken);
        if (token) {
          req.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (
          response.status === 401 &&
          options.context?.needAutoRefreshToken !== false &&
          !request.url.includes(API_URL.identity.refresh)
        ) {
          if (refreshPromise) {
            await refreshPromise;
            const newToken = getCookie(COOKIE.accessToken);
            request.headers.set("Authorization", `Bearer ${newToken}`);
            return ky(request);
          }

          refreshPromise = (async () => {
            try {
              const refreshToken = await getTokensServerFn();
              if (!refreshToken.refreshToken) {
                throw new Error("No refresh token");
              }

              const { data } = await ky
                .post(API_URL.identity.refresh, {
                  prefixUrl: process.env.API_URL,
                  json: { refresh_token: refreshToken },
                })
                .json<ApiEnvelope<AuthResponse>>();

              await setTokensServerFn({
                data: {
                  accessToken: data.access_token,
                  refreshToken: data.refresh_token,
                },
              });
            } finally {
              refreshPromise = null;
            }
          })();

          await refreshPromise;

          const { accessToken } = await getTokensServerFn();
          request.headers.set("Authorization", `Bearer ${accessToken}`);
          return ky(request);
        }

        if (!response.ok) {
          const { message, error } = await response.json<ApiErrorResponse>();
          throw new ApiError(message, response.status, error);
        }

        return response;
      },
    ],
  },
});

function buildSearchParams(query?: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, String(item));
        }
      } else {
        searchParams.append(key, String(value));
      }
    }
  }
  return searchParams;
}

async function request<Req = unknown, Resp = unknown>(
  options: ApiRequestOptions<Req>
): Promise<ApiEnvelope<Resp>> {
  const {
    method,
    path,
    body,
    query,
    config,
    needAccessToken = true,
    needAutoRefreshToken = true,
  } = options;
  const searchParams = buildSearchParams(query);
  try {
    const response = await instance(path, {
      method,
      json: body,
      searchParams: searchParams.size > 0 ? searchParams : undefined,
      ...config,
      context: {
        needAccessToken,
        needAutoRefreshToken,
      },
    });

    return await response.json<ApiEnvelope<Resp>>();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    let msg = "An unexpected error occurred";
    if (error instanceof Error) {
      msg = error.message;
    }
    throw new ApiError(msg, 500);
  }
}

export const apiGet = <Resp>(
  path: string,
  options?: Omit<ApiRequestOptions<undefined>, "method" | "path" | "body">
) => request<undefined, Resp>({ method: "GET", path, ...options });

export const apiPost = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "POST", path, body, ...options });

export const apiPut = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "PUT", path, body, ...options });

export const apiPatch = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "PATCH", path, body, ...options });

export const apiDelete = <Resp>(
  path: string,
  options?: Omit<ApiRequestOptions<undefined>, "method" | "path" | "body">
) => request<undefined, Resp>({ method: "DELETE", path, ...options });
