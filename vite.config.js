import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/PYMIA---CADELI/',
  build: {
    modulePreload: { polyfill: true },
    rollupOptions: {
      output: { charset: 'utf8' },
    },
  },
})
