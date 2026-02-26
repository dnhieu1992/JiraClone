# CSS Variables Rules

## Scope
- This file defines rules for adding and maintaining CSS variables in `colors.css`.

## Naming
- Use kebab-case with semantic prefixes: `--color-*`.
- Name by purpose, not by specific shade.
- Good: `--color-text-muted`, `--color-border`.
- Avoid: `--color-blue-500`, `--color-gray-light`.

## Value Format
- Store color values as raw RGB triplets (space-separated), not hex.
- Example: `--color-primary: 59 130 246;`
- Do not use commas in variable values.

## Theme Parity
- Every new variable in `:root` must also exist in `html[data-theme='dark']`.
- Keep the same variable name across themes.
- If a variable is intentionally same in both themes, still declare it in both blocks for clarity.

## Organization
- Keep variables grouped by sections:
  - `base`
  - `text / icon`
  - `semantic`
  - `semantic backgrounds`
  - `borders / states`
  - `brand / accents`
- Add new variables to the most relevant section.

## Usage
- Prefer variables over hardcoded colors in components.
- Use with `rgb()` to allow alpha when needed:
  - `background: rgb(var(--color-bg));`
  - `border-color: rgb(var(--color-border));`
  - `color: rgb(var(--color-text) / 0.8);`

## Change Management
- Do not rename/remove a variable without updating all references in the same change.
- If replacing a variable, migrate all usages immediately to avoid mixed tokens.

## Validation Checklist
- Verify both theme blocks contain the new variable.
- Search for hardcoded colors in touched files and replace where appropriate.
- Run web lint/type-check after changes.
