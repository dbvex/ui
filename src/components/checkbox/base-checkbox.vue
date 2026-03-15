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

<style lang="less">
.base-checkbox {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: left;
    margin-left: 5px;
    margin-right: 5px;

    &__input {
        position: absolute;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        width: 20px;
        margin: 0;
    }

    &__label {
        cursor: pointer;
        width: 100%;
        padding-left: 16px;
    }

    &__icon {
        display: inline-flex;
        align-items: center;
        user-select: none;

        & i {
            position: absolute;
            padding: 4px;
        }

        &::before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            flex-grow: 0;
            border: 1px solid var(--blue-grey-400);
            background-color: var(--white-100);
            border-radius: 4px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 60% 60%;
        }

        &:hover::before {
            border: 1px solid var(--blue-grey-1500);
        }

        &:focus-within::before {
            outline: 2px solid var(--cold-red-1200);
            outline-offset: 2px;
        }
    }

}

.black .base-checkbox__icon:focus-within::before {
    outline-color: var(--blue-grey-1700);
}

.disabled.red .base-checkbox__icon::before,
.disabled.black .base-checkbox__icon::before {
    border-color: var(--blue-grey-400);
    background-color: var(--blue-grey-200);
}

.indeterminate .base-checkbox__icon::before {

}

.checked.red .base-checkbox__icon::before,
.indeterminate.red .base-checkbox__icon::before {
    border-color: var(--cold-red-1200);
    background-color: var(--cold-red-1200);
}

.checked.black .base-checkbox__icon::before,
.indeterminate.black .base-checkbox__icon::before {
    border-color: var(--blue-grey-1700);
    background-color: var(--blue-grey-1700);
}

.checked .base-checkbox__icon svg,
.indeterminate .base-checkbox__icon svg {
    fill: var(--white-100);
}

.error .base-checkbox__icon::before {
    border-color: var(--cold-red-1100);
}

.checked.red .base-checkbox__icon:hover::before,
.indeterminate.red .base-checkbox__icon:hover::before {
    background-color: var(--cold-red-1300);
}

.checked.black .base-checkbox__icon:hover::before,
.indeterminate.black .base-checkbox__icon:hover::before {
    background-color: var(--dark-blue-1900);
}

.disabled.checked.red .base-checkbox__icon::before,
.disabled.indeterminate.red .base-checkbox__icon::before,
.disabled.checked.black .base-checkbox__icon::before,
.disabled.indeterminate.black .base-checkbox__icon::before {
    border-color: var(--blue-grey-400);
    background-color: var(--blue-grey-200);
}

.disabled .base-checkbox__icon svg {
    fill: var(--blue-grey-400);
}

</style>
