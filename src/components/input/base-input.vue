<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required" aria-hidden="true">*</span>
    </label>

    <div class="base-input__field-wrap">
      <span v-if="$slots.prefix" class="base-input__prefix">
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        class="base-input__field"
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        @input="onInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <span v-if="$slots.suffix" class="base-input__suffix">
        <slot name="suffix" />
      </span>
    </div>

    <span v-if="errorMessage" class="base-input__error" role="alert">
      {{ errorMessage }}
    </span>
    <span v-else-if="hint" class="base-input__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: InputType
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const uid = getCurrentInstance()?.uid
const inputId = computed(() => `base-input-${uid}`)

const hasError = computed(() => props.error || !!props.errorMessage)

const wrapperClasses = computed(() => [
  'base-input',
  {
    'base-input--error': hasError.value,
    'base-input--disabled': props.disabled,
    'base-input--readonly': props.readonly,
  },
])

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-input__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text, #374151);
}

.base-input__required {
  color: var(--color-danger, #ef4444);
  margin-left: 2px;
}

.base-input__field-wrap {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 6px;
  background-color: var(--color-input-bg, #ffffff);
  transition: border-color 0.15s;
  overflow: hidden;
}

.base-input__field-wrap:focus-within {
  border-color: var(--color-primary, #3b82f6);
  outline: 2px solid color-mix(in srgb, var(--color-primary, #3b82f6) 20%, transparent);
}

.base-input--error .base-input__field-wrap {
  border-color: var(--color-danger, #ef4444);
}

.base-input__field {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: var(--color-text, #374151);
  min-width: 0;
}

.base-input__field::placeholder {
  color: var(--color-placeholder, #9ca3af);
}

.base-input__prefix,
.base-input__suffix {
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: var(--color-placeholder, #9ca3af);
  flex-shrink: 0;
}

.base-input--disabled .base-input__field-wrap {
  background-color: var(--color-disabled-bg, #f3f4f6);
  cursor: not-allowed;
}

.base-input--disabled .base-input__field {
  cursor: not-allowed;
  color: var(--color-placeholder, #9ca3af);
}

.base-input__error {
  font-size: 12px;
  color: var(--color-danger, #ef4444);
}

.base-input__hint {
  font-size: 12px;
  color: var(--color-placeholder, #9ca3af);
}
</style>
