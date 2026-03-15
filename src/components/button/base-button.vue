<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading || undefined"
    :type="type"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseButtonProps } from '../../types'

type Props = BaseButtonProps

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
  gap: var(--sc-space-2);
  border: none;
  border-radius: var(--sc-radius-base);
  font-weight: var(--sc-font-medium);
  cursor: pointer;
  transition: background-color var(--sc-transition), opacity var(--sc-transition);
  white-space: nowrap;
  line-height: var(--sc-leading-tight);
}

.base-button--block { width: 100%; }

/* Sizes */
.base-button--sm { padding: var(--sc-space-1) var(--sc-space-3); font-size: var(--sc-text-xs); height: var(--sc-height-sm); }
.base-button--md { padding: var(--sc-space-2) var(--sc-space-4); font-size: var(--sc-text-sm); height: var(--sc-height-md); }
.base-button--lg { padding: var(--sc-space-3) var(--sc-space-6); font-size: var(--sc-text-base); height: var(--sc-height-lg); }

/* Variants */
.base-button--primary {
  background-color: var(--sc-color-primary);
  color: var(--sc-color-text-on-primary);
}
.base-button--primary:hover:not(:disabled) {
  background-color: var(--sc-color-primary-hover);
}

.base-button--secondary {
  background-color: transparent;
  color: var(--sc-color-primary);
  border: 1px solid var(--sc-color-primary);
}
.base-button--secondary:hover:not(:disabled) {
  background-color: var(--sc-color-primary);
  color: var(--sc-color-text-on-primary);
}

.base-button--danger {
  background-color: var(--sc-color-danger);
  color: var(--sc-color-text-on-primary);
}
.base-button--danger:hover:not(:disabled) {
  background-color: var(--sc-color-danger-hover);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--sc-color-text);
}
.base-button--ghost:hover:not(:disabled) {
  background-color: var(--sc-color-ghost-hover);
}

/* States */
.base-button--disabled,
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button:focus-visible {
  outline: none;
  box-shadow: var(--sc-focus-ring);
}

/* Spinner */
.base-button__spinner {
  display: inline-block;
  width: var(--sc-space-3-5);
  height: var(--sc-space-3-5);
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
