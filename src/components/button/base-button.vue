<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: Variant
  size?: Size
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--loading': props.loading,
    'base-button--block': props.block,
    'base-button--disabled': props.disabled || props.loading,
  },
])
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s, opacity 0.15s;
  white-space: nowrap;
}

.base-button--block {
  width: 100%;
}

/* Sizes */
.base-button--sm { padding: 4px 12px; font-size: 12px; height: 28px; }
.base-button--md { padding: 8px 16px; font-size: 14px; height: 36px; }
.base-button--lg { padding: 12px 24px; font-size: 16px; height: 44px; }

/* Variants */
.base-button--primary {
  background-color: var(--color-primary, #3b82f6);
  color: #fff;
}
.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover, #2563eb);
}

.base-button--secondary {
  background-color: transparent;
  color: var(--color-primary, #3b82f6);
  border: 1px solid var(--color-primary, #3b82f6);
}
.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary, #3b82f6);
  color: #fff;
}

.base-button--danger {
  background-color: var(--color-danger, #ef4444);
  color: #fff;
}
.base-button--danger:hover:not(:disabled) {
  background-color: var(--color-danger-hover, #dc2626);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--color-text, #374151);
}
.base-button--ghost:hover:not(:disabled) {
  background-color: var(--color-ghost-hover, #f3f4f6);
}

/* States */
.base-button--disabled,
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Spinner */
.base-button__spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
