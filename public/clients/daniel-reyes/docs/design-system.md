# Subjetividades Centro Psicologica Clinica — Design System

> Extracted from mockup-institucional.html. Source of truth for all Daniel Reyes website assets.

---

## Color Palette

### Primary — Slate (Neutrals)

| Token | Hex | Usage |
|-------|-----|-------|
| `--slate-900` | `#1a2332` | Headings, nav brand name, strong text |
| `--slate-800` | `#243044` | Secondary headings |
| `--slate-700` | `#334155` | Body text (default) |
| `--slate-600` | `#475569` | Secondary body text, mobile menu links |
| `--slate-500` | `#64748b` | Nav links, descriptions, isapre logo text |
| `--slate-400` | `#94a3b8` | Muted text, meta info |
| `--slate-300` | `#cbd5e1` | Borders (hover state), dividers |
| `--slate-200` | `#e2e8f0` | Borders (hover), subtle dividers |
| `--slate-100` | `#f1f5f9` | Nav border, section dividers, card borders |
| `--slate-50`  | `#f8fafc` | Card backgrounds, isapre logo bg |

### Accent — Teal

| Token | Hex | Usage |
|-------|-----|-------|
| `--teal-700` | `#0f766e` | CTA hover state |
| `--teal-600` | `#0d9488` | **Primary accent** — CTAs, nav brand sub, buttons, links |
| `--teal-500` | `#14b8a6` | Lighter accent (badges, icons) |
| `--teal-100` | `#ccfbf1` | Light teal backgrounds |
| `--teal-50`  | `#f0fdfa` | Teal tinted surface |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--white` | `#ffffff` | Page background, nav bg |
| `--warm-white` | `#fafbfc` | Subtle warm surfaces |
| `--bg-light` | `#f7f8fa` | Section alternate background |

---

## Typography

### Font Family

**Primary:** `DM Sans` (Google Fonts)
**Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Type Scale

| Element | Size | Weight | Color | Letter Spacing |
|---------|------|--------|-------|----------------|
| Nav brand name | 16px | 700 | slate-900 | -0.01em |
| Nav brand subtitle | 11px | 500 | teal-600 | 0.04em |
| Nav links | 14px | 500 | slate-500 | 0.01em |
| Section eyebrow | 13px | 600 | teal-600 | 0.08em (uppercase) |
| Section title (h2) | 28px (desktop) / 24px (mobile) | 700 | slate-900 | -0.02em |
| Hero h1 | 48px (desktop) / 32px (mobile) | 700 | white | -0.02em |
| Hero subtitle | 18px (desktop) / 16px (mobile) | 400 | white (0.85 opacity) | normal |
| Body text | 15px | 400 | slate-700 | normal |
| Card text | 15px | 400 | slate-600 | normal |
| Button text | 15px | 600 | white | 0.01em |
| Footer text | 14px | 400 | slate-400 | normal |
| Isapre logo text | 13px | 600 | slate-500 | normal |

### Line Heights

- Body: `1.65`
- Headings: `1.2` to `1.35`
- Hero subtitle: `1.6`

---

## Spacing

### Container

- Max width: `1140px`
- Side padding: `24px` (all breakpoints)

### Sections

- Section padding: `80px 24px` (desktop) / `56px 24px` (mobile)
- Isapre section: `56px 24px`
- Hero: `120px 24px 80px` (accounts for fixed nav)

### Components

| Element | Spacing |
|---------|---------|
| Section eyebrow → title | `8px` |
| Section title → content | `48px` (grid sections) / `16px` (text sections) |
| Card gap | `24px` |
| Nav link gap | `32px` |
| Isapre logo gap | `16px` |
| Button padding | `10px 22px` (nav) / `16px 36px` (hero) / `14px 32px` (sections) |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `10px` | Cards, isapre logos, general containers |
| `--radius-lg` | `14px` | Larger cards, image containers |
| `--radius-xl` | `20px` | Hero overlays, feature cards |
| Button radius | `8px` | All buttons |
| Image radius | `14px` / `10px` | Photos, thumbnails |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(26,35,50,0.06)` | Scrolled nav, card hover |
| `--shadow-md` | `0 4px 16px rgba(26,35,50,0.08)` | Mobile menu, medium cards |
| `--shadow-lg` | `0 8px 32px rgba(26,35,50,0.1)` | Floating elements, modals |

---

## Components

### Navigation

- Height: `72px`
- Background: `rgba(255,255,255,0.95)` with `blur(16px)` backdrop filter
- Border: `1px solid slate-100` (bottom)
- Scrolled state: adds `--shadow-sm`
- Mobile breakpoint: `768px` (hamburger replaces links)

### Buttons

**Primary (teal):**
- Background: `teal-600`
- Hover: `teal-700` + `translateY(-1px)`
- Text: white, 15px, 600 weight
- Radius: `8px`

**Secondary (outline):**
- Background: transparent
- Border: `2px solid white` (on dark) / `2px solid teal-600` (on light)
- Hover: fill background

### Cards (Service/Pricing)

- Background: `white`
- Border: `1px solid slate-100`
- Radius: `--radius-lg` (14px)
- Hover: `--shadow-md` + `translateY(-3px)`
- Padding: `32px`

### Isapre Logo Containers

- Width: `140px`
- Height: `56px`
- Background: `slate-50`
- Border: `1px solid slate-100`
- Radius: `10px`
- Hover: border `slate-200` + `--shadow-sm`
- Text: `13px`, weight 600, `slate-500`

---

## Breakpoints

| Name | Max Width | Key Changes |
|------|-----------|-------------|
| Tablet | `768px` | Nav → hamburger, grid → single column, hero text smaller |
| Mobile | `480px` | Further size reductions, tighter spacing |

---

## Image Guidelines

### Photos

- Format: PNG (current) — migrate to WebP for production
- Hero image: full-bleed with gradient overlay (`rgba(26,35,50,0.72)` to `rgba(26,35,50,0.55)`)
- Section images: `border-radius: 14px`, contained within grid
- Team photos: circular crop recommended, or `border-radius: 10px`

### Icons

- Style: Inline SVG
- Stroke width: `2px`
- Color: inherits from parent (typically `teal-600` or `slate-500`)
- Size: `20px` within `40px` container circles

---

## Animation & Transitions

- Color transitions: `0.2s`
- Transform transitions: `0.2s` (buttons: `translateY(-1px)`)
- Card hover: `0.3s` (shadow + transform)
- Nav scroll: `0.3s` (box-shadow)
- FAQ accordion: `0.4s ease` (max-height)
- Scroll behavior: `smooth` (CSS)
