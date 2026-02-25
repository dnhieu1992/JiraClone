# AGENTS.md (Backend)

## Scope
Applies to all code under `apps/api`.

## Tech Context
- NestJS 11
- TypeScript

## Backend Rules
- Preserve module boundaries: `controller -> service -> repository/provider`.
- Keep controllers thin; business logic belongs in services.
- Validate and sanitize all request inputs (params, query, body).
- Return consistent error responses; do not leak internal implementation details.
- Reuse existing guards, interceptors, pipes, and shared utilities before adding new ones.
- Keep DTOs explicit and aligned with API contracts.
- Avoid direct coupling to frontend-specific concerns.

## Data and Security
- Never hardcode credentials, tokens, or secrets.
- Use environment variables and existing config modules.
- Enforce least privilege for integrations and external services.

## Type Safety and Structure
- Avoid `any`; prefer explicit types for service contracts and responses.
- Keep files focused and cohesive; avoid god services.
- Place cross-app contracts/utilities in `packages/shared` when truly shared.

## Validation Before Finish
Run relevant checks for api scope:
- `pnpm --filter @jira-clone/api lint`
- `pnpm --filter @jira-clone/api test`
- `pnpm --filter @jira-clone/api build`

If not all commands are run, clearly state what was skipped.
