<template>
  <div style="max-width:320px">
    <BaseSelect
      v-model="value"
      label="Framework"
      placeholder="Select framework..."
      :options="options"
    />
    <p style="margin-top:8px;font-size:13px;color:#6b7280">Selected: {{ value ?? '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string | null>(null)
const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
]
</script>
