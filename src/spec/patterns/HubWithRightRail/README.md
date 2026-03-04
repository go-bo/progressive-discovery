# HubWithRightRail Pattern

Section-level pattern: main content area with an optional right rail (300px). Used for platform hub pages (e.g. Data, Tools, Company Settings) where hero features coexist with sidebar widgets.

The **page** owns `DiscoveryPageLayout`. This pattern renders only the hub content (header + main + rail). For card grids below the hub, use **FeatureCardGrid** as children.

## Usage

```tsx
import { DiscoveryPageLayout, PlatformHubTemplate, FeatureCardGrid, HubWidget, HubWidgetTitle } from '@/spec';

<DiscoveryPageLayout size="lg">
  <PlatformHubTemplate title="Tools" subtitle="..." heroFeatures={...} rightRail={...}>
    <FeatureCardGrid category="Productivity" items={[...]} />
    <FeatureCardGrid category="Administration" items={[...]} />
  </PlatformHubTemplate>
</DiscoveryPageLayout>
```

## API

- **PlatformHubTemplate** — Hub layout only: `title`, `subtitle`, `heroFeatures`, `rightRail`, `tabs`, `children` (e.g. FeatureCardGrid instances). Does not wrap in DiscoveryPageLayout—the page must provide it.
- **HubWidget**, **HubWidgetHeader**, **HubWidgetTitle**, **HubWidgetDesc**, **HubWidgetLink**, **HubWidgetAccent** — Styled primitives for right rail structure. Use `HubWidgetHeader` to wrap title + desc for 8px spacing between them.
- **CapabilityItem** — Use for list items inside widgets (icon + title + description).
