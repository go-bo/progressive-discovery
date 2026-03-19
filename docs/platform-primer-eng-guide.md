# Platform Primer — Engineering Quick Reference

> **What is it?** A composable page-level component that introduces platform features to admins. It renders a **Hero** (headline + CTA + optional visual) above a **Discovery Slot** (contextual content row) and is controlled at runtime by a Scenario HUD.

---

## Component Tree (top → bottom)

```
PlatformPrimer                       ← orchestrator (src/spec/components/PlatformPrimer/)
├── PageHeroBanner                   ← hero zone (or ActionCard in action-card mode)
│   ├── eyebrow?                     ← app icon + name (full-page primers only)
│   ├── title + subtitle
│   ├── primaryAction (Button)
│   └── visual? (side-by-side)       ← e.g. DataCatalogVisual, ReportsVisual
│
├── DiscoverySlot (one of):
│   ├── DiscoverySlotTemplate        ← "Start with a template" recipe cards
│   ├── DiscoverySlotCapability      ← "How [feature] works" feature detail cards
│   └── DiscoverySlotUnlock          ← "This powers [outcome]" feature grid (FeatureCardGrid)
│
└── DiscoverySlotSecondary?          ← optional second row of related links
```

---

## Key Files — Where to Find What

| What you need | File | Lines |
|---|---|---|
| **Spec component** (props, rendering, slot switching) | `src/spec/components/PlatformPrimer/PlatformPrimer.tsx` | ~195 |
| **Hero banner** (layout, title sizing, visual placement) | `src/spec/components/PageHeroBanner/PageHeroBanner.tsx` | ~180 |
| **Template slot** (recipe cards) | `src/spec/components/PlatformPrimer/DiscoverySlotTemplate.tsx` | |
| **Capability slot** (feature detail + modal) | `src/spec/components/PlatformPrimer/DiscoverySlotCapability.tsx` | |
| **Unlock slot** (feature card grid) | `src/spec/components/PlatformPrimer/DiscoverySlotUnlock.tsx` | |
| **Secondary discovery** | `src/spec/components/PlatformPrimer/DiscoverySlotSecondary.tsx` | |
| **Compact module** (inline primer for non-primary tabs) | `src/spec/components/PlatformPrimer/PrimerCompactModule.tsx` | |
| **Feature card + modal** | `src/spec/components/FeatureCard/` and `FeatureCardDetailModal/` | |
| **All page content configs** (hero copy, recipes, visuals) | `src/product-screens/platform/primer-configs.tsx` | ~1,280 |
| **Page renderer** (wires config → component) | `src/product-screens/platform/PlatformPrimerPage.tsx` | ~408 |
| **Data overview page** (standalone primer usage) | `src/product-screens/platform/PlatformPrimerDataPage.tsx` | ~226 |
| **Empty state system** (non-primer pages) | `src/product-screens/platform/PlatformEmptyState.tsx` | ~852 |
| **HUD controls** (runtime toggles) | `src/framework/user-model/ScenarioHUD.tsx` | ~324 |
| **User state types** | `src/framework/user-model/types.ts` | ~28 |

---

## Props at a Glance

### `<PlatformPrimer>`

```typescript
interface PlatformPrimerProps {
  hero: {
    title: string;
    subtitle: string;
    primaryAction?: { label: string; onClick?: () => void };
    secondaryText?: string;
    eyebrow?: ReactNode;              // app icon badge (full-page mode)
    visual?: ReactNode;               // side illustration component
    layout?: 'side-by-side' | 'stacked';
    titleSize?: 'display' | 'title';
    visualMinWidth?: number;
    visualMaxWidth?: number;
  };

  // Which discovery row to render
  discoverySlotVariant: 'template' | 'capability' | 'unlock';

  // Content for each slot (provide all three; only the active variant renders)
  discoverySlotTemplate?: { linkLabel: string; recipes: TemplateRecipe[]; onViewAll?: () => void };
  discoverySlotCapability?: { separatorLabel: string; features: FeatureCardDetailConfig[]; onCta?: () => void };
  discoverySlotUnlock?: { category: string; categorySubtitle?: string; items: FeatureCardGridItem[]; iconVariant?: 'neutral' | 'accent' };

  secondaryDiscovery?: { label: string; items: SecondaryDiscoveryItem[] };

  // Hero presentation: full hero banner vs compact ActionCard
  heroPresentationMode?: 'hero' | 'action-card';
  heroIcon?: string;                  // Icon.TYPES.* for action-card mode
  size?: 'sm' | 'md' | 'lg';
}
```

