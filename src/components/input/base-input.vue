<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="fieldId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required" aria-hidden="true">*</span>
    </label>

    <div class="base-input__field-wrap">
      <span v-if="$slots.prefix" class="base-input__prefix">
        <slot name="prefix" />
      </span>

      <input
        :id="fieldId"
        class="base-input__field"
        v-bind="{ ...$attrs, ...ariaProps }"
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

    <span
      v-if="errorMessage || hint"
      :id="descriptionId"
      :class="hasError ? 'base-input__error' : 'base-input__hint'"
      :role="hasError ? 'alert' : undefined"
      :aria-live="hasError ? 'assertive' : 'polite'"
    >
      {{ errorMessage || hint }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormField } from '../../composables/useFormField'

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

const { fieldId, descriptionId, hasError, ariaProps } = useFormField(props)

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
  font-size: var(--sc-text-xs);
  font-weight: var(--sc-font-medium);
  color: var(--sc-color-text);
}

.base-input__required {
  color: var(--sc-color-danger);
  margin-left: var(--sc-space-1);
}

.base-input__field-wrap {
  display: flex;
  align-items: center;
  border: 1px solid var(--sc-color-border);
  border-radius: var(--sc-radius-input);
  background-color: var(--sc-color-surface);
  transition: border-color var(--sc-transition);
  overflow: hidden;
}

.base-input__field-wrap:focus-within {
  border-color: var(--sc-color-primary);
  box-shadow: var(--sc-focus-ring);
}

.base-input--error .base-input__field-wrap {
  border-color: var(--sc-color-danger);
}

.base-input__field {
  flex: 1;
  padding: var(--sc-space-2) var(--sc-space-3);
  border: none;
  outline: none;
  font-size: var(--sc-text-sm);
  background: transparent;
  color: var(--sc-color-text);
  min-width: 0;
}

.base-input__field::placeholder {
  color: var(--sc-color-placeholder);
}

.base-input__prefix,
.base-input__suffix {
  display: flex;
  align-items: center;
  padding: 0 var(--sc-space-2-5);
  color: var(--sc-color-placeholder);
  flex-shrink: 0;
}

.base-input--disabled .base-input__field-wrap {
  background-color: var(--sc-color-disabled-bg);
  cursor: not-allowed;
}

.base-input--disabled .base-input__field {
  cursor: not-allowed;
  color: var(--sc-color-placeholder);
}

.base-input__error {
  font-size: var(--sc-text-xs);
  color: var(--sc-color-danger);
}

.base-input__hint {
  font-size: var(--sc-text-xs);
  color: var(--sc-color-text-secondary);
}
</style>
