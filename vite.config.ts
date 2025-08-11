import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Dies ist die magische Zeile!
  // Sie sagt Vite, es soll relative Pfade verwenden.
  base: './',
})