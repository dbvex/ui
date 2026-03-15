import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts'],
      outDir: 'dist/types',
      staticImport: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude],
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedComponents',
      fileName: (format) => `ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
