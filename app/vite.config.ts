import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.VITE_API_URL || "http://localhost:3001",
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
