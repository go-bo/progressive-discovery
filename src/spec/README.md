# Design Spec

Reusable components, patterns, and templates for the progressive discovery framework.

## Structure

- **components/** — Smallest reusable pieces (FeatureCard, PageHeroBanner, DiscoveryPageLayout)
- **patterns/** — Section-level compositions (HubWithRightRail, FeatureCardGrid)
- **templates/** — Full-page layouts (UnpurchasedSkuPage, PlatformEmptyState, FeatureActivation)

Prototypes in `product-screens/` and `scenarios/` consume the spec via `@/spec` or `product-screens/shared` re-exports.
