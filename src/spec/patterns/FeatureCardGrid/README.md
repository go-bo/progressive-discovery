# FeatureCardGrid Pattern

Section-level pattern: optional category label + subtitle, then a 3-column grid of compact FeatureCards.

Use for "Discover more" surfaces, tool grids, and categorized feature lists. Composes with HubWithRightRail — the hub provides the hero + right rail, then one or more FeatureCardGrid instances follow.

## Usage

```tsx
<DiscoveryPageLayout>
  <HubWithRightRail title="..." subtitle="..." heroFeatures={...} rightRail={...} />
  <FeatureCardGrid
    category="Productivity"
    categorySubtitle="Stay on top of tasks and approvals"
    items={[{ id: 'inbox', icon: '...', title: 'Inbox', description: '...', primaryAction: {...} }, ...]}
  />
  <FeatureCardGrid category="Administration" categorySubtitle="..." items={[...]} />
</DiscoveryPageLayout>
```
