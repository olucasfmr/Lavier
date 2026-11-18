import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': the built page opens from any folder; assetsDir 'build' keeps Vite's hashed files apart
// from public/assets, where the design kit (system.css, motion, moments) lives as plain files.
// '@' points at src, so shared UI imports read '@/components/ui/...'.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  // two entries: index.html (React, used only by the prerender and dev) and src/client.jsx, the one
  // script the built page keeps (smooth scroll + parallax); the manifest tells the prerender its files
  build: {
    assetsDir: 'build',
    manifest: true,
    rollupOptions: { input: { index: fileURLToPath(new URL('./index.html', import.meta.url)), client: fileURLToPath(new URL('./src/client.jsx', import.meta.url)) } },
  },
})
