<template>
  <div style="max-width:320px">
    <BaseInput v-model="value" label="Price" placeholder="0.00">
      <template #prefix>$</template>
      <template #suffix>USD</template>
    </BaseInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
