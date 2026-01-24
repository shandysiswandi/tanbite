/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  // biome-ignore lint/style/noNamespace: Required for NodeJS.ProcessEnv typing.
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_URL: string;
    }
  }
}

export {};
