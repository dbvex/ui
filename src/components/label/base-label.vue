<template>
    <transition name="base-label-fade">
        <span
            :class="[
                'base-label'
            ]"
            :style="labelStyles"
        >
            <slot>{{ value }}</slot>
        </span>
    </transition>
</template>

<script setup name="base-label" lang="ts">
import { computed } from 'vue'

interface Props {
    value?: string,
    backgroundColor?: string,
    textColor?: string
}
const props = withDefaults(defineProps<Props>(), {
    value: '',
    backgroundColor: 'blue-grey-200',
    textColor: 'blue-grey-1200'
})

const labelStyles = computed(() => ({
    backgroundColor: `var(--${props.backgroundColor})`,
    color: `var(--${props.textColor})`
}))
</script>

<style lang="less">
.base-label {
    height: 24px;
    border-radius: 12px;
    padding: 4px 8px;
    gap: 10px;
    font-size: 12px;
    text-align: center;
}
</style>