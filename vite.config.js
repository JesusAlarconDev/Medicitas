import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Redirige cualquier ruta que empiece con '/api'
      '/api': {
        target: 'http://localhost:3005', // La URL de tu backend
        changeOrigin: true, // Importante para la virtualización
        secure: false, // Puedes dejarlo en false en desarrollo local
      },
    },
  },
})