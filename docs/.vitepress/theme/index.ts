import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './vars.css'
import BaseButton from '../../../src/components/button/base-button.vue'
import BaseInput from '../../../src/components/input/base-input.vue'
import BaseCheckbox from '../../../src/components/checkbox/base-checkbox.vue'
import BaseLabel from '../../../src/components/label/base-label.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
    app.component('BaseButton', BaseButton)
    app.component('BaseInput', BaseInput)
    app.component('BaseCheckbox', BaseCheckbox)
    app.component('BaseLabel', BaseLabel)
  },
} satisfies Theme
