<template>
  <div>
    <div class="theme-switcher">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="theme-btn"
        :class="{ 'theme-btn--active': activeTheme === theme.id }"
        :style="{ '--btn-color': theme.primary }"
        @click="applyTheme(theme)"
      >
        {{ theme.label }}
      </button>
    </div>

    <div class="theme-preview" :style="cssVars">
      <div class="preview-row">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
      </div>

      <BaseInput
        v-model="inputVal"
        label="Email"
        placeholder="you@example.com"
        style="max-width: 280px"
      />

      <BaseSelect
        v-model="selectVal"
        label="Framework"
        :options="options"
        style="max-width: 280px"
      />

      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <BaseCheckbox v-model="check1">Checkbox checked</BaseCheckbox>
        <BaseCheckbox v-model="check2" :indeterminate="true">Indeterminate</BaseCheckbox>
      </div>
    </div>

    <details class="token-details">
      <summary>CSS tokens applied</summary>
      <pre class="token-code">{{ tokenCode }}</pre>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Theme {
  id: string
  label: string
  primary: string
  primaryHover: string
  radius: string
}

const themes: Theme[] = [
  {
    id: 'blue',
    label: 'Default (Blue)',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    radius: '6px',
  },
  {
    id: 'violet',
    label: 'Violet',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    radius: '6px',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    primary: '#059669',
    primaryHover: '#047857',
    radius: '6px',
  },
  {
    id: 'rose',
    label: 'Rose',
    primary: '#e11d48',
    primaryHover: '#be123c',
    radius: '6px',
  },
  {
    id: 'sharp',
    label: 'Sharp',
    primary: '#1d4ed8',
    primaryHover: '#1e3a8a',
    radius: '2px',
  },
]

const activeTheme = ref('blue')
const current = ref(themes[0])

const inputVal = ref('')
const selectVal = ref<string | null>(null)
const check1 = ref(true)
const check2 = ref(false)

const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
]

const cssVars = computed(() => ({
  '--sc-color-primary': current.value.primary,
  '--sc-color-primary-hover': current.value.primaryHover,
  '--sc-radius-base': current.value.radius,
  '--sc-radius-input': current.value.radius === '2px' ? '2px' : '8px',
}))

const tokenCode = computed(() =>
  `:root {\n  --sc-color-primary:       ${current.value.primary};\n  --sc-color-primary-hover: ${current.value.primaryHover};\n  --sc-radius-base:         ${current.value.radius};\n}`,
)

function applyTheme(theme: Theme) {
  activeTheme.value = theme.id
  current.value = theme
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sc-space-2);
  margin-bottom: var(--sc-space-4);
}

.theme-btn {
  padding: var(--sc-space-1) var(--sc-space-3);
  border-radius: var(--sc-radius-full);
  border: 2px solid var(--btn-color);
  background: transparent;
  color: var(--btn-color);
  font-size: var(--sc-text-xs);
  font-weight: var(--sc-font-medium);
  cursor: pointer;
  transition: all var(--sc-transition);
}

.theme-btn--active {
  background: var(--btn-color);
  color: #fff;
}

.theme-preview {
  display: flex;
  flex-direction: column;
  gap: var(--sc-space-4);
  padding: var(--sc-space-5);
  border: 1px solid var(--sc-color-border);
  border-radius: var(--sc-radius-input);
  margin-bottom: var(--sc-space-4);
}

.preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sc-space-2);
}

.token-details summary {
  cursor: pointer;
  font-size: var(--sc-text-xs);
  color: var(--sc-color-text-secondary);
  user-select: none;
}

.token-code {
  margin-top: var(--sc-space-2);
  padding: var(--sc-space-3);
  background: var(--sc-color-disabled-bg);
  border-radius: var(--sc-radius-base);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre;
}
</style>
