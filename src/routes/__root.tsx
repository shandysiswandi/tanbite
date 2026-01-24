import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";
import appCss from "@/app/styles.css?url";
import { NotFoundComponent } from "@/components/404";
import { ErrorComponent } from "@/components/500";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getLocale } from "@/libraries/paraglide/runtime";
import { seo } from "@/libraries/utils/seo";

const themeBootstrapScript = `
(() => {
  try {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const preferredTheme =
      storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
        ? storedTheme
        : "system";
    const isDark =
      preferredTheme === "dark" ||
      (preferredTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.toggle("dark", isDark);

    const preset = window.localStorage.getItem("theme-preset");
    if (!preset || preset === "default" || !/^[a-z0-9-]+$/.test(preset)) {
      return;
    }

    root.classList.add(preset);
  } catch {
    // Ignore hydration bootstrap failures.
  }
})();
`;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...(seo({
        title: "TanBite",
        description: "Modern product rituals for fast-moving teams.",
        path: "/",
      }) ?? []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "icon",
        href: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        href: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <script>{themeBootstrapScript}</script>
        <HeadContent />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Toaster
            closeButton
            position="top-center"
            richColors
            toastOptions={{ duration: 5000 }}
          />
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Tanstack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "Tanstack Form",
              render: <FormDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
