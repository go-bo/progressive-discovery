# Platform Primer — Product & Design Spec

**Status:** Working prototype  
**Audience:** Engineering  
**Last updated:** March 2026

---

## What is a Platform Primer?

A Platform Primer is a composable page-level component that introduces a product area to users who haven't engaged with it yet. It replaces the default empty state or data view with structured educational content designed to drive first engagement.

The key design principle: **primers are not marketing pages.** They're functional onramps. The CTA behaves like a dismiss — once a user taps through, the primer goes away and the product surface appears underneath.

---

## Composition Model

A Platform Primer is assembled from **two primary slots** stacked vertically, plus optional modifiers:

```
┌──────────────────────────────────────────────┐
│  HERO SLOT                                   │
│  (one of N presentation modes)               │
├──────────────────────────────────────────────┤
│  DISCOVERY SLOT                              │
│  (one of 3 variants)                         │
├──────────────────────────────────────────────┤
│  SECONDARY DISCOVERY (optional)              │
│  (compact supplemental strip)                │
└──────────────────────────────────────────────┘
```

Each slot is independently configurable per page. The same underlying component renders every primer — only the content and slot selections change.

---

## Slot 1: Hero

The hero is the primary message block. It answers: **"What is this, and what should I do?"**

### Presentation Modes

The hero slot supports multiple presentation modes. The active mode can be set per-page in configuration, and optionally toggled globally for comparison.

| Mode | What it renders | When to use |
|------|----------------|-------------|
| **Hero Banner** | Full banner with headline, subtitle, CTA, and optional visual. Supports side-by-side and stacked layouts. | Default for most product areas. Best when there's a visual (data preview, org chart, etc.) that helps communicate what the page does. |
| **Action Card** | Compact card with icon, title, caption, and CTA. Uses the platform design system's `ActionCard` component. | Better for pages where the product is already conceptually familiar (e.g., Reports, Workflows) and doesn't need visual persuasion — just a clear entry point. |

### Hero Content Model

| Field | Purpose |
|-------|---------|
| Title | Primary headline. Short, action-oriented. |
| Subtitle | 1-2 sentence explanation of what this product area does. |
| Primary action | CTA button. Behaves as a dismiss — removes the primer and reveals the product. |
| Secondary text | Optional helper text below the CTA (e.g., "Takes about 5 minutes"). |
| Visual | Optional rich visual (data preview, org chart, document list, etc.) rendered beside or below the text. |
| Eyebrow | Optional app identity block above the title (icon + name). Used in full-page takeover mode so users know what app they're in. |

### Hero Layout Options

| Layout | Behavior |
|--------|----------|
| `side-by-side` | Text on left, visual on right. Default for pages with a meaningful visual. |
| `stacked` | Text centered above visual. Used when there's no visual or for embedded/tab-level primers. |

---

## Slot 2: Discovery Row

The discovery row sits below the hero and answers a second-order question that depends on the product type. There are **three variants**, selected per-page based on which question is most useful for that product area.

### Variant: Template

**Question it answers:** *"What can I create here?"*

Best for products where the fastest path to value is starting from a pre-built recipe or template.

| Element | Description |
|---------|-------------|
| Label | Link-style header (e.g., "Start with a template →") |
| Recipe cards | Grid of cards, each with icon + title + description |
| SKU filtering | Recipes can declare a required SKU. Cards for unowned SKUs are hidden. |

**Used by:** Reports, Workflow Studio, Sandbox

### Variant: Capability

**Question it answers:** *"What can I do here?"*

Best for products that are conceptually unfamiliar — where users need to understand the feature's capabilities before any action makes sense.

| Element | Description |
|---------|-------------|
| Separator label | Section heading (e.g., "What you can do here") |
| Feature cards | Grid of compact cards with icon, title, and short description |
| Detail modal | Clicking a card opens a modal with expanded description, key benefits, and a CTA |

**Used by:** Activity Log, Flow Configuration, Permissions, Chat, Organizational Data tabs

### Variant: Unlock

**Question it answers:** *"What does this power across the platform?"*

Best for foundational data or infrastructure products where the value is indirect — the thing itself is simple, but it feeds many downstream systems.

