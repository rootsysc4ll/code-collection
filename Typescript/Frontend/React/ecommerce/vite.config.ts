import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import target from "./customDev"
// const target = 'http://192.168.0.103:3000'
const target = 'http://localhost:3000'

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