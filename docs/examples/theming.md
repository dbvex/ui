# Theming

All visual values are CSS custom properties prefixed with `--sc-*`.
Override any token on `:root` to theme the entire library — no rebuilding required.

:::preview

demo-preview=../demos/ThemingDemo.vue

:::

## How it works

Components reference only `var(--sc-*)` — never hardcoded values:

```css
/* base-button.vue */
.base-button--primary {
  background-color: var(--sc-color-primary);
  border-radius: var(--sc-radius-base);
}
```

Override at the root level and every component inherits the change:

```css
/* your app's global CSS */
:root {
  --sc-color-primary:       #7c3aed;   /* violet */
  --sc-color-primary-hover: #6d28d9;
  --sc-radius-base:         2px;       /* sharp corners */
}
```

## Available tokens

| Token | Default | Description |
|-------|---------|-------------|
| `--sc-color-primary` | `#3b82f6` | Primary action color |
| `--sc-color-primary-hover` | `#2563eb` | Primary hover |
| `--sc-color-danger` | `#ef4444` | Danger/error color |
| `--sc-radius-base` | `6px` | Button border radius |
| `--sc-radius-input` | `8px` | Input/select border radius |
| `--sc-radius-full` | `100px` | Pill shape |
| `--sc-space-1..8` | `4px–32px` | Spacing scale (4px grid) |
| `--sc-text-xs` | `0.75rem` | Small text (12px) |
| `--sc-text-sm` | `0.875rem` | Medium text (14px) |
| `--sc-shadow-md` | multi-layer | Dropdown shadow |
| `--sc-focus-ring` | `0 0 0 3px …` | Keyboard focus outline |

Full token reference: [`src/core/tokens.css`](https://github.com/dbvex/ui/blob/main/src/core/tokens.css)
