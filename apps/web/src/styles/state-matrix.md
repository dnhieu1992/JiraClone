# Component State Matrix

## Purpose
- Show which tokens control each UI state so new members can change styles safely without hardcoded values.

## Top Navigation
| Component | State | Tokens |
| --- | --- | --- |
| Header action icon button (`MuiIconButton`) | default | `--ds-text-subtle` |
| Header action icon button (`MuiIconButton`) | hover | `--color-surface-hover` |
| User menu paper (`.topnav__user-menu-paper`) | default | `--topnav-c-menu-bg`, `--topnav-c-menu-border`, `--topnav-c-menu-text` |
| User card (`.topnav__user-card`) | default | `--topnav-c-user-card-bg`, `--topnav-c-user-card-border`, `--topnav-c-user-name`, `--topnav-c-user-email` |
| User menu item (`.topnav__menu-item`) | default | `--topnav-c-menu-item-text`, `--topnav-c-menu-item-icon` |
| User menu item (`.topnav__menu-item`) | hover | `--topnav-c-menu-item-hover-bg`, `--topnav-c-menu-item-hover-text`, `--topnav-c-menu-item-hover-icon` |
| Theme row in user menu (`.topnav__menu-item--theme`) | selected | `--topnav-c-menu-theme-selected-bg`, `--topnav-c-menu-theme-selected-text` |
| Theme row in user menu (`.topnav__menu-item--theme`) | selected + hover | `--topnav-c-menu-theme-selected-hover-bg` |
| Theme arrow (`.topnav__menu-arrow`) | default/open | `--topnav-c-menu-arrow`, `--topnav-c-menu-arrow-open` |
| User menu divider (`.topnav__divider`) | default | `--topnav-c-menu-divider` |

## Sidebar
| Component | State | Tokens |
| --- | --- | --- |
| Sidebar menu item (`.jira-sidebar-menu-item`) | default | `--sidebar-c-text` |
| Sidebar menu item (`.jira-sidebar-menu-item`) | hover | `--color-surface-hover` |
| Sidebar menu item (`.jira-sidebar-menu-item`) | focus-visible | `--color-focus-ring` |
| Sidebar menu item (`.jira-sidebar-menu-item--active`) | active | `--sidebar-c-active-bg`, `--sidebar-c-active-fg` |
| Sidebar menu item (`.jira-sidebar-menu-item--active`) | active + hover | `--sidebar-c-active-bg` (darkened overlay) |
| Sidebar active indicator (`.jira-sidebar-menu-item-indicator`) | active | `--sidebar-c-active-indicator` |

## Global Surfaces
| Component | State | Tokens |
| --- | --- | --- |
| App shell background (`.app-shell`, `.app-shell-main`) | default | `--color-bg`, `--color-text` |
| Header background and divider (`.header`) | default | `--color-bg`, `--color-border` |
| Theme popover paper (`.topnav__theme-popover-paper`) | default | `--color-surface`, `--color-border` |

## Notes
- Keep this file updated whenever a component adds/removes state tokens.
- If a state still uses a literal value, convert it to a token in `colors.css` and update this matrix.
