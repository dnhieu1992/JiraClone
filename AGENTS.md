# AGENTS.md (Common)

## Purpose
This file defines common rules that apply across the monorepo.

## Scope
- Applies to all folders unless a deeper `AGENTS.md` exists.
- Deeper files override this file for their own scope:
  - `apps/web/AGENTS.md` for frontend
  - `apps/api/AGENTS.md` for backend

## Core Principles
- Keep changes minimal, targeted, and aligned with existing patterns.
- Prioritize correctness, readability, and maintainability.
- Avoid broad refactors unless explicitly requested.
- Do not change behavior silently; document notable behavior changes.

## Workflow Rules
1. Read relevant files before editing.
2. Reuse existing utilities before adding new abstractions.
3. Update related types/docs when behavior or contracts change.
4. Validate only impacted scope before finishing.

## Shared Code Rules
- Use TypeScript strictly and avoid `any` unless justified.
- Keep public contracts explicit and stable.
- Put true cross-app types/utilities in `packages/shared`.
- Do not import app-specific code into shared packages.

## Security and Config
- Never hardcode secrets, credentials, or tokens.
- Use environment variables and existing config patterns.
- Validate and sanitize external inputs.

## Validation Policy
- Run relevant checks for touched scope (`lint`, `test`, `build`).
- If full validation is not run, clearly state what was skipped.

## Definition of Done
- Changes compile and impacted checks pass.
- No unrelated files are modified.
- Documentation/contracts are updated when needed.
