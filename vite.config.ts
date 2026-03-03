import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { localizeHref } from "./src/libraries/paraglide/runtime.js";

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
  resolve: {
    tsconfigPaths: true,
  },
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
    viteReact(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: undefined,
      assumptions: undefined,
      auxiliaryCommentAfter: undefined,
      auxiliaryCommentBefore: undefined,
      comments: undefined,
      compact: undefined,
      cwd: undefined,
      generatorOpts: undefined,
      parserOpts: undefined,
      retainLines: undefined,
      shouldPrintComment: undefined,
      targets: "defaults",
      wrapPluginVisitorMethod: undefined,
    }),
    tailwindcss(),
  ],
});
