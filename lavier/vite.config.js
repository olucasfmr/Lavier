import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': the built page opens from any folder; assetsDir 'build' keeps Vite's hashed files apart
// from public/assets, where the design kit (system.css, motion, moments) lives as plain files.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { assetsDir: 'build' },
})
