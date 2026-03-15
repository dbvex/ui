<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="fieldId" class="base-select__label">
      {{ label }}
      <span v-if="required" class="base-select__required" aria-hidden="true">*</span>
    </label>

    <div class="base-select__trigger-wrap">
      <button
        :id="fieldId"
        type="button"
        class="base-select__trigger"
        v-bind="ariaProps"
        :aria-expanded="isOpen"
        :aria-haspopup="'listbox'"
        :aria-controls="listboxId"
        :aria-activedescendant="isOpen && focusedValue !== null ? optionId(focusedValue) : undefined"
        :disabled="disabled"
        @click="toggleOpen"
        @keydown="onTriggerKeydown"
      >
        <span class="base-select__value">
          {{ selectedLabel || placeholder }}
        </span>
        <span class="base-select__chevron" :class="{ 'base-select__chevron--open': isOpen }" aria-hidden="true">
          ▾
        </span>
      </button>

      <Transition name="base-select-dropdown">
        <ul
          v-if="isOpen"
          :id="listboxId"
          role="listbox"
          class="base-select__listbox"
          :aria-labelledby="fieldId"
          @keydown="onListboxKeydown"
        >
          <li
            v-for="option in options"
            :key="String(option.value)"
            :id="optionId(option.value)"
            role="option"
            class="base-select__option"
            :class="{
              'base-select__option--selected': option.value === modelValue,
              'base-select__option--focused': option.value === focusedValue,
            }"
            :aria-selected="option.value === modelValue"
            :tabindex="option.value === focusedValue ? 0 : -1"
            @click="selectOption(option.value)"
            @mouseenter="focusedValue = option.value"
          >
            <slot name="option" :option="option">{{ option.label }}</slot>
          </li>
        </ul>
      </Transition>
    </div>

    <span
      v-if="errorMessage || hint"
      :id="descriptionId"
      :class="hasError ? 'base-select__error' : 'base-select__hint'"
      :role="hasError ? 'alert' : undefined"
    >
      {{ errorMessage || hint }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useFormField } from '../../composables/useFormField'

export interface SelectOption<T = string | number> {
  label: string
  value: T
}

interface Props {
  modelValue?: string | number | null
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Select...',
  disabled: false,
  required: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'change', value: string | number | null): void
}>()

const { fieldId, descriptionId, hasError, ariaProps } = useFormField(props)
const listboxId = computed(() => `${fieldId.value}-listbox`)
const optionId = (value: string | number) => `${fieldId.value}-opt-${String(value)}`

const isOpen = ref(false)
const focusedValue = ref<string | number | null>(props.modelValue ?? null)

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? '',
)

const wrapperClasses = computed(() => [
  'base-select',
  {
    'base-select--open': isOpen.value,
    'base-select--error': hasError.value,
    'base-select--disabled': props.disabled,
  },
])

function toggleOpen() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) focusedValue.value = props.modelValue ?? props.options[0]?.value ?? null
}

function selectOption(value: string | number) {
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen() }
  if (e.key === 'Escape') isOpen.value = false
  if (e.key === 'ArrowDown') { e.preventDefault(); openAndMoveFocus(1) }
  if (e.key === 'ArrowUp') { e.preventDefault(); openAndMoveFocus(-1) }
}

function onListboxKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { isOpen.value = false }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (focusedValue.value !== null) selectOption(focusedValue.value as string | number)
  }
  if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1) }
  if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1) }
  if (e.key === 'Home') { e.preventDefault(); focusedValue.value = props.options[0]?.value ?? null }
  if (e.key === 'End') { e.preventDefault(); focusedValue.value = props.options[props.options.length - 1]?.value ?? null }
}

function openAndMoveFocus(dir: 1 | -1) {
  if (!isOpen.value) { isOpen.value = true; focusedValue.value = props.modelValue ?? props.options[0]?.value ?? null }
  else moveFocus(dir)
}

function moveFocus(dir: 1 | -1) {
  const idx = props.options.findIndex((o) => o.value === focusedValue.value)
  const next = Math.max(0, Math.min(props.options.length - 1, idx + dir))
  focusedValue.value = props.options[next]?.value ?? null
}

function onOutsideClick(e: MouseEvent) {
  const el = document.getElementById(fieldId.value)
  if (el && !el.closest('.base-select')?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onOutsideClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onOutsideClick))
</script>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: var(--sc-space-1);
  position: relative;
}

.base-select__label {
  font-size: var(--sc-text-xs);
  font-weight: var(--sc-font-medium);
  color: var(--sc-color-text);
}

.base-select__required {
  color: var(--sc-color-danger);
  margin-left: var(--sc-space-1);
}

.base-select__trigger-wrap {
  position: relative;
}

.base-select__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sc-space-2);
  padding: var(--sc-space-2) var(--sc-space-3);
  height: var(--sc-height-md);
  font-size: var(--sc-text-sm);
  color: var(--sc-color-text);
  background-color: var(--sc-color-surface);
  border: 1px solid var(--sc-color-border);
  border-radius: var(--sc-radius-input);
  cursor: pointer;
  transition: border-color var(--sc-transition);
  text-align: left;
}

.base-select__trigger:hover:not(:disabled) {
  border-color: var(--sc-color-border-hover);
}

.base-select__trigger:focus-visible {
  outline: none;
  border-color: var(--sc-color-primary);
  box-shadow: var(--sc-focus-ring);
}

.base-select--error .base-select__trigger {
  border-color: var(--sc-color-danger);
}

.base-select--disabled .base-select__trigger {
  background-color: var(--sc-color-disabled-bg);
  color: var(--sc-color-placeholder);
  cursor: not-allowed;
  opacity: 0.6;
}

.base-select__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-select__chevron {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--sc-color-placeholder);
  transition: transform var(--sc-transition);
}

.base-select__chevron--open {
  transform: rotate(180deg);
}

.base-select__listbox {
  position: absolute;
  top: calc(100% + var(--sc-space-1));
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  padding: var(--sc-space-1) 0;
  list-style: none;
  background-color: var(--sc-color-surface);
  border: 1px solid var(--sc-color-border);
  border-radius: var(--sc-radius-input);
  box-shadow: var(--sc-shadow-md);
  max-height: 240px;
  overflow-y: auto;
}

.base-select__option {
  padding: var(--sc-space-2) var(--sc-space-3);
  font-size: var(--sc-text-sm);
  color: var(--sc-color-text);
  cursor: pointer;
  transition: background-color var(--sc-transition);
}

.base-select__option:hover,
.base-select__option--focused {
  background-color: var(--sc-color-ghost-hover);
}

.base-select__option--selected {
  color: var(--sc-color-primary);
  font-weight: var(--sc-font-medium);
}

.base-select__error {
  font-size: var(--sc-text-xs);
  color: var(--sc-color-danger);
}

.base-select__hint {
  font-size: var(--sc-text-xs);
  color: var(--sc-color-text-secondary);
}

/* Dropdown animation */
.base-select-dropdown-enter-active,
.base-select-dropdown-leave-active {
  transition: opacity var(--sc-transition), transform var(--sc-transition);
}

.base-select-dropdown-enter-from,
.base-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
