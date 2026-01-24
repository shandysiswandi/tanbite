# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.


## Issues

- recharts
  - Current: 2.15.4
  - Latest: 3.7.0
  - Issue: https://github.com/shadcn-ui/ui/issues/7669

- @tanstack/react-table
  - Current: 8.21.3
  - Issue: https://github.com/TanStack/table/issues/6137

## Project structure
```bash
.
├── src/
│   ├── app/                    # FRAMEWORK INFRASTRUCTURE (The "Engine")
│   │   ├── hooks/              # Framework-specific hooks (e.g., use-theme.ts)
│   │   ├── providers/          # Global Contexts (QueryClient, Theme, Auth)
│   │   ├── servers/            # Global Server logic (theme.ts, session.ts)
│   │   ├── client.tsx          # Client-side hydration entry point
│   │   ├── router.tsx          # TanStack Router instance & config
│   │   ├── routeTree.gen.ts    # Auto-generated (Moved here via vite.config)
│   │   ├── server.ts           # Nitro/Server-side rendering entry point
│   │   └── styles.css          # Global CSS & Tailwind directives
│   │
│   ├── components/             # UI COMPONENTS
│   │   ├── form/               # Form primitives (text-field.tsx, use-form.ts)
│   │   ├── logos/              # SVG/Icon components (google.tsx, github.tsx)
│   │   ├── ui/                 # Shadcn / Base UI atoms (button.tsx, input.tsx)
│   │   ├── mode-switcher.tsx   # Theme toggle component
│   │   └── soft-backdrop.tsx   # Shared visual layout element
│   │
│   ├── features/               # DOMAIN LOGIC (The "Organs")
│   │   ├── auth/               # Authentication domain
│   │   │   ├── components/     # Feature UI
│   │   │   ├── hooks/          # Domain hooks
│   │   │   ├── model/          # Validation schemas & TS types
│   │   │   └── servers/        # Server Functions
│   │   ├── console/            # Dashboard/Admin domain
│   │   └── public/             # Marketing/Landing page domain
│   │
│   ├── libraries/              # UTILITIES & TOOLS (The "Toolkit")
│   │   ├── client/             # API client configs (Ky instance, interceptors)
│   │   ├── constants/          # Static values (app.ts, api-url.ts, cookie.ts)
│   │   ├── hooks/              # Global utility hooks (use-mobile.ts)
│   │   ├── types/              # Global data contracts (meta.ts, status.ts)
│   │   ├── utils/              # Pure functions (tailwind.ts, error-utils.ts, seo.ts)
│   │   └── paraglide/          # Auto-generated i18n files (By Inlang)
│   │
│   ├── routes/                 # ROUTING & PAGES (The "Map")
│   │   ├── _auth/              # Layout Group: Auth (login, register)
│   │   ├── _console/           # Layout Group: Dashboard
│   │   ├── _public/            # Layout Group: Landing, Terms, Privacy
│   │   └── __root.tsx          # Root Layout (Devtools, Global SEO)
│   │
│   └── env.d.ts                # Type definitions for Env variables
│
├── public/                     # Static assets (images, robots.txt, favicon)
├── vite.config.ts              # Vite plugins & TanStack Start config
├── tsconfig.json               # Path aliases (@/*) & TS settings
└── package.json                # Scripts & Dependencies
```