<template>
  <div style="max-width:320px">
    <BaseInput v-model="value" label="Email" placeholder="you@example.com" />
    <p style="margin-top:8px;font-size:13px;color:#6b7280">Value: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
