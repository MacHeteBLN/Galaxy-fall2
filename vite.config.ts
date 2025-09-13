import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ÄNDERE DIESE ZEILE:
  base: '/', 

  plugins: [react()],
})