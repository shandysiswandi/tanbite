import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { localizeHref } from "./src/libraries/paraglide/runtime";

const prerenderRoutes = [
  "/",
  "/services",
  "/contact",
  "/privacy",
  "/terms",
].map((path) => ({
  path: localizeHref(path),
  prerender: {
    enabled: true,
  },
}));

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/src/paraglide/**"],
    },
  },
  plugins: [
    paraglideVitePlugin({
      outdir: "./src/libraries/paraglide",
      project: "./project.inlang",
      cookieName: "locale",
      localStorageKey: "locale",
      outputStructure: "message-modules",
      strategy: ["url", "localStorage", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["id", "/id/:path(.*)?"],
          ],
        },
      ],
    }),
    devtools(),
    nitro({
      compressPublicAssets: {
        gzip: true,
        brotli: true,
      },
    }),
    viteTsConfigPaths(), // this is the plugin that enables path aliases
    tanstackStart({
      pages: prerenderRoutes,
      prerender: {
        enabled: process.env.PRERENDER === "true",
        crawlLinks: false,
      },
      sitemap: {
        enabled: true,
        host: "http://localhost:4333",
      },
      router: {
        entry: "app/router.tsx",
        generatedRouteTree: "app/route-tree.gen.ts",
      },
      server: {
        entry: "app/server.ts",
      },
    }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
});
