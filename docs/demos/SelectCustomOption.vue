<template>
  <div style="max-width:320px">
    <BaseSelect
      v-model="value"
      label="Language"
      placeholder="Select language..."
      :options="options"
    >
      <template #option="{ option }">
        <span style="display:flex;align-items:center;gap:8px">
          <span>{{ option.icon }}</span>
          <span>{{ option.label }}</span>
        </span>
      </template>
    </BaseSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string | null>(null)
const options = [
  { label: 'TypeScript', value: 'ts', icon: '🔷' },
  { label: 'JavaScript', value: 'js', icon: '🟨' },
  { label: 'Python', value: 'py', icon: '🐍' },
  { label: 'Rust', value: 'rs', icon: '🦀' },
]
</script>
