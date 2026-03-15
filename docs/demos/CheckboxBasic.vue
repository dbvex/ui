<template>
  <div style="display:flex;flex-direction:column;gap:12px">
    <BaseCheckbox v-model="agreed">I agree to the terms</BaseCheckbox>

    <div style="display:flex;flex-direction:column;gap:8px">
      <BaseCheckbox v-model="selected" value="vue">Vue</BaseCheckbox>
      <BaseCheckbox v-model="selected" value="react">React</BaseCheckbox>
      <BaseCheckbox v-model="selected" value="angular">Angular</BaseCheckbox>
    </div>
    <div style="font-size:12px;color:#888">Selected: {{ selected }}</div>

    <BaseCheckbox :indeterminate="someSelected && !allSelected" v-model="allSelected">
      Select all
    </BaseCheckbox>

    <BaseCheckbox v-model="agreed" theme="black">Black theme</BaseCheckbox>
    <BaseCheckbox v-model="agreed" disabled>Disabled</BaseCheckbox>
    <BaseCheckbox v-model="agreed" :error="true">With error</BaseCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const agreed = ref(false)
const selected = ref<string[]>(['vue'])
const allSelected = ref(false)
const someSelected = computed(() => selected.value.length > 0)
</script>
