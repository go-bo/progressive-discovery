# CapabilityItem

Icon + title + description list item for platform capabilities. Used in right rail widgets, settings lists, and discovery surfaces.

## Variants

**Size:** `compact` (18px icon, dense) | `default` (36px) | `relaxed` (40px)
**Icon:** `neutral` (gray container) | `accent` (primary container) | `bare` (no container, compact only)
**Trailing:** `chevron` | custom ReactNode (e.g. Button)

## Usage

```tsx
<CapabilityItem
  icon={Icon.TYPES.USERS_OUTLINE}
  title="Headcount by department"
  description="Current employee count broken down by department"
/>
```