---

## How the Three Variants Work

| Variant | When to use | What renders | Content shape |
|---|---|---|---|
| **`template`** | Page has starter templates (Reports, Workflows) | Recipe cards in a row + "Start with a template" link | `TemplateRecipe[]` — icon, title, description, optional requiredSku |
| **`capability`** | Feature education (Documents, Flow Config) | Feature cards with click-to-expand detail modals | `FeatureCardDetailConfig[]` — icon, title, description, modalDescription, benefits[], ctaLabel |
| **`unlock`** | Show what the platform enables (Data Catalog) | Feature grid with action buttons | `FeatureCardGridItem[]` — icon, title, description, primaryAction |

The active variant is set by `discoverySlotVariant`. In the prototype, the Scenario HUD overrides this at runtime. In production, the backend would determine it based on lifecycle phase + purchased products.

---

## Hero Presentation Modes

| Mode | Behavior |
|---|---|
| **`hero`** (default) | Full `PageHeroBanner` — large title, subtitle, CTA, optional side visual |
| **`action-card`** | Collapsed into a Pebble `ActionCard` — icon + title + caption + CTA. Used when the page has its own content and the primer is secondary |

Controlled by `heroPresentationMode` prop. The HUD exposes this toggle on Platform Primer routes.

---

## How Content Gets to the Component

```
primer-configs.tsx          →  PlatformPrimerPage.tsx        →  <PlatformPrimer />
(PRIMER_PAGE_CONFIGS map)      (reads config by pageId,         (renders hero + slot)
                                wires to props)
```

Each page ID (e.g. `'reports'`, `'data-catalog'`, `'documents'`) has a `PrimerPageConfig` entry:

```typescript
interface PrimerPageConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondaryText?: string;
  fullPage?: boolean;                    // shows app eyebrow
  fullPageTitle?: string;
  defaultVariant: DiscoverySlotVariant;  // which slot renders by default
  defaultHeroPresentationMode?: HeroPresentationMode;
  template?: { ... };                    // template slot content
  capability?: { ... };                  // capability slot content
  unlock?: { ... };                      // unlock slot content
  secondaryDiscovery?: { ... };          // optional second row
}
```

---

## Pebble Components Used

| Pebble component | Where it appears |
|---|---|
| `Button` | Hero CTA, feature card actions |
| `Button.Icon` | FTUX dismiss, close actions |
| `ActionCard` | `action-card` hero mode |
| `Icon` (with `Icon.TYPES.*`) | All iconography — eyebrows, cards, visuals |
| `Label` | Status badges, tags |
| `TableBasic` | Reports "Shared with me" tab |
| `Input` | Search/filter in empty states |
| `Separator` | Visual dividers |
| `Animation` | Transitions in empty states |

All colors, spacing, typography, and radii use **Pebble theme tokens** — never hardcoded values.

---

## Decision Flowchart: Which Component Do I Touch?

```
Need to...
│
├─ Change hero copy or CTA text?
│  → primer-configs.tsx (find the page ID key in PRIMER_PAGE_CONFIGS)
│
├─ Change template recipes / capability features / unlock items?
│  → primer-configs.tsx (template / capability / unlock objects in the config)
│
├─ Change how the hero banner renders?
│  → PageHeroBanner.tsx (layout, sizing, visual placement)
│
├─ Change how discovery slots render?
│  → DiscoverySlot[Template|Capability|Unlock].tsx
│
├─ Change the overall page composition (hero + slot + secondary)?
│  → PlatformPrimer.tsx (the orchestrator)
│
├─ Change which variant / mode shows by default for a page?
│  → primer-configs.tsx (defaultVariant, defaultHeroPresentationMode)
│
├─ Add a new page to the primer system?
│  → 1. Add config entry in primer-configs.tsx
│  → 2. Add visual component if needed (in same file)
│  → 3. Register page ID in platformPages.ts
│
├─ Change the HUD controls?
│  → ScenarioHUD.tsx
│
└─ Change the ActionCard (collapsed) presentation?
   → PlatformPrimer.tsx (search for 'action-card' rendering block)
```

---

## Running Locally

```bash
node node_modules/vite/bin/vite.js --port 4201
```

Navigate to the **Platform Primer** route, then use the **Scenario Controls** HUD (bottom-right) to toggle lifecycle phase, hero presentation mode, and discovery row variant.
