import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { readTrackingConfig, trackingHead } from './tracking/snippet.ts'

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// protocols/conditions/ (index) and protocols/conditions/<slug>/ pages are written by scripts/generate-condition-pages.mjs.
const conditionPages = Object.fromEntries(
  ['', ...(existsSync(fromRoot('./protocols/conditions')) ? readdirSync(fromRoot('./protocols/conditions')) : [])]
    .filter((slug) => existsSync(fromRoot(`./protocols/conditions/${slug}/index.html`)))
    .map((slug) => [`conditions-${slug || 'index'}`, fromRoot(`./protocols/conditions/${slug}/index.html`)]),
)

// GitHub Pages serves this repo under /ph-main-website/ (set VITE_BASE in CI).
export default defineConfig(({ mode }) => {
  const tracking = trackingHead(readTrackingConfig(loadEnv(mode, process.cwd(), 'VITE_')))
  return {
  base: process.env.VITE_BASE ?? '/',
  plugins: [
    react(),
    tailwindcss(),
    // Consent defaults on every page; the GTM / GA4 / Meta loaders too when VITE_TRACKING=on.
    { name: 'tracking-head', transformIndexHtml: () => [{ tag: 'script', injectTo: 'head-prepend', children: tracking.replace(/^<script>|<\/script>$/g, '') }] },
  ],
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
        tnc: fromRoot('./tnc/index.html'),
        privacy: fromRoot('./privacy/index.html'),
        refundpolicy: fromRoot('./refund-policy/index.html'),
        contact: fromRoot('./contact/index.html'),
        teamsupport: fromRoot('./team-support/index.html'),
        ...conditionPages,
      },
    },
  },
}
})
