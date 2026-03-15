# BaseInput

Input component with v-model, validation state, and prefix/suffix slots.

## Usage

```vue
<BaseInput v-model="email" label="Email" placeholder="you@example.com" />

<BaseInput
  v-model="username"
  label="Username"
  required
  :error="!!errors.username"
  :error-message="errors.username"
/>

<BaseInput v-model="price" label="Price">
  <template #prefix>$</template>
  <template #suffix>USD</template>
</BaseInput>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | `''` | Input value (v-model) |
| `label` | `string` | — | Label text above input |
| `placeholder` | `string` | — | Input placeholder |
| `type` | `text \| password \| email \| number \| search \| tel \| url` | `text` | Input type |
| `disabled` | `boolean` | `false` | Disables the input |
| `readonly` | `boolean` | `false` | Makes input read-only |
| `required` | `boolean` | `false` | Shows asterisk on label |
| `error` | `boolean` | `false` | Applies error styling |
| `errorMessage` | `string` | — | Error text below input |
| `hint` | `string` | — | Hint text below input (hidden when errorMessage is set) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every input |
| `blur` | `FocusEvent` | Emitted on blur |
| `focus` | `FocusEvent` | Emitted on focus |

## Slots

| Slot | Description |
|------|-------------|
| `prefix` | Content placed before the input field |
| `suffix` | Content placed after the input field |
