import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In local dev, forward /api/* to the live HF Space backend.
      // This mirrors the Vercel serverless function routing in production.
      '/api': {
        target: 'https://tokitahmidornob-biofold-engine.hf.space',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})

