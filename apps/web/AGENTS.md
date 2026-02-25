# AGENTS.md (Frontend)

## Scope
Applies to all code under `apps/web`.

## Tech Context
- Next.js 16 App Router
- React 19
- TypeScript + Tailwind CSS

## Frontend Rules
- Follow existing folder and route conventions in `src/app`, `src/components`, and `src/features`.
- Prefer Server Components by default; add `"use client"` only when interactivity/browser APIs are required.
- Keep components focused and presentational; move complex business logic to hooks/services.
- Reuse existing UI components and utilities before creating new ones.
- Handle loading, empty, and error states for async data.
- Avoid unnecessary re-renders and duplicated fetches.
- Do not hardcode secrets or environment-specific values.

## Type Safety
- Avoid `any`; use explicit types for props, server responses, and shared contracts.
- Keep interfaces/types close to their usage unless shared across features.

## Styling and UX
- Use existing design tokens and Tailwind patterns in the codebase.
- Keep responsive behavior for desktop and mobile.
- Ensure accessibility basics: semantic elements, labels, keyboard support for controls.

## Validation Before Finish
Run relevant checks for web scope:
- `pnpm --filter @jira-clone/web lint`
- `pnpm --filter @jira-clone/web test` (if tests exist for touched code)
- `pnpm --filter @jira-clone/web build`

If not all commands are run, clearly state what was skipped.
