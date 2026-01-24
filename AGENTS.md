# Agent Guide

This repo is a Vite + TanStack React Start project with TypeScript, Tailwind CSS, and Vitest. Formatting and linting are enforced through **Ultracite** (Biome).

## Essential Commands

- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Preview build: `pnpm preview`
- Tests (all): `pnpm test`
- Test a file: `pnpm test -- src/path/to/file.test.tsx`
- Test by name: `pnpm test -- -t "test name"`
- Format + lint fix: `pnpm dlx ultracite fix`
- Lint check only: `pnpm dlx ultracite check`
- Full health check: `pnpm run doctor` (runs Ultracite fix + `tsc -b`)
- Localization machine translate: `pnpm run translate`

## Formatting & Linting

- Ultracite (Biome) is the source of truth; prefer `pnpm dlx ultracite fix` over manual formatting.
- `biome.jsonc` excludes `src/components/ui` from checks (shadcn-generated code). Avoid editing those files unless required.
- No ESLint or Prettier configs are used.

## Repository Layout

- Routes live in `src/routes` with file-based routing.
- `src/routes/__root.tsx` defines the app shell for all routes.
- Route groups use underscore folders such as `src/routes/_public` and `src/routes/_auth`.
- Shared UI lives in `src/components`; shadcn primitives are in `src/components/ui`.
- Localization output lives in `src/paraglide`; treat files as generated.
- Utilities and helpers live in `src/lib` (example: `cn` in `src/lib/utils.ts`).

## Naming & Files

- Prefer kebab-case filenames for components and routes to match existing conventions.
- Component names are PascalCase; hooks use `use` prefix with camelCase.
- Keep file names aligned with the default export where possible.
- Use descriptive names for constants instead of magic numbers.
- Avoid abbreviations unless they are domain-standard or ubiquitous.
- Keep file sizes reasonable; extract reusable pieces when a module grows.

## TypeScript & Module System

- Strict mode is enabled; satisfy `noUnusedLocals` and `noUnusedParameters`.
- Prefer explicit types where they clarify intent, especially for public APIs and callbacks.
- Use `unknown` for unknown inputs, then narrow with guards.
- Use `as const` for literal objects/arrays that should stay immutable.
- Path alias: `@/*` maps to `src/*` (use `@/` for internal imports).
- ES modules only; keep `type` imports explicit when it helps readability.

## Import Conventions

- Prefer specific imports over namespace imports.
- Order imports: external packages, internal alias (`@/`), then relative paths.
- Keep type-only imports explicit when they reduce runtime import noise.
- Avoid barrel re-exports unless a module is clearly intended as a public surface.

## General JavaScript Style

- Use `const` by default; `let` only when reassignment is necessary.
- Prefer template literals over string concatenation.
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe access.
- Prefer `for...of` loops when iterating with side effects.
- Extract complex conditions into well-named boolean variables.
- Use early returns to reduce nesting and highlight error cases.

## React & UI Standards

- Function components only; hooks at the top level with complete dependency arrays.
- Use semantic HTML elements and proper ARIA labels for inputs and interactive content.
- Use unique IDs for list keys; avoid array indices for dynamic lists.
- Nest children between tags instead of passing as props unless required by an API.
- Use `ref` as a prop (React 19+ guidance) instead of `React.forwardRef`.

## Tailwind & Styling

- Tailwind is the default styling approach; keep class order readable and grouped by purpose.
- Use the `cn` helper from `src/lib/utils.ts` for conditional class merging.
- Prefer `class-variance-authority` for reusable variant-driven styles when a component grows.
- Avoid inline styles unless they are computed values or non-Tailwind properties.
- Keep accessibility-focused styles (focus rings, `sr-only`) intact.

## Routing & Data Fetching

- Follow TanStack React Start routing patterns; route files live under `src/routes`.
- Prefer loader/action conventions provided by TanStack when fetching data.
- Keep route components focused on orchestration; move heavy UI into `src/components`.
- Keep SSR-safe code in mind; avoid direct `window` access without guards.

## Localization (Paraglide)

- Generated locale files live in `src/paraglide`; do not hand-edit them.
- Use `pnpm run translate` to refresh machine translations when needed.
- Ensure new user-facing strings are wired to the i18n layer.

## Error Handling

- Throw `Error` instances with clear, actionable messages.
- Avoid `try/catch` unless you can add context or recover.
- Remove `console.log`, `debugger`, and `alert` before committing.

## Testing (Vitest + Testing Library)

- Keep assertions inside `it()`/`test()` blocks.
- Use async/await over done callbacks.
- Avoid `.only`/`.skip` in committed code.
- Name tests after behavior; prefer descriptive test names over implementation details.

## Performance & Security

- Avoid spread in accumulator loops; mutate local accumulators instead.
- Define regexes at top-level; avoid per-iteration instantiation.
- Add `rel="noopener"` for `target="_blank"` links.
- Avoid `dangerouslySetInnerHTML` unless required and sanitized.

## Accessibility

- Provide meaningful alt text and ensure focus states are visible.
- Maintain heading hierarchy and label form inputs.
- Ensure keyboard users can reach all interactive elements.

## Biome/Ultracite Notes

- Presets: `ultracite/biome/core`, `ultracite/biome/react`, `ultracite/biome/remix`.
- Most formatting and lint errors are auto-fixable; run `pnpm dlx ultracite fix` before committing.

## Editor/Assistant Rules

- No Cursor rules (`.cursor/rules/` or `.cursorrules`) were found.
- No Copilot instructions (`.github/copilot-instructions.md`) were found.

## When Biome Can’t Help

Focus human review on:

1. Business logic correctness and edge cases.
2. Naming that communicates intent.
3. Architecture and data flow clarity.
4. UX and accessibility polish.
5. Performance hot spots and async safety.
6. Documentation for non-obvious behavior.
