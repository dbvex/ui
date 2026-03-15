# @dbvex/ui

[![npm](https://img.shields.io/npm/v/@dbvex/ui?color=cb3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/@dbvex/ui)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-75%20tests-6e9f18?logo=vitest&logoColor=white)
![VitePress](https://img.shields.io/badge/VitePress-docs-646cff?logo=vite&logoColor=white)
![A11y](https://img.shields.io/badge/a11y-WCAG%202.1-0066cc)

Vue 3 UI component library with TypeScript strict mode, design token system, and accessibility built-in.

**[Live docs →](https://dbvex.github.io/ui/)**

---

## Components

| Component | Description |
|-----------|-------------|
| `BaseButton` | 4 variants · 3 sizes · loading state · focus ring |
| `BaseInput` | v-model · validation · prefix/suffix slots · aria-live |
| `BaseSelect` | Keyboard navigation · custom option slot · aria-activedescendant |
| `BaseCheckbox` | Boolean and array v-model · indeterminate · aria-checked=mixed |
| `BaseLabel` | Badge with CSS variable colors |

## Install

```bash
npm install @dbvex/ui
```

## Quick start (dev)

```bash
npm install
npm run docs:dev   # component docs at localhost:5173
npm run test:unit  # 52 tests
```

## Usage

```ts
// Full import
import { BaseButton, BaseInput, BaseSelect } from '@dbvex/ui'

// Sub-path import (tree-shaking friendly)
import { BaseButton } from '@dbvex/ui/button'
import { BaseInput } from '@dbvex/ui/input'
import { BaseSelect } from '@dbvex/ui/select'
import { BaseCheckbox } from '@dbvex/ui/checkbox'
import { BaseLabel } from '@dbvex/ui/label'

// Styles (import once in your entry file)
import '@dbvex/ui/dist/ui.css'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseSelect, BaseButton } from '@dbvex/ui'
import type { SelectOption } from '@dbvex/ui'

const email = ref('')
const role = ref<string | null>(null)
const roles: SelectOption[] = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer', value: 'design' },
]
</script>

<template>
  <BaseInput v-model="email" label="Email" type="email" required />
  <BaseSelect v-model="role" label="Role" :options="roles" />
  <BaseButton type="submit" :loading="isSaving">Save</BaseButton>
</template>
```

## Design tokens

All visual values are CSS custom properties prefixed with `--sc-*`. Override any token to theme the library:

```css
/* custom theme */
:root {
  --sc-color-primary:       #7c3aed;
  --sc-color-primary-hover: #6d28d9;
  --sc-radius-base:         2px;   /* sharp corners */
}
```

## Architecture

```
src/
├── components/
│   ├── button/       BaseButton + spec
│   ├── checkbox/     BaseCheckbox + spec
│   ├── input/        BaseInput + spec
│   ├── label/        BaseLabel + spec
│   └── select/       BaseSelect + spec
├── composables/
│   └── useFormField  shared id · error · aria state
├── core/
│   ├── styles.css    color scales (19-step palettes)
│   └── tokens.css    spacing · typography · radius · shadow · focus
└── types.ts          all public interfaces and utility types
```

## What this demonstrates

| Concept | Implementation |
|---------|---------------|
| Design token system | Two-layer: `tokens.css` → components via `var(--sc-*)` |
| Composable pattern | `useFormField` — shared id/error/aria state across all field components |
| TypeScript strict | All prop interfaces exported from `src/types.ts`, no `any` |
| Accessibility | `aria-checked=mixed`, `aria-activedescendant`, `aria-live`, `aria-describedby` |
| Component contract | `BaseSelectProps extends FormFieldProps` — shared base interface |

## Tests

| File | Tests |
|------|-------|
| `BaseButton.spec` | 12 |
| `BaseInput.spec` | 11 |
| `BaseCheckbox.spec` | 12 |
| `BaseLabel.spec` | 3 |
| `BaseSelect.spec` | 26 |
| `useFormField.spec` | 11 |
| **Total** | **75** |
