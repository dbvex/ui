<template>
  <div style="max-width:320px;display:flex;flex-direction:column;gap:12px">
    <BaseInput
      v-model="value"
      label="Username"
      :required="true"
      :error="hasError"
      :error-message="hasError ? 'This field is required' : undefined"
      placeholder="Enter username"
    />
    <BaseButton size="sm" @click="validate">Validate</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const value = ref('')
const touched = ref(false)
const hasError = computed(() => touched.value && !value.value.trim())
function validate() { touched.value = true }
</script>
