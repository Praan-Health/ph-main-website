# Praan Health Website — Design System Reference

Source of truth in code: `src/styles/tokens.css`. Derived from the brandbook (`praan-brand` skill) and an audit of the previous praan.health (Webflow) on 2026-09-29. Where the two disagreed, the **brandbook wins**.

## Decisions taken (drift resolved)
| Topic | Old site | Brandbook | **Now** |
|---|---|---|---|
| Care Linen | `#F7F7F0` (cool) | `#F6E9E0` (warm) | **`#F6E9E0`** |
| Blue | `#2F387F` / `#303880` | `#303880` | **`#303880`** (one blue, per brandbook) |
| Font | Aeonik (all) | Aeonik + Archivo | **Aeonik throughout** (swappable later — single `--font-sans` token) |
| Accent serif | Libre Baskerville Italic | — | **Kept**, one word per headline (`.accent`) |
| Body text | `#475569` slate | Soft Charcoal | **`#4A4F63`** (`--ink-body`) |

## Colour
| Token | Hex | Use |
|---|---|---|
| `--orange` | `#FD7118` | Primary CTA, accents, announcement bar, eyebrows |
| `--orange-hover` / `--orange-soft` | `#F06B17` / `#FE9C5D` | Hover; gradient stops (Nutrition banner) |
| `--blue` | `#303880` | Headings, secondary buttons, dark sections |
| `--blue-deep` | `#171A3A` | Footer |
| `--linen` | `#F6E9E0` | Alternate section background, cards |
| `--white` | `#FFF` | Base background, inverse button |
| `--teal` | `#63C5B8` | Reserved for positive/success metrics |
| `--orange-50/100/200` | `#FFF1E8 / #FFE7D6 / #FED7AA` | Tints, tags, offset shadow |
| `--ink-body` | `#4A4F63` | Body copy |

**Accessibility:** white on `#FD7118` is ~2.9:1 — fine for large/bold text and buttons ≥ 18px, **not** for small body copy. On the orange Nutrition banner keep supporting text ≥ 18px or use `--blue-deep`.

## Typography
- **Aeonik** 300/400/500/700 (`public/fonts`). Headlines Regular (400), UI/H3/buttons Medium (500).
- **Libre Baskerville Italic** for the single accent word.
- Tracking: headings `-0.03em`, body `-0.01em`, eyebrow `+0.08em` uppercase.
- Fluid scale (`clamp`): display 2.75→5.25rem · h1 2.25→4 · h2 1.875→2.75 · h3 1.25→1.5 · lead 1.06→1.25 · body 1 · small 0.875.

## Layout & spacing
- Container max 72rem, fluid gutter 1.125→3rem.
- Section padding `clamp(4rem → 7.5rem)`.
- Section rhythm alternates: white → linen → white → **blue** → **orange** → linen → footer (deep blue).
- Breakpoints: nav collapses ≤ 860px; two-column layouts start at 900px.

## Shape & elevation
- Radius: buttons pill · cards 28px (`--r-lg`) · inner tiles 16px · chips pill.
- Near-flat. `--shadow-soft`, plus the signature `0 3px 0 orange-200` offset under primary buttons.

## Components
`Button` (primary · secondary · inverse · ghost) · `Header` (announcement bar + sticky nav, mobile drawer) · `Footer` · chips · cards · rotating-word hero.

## Sections (homepage order)
1. Hero — blanket headline, rotating condition word, "Talk to an advisor" (Cal)
2. How Praan helps — Protocols / Clinics / Nutrition
3. Protocols — CTAs, care team, delivery facts, Strength in numbers
4. Clinics — CTAs, specialities, Health Pass block
5. Nutrition — full-width orange contrast banner, 2 products
6. Daily movement with Navneeth
7. Footer

## Content & asset TODOs
- `CAL_URL` in `src/content/site.ts` — real Cal.com link.
- Graduation % (`XX%`), specialities list, Health Pass benefits — need confirmation.
- Nutrition product shots and Navneeth imagery — placeholders.
- Pillar and hero images are reused from the old site (`public/assets`); Aeonik files copied from existing repos.
- Inner pages (`/protocols`, `/clinics`, `/health-pass`, product pages) are linked but not built.
