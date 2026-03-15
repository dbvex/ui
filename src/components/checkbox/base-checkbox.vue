<template>
    <div :class="checkboxStyles">
        <span class="base-checkbox__icon">
            <i v-if="isChecked">
                <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.5387 1.2704C12.1538 1.86775 12.1538 2.83624 11.5387 3.43358L4.77733 10L1.46131 6.77962C0.84623 6.18227 0.846228 5.21378 1.46131 4.61643L1.73973 4.34604L4.77733 7.29603L11.2603 1L11.5387 1.2704Z"/>
                </svg>

            </i>
            <i v-else-if ="indeterminate">
                <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5" width="12" height="2"/>
                </svg>
            </i>
            
            <input
                :id="id"
                :checked="isChecked"
                :disabled="inputDisabled"
                type="checkbox"
                class="base-checkbox__input"
                :indeterminate.prop="indeterminate"
                :aria-checked="indeterminate ? 'mixed' : (isChecked as boolean)"
                :aria-invalid="props.error || undefined"
                :aria-disabled="props.disabled || undefined"
                @click="toggleValue()"
                @keydown.space.prevent="toggleValue()"
            >
      </span>

      <label v-if="hasSlot('default')" class="base-checkbox__label" :for="id"><slot></slot></label>

    </div>
</template>
<script setup lang="ts" name='base-checkbox'>
import { computed, getCurrentInstance, useSlots } from "vue";

const hasSlot = (name: string) => {
    const slots = useSlots()
    return !!slots[name];
}

type ThemeColor = 'red' | 'black'

interface Props {
    modelValue?: boolean | string[];
    value?: boolean | string;
    id?: string;
    indeterminate?: boolean;
    error?: boolean;
    disabled?: boolean;
    theme?: ThemeColor;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    id: '',
    disabled: false,
    error: false,
    indeterminate: false,
    theme: 'red',
})
const checkboxStyles = computed(() => ({
    'base-checkbox': true,
    'error': props.error,
    'indeterminate': props.indeterminate,
    'disabled': props.disabled,
    'checked': isChecked.value,
    'red': props.theme === 'red',
    'black': props.theme === 'black',
}))

const uid = getCurrentInstance()?.uid
const id = computed(() => props.id || `checkbox-${uid}`)
const inputDisabled = computed(()=>{
    return props.disabled 
})

type ModelValueType = boolean | string[];

const emit = defineEmits<{
    (e: 'update:modelValue', value: ModelValueType): void
}>()

const isChecked = computed(() => isArrayValue() ? isArrayIncludes() : props.modelValue || Boolean(props.value))

const toggleValue = () => {
    if (props.disabled) return
    if (isArrayValue()) {
        setArray()
    } else if (typeof props.modelValue === 'boolean') {
        emit('update:modelValue', !props.modelValue)
    }
}

const isArrayIncludes = () => {
    const mass = props.modelValue;
    const value = props.value;

    if (Array.isArray(mass) && typeof value === 'string') {
        return mass.includes(value);
    }
}

// Работаем с массивом, ставим для него значение
const setArray = () => {
    if (Array.isArray(props.modelValue) && typeof props.value === 'string') {
        // copy is array
        const value = props.modelValue.slice(0)
        if (isArrayIncludes()) {
            value.splice(value.indexOf(props.value), 1)
            emit('update:modelValue', value)
        } else {
            value.push(props.value);
            emit('update:modelValue', value)
        }
    }
}

// Если работаем со значением в массиве
const isArrayValue = () => Array.isArray(props.modelValue)

</script>

<style scoped>
.base-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--sc-space-2);
  cursor: pointer;
}

.base-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
}

.base-checkbox__label {
  font-size: var(--sc-text-sm);
  color: var(--sc-color-text);
  cursor: pointer;
  user-select: none;
}

.base-checkbox__icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.base-checkbox__icon i {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.base-checkbox__icon::before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--sc-color-border);
  background-color: var(--sc-color-surface);
  border-radius: var(--sc-radius-sm);
  transition: border-color var(--sc-transition), background-color var(--sc-transition);
}

.base-checkbox:not(.disabled):hover .base-checkbox__icon::before {
  border-color: var(--sc-color-border-hover);
}

.base-checkbox__icon:focus-within::before {
  outline: 2px solid var(--sc-color-primary);
  outline-offset: 2px;
}

/* ── Red theme (default) ── */
.red.checked .base-checkbox__icon::before,
.red.indeterminate .base-checkbox__icon::before {
  border-color: var(--sc-color-danger);
  background-color: var(--sc-color-danger);
}

.red.checked:not(.disabled):hover .base-checkbox__icon::before,
.red.indeterminate:not(.disabled):hover .base-checkbox__icon::before {
  background-color: var(--sc-color-danger-hover);
  border-color: var(--sc-color-danger-hover);
}

/* ── Black theme ── */
.black.checked .base-checkbox__icon::before,
.black.indeterminate .base-checkbox__icon::before {
  border-color: var(--sc-color-text);
  background-color: var(--sc-color-text);
}

/* ── SVG fill ── */
.checked .base-checkbox__icon svg,
.indeterminate .base-checkbox__icon svg {
  fill: var(--sc-color-text-on-primary);
}

/* ── Error ── */
.error .base-checkbox__icon::before {
  border-color: var(--sc-color-danger);
}

/* ── Disabled ── */
.disabled {
  cursor: not-allowed;
}

.disabled .base-checkbox__input {
  cursor: not-allowed;
}

.disabled .base-checkbox__label {
  color: var(--sc-color-placeholder);
  cursor: not-allowed;
}

.disabled .base-checkbox__icon::before,
.disabled.checked .base-checkbox__icon::before,
.disabled.indeterminate .base-checkbox__icon::before {
  border-color: var(--sc-color-border);
  background-color: var(--sc-color-disabled-bg);
}

.disabled .base-checkbox__icon svg {
  fill: var(--sc-color-placeholder);
}
</style>
