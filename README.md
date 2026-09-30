# ph-main-website

Praan Health marketing website (homepage rebuild). Vite + React + TypeScript, plain CSS with design tokens.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where things live

- `src/content/site.ts` — all homepage copy, links and placeholders (search for `TODO`)
- `src/sections/` — Hero, HowWeHelp, Protocols, Clinics, Nutrition, DailyMovement
- `src/styles/tokens.css` — colours, type scale, spacing, radii (source of truth)
- `docs/DESIGN_SYSTEM.md` — design system reference and the brand decisions taken

## Open items

- Real Cal.com booking link (`CAL_URL`), graduation %, specialities and Health Pass benefits need confirming
- Nutrition product shots and Navneeth (Daily Movement) imagery are placeholders
- Inner pages (`/protocols`, `/clinics`, `/health-pass`, product pages) are linked but not built
