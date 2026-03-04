# User Model

The user model defines the state dimensions that drive the progressive discovery experience. Every framework component reads from the user model to determine what to show.

## Lifecycle Phases

| Phase | Description | What Changes |
|-------|-------------|--------------|
| **Trial** | User is evaluating a single product | Sidebar shows trial product only. Discovery surfaces are prominent. Cross-sell is present but secondary. |
| **Post-Trial** | User has converted on one product | Sidebar expands. Cross-sell becomes primary. Platform awareness surfaces appear. |
| **Onboarded** | User has adopted the platform | Full navigation. Discovery surfaces reduce. Product experience dominates. |

## User Dimensions

| Dimension | Values | Effect |
|-----------|--------|--------|
| **Role** | Admin, Manager, Employee | Controls which features and surfaces are visible |
| **Purchased Products** | Set of product IDs | Determines which products show full UI vs. unpurchased SKU treatment |
| **Active Product** | Current product context | Drives sidebar navigation preset and content area |

<!-- TODO: Define additional dimensions (company size, industry, activation progress) -->

## ScenarioHUD

A floating control panel (visible in demo mode only) that lets viewers switch user model state in real time. Changing lifecycle phase, role, or product context immediately updates the entire UI.

<!-- TODO: Document HUD controls and state management -->