| Element | Description |
|---------|-------------|
| Category label | Section heading (e.g., "Departments power more than your org chart") |
| Category subtitle | Optional explanatory line |
| Feature cards | Grid of downstream capabilities this product feeds into, with accent-colored icons |

**Used by:** Data Catalog, Documents, Org Structure, Approvals, Saved Supergroups

---

## Optional: Secondary Discovery

A lightweight horizontal strip below the main discovery row for supplemental cross-links. Contains compact items with icon, title, and note text. This is intentionally subtle — it provides wayfinding without competing with the primary discovery row.

---

## Page-Level Modes

### Standard (scoped to content area)

The primer renders below the app header and tab bar. The page title, tabs, and navigation remain visible. This is the default.

### Full-page takeover

The primer replaces the entire content area, including the app header. An **eyebrow** (app icon + app name) is rendered above the title so users retain context about where they are.

When to use full-page: the product area is a standalone tool (Chat, Documents, Data Catalog) rather than a tab within a larger page.

---

## Compact Module (inline variant)

For cases where a full primer is too heavy — e.g., a secondary tab within a page — a **compact module** renders a self-contained card with:

- Status line (e.g., "18 report templates available")
- Headline + subhead
- CTA button
- Optional collapsible sections for template recipes or tips

The compact module is centered on the page and serves the same educational role as a full primer, just with less visual weight.

---

## FTUX Callouts

For tab-level content that already has data (not a blank state), a **popover callout** can appear on first visit. This is a small card anchored to a section header with:

- Nudge icon (accent-colored square with icon)
- Single-line explanatory message
- Dismiss (X button)

The callout fades in with a short delay after the tab renders. Dismissing is permanent for the session. This pattern is for contextual tips, not onboarding — it explains *this specific view*, not the whole product.

---

## Behavioral Rules

1. **CTA = dismiss.** Clicking the primary action removes the primer and reveals the underlying product surface. CTA language should reflect this: "Get started", "Open data catalog", "Create a report" — not "Learn more" or "Explore".

2. **One primer per page surface.** A page shows either its primer or its data view, never both simultaneously (except the compact module variant, which can coexist with other tab content).

3. **Per-page configuration.** Every aspect — hero mode, discovery variant, visual, layout, full-page vs. scoped — is configured per product page. There is no global "primer style."

4. **SKU-aware content.** Template recipes and discovery cards can be filtered based on purchased products. Unpurchased SKU content is hidden, not grayed out.

5. **Dismissal is local.** Dismissing a primer on one page/tab doesn't affect other pages. Each surface manages its own dismissed state.

---

## Slot Selection Guide

Use this to decide which combination of hero mode + discovery variant fits a new product page:

| Product characteristics | Hero mode | Discovery variant |
|------------------------|-----------|-------------------|
| Has templates/recipes users can start from | Hero or Action Card | **Template** |
| Feature is unfamiliar — users need to understand capabilities | Hero Banner (with visual if possible) | **Capability** |
| Product is foundational — value is in what it powers downstream | Hero Banner (with data preview visual) | **Unlock** |
| Product is conceptually familiar, just needs an entry point | **Action Card** | Template or Capability |
| Product is standalone (not a tab in a larger page) | Hero Banner, **full-page** with eyebrow | Any |
| Secondary tab within a multi-tab page | N/A | Use **Compact Module** instead |

---

## Content Inventory

Each primer page requires:

| Content piece | Required | Notes |
|---------------|----------|-------|
| Hero title | Yes | 6-10 words, action-oriented |
| Hero subtitle | Yes | 1-2 sentences, describes what the area does |
| Primary CTA label | Yes | Should feel like "take me into the product" |
| Discovery variant | Yes | One of: template, capability, unlock |
| Discovery content | Yes | Recipes, feature cards, or unlock cards depending on variant |
| Visual | No | Data preview, org chart, template list, etc. |
| Secondary text | No | Helper text below CTA |
| Secondary discovery | No | Cross-links to related product areas |
| Full-page config | No | Title, filled icon for eyebrow |
| Hero presentation mode | No | Override default (Hero Banner) with Action Card |
