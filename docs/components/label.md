# BaseLabel

Badge/label component with customizable background and text colors via CSS variables.

## Usage

:::preview

demo-preview=../demos/LabelBasic.vue

:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Label text (also settable via default slot) |
| `backgroundColor` | `string` | `sc-color-disabled-bg` | CSS variable name (without `--`) for background |
| `textColor` | `string` | `sc-color-text-secondary` | CSS variable name (without `--`) for text color |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Custom label content (overrides `value` prop) |

## Examples

```vue
<BaseLabel value="Default" />
<BaseLabel value="Primary"
  background-color="sc-color-primary"
  text-color="sc-color-text-on-primary"
/>
<BaseLabel value="Danger"
  background-color="sc-color-danger-bg"
  text-color="sc-color-danger"
/>
```
