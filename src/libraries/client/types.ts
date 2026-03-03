import type { Meta } from "@/libraries/types/meta";

export interface ApiEnvelope<TData> {
  data: TData;
  message: string;
  meta?: Meta;
}

export interface ApiErrorResponse {
  error?: Record<string, string>;
  message: string;
}

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;
