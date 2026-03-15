# BaseButton

Button component with variants, sizes, and loading state.

## Variants

:::preview

demo-preview=../demos/ButtonVariants.vue

:::

## Sizes

:::preview

demo-preview=../demos/ButtonSizes.vue

:::

## States

:::preview

demo-preview=../demos/ButtonStates.vue

:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary \| secondary \| danger \| ghost` | `primary` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Button size |
| `type` | `button \| submit \| reset` | `button` | HTML button type |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows spinner, disables button |
| `block` | `boolean` | `false` | Full-width button |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted on click (not when disabled or loading) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Button label content |
