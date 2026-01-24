import ky, { type Options } from "ky";
import { getTokensServerFn, setTokensServerFn } from "@/app/servers/cookies";
import { API_URL } from "@/libraries/constants/api-url";
import { ApiError } from "./exceptions";
import type { ApiEnvelope, ApiErrorResponse, QueryValue } from "./types";

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

interface TokenBridge {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
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

// Each refresh token gets its own in-flight lock so concurrent 401s for the
// same session wait for one refresh request.
const refreshPromises = new Map<string, Promise<RefreshResponse>>();
const refreshTokenBridges = new Map<string, TokenBridge>();
const REFRESH_BRIDGE_TTL_MS = 30_000;

function getRefreshTokenBridge(refreshToken: string) {
  const bridge = refreshTokenBridges.get(refreshToken);
  if (!bridge) {
    return;
  }

  if (bridge.expiresAt <= Date.now()) {
    refreshTokenBridges.delete(refreshToken);
    return;
  }

  return bridge;
}

async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshResponse> {
  const response = await ky.post(API_URL.identity.refresh, {
    prefixUrl: process.env.API_URL,
    json: { refresh_token: refreshToken },
    throwHttpErrors: false,
    retry: 0,
  });

  if (!response.ok) {
    let message = "Failed to refresh token";
    let error: ApiErrorResponse["error"];
    try {
      const body = await response.json<ApiErrorResponse>();
      message = body.message || message;
      error = body.error;
    } catch {
      // ignore parse errors; use default message
    }
    throw new ApiError(message, response.status, error);
  }

  const { data } = await response.json<ApiEnvelope<RefreshResponse>>();
  if (!(data?.access_token && data?.refresh_token)) {
    throw new ApiError("Invalid refresh response", 500);
  }

  await setTokensServerFn({
    data: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    },
  });

  refreshTokenBridges.set(refreshToken, {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + REFRESH_BRIDGE_TTL_MS,
  });

  return data;
}

const instance = ky.create({
  prefixUrl: process.env.API_URL,
  retry: 0,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "TanBite/v1.0.0 Build (01-01-2026)",
  },
  hooks: {
    beforeRequest: [
      async (req, options) => {
        if (options.context?.needAccessToken === false) {
          return;
        }
        if (req.headers.has("Authorization")) {
          return;
        }

        const { accessToken, refreshToken } = await getTokensServerFn();

        if (refreshToken) {
          const pendingRefresh = refreshPromises.get(refreshToken);

          if (pendingRefresh) {
            try {
              const { access_token } = await pendingRefresh;
              req.headers.set("Authorization", `Bearer ${access_token}`);
              return;
            } catch {
              // ignore refresh errors and fall through to cookie lookup
            }
          }

          const tokenBridge = getRefreshTokenBridge(refreshToken);
          if (tokenBridge) {
            req.headers.set(
              "Authorization",
              `Bearer ${tokenBridge.accessToken}`
            );
            return;
          }
        }

        if (accessToken) {
          req.headers.set("Authorization", `Bearer ${accessToken}`);
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
          const refreshToken = (await getTokensServerFn()).refreshToken;

          if (!refreshToken) {
            throw new ApiError("No refresh token", 401);
          }

          const tokenBridge = getRefreshTokenBridge(refreshToken);
          if (tokenBridge) {
            request.headers.set(
              "Authorization",
              `Bearer ${tokenBridge.accessToken}`
            );
            return instance(request);
          }

          let refreshPromise = refreshPromises.get(refreshToken);

          if (!refreshPromise) {
            refreshPromise = (async () => {
              try {
                return await refreshAccessToken(refreshToken);
              } finally {
                refreshPromises.delete(refreshToken);
              }
            })();

            refreshPromises.set(refreshToken, refreshPromise);
          }

          try {
            const { access_token } = await refreshPromise;
            request.headers.set("Authorization", `Bearer ${access_token}`);
            return instance(request);
          } catch (error) {
            if (error instanceof ApiError) {
              throw error;
            }

            throw new ApiError("Failed to refresh token", 401);
          }
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

    if (response.status === 204) {
      return { message: "", data: undefined as Resp };
    }

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
