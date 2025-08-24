import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // FÜGE DIESE ZEILE HINZU:
  base: '/Galaxy-fall2/', 

  plugins: [react()],
})