# Registration Form

A complete form showing all components working together: `BaseInput`, `BaseSelect`, `BaseCheckbox`, `BaseButton`.

Demonstrates:
- Client-side validation with error messages
- `required` + `error` + `errorMessage` props wired to validation state
- Loading state on submit button
- Reset flow

:::preview

demo-preview=../demos/FormExample.vue

:::

## Key patterns

**Validation wired to error props:**
```vue
<BaseInput
  v-model="fields.email"
  label="Email"
  :error="!!errors.email"
  :error-message="errors.email"
/>
```

**Loading state on submit:**
```vue
<BaseButton type="submit" :loading="isSubmitting">
  Create account
</BaseButton>
```

**All field components share the same `FormFieldProps` interface** — `error`, `errorMessage`, `hint`, `required`, `disabled` behave identically across `BaseInput`, `BaseSelect`.
