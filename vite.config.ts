import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    // Prevents inline tests from being included in production bundle
    'import.meta.vitest': 'undefined'
  },
  test: {
    includeSource: ['src/**/*.ts', 'src/**/*.vue'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/_utils.scss";'
      }
    }
  }
})
