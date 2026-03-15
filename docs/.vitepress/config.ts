import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'shared-components',
  description: 'Vue 3 UI component library',
  base: '/shared-components/',
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
