import handler from "@tanstack/react-start/server-entry";
import { FastResponse } from "srvx";
import { paraglideMiddleware } from "@/libraries/paraglide/server";

// https://tanstack.com/start/latest/docs/framework/react/guide/hosting#performance-tip-fastresponse
globalThis.Response = FastResponse;

// Server-side URL localization/redirects for Paraglide
export default {
  fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};
