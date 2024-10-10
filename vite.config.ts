import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/site/docs/',
  base: '/AI-Page1/',
  plugins: [react()],
  build: {
    outDir: "docs"
  }
})
