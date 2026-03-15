<template>
  <div style="max-width:320px;display:flex;flex-direction:column;gap:12px">
    <BaseSelect
      v-model="value"
      label="Role"
      placeholder="Select role..."
      :options="options"
      :required="true"
      :error="hasError"
      :error-message="hasError ? 'Please select a role' : undefined"
    />
    <BaseButton size="sm" @click="validate">Submit</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const value = ref<string | null>(null)
const touched = ref(false)
const hasError = computed(() => touched.value && !value.value)
function validate() { touched.value = true }
const options = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer', value: 'design' },
  { label: 'Manager', value: 'pm' },
]
</script>
