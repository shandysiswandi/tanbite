import { setResponseStatus } from "@tanstack/react-start/server";
import { ApiError } from "@/libraries/client/exceptions";

export function catchErrorServer(error: unknown) {
  let msg = "An unexpected error occurred";
  let code = 500;
  let errorMap: Record<string, string | string[]> | undefined;

  if (error instanceof ApiError) {
    msg = error.message;
    code = error.statusCode;
    errorMap = error.errors;
  }

  if (error instanceof Error) {
    msg = error.message;
  }

  setResponseStatus(code);
  return { message: msg, error: errorMap, statusCode: code };
}
