import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages serves this repo under /ph-main-website/ (set VITE_BASE in CI).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
