import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy': {
        target: 'https://api.1mountain.site/api',
        changeOrigin: true,
        secure: false,
        ws: false, 
        timeout: 5000,
        proxyTimeout: 5000,
      }
    }
  }
})
