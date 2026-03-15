import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  title: 'shared-components',
  description: 'Vue 3 UI component library',
  base: '/shared-components/',
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    nav: [{ text: 'Components', link: '/components/' }],
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'BaseButton', link: '/components/button' },
          { text: 'BaseInput', link: '/components/input' },
          { text: 'BaseCheckbox', link: '/components/checkbox' },
          { text: 'BaseLabel', link: '/components/label' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bizhev/shared-components' },
    ],
  },
})
