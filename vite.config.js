import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'frontend-shared',
          fileName: (format) => `frontend-shared.${format}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
    }
})
