# BaseSelect

Accessible select component with keyboard navigation, v-model, and custom option slot.

Keyboard support: `↑` `↓` navigate, `Enter`/`Space` select, `Escape` close, `Home`/`End` jump to first/last.

## Basic

:::preview

demo-preview=../demos/SelectBasic.vue

:::

## Validation

:::preview

demo-preview=../demos/SelectValidation.vue

:::

## Custom option slot

:::preview

demo-preview=../demos/SelectCustomOption.vue

:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| null` | `null` | Selected value (v-model) |
| `options` | `SelectOption[]` | — | Array of `{ label, value }` objects |
| `label` | `string` | — | Label above the select |
| `placeholder` | `string` | `'Select...'` | Shown when no value selected |
| `disabled` | `boolean` | `false` | Disables the select |
| `required` | `boolean` | `false` | Shows asterisk, sets aria-required |
| `error` | `boolean` | `false` | Applies error styling |
| `errorMessage` | `string` | — | Error text below select |
| `hint` | `string` | — | Hint text (hidden when errorMessage is set) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| null` | Emitted on selection |
| `change` | `string \| number \| null` | Emitted on selection (same value) |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `option` | `{ option: SelectOption }` | Custom option rendering |

## Types

```typescript
interface SelectOption<T = string | number> {
  label: string
  value: T
}
```
