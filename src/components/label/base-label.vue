<template>
  <span class="base-label" :style="labelStyles">
    <slot>{{ value }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: string
  backgroundColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  backgroundColor: 'sc-color-disabled-bg',
  textColor: 'sc-color-text-secondary',
})

const labelStyles = computed(() => ({
  backgroundColor: `var(--${props.backgroundColor})`,
  color: `var(--${props.textColor})`,
}))
</script>

<style scoped>
.base-label {
  display: inline-flex;
  align-items: center;
  height: var(--sc-height-sm);
  border-radius: var(--sc-radius-full);
  padding: 0 var(--sc-space-3);
  font-size: var(--sc-text-xs);
  font-weight: var(--sc-font-medium);
  white-space: nowrap;
}
</style>
