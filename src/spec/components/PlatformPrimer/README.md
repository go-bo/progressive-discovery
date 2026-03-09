# Platform Primer Component

Composed layout for platform discovery pages: Hero + Discovery Slot.

## Structure

- **Hero** – PageHeroBanner (title, subtitle, primary action, optional visual)
- **Discovery Slot** – One of three variants (template, capability, unlock)

## Discovery Slot Variants

| Variant | Use Case | Example Pages |
|---------|----------|---------------|
| **template** | "Start with a template" | Reports, Workflow Studio |
| **capability** | "How [feature] works" | Documents, Flow Configuration |
| **unlock** | "This powers [outcome]" | Data Catalog |

## Usage

```tsx
<PlatformPrimer
  hero={{
    title: "Your company's data, organized and discoverable",
    subtitle: "Browse every object...",
    primaryAction: { label: 'Explore', onClick: () => {} },
    visual: <DataCatalogPreview />,
    visualMinWidth: 370,
    visualMaxWidth: 370,
  }}
  discoverySlotVariant="unlock"
  discoverySlotUnlock={{
    category: "The catalog powers your entire data stack",
    categorySubtitle: "From ad-hoc reports...",
    items: DATA_CATALOG_ITEMS,
    iconVariant: "accent",
  }}
/>
```
