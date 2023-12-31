import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
    },
  },
  plugins: [vue()],
  base: '/techbodia_assignment_gh/'
})
