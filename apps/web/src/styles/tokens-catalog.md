# Web Token Catalog

## Purpose
- Provide a single onboarding entry for design tokens used in `apps/web`.
- Help new members know where token values live and how to find real usages quickly.

## Source Of Truth
- Token definitions: `src/styles/colors.css`
- Rules and conventions: `src/styles/CSS_VARIABLES_RULES.md`
- State mapping by component: `src/styles/state-matrix.md`
- Auto-generated token usage list: `src/styles/token-usage-report.md`

## Token Groups
| Prefix | Category | Examples |
| --- | --- | --- |
| `--color-*` | Semantic/base colors | `--color-bg`, `--color-text`, `--color-primary` |
| `--sidebar-c-*` | Sidebar-specific colors | `--sidebar-c-text`, `--sidebar-c-active-bg` |
| `--topnav-c-*` | Topnav/menu colors | `--topnav-c-menu-bg`, `--topnav-c-menu-item-text` |
| `--space-*` | Spacing scale | `--space-2`, `--space-4`, `--space-12` |
| `--font-size-*` | Typography size scale | `--font-size-sm`, `--font-size-xl` |
| `--line-height-*` | Typography line height | `--line-height-md`, `--line-height-heading` |
| `--font-weight-*` | Typography weight scale | `--font-weight-regular`, `--font-weight-bold` |
| `--z-index-*` | Layer ordering | `--z-index-overlay`, `--z-index-modal` |
| `--ds-*` | Derived/system aliases | `--ds-text-subtle`, `--ds-surface-sunken` |

## Daily Workflow
1. Pick an existing token first; add a new token only when no existing semantic token fits.
2. Add/update token values in both `:root` and `html[data-theme='dark']`.
3. Use token references in styles (`var(--...)`) instead of literal values.
4. Regenerate usage report:
   - `pnpm --filter @jira-clone/web tokens:report`
5. Verify impacted scope:
   - `pnpm --filter @jira-clone/web lint`

## New Member Checklist
1. Read `apps/web/AGENTS.md` styling rules.
2. Read `src/styles/CSS_VARIABLES_RULES.md`.
3. Open `src/styles/colors.css` to understand available tokens.
4. Open `src/styles/state-matrix.md` to see token usage by component state.
5. Run `pnpm --filter @jira-clone/web tokens:report` and inspect `src/styles/token-usage-report.md`.
