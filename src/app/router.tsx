import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { deLocalizeUrl, localizeUrl } from "@/libraries/paraglide/runtime";
import { routeTree } from "./route-tree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },

    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },

    scrollRestoration: true,
    defaultPreload: import.meta.env.PROD ? "intent" : false,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};
