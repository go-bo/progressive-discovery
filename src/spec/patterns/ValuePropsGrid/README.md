# ValuePropsGrid Pattern

Section-level pattern: uppercase section label + optional subtitle, then a 2- or 3-column grid of value props (icon + title + description). Uses CapabilityItem with `size="valueProp"` for larger, more prominent items.

Use for "PAYROLL INCLUDES", "What's included", product capability lists, and feature overview sections on unpurchased SKU pages.

## Usage

```tsx
<ValuePropsGrid
  title="Payroll includes"
  items={[
    {
      icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
      title: 'Auto-sync approved hours',
      description: 'Approved timecards flow directly into your payrun—no CSV exports, no manual entry.',
    },
    // ...
  ]}
  columns={2}
  iconVariant="warm"
/>
```

## Props

- **title** (required) — Uppercase section label
- **subtitle** (optional) — Supporting copy below the title
- **items** (required) — Array of `{ icon, title, description }`
- **columns** — `2` (default) or `3`
- **iconVariant** — `'neutral'` | `'accent'` | `'warm'` (default: warm for unpurchased SKU sections)
