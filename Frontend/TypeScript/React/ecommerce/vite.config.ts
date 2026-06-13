import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const target = process.argv.slice(2)[0] || "http://localhost:3000"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target
      },
      '/images': {
        target
      }
    }
  }
})