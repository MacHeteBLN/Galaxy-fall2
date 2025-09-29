import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      // Jede Anfrage, die mit /api beginnt...
      '/api': {
        // ...wird an dein Backend auf Port 3000 weitergeleitet.
        target: 'http://localhost:3000',
        // Dies ist wichtig, damit die Anfrage korrekt ankommt.
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        // Diese Zeilen sorgen für einzigartige Dateinamen bei jedem Build
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
})