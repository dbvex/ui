<template>
  <form class="form" novalidate @submit.prevent="onSubmit">
    <div class="form__row">
      <BaseInput
        v-model="fields.firstName"
        label="First name"
        placeholder="John"
        :required="true"
        :error="!!errors.firstName"
        :error-message="errors.firstName"
      />
      <BaseInput
        v-model="fields.lastName"
        label="Last name"
        placeholder="Doe"
        :required="true"
        :error="!!errors.lastName"
        :error-message="errors.lastName"
      />
    </div>

    <BaseInput
      v-model="fields.email"
      label="Email"
      type="email"
      placeholder="john@example.com"
      :required="true"
      :error="!!errors.email"
      :error-message="errors.email"
    />

    <BaseInput
      v-model="fields.password"
      label="Password"
      type="password"
      placeholder="Min 8 characters"
      :required="true"
      :error="!!errors.password"
      :error-message="errors.password"
      hint="Must be at least 8 characters"
    />

    <BaseSelect
      v-model="fields.role"
      label="Role"
      placeholder="Select your role..."
      :options="roleOptions"
      :required="true"
      :error="!!errors.role"
      :error-message="errors.role"
    />

    <div class="form__checkboxes">
      <BaseCheckbox v-model="fields.terms">
        I agree to the <a href="#" @click.prevent>Terms of Service</a>
      </BaseCheckbox>
      <span v-if="errors.terms" class="form__checkbox-error">{{ errors.terms }}</span>

      <BaseCheckbox v-model="fields.newsletter">
        Subscribe to newsletter
      </BaseCheckbox>
    </div>

    <div class="form__actions">
      <BaseButton
        type="submit"
        :loading="isSubmitting"
        :block="true"
      >
        Create account
      </BaseButton>
      <BaseButton
        variant="ghost"
        type="button"
        :block="true"
        @click="reset"
      >
        Reset
      </BaseButton>
    </div>

    <div v-if="submitted" class="form__success">
      Account created for <strong>{{ fields.email }}</strong>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { SelectOption } from '../../src/types.js'

const roleOptions: SelectOption[] = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Designer', value: 'design' },
  { label: 'Product Manager', value: 'pm' },
]

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: null as string | null,
  terms: false,
  newsletter: false,
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
  terms: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)

function validate(): boolean {
  errors.firstName = fields.firstName.trim() ? '' : 'First name is required'
  errors.lastName = fields.lastName.trim() ? '' : 'Last name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)
    ? ''
    : 'Enter a valid email address'
  errors.password = fields.password.length >= 8
    ? ''
    : 'Password must be at least 8 characters'
  errors.role = fields.role ? '' : 'Please select a role'
  errors.terms = fields.terms ? '' : 'You must agree to the terms'
  return Object.values(errors).every((e) => !e)
}

async function onSubmit() {
  submitted.value = false
  if (!validate()) return
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1000))
  isSubmitting.value = false
  submitted.value = true
}

function reset() {
  Object.assign(fields, {
    firstName: '', lastName: '', email: '',
    password: '', role: null, terms: false, newsletter: false,
  })
  Object.keys(errors).forEach((k) => { (errors as Record<string, string>)[k] = '' })
  submitted.value = false
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--sc-space-4);
  max-width: 480px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sc-space-3);
}

.form__checkboxes {
  display: flex;
  flex-direction: column;
  gap: var(--sc-space-2);
}

.form__checkbox-error {
  font-size: var(--sc-text-xs);
  color: var(--sc-color-danger);
  margin-top: calc(-1 * var(--sc-space-1));
  padding-left: var(--sc-space-6);
}

.form__actions {
  display: flex;
  flex-direction: column;
  gap: var(--sc-space-2);
}

.form__success {
  padding: var(--sc-space-3) var(--sc-space-4);
  background-color: #f0fdf4;
  color: #166534;
  border-radius: var(--sc-radius-base);
  font-size: var(--sc-text-sm);
}

.dark .form__success {
  background-color: #052e16;
  color: #86efac;
}

a {
  color: var(--sc-color-primary);
}
</style>
