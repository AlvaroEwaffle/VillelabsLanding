# Asset Naming Convention — Daniel Reyes Website

> For Frontend Dev: follow this convention when integrating assets into the codebase.

---

## Directory Structure

```
public/clients/daniel-reyes/
├── assets/
│   ├── logos/
│   │   ├── isapres/          # Isapre / health insurance logos
│   │   │   ├── banmedica.svg
│   │   │   ├── colmena.svg
│   │   │   ├── consalud.svg
│   │   │   ├── fonasa.svg
│   │   │   ├── cruz-blanca.svg
│   │   │   └── vida-tres.svg
│   │   └── brand/            # Client brand (Subjetividades)
│   │       ├── subjetividades-isotipo.svg      # Icon only (64x64)
│   │       ├── subjetividades-horizontal.svg   # Icon + text side by side (380x64)
│   │       └── subjetividades-vertical.svg     # Icon on top, text below (200x140)
│   ├── avatars/
│   │   └── avatar-placeholder.svg              # Generic user silhouette (120x120)
│   ├── hero-online.png
│   ├── service-couples.png
│   ├── service-online.png
│   ├── service-sexual.png
│   ├── trust-credentials.png
│   ├── trust-testimonials.png
│   ├── atmosphere-calm.png
│   ├── atmosphere-growth.png
│   ├── atmosphere-office.png
│   └── atmosphere-welcome.png
├── photos/
│   ├── headshot-professional.png
│   ├── welcoming-patient.png
│   ├── clinic-corridor.png
│   ├── garden-portrait.png
│   ├── consultation-session.png
│   ├── at-desk-working.png
│   ├── waiting-room.png
│   ├── couples-therapy-room.png
│   ├── online-therapy-session.png
│   └── credentials-wall.png
├── mockups/
│   ├── mockup-institucional.html   # APPROVED design direction
│   ├── mockup-minimal-clinico.html
│   ├── mockup-bauhaus-moderno.html
│   ├── mockup-conversacional.html
│   ├── guiones-reels.html
│   ├── guiones-reels.md
│   └── paquete-replicable.md
└── docs/
    ├── design-system.md
    └── asset-naming-convention.md  # This file
```

---

## Naming Rules

### General
- **All lowercase**, **kebab-case** (no spaces, no underscores, no camelCase)
- Descriptive names: the file name should tell you what it is without opening it
- No version numbers in file names (use git for versioning)

### Logos
- Pattern: `{brand-name}.svg` or `{brand-name}-{variant}.svg`
- Isapres: use the most common short name (e.g., `cruz-blanca` not `cruzblanca`)
- Brand variants: `{name}-isotipo`, `{name}-horizontal`, `{name}-vertical`

### Photos
- Pattern: `{subject}-{context}.png`
- Examples: `headshot-professional`, `consultation-session`, `waiting-room`

### Assets (illustrations, generated images)
- Pattern: `{category}-{description}.png`
- Categories: `hero-`, `service-`, `trust-`, `atmosphere-`

### Avatars
- Pattern: `avatar-{descriptor}.svg`
- When real photos arrive: `avatar-{first-name}.png` or `team-{first-name}.png`

---

## Integration Notes for Frontend Dev

### SVG Logos — Inline vs Image Tag

**Isapre logos:** Use as `<img>` tag. They are self-contained with background and border:
```html
<img src="/clients/daniel-reyes/assets/logos/isapres/banmedica.svg" alt="Banmedica" width="140" height="56">
```

**Brand logo:** Use as `<img>` in nav/footer. For advanced styling, inline the SVG:
```html
<!-- Nav: horizontal variant -->
<img src="/clients/daniel-reyes/assets/logos/brand/subjetividades-horizontal.svg" alt="Subjetividades" height="48">

<!-- Footer: isotipo only -->
<img src="/clients/daniel-reyes/assets/logos/brand/subjetividades-isotipo.svg" alt="Subjetividades" width="40" height="40">
```

**Avatar placeholder:** Use as `<img>` with circular clip:
```html
<img src="/clients/daniel-reyes/assets/avatars/avatar-placeholder.svg" alt="Equipo clinico" width="120" height="120" style="border-radius: 50%;">
```

### Sizes at a Glance

| Asset | SVG ViewBox | Recommended Display Size |
|-------|-------------|--------------------------|
| Isapre logos | 140 x 56 | 140 x 56 px (1:1 with mockup) |
| Brand isotipo | 64 x 64 | 32-48px in nav, 64px standalone |
| Brand horizontal | 380 x 64 | height 40-56px (auto width) |
| Brand vertical | 200 x 140 | height 100-140px (centered) |
| Avatar placeholder | 120 x 120 | 80-120px, always circular |

### Retina / 2x Note

SVG files are resolution-independent — they scale perfectly on retina displays without needing 2x exports. The existing PNG photos/assets should have 2x versions created for retina when moving to production build.

---

## Color Reference (Quick)

For any new assets, stick to these colors:

| Role | Hex | Where |
|------|-----|-------|
| Primary accent | `#0d9488` | Brand logo, CTAs, highlights |
| Dark text | `#1a2332` | Brand name text |
| Medium text | `#64748b` | Subtitles, descriptions |
| Light bg | `#f8fafc` | Isapre logo backgrounds |
| Border | `#e2e8f0` | Card/logo borders |
| White | `#ffffff` | Icon elements on teal |
