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
| `backgroundColor` | `string` | `blue-grey-200` | CSS variable name for background |
| `textColor` | `string` | `blue-grey-1200` | CSS variable name for text color |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Custom label content (overrides `value` prop) |
