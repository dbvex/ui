# BaseCheckbox

Checkbox with boolean and array v-model, indeterminate state, and theme colors.

## Usage

```vue
<!-- Boolean -->
<BaseCheckbox v-model="agreed">I agree to the terms</BaseCheckbox>

<!-- Array (multiple checkboxes) -->
<BaseCheckbox v-model="selected" value="vue">Vue</BaseCheckbox>
<BaseCheckbox v-model="selected" value="react">React</BaseCheckbox>

<!-- Indeterminate -->
<BaseCheckbox :indeterminate="someSelected" v-model="allSelected">Select all</BaseCheckbox>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| string[]` | `false` | Checked state or array of values |
| `value` | `boolean \| string` | — | Value when used in array mode |
| `id` | `string` | auto-generated | HTML id for label association |
| `indeterminate` | `boolean` | `false` | Shows dash icon (partial selection) |
| `error` | `boolean` | `false` | Applies error styling |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `theme` | `red \| black` | `red` | Checked color theme |
