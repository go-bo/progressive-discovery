# FeatureCard

Card component for discovery surfaces. Composed of icon, title, description, and optional actions.

## Variants

- **hero** — Large card with visual panel, for primary features
- **compact** — Smaller card for grids and lists

## Props

- `icon`, `title`, `description` — Required
- `size` — `'hero' | 'compact'` (default: hero)
- `primaryAction`, `secondaryAction` — Optional CTAs
- `visual` — Custom visual for hero (defaults to icon)
- `onClick` — Whole card clickable (compact)

## Used in

- PlatformHubTemplate (hero + compact grid)
- PayrollSkuPage (discover products)
- ExplorePage (via PlatformHubTemplate)
