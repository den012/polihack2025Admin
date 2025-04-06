import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://255b-188-27-128-167.ngrok-free.app",
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
