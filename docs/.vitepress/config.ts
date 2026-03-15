import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  title: '@dbvex/ui',
  description: 'Vue 3 UI component library',
  base: '/ui/',
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
        text: 'Examples',
        items: [
          { text: 'Registration Form', link: '/examples/form' },
          { text: 'Theming', link: '/examples/theming' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'BaseButton', link: '/components/button' },
          { text: 'BaseInput', link: '/components/input' },
          { text: 'BaseSelect', link: '/components/select' },
          { text: 'BaseCheckbox', link: '/components/checkbox' },
          { text: 'BaseLabel', link: '/components/label' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbvex/ui' },
    ],
  },
})
