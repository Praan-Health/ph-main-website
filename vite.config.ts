import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// GitHub Pages serves this repo under /ph-main-website/ (set VITE_BASE in CI).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // The Protocols page is ported from a Next.js app; these stand in for next/*.
      { find: 'next/link', replacement: fromRoot('./src/protocols/shims/link.tsx') },
      { find: 'next/image', replacement: fromRoot('./src/protocols/shims/image.tsx') },
      { find: 'next/navigation', replacement: fromRoot('./src/protocols/shims/navigation.ts') },
      { find: /^@\//, replacement: fromRoot('./src/protocols/') },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: fromRoot('./index.html'),
        protocols: fromRoot('./protocols/index.html'),
        clinics: fromRoot('./clinics/index.html'),
        about: fromRoot('./about/index.html'),
      },
    },
  },
})
